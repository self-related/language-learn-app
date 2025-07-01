export function loadStateFromLocalStorage<T>(key: string): T | null {
    const localStorageValue = localStorage.getItem(key);
    const parsedValue = localStorageValue ? JSON.parse(localStorageValue) : null;
    return parsedValue as T | null;
}

export function saveToLocalStorage<T>(key: string, currentState: T) {
    localStorage.setItem(key, JSON.stringify(currentState));
};