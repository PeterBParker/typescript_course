// ****************************************
// This is my initial attempt at validation.
// The idea is that we could define different types of validations in the enum, and
// the Validator would take an object with the value to validate as the key and a list
// of predefined validations via our enum. It would then loop over them and run the checks we
// specified.
// Example:
// const validator = new Validator({"My value to validate": [Validations.NotEmpty, Validations.NoSwearWords]})
// const validation_result = validator.validate();
var Validations;
(function (Validations) {
    Validations[Validations["NotEmpty"] = 0] = "NotEmpty";
    Validations[Validations["PostiveNum"] = 1] = "PostiveNum";
})(Validations || (Validations = {}));
class Validator {
    constructor(validatees) {
        this.validatees = validatees;
    }
    validate() {
        let isValid = true;
        for (const validate_me in this.validatees) {
            for (const valids in this.validatees[validate_me]) {
                switch (+valids) {
                    case Validations.NotEmpty:
                        if (validate_me.trim().length === 0) {
                            isValid = false;
                        }
                        break;
                    case Validations.PostiveNum:
                        if (+validate_me <= 0) {
                            isValid = false;
                        }
                        break;
                }
            }
        }
        return isValid;
    }
}
export function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLen != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLen;
    }
    if (validatableInput.maxLen != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLen;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// ****************************************
