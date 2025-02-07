//get para recibir hola mundo 

const GetPublic = async (req, res) => {
    res.json({
        message: 'Este es un endpoint público.'
    })

}


const GetPrivate = async (req, res) => {
    res.json({
        message: 'Este es un endpoint privado.'
    })

}

const POSTJson = async (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({  
        message: 'Datos recibidos'
    })

}

module.exports = {
    GetPublic,
    GetPrivate,
    POSTJson
}