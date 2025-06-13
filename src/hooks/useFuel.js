import { useQuery } from '@tanstack/react-query';
import fuel from '../data/fuel.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: fuel.fuel });
        }, 1000);
    });
    return response.data;
};

export function useFuel() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['fuel'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        fuel: query.data,
    };
}