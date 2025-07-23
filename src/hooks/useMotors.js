import { useQuery } from '@tanstack/react-query';
import motors from '../data/motors.json';
import Api from '../api/api';

const fetchData = async () => {
    // const response = await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve({ data: motors.motors });
    //     }, 1000);
    // });
    // return response.data;
    /*retorno da api*/
    const response = await Api.get("/motors/fetch");
    return response.data.data;
};

export function useMotors() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['motors'],
        refetchInterval: 20000,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        motors: query.data,
    };
}