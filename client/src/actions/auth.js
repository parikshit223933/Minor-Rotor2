import { API_URLS } from '../helpers/urls';
import {
	LOGIN_FAILURE,
	LOGIN_START,
	LOGIN_SUCCESS,
	SIGNUP_FAILURE,
	SIGNUP_START,
	SIGNUP_SUCCESS,
} from './actionTypes';
import chalk from 'chalk';
import formurlencoded from 'form-urlencoded';

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
