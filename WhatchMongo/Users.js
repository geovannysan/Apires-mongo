const mongoose = require("mongoose");
const Pelicula = require("../Modelos/usuario")

const findAllUSers = async () => {
    const db = mongoose.connection;
    const pipeline = [
        { $match: { 'fullDocument._id': '626df4264bc2b6133885d00e' } }
    ];
    await db.once('open', () => {
        const collection = db.collection('users');
        const changeStream = collection.watch();
        changeStream.on('change', next => {
            const { updatedFields } = next.updateDescription;
            console.log([next, next.documentKey['_id'], updatedFields]);
        });
    })
};

module.exports = { findAllUSers };