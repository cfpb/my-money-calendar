import React, { createContext, useContext } from 'react';
import RootStore from './root-store';

const store = new RootStore();
const StoreContext = createContext( null );

export const StoreProvider = ( { children,  storeOverride} ) => {
    const usedStore = storeOverride ? storeOverride : store
    return (<StoreContext.Provider value={usedStore}>{children}</StoreContext.Provider>)
};
export const StoreConsumer = StoreContext.Consumer;

export const useStore = () => useContext( StoreContext );

export default StoreContext;
