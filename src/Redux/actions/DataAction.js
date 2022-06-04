import {FETCH_API_SOURCE,SET_IS_LOADING} from "../constants"
import axios from 'axios'
export const fetchApiSource =(source)=>{
    return async function (dispatch){
      const data = await fetch(source,{
        method: 'GET',
        headers: 'Content-Type: application/json',
      })
      dispatch({
          type:FETCH_API_SOURCE,
          payload:data
        })
    }
  }
  export const setIsLoading=(ur)=>{
    return{
      type:SET_IS_LOADING,
      payload:ur
    }
  }