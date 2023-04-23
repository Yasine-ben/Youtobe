// CONSTANTS
const ALL_COMMENTS = 'ALL_COMMENTS'
const CREATE_COMMENT = 'CREATE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

// ACTION CREATORS
export const actionAllComments = (comments) => {
    return { type: ALL_COMMENTS, comments }
}

// THUNKIES
const normalizeAllComments = (comments) => {
    let normalize = {};
    // console.log('............................', comments)
    comments.forEach(comment => {
        normalize[comment.id] = comment;
    })
    return normalize;
}

export const thunkAllComments = (video_id) => async dispatch => {
    const response = await fetch(`/api/comments/allComments/${video_id}`)

    if (response.ok) {
        const comments = await response.json()
        if (comments.status === 404) {
            dispatch(actionAllComments(comments))
            // console.log('NO COMMENTS NO COMMENTS NO COMMENTS')
            return
        }
        else {
            const normalize = normalizeAllComments(comments.comments)
            dispatch(actionAllComments(normalize))
            // console.log('COMMENTS COMMENTS COMMENTS COMMENTS')
            return
        }
    }
}

// INITIAL 
const initialState = {
    allComments: {}
}

// REDUCERS
const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COMMENTS:
            return { ...state, allComments: { ...action.comments } }
        default: return { ...state }
    }
}

export default commentReducer;