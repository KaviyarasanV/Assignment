export const getConst = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};
const initialState = localStorage.getItem('userDetails') || '{}';
// console.log('initialState===', initialState);

const Reducer = (state = { payload: JSON.parse(initialState) }, action) => {
    switch (action.type) {
    case getConst.SUCCESS:
        return {
            login: 'success',
            payload: action.payload
        };
    case getConst.ERROR:
        return {
            login: 'fail',
            payload: action.payload
        };
    default:
        return state;
    }
};

export default Reducer; 