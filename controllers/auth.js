const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController{
    async registration(req, res){
        try {
            const {email, password} = req.body;
            const isUsed = await User.findOne({where:{email}});

            if(isUsed){
                return res.json({
                    message: "Такой пользователь уже есть!"
                })
            }

            const hashPassword = await bcrypt.hash(password, 5)

            const newUser = await User.create({
                email,
                password: hashPassword
            })

            const token = jwt.sign({
                    id: newUser.id
                },
                process.env.JWT_SECRET,
                {expiresIn: '2h'}
            )

            res.json({
                newUser,
                token,
                message: "Регистрация прошла успешно!"
            })

        }catch (error){
            res.json({
                message:"Ошибка. Такой пользователь уже существует!"
            })
        }
    }

    async login(req, res){
        try {
            const {email, password} = req.body;

            const user = await User.findOne({where:{email}})

            if(!user){
                return res.json({
                    message:"Такой пользователь не зарегестрирован"
                })
            }

            const isPassCorrect = await bcrypt.compare(password, user.password)

            if(!isPassCorrect){
                return res.json({
                    message: "Пароль не верный!"
                })
            }

            const token = jwt.sign({
                id: user.id
                },
                process.env.JWT_SECRET,
                {expiresIn: '2h'}
                )

            return res.json({
                token, user,
                message:"Вы вошли в систему!"
            })
        }catch (error){
            res.json({
                message:"Не верный email или пароль!"
            })
        }
    }

    async getMe(req, res){
        try{
            const user = await User.findByPk(req.userId)

            if(!user){
                return res.json({
                    message:"Такой пользователь не зарегестрирован"
                })
            }

            const token = jwt.sign({
                    id: user.id
                },
                process.env.JWT_SECRET,
                {expiresIn: '2h'}
            )

            return res.json({
                user,
                token,
            })

        }catch (error){
            res.json({
                message: "Нет прав доступа."
            })
        }
    }
}

module.exports = new UserController();