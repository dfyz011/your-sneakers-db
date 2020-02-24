function validateSneakerInput(data) {
	const errors = {};

	const model = data.model;
	const brand = data.brand;

	if (!model) {
		errors.model = "Введите название";
	 }
	 if (!brand) {
		 errors.brand = "Введите бренд";
	  } else if (brand.length<2) {
		 errors.brand = "Минимальная длинна названия бренда:2";
	  }

	return {
		errors,
		isValid: Object.keys(errors).length === 0 && errors.constructor === Object
	};
}

module.exports = validateSneakerInput;