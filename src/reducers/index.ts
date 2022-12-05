import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import account from "./account";

import common from "./common";
import tab from "./tab";
const rootReducer = combineReducers({
    tab,
    common,
    account,
});

export type State = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));