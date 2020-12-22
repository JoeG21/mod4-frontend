import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer'

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// import { createStore } from 'redux';
// import noteReducer from './reducers/noteReducer'

// const store = createStore(
//     noteReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

// export default store;



