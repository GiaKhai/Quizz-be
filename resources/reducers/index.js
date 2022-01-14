import { combineReducers } from "redux";
import userReducers from "./userReducers";
import questionReducers from "./questionReducers";
import planReducers from "./planReducers";
import testListReducers from "./testListReducers";
import resultTestReducers from './getResultTestReducer'
import inFoQuestionReducer from './SendInfoQuestionReducer'
const rootReducer = combineReducers({
    userReducers,
    questionReducers,
    planReducers,
    testListReducers,
    resultTestReducers,
    inFoQuestionReducer
});

export default rootReducer;
