export function retrieveFromLocalStorage(key){
    if(localStorage.getItem(key)){
        var retrievedObject = localStorage.getItem(key);
        return JSON.parse(retrievedObject);
    } else {
        return []
    }
    

}