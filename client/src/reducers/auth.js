import {
	AUTHENTICATE_USER_FAILURE,
	AUTHENTICATE_USER_START,
	AUTHENTICATE_USER_SUCCESS,
	LOGIN_FAILURE,
	LOGIN_START,
	LOGIN_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_START,
	SIGNUP_SUCCESS,
	SELECT_APPLIANCES_FAILURE,
	SELECT_APPLIANCES_START,
	SELECT_APPLIANCES_SUCCESS,
	REFRESH_APPLIANCES_START,
	REFRESH_APPLIANCES_SUCCESS,
	REFRESH_APPLIANCES_FAILURE,
	LOGOUT_SUCCESS,
	UPDATE_STATE_START,
	UPDATE_STATE_SUCCESS,
	UPDATE_STATE_FAILURE,
} from '../actions/actionTypes';

const initialAuthState = {
	user: {},
	error: null,
	isLoggedIn: false,
	inProgress: false,

	appliances: [],
	success: null,
};

export default function auth(state = initialAuthState, action) {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				inProgress: true,
				success: null,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				isLoggedIn: true,
				success: true,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false,
				success: false,
			};
		case SIGNUP_START:
			return {
				...state,
				inProgress: true,
				success: null,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				isLoggedIn: true,
				success: true,
			};
		case SIGNUP_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false,
				success: false,
			};
		case AUTHENTICATE_USER_START:
			return {
				...state,
				isLoggedIn: false,
				inProgress: true,
				error: null,
				success: null,
			};
		case AUTHENTICATE_USER_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				inProgress: false,
				error: null,
				user: action.user,
				success: true,
			};
		case AUTHENTICATE_USER_FAILURE:
			return {
				...state,
				error: action.error,
				inProgress: false,
				user: {},
				isLoggedIn: false,
				success: false,
			};
		case SELECT_APPLIANCES_START:
			return {
				...state,
				error: null,
				success: null,
				inProgress: true,
			};
		case SELECT_APPLIANCES_SUCCESS:
			return {
				...state,
				error: false,
				success: true,
				appliances: action.appliances,
				inProgress: false,
				user: action.user,
			};
		case SELECT_APPLIANCES_FAILURE:
			return {
				...state,
				error: action.error,
				success: false,
				inProgress: false,
			};
		case REFRESH_APPLIANCES_START:
			return {
				...state,
				error: null,
				success: null,
				inProgress: true,
			};
		case REFRESH_APPLIANCES_SUCCESS:
			return {
				...state,
				success: true,
				user: action.user,
				appliances: action.appliances,
				inProgress: false,
			};
		case REFRESH_APPLIANCES_FAILURE:
			return {
				...state,
				success: false,
				error: action.error,
				inProgress: false,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				user: {},
				error: null,
				isLoggedIn: false,
				inProgress: false,
				appliances: [],
				success: true,
			};
		case UPDATE_STATE_START:
				return{
					...state,
					inProgress:true,
					error:false,
					success:false,
				}
		case UPDATE_STATE_SUCCESS:
				return{
					...state,
					inProgress:false,
					success:true,
					appliances:action.appliances
				}
		case UPDATE_STATE_FAILURE:
				return{
					...state,
					inProgress:false,
					error:action.error,
				}
		default:
			return state;
	}
}
