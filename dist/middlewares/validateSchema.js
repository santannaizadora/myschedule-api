export function validateSchema(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            return res.status(422).send({ message: validation.error.message });
        }
        next();
    };
}
