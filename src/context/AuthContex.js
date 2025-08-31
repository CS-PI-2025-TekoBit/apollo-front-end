import { createContext, useEffect, useState } from "react";
import Api from "../api/api";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const response = await Api.get('auth/me');
            if (response.status === 200) {
                return response.data.data;
            }
            return null;
        } catch (error) {
            return null;
        }
    };

    const clearAuth = () => {
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const userData = await getUserData();

            if (userData) {
                setUser({
                    id: userData.id,
                    role: userData.role,
                    name: userData.name
                });
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credential) => {
        const { user, password } = credential;

        if (!user?.trim() || !password?.trim()) {
            return {
                status: false,
                message: 'Usuário e senha são obrigatórios'
            };
        }

        try {
            const result = await Api.post('auth/login', {
                name: user.trim(),
                password: password
            });

            if (result.status === 200) {
                const userData = await getUserData();
                if (userData) {
                    setUser({
                        id: userData.id,
                        role: userData.role,
                        name: userData.name
                    });
                    if (userData.role === 'ROLE_ADMIN' && window.location.pathname === '/') {
                        window.location.replace('/admin/cars');
                    }
                    return { status: true };
                } else {
                    return {
                        status: false,
                        message: 'Erro ao obter dados do usuário'
                    };
                }
            } else {
                return {
                    status: false,
                    message: result.data?.message || 'Credenciais inválidas'
                };
            }
        } catch (error) {
            console.error('Erro no login:', error);

            if (error.response?.status === 401) {
                return {
                    status: false,
                    message: 'Usuário ou senha incorretos'
                };
            } else if (error.response?.status === 429) {
                return {
                    status: false,
                    message: 'Muitas tentativas. Tente novamente em alguns minutos.'
                };
            }

            return {
                status: false,
                message: 'Erro interno. Tente novamente mais tarde.'
            };
        }
    };

    const logout = async () => {
        try {
            await Api.post('auth/logout');
            setUser(null);
        } catch (error) {
            console.error('Erro no logout:', error);
            setUser(null);
        }
    };

    const checkAuth = async () => {
        const userData = await getUserData();
        if (!userData) {
            setUser(null);
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            checkAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;