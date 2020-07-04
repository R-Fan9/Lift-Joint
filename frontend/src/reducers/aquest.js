import { GET_AQUEST } from '../actions/types.js';


const initialState = []

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_AQUEST:
            return (state=[action.payload]);
        default:
            return state;
    }
}