import axios from "axios";
import {
	ADD_SNEAKER,
	DELETE_SNEAKER,
	UPDATE_SNEAKER,
	GET_SNEAKERS,
	GET_SNEAKER,
	START_SNEAKERS_LOADING,
	SNEAKERS_ERROR,
	REMOVE_ERRORS
} from "../constants/sneaker";
import { OPEN_ALERT } from "../constants/alert";
import { handleError } from "../actions/alertAction";

const server = "http://localhost:7000/api";

export function addSneaker(sneaker) {
	return dispatch => {
		axios
			.post(`${server}/sneakers/add`, { sneaker })
			.then(res => {
				dispatch({
					type: ADD_SNEAKER,
					payload: res.data
				});
				dispatch({
					type: OPEN_ALERT,
					payload: {
						message: { text: "Кроссовки добавлены.", type: "success" }
					}
				});
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: SNEAKERS_ERROR, payload: err.response.data })
				);
			});
	};
}

export function getSneakerById(id) {
	return dispatch => {
		axios
			.get(`${server}/sneakers/${id}`)
			.then(res => {
				dispatch({
					type: GET_SNEAKER,
					payload: res.data
				});
			})

			.catch(err => {
				dispatch({ type: SNEAKERS_ERROR, payload: err.response.data });
			});
	};
}

export function getSneakers() {
	return dispatch => {
		dispatch({
			type: START_SNEAKERS_LOADING
		});
		axios
			.get(`${server}/sneakers/`)
			.then(res => {
				dispatch({
					type: GET_SNEAKERS,
					payload: res.data
				});
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: SNEAKERS_ERROR, payload: err.response.data })
				);
			});
	};
}
export function updateSneaker(id, sneaker) {
	return dispatch => {
		axios
			.patch(`${server}/sneakers/update/${id}`, sneaker)
			.then(res => {
				dispatch({
					type: UPDATE_SNEAKER,
					payload: res.data
				});
				dispatch({
					type: OPEN_ALERT,
					payload: {
						message: {
							text: "Данные о кроссовках успешно изменены.",
							type: "success"
						}
					}
				});
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: SNEAKERS_ERROR, payload: err.response.data })
				);
			});
	};
}
export function deleteSneaker(id) {
	return dispatch => {
		axios
			.delete(`${server}/sneakers/delete/${id}`)
			.then(res => {
				dispatch({
					type: DELETE_SNEAKER,
					payload: res.data._id
				});
				dispatch({
					type: OPEN_ALERT,
					payload: {
						message: { text: "Кроссовки успешно удалены.", type: "success" }
					}
				});
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: SNEAKERS_ERROR, payload: err.response.data })
				);
			});
	};
}
export function removeErrors(payload) {
	return dispatch => {
		dispatch({
			type: REMOVE_ERRORS
		});
	};
}
