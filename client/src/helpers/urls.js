export const API_ROOT = 'http://18.189.1.174:8000/api/v1';

export const API_URLS = {
	login: () => `${API_ROOT}/auth/sign-in`,
	signUp: () => `${API_ROOT}/auth/sign-up`,
	getStateNames: () => `${API_ROOT}/state/get-state-names`,
	changeState: () => `${API_ROOT}/state/change-state`,
	getAllApplianceStates: () => `${API_ROOT}/state/get-all-appliance-states`,
	authenticateUser:()=>`${API_ROOT}/auth/authenticate-user`,
	selectAppliances:()=>`${API_ROOT}/state/select-appliances`
};
