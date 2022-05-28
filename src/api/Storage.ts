export const userKeyStorage = {
    setItem: (key: string) => {
        localStorage.setItem('key', JSON.stringify(key))
    },
    getItem: (key: string) => {
        const item = localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key)
    }
}
