// CONSTANTS
const ALL_VIDEOS = 'ALL_VIDEOS'
const SINGLE_VIDEO = 'SINGLE_VIDEO'
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

const normalizeAllVideos = (videos) => {
    let normalize = {};
    videos.forEach(video => {
        normalize[video.id] = video;
    })
    return normalize;
}

// THUNKS
export const thunkAllVideos = () => async dispatch => {
    const response = await fetch('/api/videos/allVideos')

    if (response.ok) {
        const videos = await response.json()
        const normalized = normalizeAllVideos(videos.videos)
        dispatch(actionAllVideos(normalized))
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

export const thunkUploadVideo = () => async dispatch => {
    const response = await fetch(``)

    if(response.ok){
        return
    }
}

// INITIAL 
const initialState = {
    allVideos: {},
    singleVideo: {},
}

// Reducer
const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_VIDEOS:
            return { ...state, allVideos: { ...action.videos } }
        case SINGLE_VIDEO:
            return { ...state, singleVideo: { ...action.video } }
        default: return { ...state }
    }
}

export default videosReducer;