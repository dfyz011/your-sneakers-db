import { OPEN_ALERT, CLOSE_ALERT } from "../constants/alert";

export function handleError(dispatch, err, callBackIfLocalErr) {
	if (err.response.data.type === "local") {
		callBackIfLocalErr();
	} else {
		dispatch({
			type: OPEN_ALERT,
			payload: { message: { text: err.response.data.text, type: "error" } }
		});
	}
}
export function closeAlert() {
	return dispatch =>
		dispatch({
			type: CLOSE_ALERT
		});
}
export function openAlert(message) {
	return dispatch =>
		dispatch({
			type: OPEN_ALERT,
			payload: message
		});
}
