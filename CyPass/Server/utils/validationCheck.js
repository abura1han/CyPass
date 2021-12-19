// Check express-validator error message
const validationCheck = (validationResult) => {
	if (!validationResult.isEmpty()) {
		return validationResult.array();
	}

	return false;
}

module.exports = { validationCheck }