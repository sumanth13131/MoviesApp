import { legacy_createStore as createStore } from "redux";
import reducer from "./Reducer";

let store = createStore(reducer);
export default store