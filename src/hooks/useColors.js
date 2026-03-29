import { useQuery } from '@tanstack/react-query';
import colors from '../data/colors.json';
import Api from '../api/api';

const fetchData = async () => {

    const response = await Api.get("/colors/fetch");
    return response.data;
};

export function useColors() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['colors'],
    });

    return {
        ...query,
        colors: query.data,
    };
}