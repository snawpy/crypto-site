import * as requests from './requests';

// Todo: split these into different django apps, the views and urls in the back end




// crypto app
// todo: update to use requests
export function getAllCrypto() {
    return requests.GetAnonymous('api/cryptotracker/all-crypto/');
}



// user app ------------------------------------------

export function login(userPassword, userEmail) {

    return requests.PostAnonymous('/api/users/login/', { password: userPassword, username: userEmail });
    // return requests.Post('/auth/', { password: userPassword, username: userEmail });
}

export function register(email, password) {
    const body = {
        email: email,
        password: password
    };

    // return requests.PostAnonymous('api/users/', body);

    
    return requests.PostAnonymous('api/users/registerv2', body);
    // return requests.PostAnonymous('api/users/registerv3', body);
    
}

export function profile() {
    // gets all users, we only  want to get the logged in user
    return requests.Get('api/users/');
}

export function current_user() {
    return requests.Get('api/users/current-user/');
} 


export function update_password(newPassword, oldPassword) {
    console.log("calling api.update pw");
    console.log(newPassword);
    console.log(oldPassword);
    // return requests.Put('api/users/current-user/update-password', { new_password: "420", old_password: "asd" })
    return requests.Put('api/users/current-user/update-password', { new_password: newPassword, old_password: oldPassword });
}

export function update_details(email, firstName, lastName) {
    // custom endpoint
    return requests.Put('api/users/current-user/update-details', { email: email, first_name: firstName, last_name: lastName });

    // generic endpoint
    // return requests.Put('api/users/current-user/update-detailsV2', { email: email, first_name: firstName, last_name: lastName });
}

// don't really need this, or mayb we can seperate it as we need to verify it
export function update_email(newEmail) {
    return requests.Put('api/users/current-user/update-email', {email: newEmail});
}