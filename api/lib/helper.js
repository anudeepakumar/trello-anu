
const CONSTANTS = {
	SUCCESS_MESSAGE: "Success",
	SUCCESS_STATUS: 200,
	ERROR_MEESAGE: "Something went wrong",
	ERROR_STATUS: 500
}

module.exports = {
	CONSTANTS: CONSTANTS,

	errorHandler: (req, res) => {
		res.status(CONSTANTS.ERROR_STATUS);
		res.send({
			message: CONSTANTS.ERROR_MEESAGE
		});
		return;
	},

	successHandler: (data, req, res) => {
		let responseMessage = {
			message: CONSTANTS.SUCCESS_MESSAGE
		}
		if (data) {
			responseMessage.data = data;
		}
		res.status(CONSTANTS.SUCCESS_STATUS);
		res.send(responseMessage);
		return;
	}
}