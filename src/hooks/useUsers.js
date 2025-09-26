import { useQuery } from '@tanstack/react-query';
import users from '../data/users.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: users.users });
        }, 1000);
    });
    return response.data;
};

export function useUsers() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['users'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        users: query.data,
    };
}