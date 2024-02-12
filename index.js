const { createStore, combineReducers ,applyMiddleware} = require("redux")
const { default: logger } = require("redux-logger")

const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD_USER = 'ADD_USER'
const ADD_PRODUCT = 'ADD_PRODUCT'
const GET_PRODUCT = 'GET_PRODUCT'

//states
const initialCounterState = {
    count:0
}

const initialUserState ={
    users:['sakib'],
    count:1
}

const initialProductState ={
    products:['rice','salt'],
    count:2
}

//actions
const incrementCounter =()=>{
    return{
        type:INCREMENT
    }
}

const decrementCounter =()=>{
    return{
        type:DECREMENT
    }
}

const addUser =(value)=>{
    return{
        type:ADD_USER,
        payload:value
    }
}

const addProduct = (product)=>{
    return{
        type:ADD_PRODUCT,
        payload:product
    }
}
const getProduct =()=>{
    return{
        type:GET_PRODUCT
    }
}

//reducer
const counterReducer =(state=initialCounterState,action)=>{
    switch(action.type){
        case INCREMENT:
            return{
                ...state,
                count:state.count+1
            }
        case DECREMENT:
                return{
                    ...state,
                    count:state.count-1
                } 
        default:
          return  state   
    }

}
const userReducer = (state=initialUserState,action)=>{
    switch(action.type){
        case ADD_USER:
            return{
                
                users:[...state.users,action.payload],
                count:state.count+1
            }
        default:
           return state    
    }
    
}
const productReducer =(state=initialProductState,action)=>{
    switch(action.type){
        case ADD_PRODUCT:
            return{
                products:[...state.products,action.payload],
                count:state.count+1
            }
        case GET_PRODUCT:
            return {...state}
        default:
            return state
    }
}
const rootReducer = combineReducers({
    counterR:counterReducer,
    userR:userReducer,
    productR:productReducer
})
//stores
const store = createStore(rootReducer,applyMiddleware(logger))

 store.subscribe(()=>{
    console.log(store.getState())
})
//dispatching counter store
// store.dispatch(incrementCounter())
// store.dispatch(incrementCounter())
// store.dispatch(decrementCounter())
// //dispatching users
// store.dispatch(addUser('jahmed'))
// store.dispatch(addUser('joy'))

//dispatiching products from store

store.dispatch(addProduct('sugar'))
store.dispatch(getProduct())
