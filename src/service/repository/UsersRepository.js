function UsersRepository(dbInstance) {

    this.findUsers = async () => {
        const users = await dbInstance('usuario');
        console.log(users[0].nome);
        return users;
    };
}

module.exports = UsersRepository;