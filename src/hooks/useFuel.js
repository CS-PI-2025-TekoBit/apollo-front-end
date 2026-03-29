import { useQuery } from '@tanstack/react-query';
import fuel from '../data/fuel.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get("/fuels/fetch");
    return response.data;
};

export function useFuel() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['fuel'],
    });

    return {
        ...query,
        fuel: query.data,
    };
}