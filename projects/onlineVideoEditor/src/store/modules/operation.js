const operation = {
    state: {
        operations: [],
    },
    mutations: {
        PUSH_OPERATION: (state, operation) => {
            state.operations.push(operation);
        },
        POP_OPERATION: (state) => {
            state.operations.pop();
        },
    },
    actions: {
        undo: () => {},
        redo: () => {},
    },
};

export default operation;
