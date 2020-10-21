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
} from '../actions/actionTypes';

const initialAuthState = {
	user: {},
	error: null,
	isLoggedIn: false,
	inProgress: false,
};

export default function auth(state = initialAuthState, action) {
	switch (action.type) {
		case LOGIN_START:
			return {
				...state,
				inProgress: true,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				isLoggedIn: true,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false,
			};
		case SIGNUP_START:
			return {
				...state,
				inProgress: true,
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				user: action.user,
				inProgress: false,
				isLoggedIn: true,
			};
		case SIGNUP_FAILURE:
			return {
				...state,
				error: action.error,
				isLoggedIn: false,
				inProgress: false,
			};
		case AUTHENTICATE_USER_START:
			return {
				...state,
				isLoggedIn: false,
				inProgress: true,
				error: null,
			};
		case AUTHENTICATE_USER_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				inProgress: false,
				error: null,
				user: action.user,
			};
		case AUTHENTICATE_USER_FAILURE:
			return {
				...state,
				error: action.error,
				inProgress: false,
				user: {},
				isLoggedIn: false,
			};
		default:
			return state;
	}
}
