const users = [];

//user joined the chat
userJoin = (id, username, room) => {
    const user = {id, username, room};

    users.push(user);
    console.log(users);

    return user;
}

//get current user
getCurrentUser = (id) => {
    return users.findIndex((user) => user.id === id);
}

//user leaves the chat
userLeft = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index != -1){
        return users.splice(index, 1)[0];
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeft
};