import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Api from "../api/api";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isTokenValid = (token) => {
        try {
            const payload = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (payload.exp && payload.exp < currentTime) {
                console.warn('Token expirado');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Token inválido', error);
            return false;
        }
    };

    const getToken = () => {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
    };

    const clearAuth = () => {
        setUser(null);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; httpOnly; samesite=strict';
    };

    useEffect(() => {
        const token = getToken();

        if (token && isTokenValid(token)) {
            try {
                const payload = jwtDecode(token);
                setUser({
                    id: payload.id,
                    role: payload.role,
                    name: payload.name
                });
            } catch (error) {
                console.error('Erro ao decodificar token', error);
                clearAuth();
            }
        } else if (token) {
            clearAuth();
        }

        setLoading(false);
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

            if (result.status === 200 && result.data.token) {
                const token = result.data.token;

                if (!isTokenValid(token)) {
                    return {
                        status: false,
                        message: 'Token inválido recebido do servidor'
                    };
                }

                const isProduction = process.env.NODE_ENV === 'production';
                const secureFlag = isProduction ? 'secure;' : '';

                document.cookie = `token=${token}; path=/; max-age=3600; ${secureFlag} samesite=strict`;

                const payload = jwtDecode(token);
                setUser({
                    id: payload.id,
                    role: payload.role,
                    name: payload.name
                });

                return { status: true };
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

    const logout = () => {
        clearAuth();
    };

    const checkAuth = () => {
        const token = getToken();
        if (!token || !isTokenValid(token)) {
            clearAuth();
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