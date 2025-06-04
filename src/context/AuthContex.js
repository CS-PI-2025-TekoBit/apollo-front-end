// src/context/AuthContext.js
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import users from '../data/users.json';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        if (token) {
            try {
                const payload = jwtDecode(token);
                setUser({ id: payload.id, role: payload.role });
            } catch (error) {
                console.error('Token inválido', error);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (credential) => {
        const { user, password } = credential;

        const user_cad = users.users.find(u => (u.email === user || u.name === user) && u.password === password);

        if (user_cad) {
            const token = user_cad.jwt;
            document.cookie = `token=${token}; path=/; max-age=3600`;
            const payload = jwtDecode(token);
            setUser({ id: payload.id, role: payload.role, name: payload.name });
            return { status: true };
        } else {
            setUser(null);
            return { status: false, message: 'Usuário não encontrado, senha inválida ou credenciais inválidas' };
        }
    };

    const logout = () => {
        setUser(null);
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
