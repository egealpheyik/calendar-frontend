
function setUserId(userId){
    return localStorage.setItem('id',JSON.stringify(userId));
}
function setUsername(username){
    return localStorage.setItem('username', JSON.stringify(username));
}


function getUsername(user){
    return localStorage.getItem('username', JSON.parse(user))
}
function getId(user){
    return localStorage.getItem('id', JSON.parse(user))
}