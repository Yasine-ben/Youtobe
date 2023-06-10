// CONSTANTS
const ALL_VIDEOS = 'ALL_VIDEOS'
const SINGLE_VIDEO = 'SINGLE_VIDEO'
const USER_VIDEOS = 'USER_VIDEOS'
const CREATE_VIDEO = 'CREATE_VIDEO '
const UPDATE_VIDEO = 'UPDATE_VIDEO'
const DELETE_VIDEO = 'DELETE_VIDEO'
const RESET_VIDEOS = 'RESET_VIDEOS'

// ACTION CREATORS
export const actionAllVideos = (videos) => {
    return { type: ALL_VIDEOS, videos }
}

export const actionSingleVideo = (video) => {
    return { type: SINGLE_VIDEO, video }
}

export const actionUserVideos = (videos) => {
    return { type: USER_VIDEOS, videos }
}

const normalizeAllVideos = (videos) => {
    let normalize = {};
    videos.forEach(video => {
        normalize[video.id] = video;
    })
    return normalize;
}

export const thunkUpdateViews = (video_id) => async dispatch => {
    const response = await fetch(`/api/videos/addView/${video_id}`)

    if (response.ok) {
        return
    }
}

// THUNKS
export const thunkAllUserVideos = (user_id) => async dispatch => {
    const response = await fetch(`/api/videos/userVideos/${user_id}`)

    if (response.ok) {
        const videos = await response.json()
        const normalized = normalizeAllVideos(videos.videos)
        dispatch(actionUserVideos(normalized))
        return
    }
}

export const thunkAllVideos = () => async dispatch => {
    const response = await fetch('/api/videos/allVideos')

    if (response.ok) {
        const videos = await response.json()
        const normalized = normalizeAllVideos(videos.videos)
        dispatch(actionAllVideos(normalized))
        return
    }
}

export const thunkAllVideosRand = () => async dispatch => {
    const response = await fetch('/api/videos/allVideos')

    if (response.ok) {
        const videos = await response.json()
        const normalized = normalizeAllVideos(videos.videos)
        //randomizes video order
        const rand = Object.values(normalized).sort((e) => Math.random() - 0.5);
        dispatch(actionAllVideos(rand))
        return
    }
}

export const thunkSingleVideo = (video_id) => async dispatch => {
    const response = await fetch(`/api/videos/${video_id}`)

    if (response.ok) {
        const video = await response.json()
        dispatch(actionSingleVideo(video))
        return
    }
}

export const thunkUploadVideo = (title, description, video, length, thumbnail, uploader, user_id) => async dispatch => {
    const response = await fetch(`/api/videos/createVideo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            video,
            length,
            thumbnail,
            uploader,
            user_id
        }),
    });

    if (response.ok) {
        return dispatch(thunkAllVideos())
    }
}

export const thunkDeleteVideo = (video_id) => async dispatch => {
    const response = await fetch(`/api/videos/deleteVideo/${video_id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(thunkAllVideos())
        return
    }
}

export const thunkEditVideo = (video_id, title, description, thumbnail) => async dispatch => {
    const response = await fetch(`/api/videos/updateVideo/${video_id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            thumbnail,
        }),

    })

    if (response.ok) {
        dispatch(thunkSingleVideo(video_id))
        return
    }
}

export const thunkCreateReaction = (user_id, video_id, reaction_type) => async dispatch => {
    const response = await fetch('/api/reactions/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: user_id,
            video_id: video_id,
            reaction_type: reaction_type,
        })
    });

    if (response.ok) {
        return dispatch(thunkSingleVideo(video_id))
    }
}



// INITIAL 
const initialState = {
    allVideos: {},
    singleVideo: {},
    userVideos: {},
}

// Reducer
const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_VIDEOS:
            return { ...state, allVideos: { ...action.videos } }
        case SINGLE_VIDEO:
            return { ...state, singleVideo: { ...action.video } }
        case USER_VIDEOS:
            return { ...state, userVideos: { ...action.videos } }
        default: return { ...state }
    }
}

export default videosReducer;