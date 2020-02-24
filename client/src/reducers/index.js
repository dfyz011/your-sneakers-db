import { combineReducers } from "redux";
import { sneakersReducer } from "./sneakersReducer";
import { userReducer } from "./userReducer";
import { alertReducer } from "./alertReducer";

export const rootReducer = combineReducers({
	currentUser: userReducer,
    sneakers: sneakersReducer,
    alert:alertReducer
});
