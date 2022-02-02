export const getToken = () => JSON.parse(localStorage.getItem("token"));
export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	if (token) return true;
	else return false;
};
export const Logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("userData");
	localStorage.removeItem("bidData");
	localStorage.removeItem("code");
};
