import TYPE from "./types";

interface TabState {
    selected: string;
}
const initialState: TabState = {
    selected: "",
};

export default (state: TabState = initialState, action: any) => {
    switch (action.type) {
        case TYPE.SET_SELECTED:
            return {
				...state,
				selected: action.playload
			};
        
        default:
            return state;
    }
};