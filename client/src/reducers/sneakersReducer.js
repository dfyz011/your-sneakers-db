import {
	ADD_SNEAKER,
	DELETE_SNEAKER,
	UPDATE_SNEAKER,
	GET_SNEAKERS,
	REMOVE_ERRORS,
	GET_SNEAKER,
	START_SNEAKERS_LOADING,
	SNEAKERS_ERROR
} from "../constants/sneaker";

const initialState = {
	sneakers: [],
	isLoading: false,
	errors: {}
};

export function sneakersReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_SNEAKER:
			return {
				...state,
				sneakers: [...state.sneakers, action.payload]
			};
		case DELETE_SNEAKER:
			return {
				...state,
				sneakers: state.sneakers.filter(
					sneaker => sneaker._id !== action.payload
				)
			};
		case UPDATE_SNEAKER:
			return {
				...state,
				sneakers: state.sneakers.map(sneaker =>
					sneaker._id === action.payload._id
						? { ...sneaker, ...action.payload }
						: sneaker
				)
			};
		case GET_SNEAKERS:
			return {
				...state,
				sneakers: action.payload,
				isLoading: false
			};
		case START_SNEAKERS_LOADING:
			return {
				...state,
				isLoading: true,
				errors: {}
			};
		case REMOVE_ERRORS:
			return {
				...state,
				errors: {}
			};
		case SNEAKERS_ERROR:
			return {
				...state,
				isLoading: false,
				errors: action.payload
			};
		case GET_SNEAKER:
			return { ...state };
		default:
			return state;
	}
}
