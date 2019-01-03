import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import timeline from './modules/timeline';
import operation from './modules/operation';
import errorLog from './modules/errorLog';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        timeline,
        operation,
        errorLog,
    },
    getters,
});

export default store;
