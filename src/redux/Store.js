import {combineReducers, configureStore} from '@reduxjs/toolkit';
import reducer from './Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import {persistStore} from 'redux-persist';

const rootReducer = combineReducers({
  users: reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const parsistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: parsistedReducer,
  middleware: getDefulatMiddleware =>
    getDefulatMiddleware({
      serializableCheck: false,
    }),
});

const persistedStore = persistStore(store);

export {store, persistedStore};
