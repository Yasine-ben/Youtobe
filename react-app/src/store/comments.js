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

const combineAllComments = async (data) => {
    let commentsWithCoverImage = []

    // console.log(data)
    for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        const user = data.users.find(user => user.id === comment.user_id);

        if (user) {
            commentsWithCoverImage.push({
                ...comment,
                cover_image: user.cover_image
            });
        }
    }
    return commentsWithCoverImage
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
            // console.log('HERE')
            let combined = await combineAllComments(comments)
            // console.log(combined)
            const normalize = normalizeAllComments(combined)
            dispatch(actionAllComments(normalize))
            // console.log('COMMENTS COMMENTS COMMENTS COMMENTS')
            return
        }
    }
}

export const thunkCreateComment = (video_id, user_id, comment, user_name) => async dispatch => {
    const response = await fetch(`/api/comments/createComment/${user_id}/${video_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment,
            user_name
        }),
    })

    if (response.ok) {
        dispatch(thunkAllComments(video_id))
        console.log('/////////COMMENT CREATED///////////////')
        return
    }

}

export const thunkUpdateComment = (video_id, comment_id, comment) => async dispatch => {
    const response = await fetch(`/api/comments/updateComment/${comment_id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            comment
        }),
    })

    if(response.ok){
        dispatch(thunkAllComments(video_id))
        console.log('/////////COMMENT UPDATED///////////////')
        return
    }
}

export const thunkDeleteComment = (video_id, comment_id) => async dispatch => {
    const response = fetch(`/api/comments/deleteComment/${comment_id}`, {
        method:'DELETE'
    })

    if(response.ok){
        dispatch(thunkAllComments(video_id))
        console.log('/////////////COMMENT DELETED///////////////')
        return
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