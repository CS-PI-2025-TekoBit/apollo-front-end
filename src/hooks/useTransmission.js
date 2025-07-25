import { useQuery } from '@tanstack/react-query';
import transmission from '../data/transmission.json';
import Api from '../api/api';

const fetchData = async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: transmission.transmission });
        }, 1000);
    });
    return response.data;

};

export function useTransmission() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['transmission'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        transmission: query.data,
    };
}