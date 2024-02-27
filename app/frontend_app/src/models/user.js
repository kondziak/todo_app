
export function createUser(user) {
    return {
        id : user.id,
        name : user.name,
        lastname : user.lastname,
        tasks : [...user.tasks]
    };
}