import { GET_ALLQUEST } from '../actions/types';

const initialState = {
    allquest: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALLQUEST:
            return {
                ...state,
                allquest: action.payload
            };
        default:
            return state;
    }

}