import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./components/App";
// import movies from "./reducers";
import rootReducer from "./reducers";

// function(logger (obj,next,action))
// below is a curried function
// logger(obj){next}{action }

// const logger = function ({ dispatch, getState }) {
//   return function (next) {
//     return function (action) {
//       // middleware code
//       console.log("ACTION_TYPE=", action.type);
//       next(action);
//     };
//   };
// };

// for example a function return like this ------ f(k)=>()=>() return we write above code like this

const logger = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action !== "function") {
    console.log("ACTION_TYPE=", action.type);
  }
  next(action);
};
// const thunk = ({dispatch,getState}) => (next) =>(action)=>{
//   if(typeof action ==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

console.log("store", store);

export const StoreContext = createContext();
console.log("StoreContext", StoreContext);

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
// // const connectedAppCOmponent = connect(callback)(app);
// export function connect(callback) {
//   return function (Component) {
//     return class ConnectedComponent extends React.Component {
//       render() {
//         return (
//           <StoreContext.Consumer>
//             {(store) => {
//               const state = store.getState();
//               const dataToBePassedAsProps = callback(state);
//               return <Component movies={movies} search={search} dispatch={store.dispatch}/>;
//             }}
//           </StoreContext.Consumer>
//         );
//       }
//     };
//   };
// }

// console.log("BEFORE_STATE", store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "Superman" }],
// });

// console.log("AFTER_STATE", store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
