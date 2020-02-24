function validateLoginInput(data){
    const errors = {};
    const username = data.username;
    const password = data.password;
 
    if (!username) {
		errors.username = "Введите имя";
	}
	if (!password) {
		errors.password = "Введите пароль";
	}
    return {
       errors,
       isValid: (Object.keys(errors).length === 0 && errors.constructor === Object)
    };
 };
 module.exports = validateLoginInput;