const getResetUrl = (_protocol: string, _host: string, _token: string) => `${_protocol}//${_host}/reset-password/${_token}`
export default getResetUrl;