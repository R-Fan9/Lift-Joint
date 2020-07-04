import { ADD_TAG, GET_TAGS, EDIT_COM, EDIT_ANS, EDIT_QUEST, GET_UPVOTES, MORE_UPVOTE, ADD_UPVOTE, GET_LIKES ,ADD_LIKE, MORE_LIKE, GET_QUESTIONS, DELETE_QUESTION, ADD_QUESTION, GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT, GET_ANSWERS, DELETE_ANSWER, ADD_ANSWER } from '../actions/types.js';


const initialState = {
    questions: [],
    comments: [],
    answers: [],
    likes: [],
    upvotes: [],
    tags: [],
};

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TAGS:
            return {
                ...state,
                tags: action.payload
            };
        case ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, action.payload]
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(question => question.id != action.payload)
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload]
            };
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id != action.payload)
            };
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case GET_ANSWERS:
            return {
                ...state,
                answers: action.payload
            };
        case DELETE_ANSWER:
            return {
                ...state,
                answers: state.answers.filter(answer => answer.id != action.payload)
            };
        case ADD_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload]
            };
        case ADD_LIKE:
            return {
                ...state,
                likes: [...state.likes, action.payload]
            }
        case MORE_LIKE:
            return {
                ...state,
                likes: state.likes.map(like => {
                    if(like.id == action.payload.id){
                        return action.payload
                    }
                    return like
                })
            }
        case GET_LIKES:
            return {
                ...state,
                likes: action.payload
            }
        case ADD_UPVOTE:
            return {
                ...state,
                upvotes: [...state.upvotes, action.payload]
            }
        case MORE_UPVOTE:
            return {
                ...state,
                upvotes: state.upvotes.map(vote => {
                    if(vote.id == action.payload.id){
                        return action.payload
                    }
                    return vote
                })
            }
        case GET_UPVOTES:
            return {
                ...state,
                upvotes: action.payload
            }
        case EDIT_QUEST:
            return {
                ...state,
                questions: state.questions.map(quest => {
                    if(quest.id == action.payload.id){
                        return action.payload
                    }
                    return quest
                })
            }
        case EDIT_ANS:
            return {
                ...state,
                answers: state.answers.map(ans => {
                    if(ans.id == action.payload.id){
                        return action.payload
                    }
                    return ans
                })
            }
        case EDIT_COM:
            return {
                ...state,
                comments: state.comments.map(com => {
                    if(com.id == action.payload.id){
                        return action.payload
                    }
                    return com
                })
            }
        default:
            return state;
    }
}
