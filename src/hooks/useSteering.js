import { useQuery } from '@tanstack/react-query';
import steering from '../data/steering.json'
import Api from '../api/api';

const fetchData = async () => {
    const response = await Api.get("/steering/fetch");
    return response.data;
};

export function useSteering() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['steering'],
    });

    return {
        ...query,
        steering: query.data,
    };
}