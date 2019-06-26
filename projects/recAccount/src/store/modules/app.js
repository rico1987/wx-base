import Cookies from 'js-cookie';

const app = {
    state: {
        language: Cookies.get('language') || 'en',
        accountRoute: 'qrcode',
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            Cookies.set('language', language);
        },
        SET_ROUTE: (state, route) => {
            state.route = route;
        },
    },
    actions: {
        setLanguage({ commit, }, language) {
            commit('SET_LANGUAGE', language);
        },

        setRoute({ commit, }, route) {
            commit('SET_ROUTE', route);
        },
    },
};

export default app;
