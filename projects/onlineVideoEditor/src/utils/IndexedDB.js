export function openDb(databaseName) {
    if (window.indexedDB) {
        return window.indexedDB.open(databaseName);
    } else {
        return null;
    }
}

export function create(db) {

}


