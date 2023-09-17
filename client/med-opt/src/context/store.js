import React, { createContext, useState } from 'react';
export const Store = createContext();
const StoreContext = ({ children }) => {
    let [user, setUser] = useState('');
    let [baseUrl] = useState('http://localhost:7777');

    let states = {
        userinfo: [user, setUser],
        url: [baseUrl],
    };
    return <Store.Provider value={states}>{children}</Store.Provider>
}
export default StoreContext;