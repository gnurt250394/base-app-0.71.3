import { persistStore, persistReducer } from 'redux-persist';
import allReducer from 'middlewares/reducers';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from "redux-logger";
import AsyncStorage from '@react-native-community/async-storage'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [];

middleware.push(thunkMiddleware);

if (__DEV__) {
  middleware.push(logger);
}
export const store = createStore(
  persistReducer(persistConfig, allReducer),
  {},
  compose(applyMiddleware(...middleware)),
);

export const persistor = persistStore(store);
