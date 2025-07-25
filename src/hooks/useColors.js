import { useQuery } from '@tanstack/react-query';
import colors from '../data/colors.json';
import Api from '../api/api';

const fetchData = async () => {

    const response = await Api.get("/colors/fetch");
    return response.data.data;
};

export function useColors() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['colors'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        colors: query.data,
    };
}