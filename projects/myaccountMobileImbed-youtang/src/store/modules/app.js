import { getNativeData, saveNativeData, } from '@lib/utils/embedded';

const app = {
    state: {
        language: getNativeData()['language'] || 'en',
    },
    mutations: {
        SET_LANGUAGE: (state, language) => {
            state.language = language;
            let saveData = getNativeData();
            saveData['language'] = language;
            saveNativeData(saveData);
        },
    },
    actions: {
        setLanguage({ commit, }, language) {
            commit('SET_LANGUAGE', language);
        },
    },
};

export default app;
