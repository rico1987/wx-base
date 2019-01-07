
const app = {
    state: {
        connected: false,
    },
    mutations: {
        SET_CONNECTION_STATE: (state, connected) => {
            state.connected = connected;
        },
    },
    actions: {
        setConnectionState({ commit, }, connected) {
            commit('SET_CONNECTION_STATE', connected);
        },
    },
};

export default app;
