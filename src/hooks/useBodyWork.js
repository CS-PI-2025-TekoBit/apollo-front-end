import { useQuery } from '@tanstack/react-query';
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get('/bodywork/fetch');
    return response.data.data;
};

export function useBodyWork() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['bodyWork'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        bodyWork: query.data,
    };
}