import { createStore, createLogger } from "vuex";

import storeCore from './stores/store.core.js';

const debug = process.env.NODE_ENV !== 'production'
export default createStore({
    strict: debug,
    plugins: debug ? [createLogger()] : [],
    modules: {
        storeCore
    },
});
