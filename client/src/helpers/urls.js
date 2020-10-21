export const API_ROOT = 'http://localhost:8000/api/v1';

export const API_URLS = {
	login: () => `${API_ROOT}/auth/sign-in`,
	signUp: () => `${API_ROOT}/auth/sign-up`,
	getStateNames: () => `${API_ROOT}/state/get-state-names`,
	changeState: () => `${API_ROOT}/state/change-state`,
	getCurrentState: () => `${API_ROOT}/state/get-current-state`,
	authenticateUser:()=>`${API_ROOT}/auth/authenticate-user`
};
