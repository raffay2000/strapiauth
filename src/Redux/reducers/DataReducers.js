import { 
    SET_SOURCE,
    FETCH_API_SOURCE,
    SET_IS_LOADING
} from "../constants";

const initailstate = {
    source: '',
    items:[],
    loading: false,
}

export default (state = initailstate,action)=> {
    switch (action.type){
        case SET_SOURCE:
            return {
                ...state,
                source: action.payload,

            }
        case FETCH_API_SOURCE:
            return {
                ...state,
                items: action.payload,

            }
        // case SET_IS_LOADING:
        //     return {
        //       ...state,
        //       isLoading:action.payload
        //     }
        default:
            return state;
    }
}