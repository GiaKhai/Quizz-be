import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import Routes from "../../router";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../reducers/index";
import Routerurl from "../../router/RouterURL";



const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
);
window.store = store;

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routerurl/>
                </div>
            </Router>
        </Provider>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
