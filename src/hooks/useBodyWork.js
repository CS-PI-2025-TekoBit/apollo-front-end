import { useQuery } from '@tanstack/react-query';
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get('/bodywork/fetch');
    return response.data;
};

export function useBodyWork() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['bodyWork'],
    });

    return {
        ...query,
        bodyWork: query.data,
    };
}