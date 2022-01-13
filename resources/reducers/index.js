import { combineReducers } from "redux";
import userReducers from "./userReducers";
import questionReducers from "./questionReducers";
import planReducers from "./planReducers";
import testListReducers from "./testListReducers";
import resultTestReducers from './getResultTestReducer'
const rootReducer = combineReducers({
    userReducers,
    questionReducers,
    planReducers,
    testListReducers,
    resultTestReducers,
});

export default rootReducer;
