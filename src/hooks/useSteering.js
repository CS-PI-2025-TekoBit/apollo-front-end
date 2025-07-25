import { useQuery } from '@tanstack/react-query';
import steering from '../data/steering.json'
import Api from '../api/api';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: steering.steering });
        }, 1000);
    });
    return response.data;
};

export function useSteering() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['steering'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        steering: query.data,
    };
}