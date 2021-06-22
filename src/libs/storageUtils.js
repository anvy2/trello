class StorageUtils {
    static getItem(key) {
        return localStorage.getItem(key);
    }

    static setItem(key, value) {
        if(value instanceof Object) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }
}



export default StorageUtils;