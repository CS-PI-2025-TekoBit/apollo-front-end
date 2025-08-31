import { useQuery } from '@tanstack/react-query';
import Api from '../api/api';
import qs from 'qs';

const fetchData = async (filters) => {
    console.log('Enviando filtros para a API:', filters);
    const queryString = qs.stringify(filters, { arrayFormat: 'repeat' });
    console.log('Query string gerada:', queryString);

    const response = await Api.get(`/cars/search?${queryString}`);
    return response.data?.data || [];
};

export function useSalesCarFilter(filters) {
    const query = useQuery({
        queryFn: () => fetchData(filters),
        queryKey: ['all_cars_sale_filter', filters],
        enabled: !!filters && Object.keys(filters).length > 0,
    });

    return {
        ...query,
        cars: query.data,
    };
}