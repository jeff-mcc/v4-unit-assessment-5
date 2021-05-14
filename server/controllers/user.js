const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {username,password} = req.body;
        const [checkUsername] = await db.user.find_user_by_username(username)
        if(checkUsername){
            return res.status(409).send("Username already registered by another user")
        }
        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(password,salt);
        const profilePic = `https://robohash.org/${username}.png`;
        const [user] = await db.user.create_user(username,hash,profilePic);
        delete user.password
        req.session.user = user;
        return res.status(200).send(req.session.user)
    },
    login: async (req,res)=>{
        const db = req.app.get('db')
        const {username,password} = req.body;
        const [user] = await db.user.find_user_by_username(username);
        if(!user){
            return res.status(404).send("Incorrect username or password")
        }
        const isAuthenticated = bcrypt.compareSync(password,user.password)
        if(!isAuthenticated){
            return res.status(404).send("Incorrect username or password")
        }
        delete user.password
        req.session.user = user;
        return res.status(200).send(req.session.user)
    },
    getUser: (req,res)=>{
        if(!req.session.user){
            return res.status(404).send("User not found")
        }
        return res.status(200).send(req.session.user)
    },
    logout: (req,res)=>{
        req.session.destroy()
        return res.sendStatus(200)
    }
}