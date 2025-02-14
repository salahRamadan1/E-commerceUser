import Joi from 'joi';


function validationAuth(form) {
    let validUser = Joi.object({
        name: Joi.string().min(3).max(50),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(8).max(16),
        currentPassword: Joi.string().min(8).max(16),
        newPassword: Joi.string().min(8).max(16),
        phone: Joi.string().length(11).pattern(/^(01[0-5]|02|03|04|05|08)\d{8}$/) 
    })
    return validUser.validate(form, { abortEarly: false })

}
export { validationAuth }