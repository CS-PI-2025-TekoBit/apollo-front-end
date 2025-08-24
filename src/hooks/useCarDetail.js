
import { useQuery } from '@tanstack/react-query'
import carros from '../data/car.json';
import Api from '../api/api';

const fetch = async (id) => {
    const id_car = parseInt(id);
    const response = await Api.get(`/cars/${id_car}`);
    return response.data.data;
};

export function useCarDetail(id) {
    const query = useQuery({
        queryFn: () => fetch(id),
        queryKey: ['car', id],
        enabled: !!id,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })

    return {
        ...query,
        car: query.data,
    }
}