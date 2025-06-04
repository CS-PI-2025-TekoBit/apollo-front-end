import { useContext } from 'react'
import { AuthContext } from '../context/AuthContex';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('algum erro no contexto de autenticação');
    }
    return context;
};