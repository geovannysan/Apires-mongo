const jwt = require("jsonwebtoken");
const express = require("express")
const router = express.Router()
const Alquiler = require("./Modelos/alquiler")
const Users = require("./Modelos/usuario")


router.post('/', async (req, res) => {
    const dato = req.body;
    try {
        const requerimi = new Alquiler(dato)
        await requerimi.save()
        console.log("dato registrado" + requerimi)
    }
    catch (error) {
    }

})
router.get('/', async (req, res) => {
    try {
        const arrayMascotas = await Users.find();
        res.status(200).json(arrayMascotas);
       // console.log(arrayMascotas)
    } catch (error) {
         res.status(404).json(error);
       // console.log(error)
    }
})





router.post('/LoginUser', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });     
        if(!user)return res.status(404).send('Invalid Email or Password.'); 
        const passvald = await user.decodepas(req.body.password, user.password)
        if (!passvald)return res.status(404).send('Invalid Email or Password.');          
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {expiresIn: 60 * 60 * 24,});
        res.status(200).json({ auth: true, token,username: user.nombre});
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})  
router.post('/CreateUser', async (req, res) => {
    try {
        const user = new Users({ nombre: req.body.nombre, email: req.body.email, password: req.password.email })
        user.password = await user.encrypas(user.password)
        await user.save()
        console.log(user)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router