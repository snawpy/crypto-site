import Cookies from 'js-cookie';



export function deleteUserToken() {
    Cookies.remove('mcg-user');
}

export function getUserToken() {
    const userToken = Cookies.get('mcg-user');

    if (!userToken) {
        return null;
    }

    const tokenString = `Token ${userToken}`;

    return tokenString;

}

export function setUserToken(token) {
    Cookies.set('mcg-user', token);
}