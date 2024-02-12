const axios = require('axios')
const { createStore,applyMiddleware } = require('redux')
const {thunk}=require('redux-thunk')

const GET_TODOS_REQUEST = 'GET_TODOS_REQUEST'
const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'
const GET_TODOS_FAILED = 'GET_TODOS_FAILED'
const TODO_API = 'https://jsonplaceholder.typicode.com/todos'

const initialTodoState = {
    todos: [],
    isLoading: false,
    error: null
}

//actions
const getTodosRequest = () => {
    return {
        type: GET_TODOS_REQUEST
    }
}

const getTodosSuccess = (todos) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload: todos
    }
}

const getTodosFailed = (error) => {
    return {
        type: GET_TODOS_FAILED,
        payload: error
    }

}

//reducers
const todoReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.payload
            }
        case GET_TODOS_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state

    }
}
const fetchTodos = ()=>{
    return (dispatch)=>{
        dispatch(getTodosRequest())
        axios.get(TODO_API)
        .then(res=>{
            console.log(res.data)
            dispatch(getTodosSuccess(res.data))
        })
        .catch(error=>{
            dispatch(getTodosFailed(error.message))
        })

    }
}

//store 
const store = createStore(todoReducer,applyMiddleware(thunk))
store.subscribe(()=>{
    console.log(store.getState())
})

//dispatch action
store.dispatch(fetchTodos())

