import { useQuery } from '@tanstack/react-query';
import filtros from '../data/filtros.json';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: filtros });
        }, 100);
    });
    return response.data;
};

// const fetchData = async () => {
//     const response = await Api.get('/buscar_carros')
//     return response.data
// }

export function useFilters() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['all_filters'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        filtros: query.data,
    };
}