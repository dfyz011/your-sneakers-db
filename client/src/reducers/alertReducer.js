import {
	CLOSE_ALERT,
	OPEN_ALERT
	
} from "../constants/alert";

const initialState = {
    message:{
        type:"",
        text:""
    },
    setAlertOpen:false
};

export function alertReducer(state = initialState, action) {
	switch (action.type) {
		case CLOSE_ALERT:
			return {
                ...state,
                message:{},
                setAlertOpen:false
			};
		case OPEN_ALERT:
			return {
                ...state,
                setAlertOpen:true,
                message:action.payload.message
			};
		default:
			return state;
	}
}
