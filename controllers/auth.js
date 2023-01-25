class UserController{
    async registration(req, res){

    }

    async login(req, res){

    }

    async getMe(req, res){
        return res.json({test: 'message'})
    }
}

module.exports = new UserController();