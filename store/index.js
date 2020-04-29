"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.useStore = exports.SnipCartContext = exports.initialState = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = require("react");

var initialState = {
  ready: false,
  userStatus: "SignedOut",
  cartQuantity: 0
}; // create context for dispatch

exports.initialState = initialState;
var SnipCartContext = React.createContext(initialState);
exports.SnipCartContext = SnipCartContext;

var reducer = function reducer(state, action) {
  switch (state, action.type) {
    case "setReady":
      return (0, _extends2.default)({}, state, {}, {
        ready: action.payload
      });

    case "setQuantity":
      return (0, _extends2.default)({}, state, {}, {
        cartQuantity: action.payload
      });

    case "setUserStatus":
      return (0, _extends2.default)({}, state, {}, {
        userStatus: action.payload
      });

    default:
      return state;
  }
};

var useStore = function useStore() {
  var _React$useReducer = React.useReducer(reducer, initialState),
      state = _React$useReducer[0],
      dispatch = _React$useReducer[1]; // update state


  React.useEffect(function () {
    var _window = window,
        Snipcart = _window.Snipcart;

    if (Snipcart && state.ready === true) {
      // update state infos on change
      var listenSnipCart = function listenSnipCart() {
        var _Snipcart$store$getSt = Snipcart.store.getState(),
            customer = _Snipcart$store$getSt.customer,
            cart = _Snipcart$store$getSt.cart; // get quantity in cart


        dispatch({
          type: "setQuantity",
          payload: cart.items.reduce(function (total, item) {
            return total + item.quantity;
          }, 0)
        }); // connected or not

        dispatch({
          type: "setUserStatus",
          payload: customer.status
        });
      }; // listen store update


      var unsubscribe = Snipcart.store.subscribe(listenSnipCart); // call first

      listenSnipCart();
      return function () {
        return unsubscribe();
      };
    }
  }, [state.ready, dispatch]);
  return [state, dispatch];
};

exports.useStore = useStore;