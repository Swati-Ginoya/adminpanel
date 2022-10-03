import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { RootReducer } from './reducer/Index';


const persistConfig = {
      key: 'root',
      storage:storage,
      whitelist:['counter']
  }

  const persistedReducer = persistReducer(persistConfig, RootReducer)

export const configurstore = () =>{
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}

