import { useQuery } from '@tanstack/react-query';
import users from '../data/users.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get('/users/fetch');
    return response.data.data;
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