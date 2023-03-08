const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data){
    let errors = [];
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email: "";
    data.password = !isEmpty(data.password) ? data.password : "";
    //Second password matching
    data.password2 = !isEmpty(data.password2) ? data.password2:"";

    if (Validator.isEmpty(data.username)){
        errors.name = "Username is required"
    }
    if (Validator.isEmpty(data.email)){
        errors.email = "Email is required!"
    }else if (!Validator.isEmail(data.email)){
        errors.email = "Not a valid Email!"
    }
    if (Validator.isEmpty(data.password)){
        errors.password = "Password is required!"
    }else if (Validator.isEmpty(data.password2)){
        errors.password2 = "Confirm your password"
    }
    if (!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords are not matching"
    }
    if (!Validator.isLength(data.password, {min:5, max:30})){
        errors.password = "Password must be between 5 and 30 characters"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}