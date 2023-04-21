// CONSTANTS
const All_COMMENTS = 'ALL_COMMENTS'
const CREATE_COMMENT = 'CREATE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// ACTION CREATORS
export const actionAllComments = (comments) => {
    return { type: All_COMMENTS, comments }
}

// THUNKIES
export const thunkAllComments = (video_id) => async dispatch => {
    const response = await fetch(`/api/comments/allComments/${video_id}`)

    if(response.ok){
        const comments = await response.json()
        dispatch(actionAllComments(comments))
        return
    }
} 

// INITIAL 
const initialState = {
    allComments: {}
}

// REDUCERS
const commentReducer = (state = initialState, action) => {
    switch (action.type){
        case All_COMMENTS:
            return { ...state, allComments: { ...action.comments } }
        default: return { ...state }
    }
}

export default commentReducer;