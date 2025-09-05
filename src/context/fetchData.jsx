import { createContext } from "react";
import React, { useState, useEffect } from 'react';
import { useCallback } from "react";

export const FetchDataContext = createContext();
export const FetchDataProvider = ({ children }) => {

  const [data, setData] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000');
      const result = await response.json();
      setData(result);
      return result;

    } catch (error) {
      console.error('Error fetching data:', error);
   
    }
  },[]);


  return (
    <FetchDataContext.Provider value={{ data, fetchData }}>
      {children}
    </FetchDataContext.Provider>
  );
}
