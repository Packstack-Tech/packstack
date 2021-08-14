interface MakeStorageInterface {
    getNumber: (key: string, ifNotSet: number) => number;
    getString: (key: string, ifNotSet: string) => string;
    setNumber: (key: string, value: number) => number;
    setString: (key: string, value: string) => string;
    removeItem: (key: string) => void;
}

export default function makeStorage(storage: Storage): MakeStorageInterface {
    return {
        getNumber(key: string, ifNotSet: number): number {
            const value = storage.getItem(key);
            if (value != null) {
                return parseInt(value, 10);
            }
            return ifNotSet;
        },
        getString(key: string, ifNotSet: string): string {
            const value = storage.getItem(key);
            if (value != null) {
                return value;
            }
            return ifNotSet;
        },
        setNumber(key: string, value: number): number {
            storage.setItem(key, '' + value);
            return value;
        },
        setString(key: string, value: string): string {
            storage.setItem(key, value);
            return value;
        },
        removeItem(key: string) {
            storage.removeItem(key);
        }
    };
}
