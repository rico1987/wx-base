const getters = {
    language: state => state.app.language,
    api_token: state => state.user.api_token,
    identity_token: state => state.user.identity_token,
    userInfo: state => state.user.userInfo,
    errorLogs: state => state.errorLog.logs,
};
export default getters;
