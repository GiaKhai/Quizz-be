import { combineReducers } from "redux";
import userReducers from "./userReducers";
import questionReducers from "./questionReducers";
import planReducers from "./planReducers";
import testListReducers from "./testListReducers";

const rootReducer = combineReducers({
    userReducers,
    questionReducers,
    planReducers,
    testListReducers,
});

export default rootReducer;
