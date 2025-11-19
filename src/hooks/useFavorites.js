import { useEffect, useState } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("favoriteCars");
        if (saved) setFavorites(JSON.parse(saved));
    }, []);

    const saveToStorage = (data) => {
        localStorage.setItem("favoriteCars", JSON.stringify(data));
    };

    const getFreshFavorites = () => {
        const saved = localStorage.getItem("favoriteCars");
        return saved ? JSON.parse(saved) : [];
    };

    const addFavorite = (car) => {
        const fresh = getFreshFavorites();
        const exists = fresh.some(item => item.id_car === car.id_car);
        if (!exists) {
            const updated = [...fresh, car];
            setFavorites(updated);
            saveToStorage(updated);
        }
    };

    const removeFavorite = (id_car) => {
        const fresh = getFreshFavorites(); 
        const updated = fresh.filter(item => item.id_car !== id_car);
        setFavorites(updated);
        saveToStorage(updated);
    };

    const toggleFavorite = (car) => {
        const fresh = getFreshFavorites(); 
        const exists = fresh.some(item => item.id_car === car.id_car);
        exists ? removeFavorite(car.id_car) : addFavorite(car.id_car ? car : car);
    };

    const isFavorite = (id_car) => {
        const fresh = getFreshFavorites(); 
        return fresh.some(item => item.id_car === id_car);
    };

    return { favorites, toggleFavorite, isFavorite };
}
