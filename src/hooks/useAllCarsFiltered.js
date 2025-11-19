import { useQuery } from '@tanstack/react-query';
import Api from '../api/api';
import qs from 'qs';

const fetchData = async (filters) => {
    const queryString = qs.stringify(filters, { arrayFormat: 'repeat' });
    const response = await Api.get(`/cars/search?${queryString}`);
    return response.data?.data || [];
};

export function useAllCarsFiltered(filters) {
    const query = useQuery({
        queryFn: () => fetchData(filters),
        queryKey: ['all_cars_filtered', filters],
    });

    return {
        ...query,
        cars: query.data,
    };
}