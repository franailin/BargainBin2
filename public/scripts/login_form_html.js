
// returns a STRING of JSON
function makeNewAuthorJSON(firstName, lastName, user, password) {
    j = {
        'name': {
            'first': firstName,
            'last': lastName
        },
        'user': user,
        'password': password
    };
    return JSON.stringify(j);
}
  
let createAccount = document.querySelector("#create_account");
createAccount.onsubmit = function () {
    let first = document.querySelector("#new_first_name").value;
    let last = document.querySelector("#new_last_name").value;
    let user = document.querySelector("#new_user").value;
    let pwd = document.querySelector("#new_password").value;

    console.log('submit btn clicked');

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch('/create_account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: makeNewAuthorJSON(first, last, user, pwd)
    });

    // prevent webpage from refreshing
    return false;
}
