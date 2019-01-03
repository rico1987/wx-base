const timeline = {
    state: {
        items: [],
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.items.push(item);
        },
        RESET_ITEMS: (state) => {
            state.items = [];
        },
    },
    actions: {
    },
};

export default timeline;
