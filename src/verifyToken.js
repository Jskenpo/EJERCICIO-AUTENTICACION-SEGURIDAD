const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

// Public Key (First HTTP Request)
const publicKeyJwk = {
    kty: 'RSA',
    n: 'sNON2cFntL55sW3Vz3j1wfny7iqvgNhjTMvuCBpZtW2acYC_I953Yv52AjGZGjz4K3PzfcaM24b_d4QUn7Z5n5YutjhJnUTQPVkYnxZGCayKy8ALGx1KA3ZuI9M32y4ux31m63Amce67UoYu7oKdXBUnQFbL_nHmNlb_bi4anx1ZrQ814Fywt_wvvkZQXoRQMurQzEu_y6Fp2Iba2QmnL3_WLsIzeOUglC-14UTbzFTtSJhDICPAxgQu-VPIG1khtq1113KqdroWrK0V_zyCur1tMa-SULlevgGBTj446i8OBfg9SxOSDGnjFkQ46dKSdFmoWGZiPhtGqajvEUJ8Dw',
    e: 'AQAB'
};

// Convert JWK to PEM
const publicKeyPem = jwkToPem(publicKeyJwk);

const verifyToken = (req, res, next) => {
    /**
     * Check if the Authorization header is present and contains a valid token
     */
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Token requerido'});
    }

    try {
        jwt.verify(token, publicKeyPem, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'Token inválido o expirado'});
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({message: 'Error al verificar el token'});
    }
};

module.exports = verifyToken;