import { API_URLS } from '../helpers/urls';
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
} from './actionTypes';
import chalk from 'chalk';
import formurlencoded from 'form-urlencoded';
import JwtDecode from 'jwt-decode';

export const startLogin = () => {
	return {
		type: LOGIN_START,
	};
};
export const loginFailed = (error) => {
	return {
		type: LOGIN_FAILURE,
		error,
	};
};
export const loginSuccess = (user) => {
	return {
		type: LOGIN_SUCCESS,
		user,
	};
};

export const login = (email, password) => {
	return (dispatch) => {
		dispatch(startLogin());
		let url = API_URLS.login();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formurlencoded({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem('token', data.data.token);
					dispatch(loginSuccess(data.data.user));
					dispatch(
						refreshAppliances(
							JwtDecode(localStorage.getItem('token'))._id
						)
					);
					return;
				} else {
					dispatch(loginFailed(data.message));
				}
			})
			.catch((error) => {
				console.log(chalk.redBright.bold(error));
			});
	};
};

export const signUpStart = () => {
	return {
		type: SIGNUP_START,
	};
};
export const signUpFailure = (error) => {
	return {
		type: SIGNUP_FAILURE,
		error,
	};
};
export const signupSuccess = (user) => {
	return {
		type: SIGNUP_SUCCESS,
		user,
	};
};

export const signUp = (name, email, password, confirmPassword) => {
	return (dispatch) => {
		dispatch(signUpStart());
		let url = API_URLS.signUp();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: formurlencoded({ name, email, password, confirmPassword }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					localStorage.setItem('token', data.data.token);
					dispatch(signupSuccess(data.data.user));
					return;
				} else {
					dispatch(signUpFailure(data.message));
				}
			})
			.catch((error) => {
				console.log(chalk.redBright.bold(error));
			});
	};
};

export const authenticateUserStart = () => {
	return {
		type: AUTHENTICATE_USER_START,
	};
};
export const authenticateUserSuccess = (user) => {
	return {
		type: AUTHENTICATE_USER_SUCCESS,
		user,
	};
};
export const authenticateUserFailure = (error) => {
	return {
		type: AUTHENTICATE_USER_FAILURE,
		error,
	};
};
export const authenticateUser = (email, name, _id) => {
	return (dispatch) => {
		dispatch(authenticateUserStart());
		const url = API_URLS.authenticateUser();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: formurlencoded({ name, email, _id }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(authenticateUserSuccess(data.data.user));
					return;
				} else {
					dispatch(authenticateUserFailure('authentication failed!'));
				}
			});
	};
};

export const selectAppliancesStart = () => {
	return {
		type: SELECT_APPLIANCES_START,
	};
};
export const selectAppliancesSuccess = (appliances, user) => {
	return {
		type: SELECT_APPLIANCES_SUCCESS,
		appliances,
		user,
	};
};
export const selectAppliancesFailure = (error) => {
	return {
		type: SELECT_APPLIANCES_FAILURE,
		error,
	};
};
export const selectAppliances = (user_id, appliances) => {
	return (dispatch) => {
		dispatch(selectAppliancesStart());
		let url = API_URLS.selectAppliances();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: formurlencoded({ user_id, selected_appliances: appliances }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						selectAppliancesSuccess(
							data.data.selected_appliances,
							data.data.user
						)
					);
					return;
				}
				dispatch(selectAppliancesFailure(data.message));
			});
	};
};

export const refreshAppliancesStart = () => {
	return {
		type: REFRESH_APPLIANCES_START,
	};
};
export const refreshAppliancesSuccess = (user, appliances) => {
	return {
		type: REFRESH_APPLIANCES_SUCCESS,
		user,
		appliances,
	};
};
export const refreshAppliancesFailure = (error) => {
	return {
		type: REFRESH_APPLIANCES_FAILURE,
		error,
	};
};
export const refreshAppliances = (user_id) => {
	return (dispatch) => {
		dispatch(refreshAppliancesStart());
		let url = API_URLS.getAllApplianceStates();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: formurlencoded({ user_id }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(
						refreshAppliancesSuccess(
							data.data.user,
							data.data.selected_appliances
						)
					);
				} else {
					dispatch(refreshAppliancesFailure(data.message));
				}
			});
	};
};

export const logOutSuccess = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};

export const logOut = () => {
	return (dispatch) => {
		localStorage.removeItem('token');
		dispatch(logOutSuccess());
	};
};

export const updateStateStart = () => {
	return {
		type: UPDATE_STATE_START,
	};
};
export const updateStateSuccess = (appliances) => {
	return {
		type: UPDATE_STATE_SUCCESS,
		appliances,
	};
};
export const updateStateFailure = (error) => {
	return {
		type: UPDATE_STATE_FAILURE,
		error,
	};
};
export const changeState = (obj) => {
	return (dispatch) => {
		dispatch(updateStateStart());
		let url = API_URLS.changeState();
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: formurlencoded(obj),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(updateStateSuccess(data.data.selected_appliances));
				} else {
					dispatch(updateStateFailure(data.message));
				}
			});
	};
};
