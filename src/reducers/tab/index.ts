import { action } from "typesafe-actions";

import reducers from "./reducer";
import TYPE  from "./types";

export const setSelectedTab = (data: string) => (dispatch: any) => {
    dispatch(action(TYPE.SET_SELECTED, data ))
}

export default reducers;