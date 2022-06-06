import { StyleSheet, Text, View } from 'react-native'
import React,{createContext,useState,useEffect} from 'react'
export const ContextIndex = createContext()

const Context = ({children}) => {
  const [items, setitems] = useState([]);
  const fetchNews =async () => {
    try {
      let requestOptions = {
        method: 'GET',
        headers: 'Content-Type: application/json',
      };
      const response = await fetch('http://192.168.88.98:8082/api/products',
      requestOptions)
      const result = await response.json()
      const data = setitems(result.data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchNews()
  } ,[])
  return (
    <ContextIndex.Provider value={{items,setitems,fetchNews}} >
      {children}
    </ContextIndex.Provider>
  )
}

export default Context

const styles = StyleSheet.create({})