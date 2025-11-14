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

    const addFavorite = (car) => {
        const exists = favorites.some(item => item.id_car === car.id_car);
        if (!exists) {
            const updated = [...favorites, car];
            setFavorites(updated);
            saveToStorage(updated);
        }
    };

    const removeFavorite = (id_car) => {
        const updated = favorites.filter(item => item.id_car !== id_car);
        setFavorites(updated);
        saveToStorage(updated);
    };

    const toggleFavorite = (car) => {
        const exists = favorites.some(item => item.id_car === car.id_car);
        exists ? removeFavorite(car.id_car) : addFavorite(car);
    };

    const isFavorite = (id_car) => {
        return favorites.some(item => item.id_car === id_car);
    };

    return { favorites, toggleFavorite, isFavorite };
}
