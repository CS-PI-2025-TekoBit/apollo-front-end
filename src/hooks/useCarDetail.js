
import { useQuery } from '@tanstack/react-query'
import carros from '../data/car.json';

const fetch = async (id) => {
    const id_car = parseInt(id);
    const car = carros.data.find(car => car.id_car == id_car);
    if (!car) {
        throw new Error('Carro não encontrado');
    }
    return car;
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