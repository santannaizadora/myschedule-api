export var errorHandler = function (err, req, res, next) {
    if (err.type === "not_found") {
        return res.status(404).send({
            message: err.message
        });
    }
    if (err.type === "conflict") {
        return res.status(409).send({
            message: err.message
        });
    }
    if (err.type === "forbidden") {
        return res.status(403).send({
            message: err.message
        });
    }
    if (err.type === "bad_request") {
        return res.status(400).send({
            message: err.message
        });
    }
    return res.status(500).send({
        message: "Something went wrong"
    });
};
