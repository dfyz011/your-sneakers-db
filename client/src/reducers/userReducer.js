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

const initialState = {
	isLoggingIn: false,
	isLoggingOut: false,
	loginError: false,
	logoutError: false,
	isAuthenticated: false,
	isSigningIn: false,
	signError: false,
	signSuccess: false,
	errors: {},
	username: "",
	password: ""
};
export function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoggingIn: true,
				loginError: false,
				signError: false,
				errors: {}
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: false,
				loginError: true,
				errors: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggingIn: false,
				isAuthenticated: true,
				...action.payload
			};
		case LOGOUT_SUCCES:
			return initialState;
		case SIGNUP_SUCCESS:
			return {
				...state,
				isSigningIn: false,
				signSuccess: true,
				...action.payload
			};
		case SIGNUP_REQUEST:
			return {
				...state,
				isSigningIn: true,
				signError: false,
				loginError: false,
				signSuccess: false,
				errors: {}
			};
		case SIGNUP_FAIL:
			return {
				...state,
				isSigningIn: false,
				signError: true,
				errors: action.payload
			};
		case REMOVE_ERRORS:
			return {
				...state,
				loginError: false,
				isSigningIn: false,
				signError: false,
				errors: {}
			};
		default:
			return state;
	}
}
