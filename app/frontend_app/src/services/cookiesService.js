import Cookies from 'universal-cookie';

let instance;
let cookies = null;

class CookieService {
    constructor() {
        if (!instance) {
            instance = this;
            cookies = new Cookies("WAR", {path:'/'});
        }
    }
    setCookie(key,value){
        cookies.set(key,value,{expires: this.getExpirationDate()});
    }
    
    getCookie(key) {
        return cookies.get(key);
    }

    getToken() {
        return "Bearer " + cookies.get("token");
    }

    removeToken() {
        cookies.remove("token");
        cookies.remove("tokenType");
    }

    getExpirationDate() {
        let now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        return new Date(now);
    }
}

export default CookieService;