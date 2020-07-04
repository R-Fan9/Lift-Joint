import { tokenConfig } from './auth';
import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_TAGS, ADD_TAG, EDIT_COM, EDIT_ANS, EDIT_QUEST, GET_UPVOTES, MORE_UPVOTE, ADD_UPVOTE, GET_LIKES, ADD_LIKE, MORE_LIKE, GET_ALLQUEST, GET_AQUEST ,GET_QUESTIONS, DELETE_QUESTION, ADD_QUESTION, GET_ANSWERS, DELETE_ANSWER, ADD_ANSWER, GET_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from './types';

//GET TAGS
export const getTags = () => dispatch => {
    axios.get("/api/categories/").then(res => {
        dispatch({
            type: GET_TAGS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//ADD TAG
export const addTag = (tag) => dispatch => {
    axios.post("/api/categories/", tag).then(res => {
        dispatch(createMessage({addedTag: "Tag added"}));
        
        dispatch({
            type: ADD_TAG,
            payload: res.data
        });

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//GET ALL QUESTIONS
export const getAllQuestions = () => dispatch => {
    axios.get("/api/all/questions").then(res => {
        dispatch({
            type: GET_ALLQUEST,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//EDIT QUESTION
export const editQuestion = (aquest, qID) => (dispatch, getState) => {
    axios.patch(`/api/questions/${qID}/`, aquest, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ editQuestion: 'Question Edited' }));

        dispatch({
            type: EDIT_QUEST,
            payload: res.data
        });

        dispatch(getAllQuestions())

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

//EDIT ANSWER
export const editAnswer = (ans, aID) => (dispatch, getState) => {
    axios.patch(`/api/answers/${aID}/`, ans, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ editAnswer: 'Answer Edited' }));

        dispatch({
            type: EDIT_ANS,
            payload: res.data
        });

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

//EDIT COMMENT
export const editComment = (com, cID) => (dispatch, getState) => {
    axios.patch(`/api/comments/${cID}/`, com, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ editComment: 'Comment Edited' }));

        dispatch({
            type: EDIT_COM,
            payload: res.data
        });

    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

//GET A QUESTION
export const getAQuestion = (id) => dispatch => {
    axios.get("/api/all/questions/"+id+"/").then(res => {
        dispatch({
            type: GET_AQUEST,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//ADD LIKE
export const addLike = (like, questID, likeID) => (dispatch, getState) => {
    if (likeID === undefined){
        axios.post("/api/likes/", like, tokenConfig(getState)).then(res => {
            dispatch({
                type: ADD_LIKE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }else{
        axios.patch(`/api/likes/${likeID}/`, like, tokenConfig(getState)).then(res => {
            dispatch({
                type: MORE_LIKE,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }

    if(questID === undefined){
        dispatch(getAllQuestions());
    }else{
        dispatch(getAQuestion(questID));
    }
};

// GET LIKES
export const getLikes = () => (dispatch, getState) => {
    axios.get("/api/likes/", tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_LIKES,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//ADD UPVOTE
export const addUpvote = (upvote, questID, voteID) => (dispatch, getState) => {
    if (voteID === undefined){
        axios.post("/api/upvotes/", upvote, tokenConfig(getState)).then(res => {
            dispatch({
                type: ADD_UPVOTE,
                payload: res.data
            });
            dispatch(getAQuestion(questID));
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }else{
        axios.patch(`/api/upvotes/${voteID}/`, upvote, tokenConfig(getState)).then(res => {
            dispatch({
                type: MORE_UPVOTE,
                payload: res.data
            });
            dispatch(getAQuestion(questID));
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    }
};

// GET UPVOTES
export const getUpvotes = () => (dispatch, getState) => {
    axios.get("/api/upvotes/", tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_UPVOTES,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


// GET QUESTIONS
export const getQuestions = () => (dispatch, getState) => {
    axios.get("/api/questions/", tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_QUESTIONS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE QUESTION
export const deleteQuestion = (id) => (dispatch, getState) => {
    axios.delete('/api/questions/'+id+'/', tokenConfig(getState)).then(res => {
        dispatch(createMessage({ deleteQuestion: 'Question Deleted' }));
        
        dispatch({
            type: DELETE_QUESTION,
            payload: id
        });
    }).catch(err => console.log(err));
};

//ADD QUESTION
export const addQuestion = (aquest) => (dispatch, getState) => {
    console.log(aquest);
    axios.post("/api/questions/", aquest, tokenConfig(getState)).then(res => {
        dispatch(createMessage({ addQuestion: 'Question Added' }));

        dispatch({
            type: ADD_QUESTION,
            payload: res.data
        });

        dispatch(getAllQuestions());
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};


// GET ANSWERS
export const getAnswers = () => (dispatch, getState) => {
    axios.get("/api/answers/", tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_ANSWERS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE ANSWER
export const deleteAnswer = (id) => (dispatch, getState) => {
    axios.delete('/api/answers/'+id+'/', tokenConfig(getState)).then(res => {
        dispatch(createMessage({ deleteAnswer: 'Answer Deleted' }));
        
        dispatch({
            type: DELETE_ANSWER,
            payload: id
        });
    }).catch(err => console.log(err));
};

//ADD ANSWER
export const addAnswer = ({ answer, questions, picture }, questID) => (dispatch, getState) => {

    if (picture === null){
        const body = JSON.stringify({ answer, questions });
        axios.post("/api/answers/", body, tokenConfig(getState)).then(res => {
            dispatch({
                type: ADD_ANSWER,
                payload: res.data
            });
    
            dispatch(getAQuestion(questID));
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    }else{
        const token = getState().auth.token;
        const bodyFormData = new FormData();
        bodyFormData.set('answer', answer);
        bodyFormData.set('questions', questions[0]);
        bodyFormData.append('picture', picture);

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
    
        if (token) {
            config.headers["Authorization"] = `Token ${token}`
        };

        axios.post("/api/answers/", bodyFormData, config).then(res => {
            dispatch({
                type: ADD_ANSWER,
                payload: res.data
            });
    
            dispatch(getAQuestion(questID));
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    }
};

// GET COMMENTS
export const getComments = () => (dispatch, getState) => {
    axios.get("/api/comments/", tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//DELETE COMMENT
export const deleteComment = (id) => (dispatch, getState) => {
    axios.delete('/api/comments/'+id+'/', tokenConfig(getState)).then(res => {
        dispatch(createMessage({ deleteComment: 'Comment Deleted' }));
        
        dispatch({
            type: DELETE_COMMENT,
            payload: id
        });
    }).catch(err => console.log(err));
};

//ADD COMMENT
export const addComment = ({ comment, answers }, questID) => (dispatch, getState) => {
    const body = JSON.stringify({ comment, answers });
    axios.post("/api/comments/", body, tokenConfig(getState)).then(res => {
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });
        dispatch(getAQuestion(questID));
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
