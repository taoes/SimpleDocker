export default {
    state: {
        currentMenuKey: []
    },
    mutations: {
        setCurrentMenuKey: function (state, payload) {
            state.currentMenuKey = [payload]
        }
    }

};


