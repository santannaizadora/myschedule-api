import JoiBase from "@hapi/joi";
import JoiDate from "@hapi/joi-date";
var Joi = JoiBase.extend(JoiDate);
export var validateDate = function (req, res, next) {
    var date = req.params.date;
    var schema = Joi.object().keys({
        date: Joi.date().format("YYYY-MM-DD").required().messages({
            "date.format": "Data deve ser no formato YYYY-MM-DD"
        })
    });
    var error = schema.validate({ date: date }).error;
    if (error)
        return res.status(400).json({ message: error.message });
    next();
};
