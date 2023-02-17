import { applyMiddleware, createStore } from "redux";
import RootReducer from "./Reducer/reducer";
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    timeout: 2000, 
    key: "root",
    storage,
    stateReconciler: hardSet,
  };
  
  const persistedReducer = persistReducer(persistConfig, RootReducer);
  
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  persistStore(store);
  export default store;