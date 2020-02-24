function validateSignUpInput(data) {
	const errors = {};
	const username = data.username;
	const password = data.password;

	if (!username) {
		errors.username = "Введите имя";
	 } else if (username.length<4) {
		errors.username = "Минимальная длинна имени:4";
	 }
	 if (!password) {
		 errors.password = "Введите пароль";
	  } else if (password.length<6) {
		 errors.password = "Минимальная длинна пароля:6";
	  }

	return {
		errors,
		isValid: Object.keys(errors).length === 0 && errors.constructor === Object
	};
}

module.exports = validateSignUpInput;
