import {useState, useEffect} from 'react';

interface Item {
    id: string;
    name: string;
}

const useLocalStorageList = (key: string) => {
    const [items, setItems] = useState<Item[]>(() => {
        const storedItems = localStorage.getItem(key);

        return storedItems ? JSON.parse(storedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(items));
    }, [key, items]);

    const addItem = (item: Item) => {
        setItems(prevItems => [...prevItems, item]);
    };

    const removeItem = (id: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const isInList = (id: string): boolean => {
        const item = items.find(item => item.id === id);

        return !!item;
    };

    return {items, addItem, isInList, removeItem};
};

export default useLocalStorageList;