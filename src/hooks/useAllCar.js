import { useQuery } from '@tanstack/react-query';
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get("/cars");
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