import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
	LOGIN_REQUEST,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT_SUCCES,
	SIGNUP_SUCCESS,
	SIGNUP_REQUEST,
	SIGNUP_FAIL,
	REMOVE_ERRORS
} from "../constants/user";
import { getSneakers } from "../actions/sneakerAction";
import { OPEN_ALERT } from "../constants/alert";
import { handleError } from "../actions/alertAction";

const server = "http://localhost:7000/api";

export const getUserByToken = () => {
	return dispatch => {
		const token = localStorage.token;
		if (token) {
			setAuthToken(token);
			axios
				.get(`${server}/users/relogin`)
				.then(res => {
					dispatch({
						type: LOGIN_SUCCESS,
						payload: res.data.user
					});
					dispatch(getSneakers());
				})
				.catch(err => {
					localStorage.removeItem("token");
					handleError(dispatch, err, () =>
						dispatch({ type: LOGIN_FAIL, payload: err.response.data })
					);
				});
		}
	};
};
export function login(username, password) {
	return dispatch => {
		dispatch({
			type: LOGIN_REQUEST
		});
		axios
			.post(`${server}/users/login`, { username, password })
			.then(res => {
				localStorage.setItem("token", res.data.token);
				setAuthToken(res.data.token);
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data.user
				});
				dispatch(getSneakers());
				// dispatch({
				// 	type: OPEN_ALERT,
				// 	payload: {message:{text:`Здравствуйте,${res.data.user.username}!`,type:"success"}}
				// });
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: LOGIN_FAIL, payload: err.response.data })
				);
			});
	};
}
export function signup(username, password) {
	return dispatch => {
		dispatch({
			type: SIGNUP_REQUEST
		});

		axios
			.post(`${server}/users/signup`, { username, password })
			.then(res => {
				dispatch({
					type: SIGNUP_SUCCESS,
					payload: res.data
				});
				dispatch({
					type: OPEN_ALERT,
					payload: {
						message: { text: "Пользователь успешно создан.", type: "success" }
					}
				});
			})
			.catch(err => {
				handleError(dispatch, err, () =>
					dispatch({ type: SIGNUP_FAIL, payload: err.response.data })
				);
			});
	};
}
export function logout(payload) {
	return dispatch => {
		localStorage.removeItem("token");
		setAuthToken("");
		dispatch({
			type: LOGOUT_SUCCES
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
