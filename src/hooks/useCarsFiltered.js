
import { useQuery } from '@tanstack/react-query'
import carros from '../data/car.json';

const fetch = async (brand) => {

    const car = carros.data.filter(car => car.mark == brand);

    if (!car) {
        throw new Error('Carro não encontrado');
    }

    return car;
};

export function useCarsFiltered(brand) {
    const query = useQuery({
        queryFn: () => fetch(brand),
        queryKey: ['car', brand],
        enabled: !!brand,
        staleTime: 0,
        refetchOnWindowFocus: false,
    })

    return {
        ...query,
        others_cars: query.data,
    }
}