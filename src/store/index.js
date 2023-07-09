/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import dataContactSlice from './data-contact-slice';
import dataSelectSlice from './data-select-slice';
import storage from 'redux-persist/lib/storage';
import userLoginSlice from './data-user-slice';
import dataFilmSlice from './data-film-slice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	dataContact: dataContactSlice.reducer,
	dataFilm: dataFilmSlice.reducer,
	dataType: dataSelectSlice.reducer,
	userLogin: userLoginSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
