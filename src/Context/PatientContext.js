import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';

export const PatientContext = createContext();
export const PatientProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});

    return (
        <PatientContext.Provider
          value={{
            userInfo, 
            setUserInfo
          }}>
          {children}
        </PatientContext.Provider>
      );

};
