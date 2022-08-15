import jwt from "jsonwebtoken";
import '../setup.js';
export var validateToken = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: "Você não está autenticado!" });
    var token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            return res.status(403).json({ message: "Token inválido!" });
        res.locals.user = user;
        next();
    });
};
