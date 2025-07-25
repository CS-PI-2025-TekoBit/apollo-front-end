import { useQuery } from '@tanstack/react-query';
import carros from '../data/car.json';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: carros.data });
        }, 100);
    });
    return response.data;
};

export function useAllCars() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['all_cars'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        cars: query.data,
    };
}