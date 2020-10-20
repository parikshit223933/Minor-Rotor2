import { API_URLS } from '../helpers/urls';
import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
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
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formurlencoded({ email, password })
        })
			.then((data) => {
				if (data.success) {
					localStorage.setItem('token', data.data.user);
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
