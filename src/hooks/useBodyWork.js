import { useQuery } from '@tanstack/react-query';
import bodyWork from '../data/bodyWork.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: bodyWork.bodyWork });
        }, 1000);
    });
    return response.data;
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