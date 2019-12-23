/*
 * @Author: REFUSE_C
 * @Date: 2019-11-14 15:07:40
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-12-10 20:29:58
 * @Description: 
 */
import { createStore } from 'redux';
import reducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducer)

const store = createStore(myPersistReducer)

export const persistor = persistStore(store)
// const store = createStore(reducer);

export default store;