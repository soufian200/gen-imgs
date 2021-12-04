import routes from "../../constants/routes";

const getResetUrl = (_protocol: string, _host: string, _token: string) => `${_protocol}//${_host}${routes.RESETPASSWORD}/${_token}`
export default getResetUrl;