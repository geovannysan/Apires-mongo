const jwt = require("jsonwebtoken");
const express = require("express")
const router = express.Router()
const Users = require("./Modelos/usuario")


router.get('/', async (req, res) => {
    try {
        const arrayUsers = await Users.find();
        res.status(200).json(arrayUsers);
        // console.log(arrayMascotas)
    } catch (error) {
        res.status(404).json(error);
        // console.log(error)
    }
})
router.post('/Update', async (req, res) => {
    try {
        const upta = await Users.updateOne(
            { _id: req.body.email },
            {
                $set: {
                    nombre: req.body.nombre
                }
            })
        res.status(200).json(upta)

    } catch (error) {
        res.status(404).json(error);

    }

})
router.post('/LoginUser', async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(404).send('Invalid Email or Password.');
        const passvald = await user.decodepas(req.body.password, user.password)
        if (!passvald) return res.status(404).send('Invalid Email or Password.');
        const token = jwt.sign({ id: user._id, nombre: user.nombre }, process.env.SECRET, { expiresIn: 60 * 60 * 24, });
        res.status(200).json({ auth: true, token, username: user.nombre });
    } catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
})
router.post('/CreateUser', async (req, res) => {
    try {
        const user = new Users({ nombre: req.body.nombre, email: req.body.email, password: req.body.password })
        user.password = await user.encrypas(user.password)
        await user.save()

    } catch (error) {
        console.log(error)
    }
})

module.exports = router