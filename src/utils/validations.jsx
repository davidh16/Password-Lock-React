import validator from "validator";

export function validateCreateRequest(createRequest){

    const validationErrors = {};

    if (createRequest.password === ''){
        validationErrors.password = "Password is missing"
    }

    if (createRequest.name === ''){
        validationErrors.name = "Name is missing"
    }

    if (createRequest.email_address !== undefined && createRequest.email_address !== ''){
        if (!validator.isEmail(createRequest.email_address)) {
            validationErrors.email_address = "Invalid email address"
        }
    }

    return validationErrors
}