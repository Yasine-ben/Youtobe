import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { thunkAllVideos, thunkAllVideosRand, thunkDeleteVideo, thunkSingleVideo, thunkUpdateViews, thunkCreateReaction, thunkDeleteReaction } from '../../store/video';
import normalizeViews from '../../helpers/normalizeViews';
import OpenModalButton from '../OpenModalButton'
import ReactPlayer from 'react-player';
import dayjs from 'dayjs';

import './SingleVideoPage.css'
import { thunkAllComments, thunkCreateComment, thunkDeleteComment, thunkUpdateComment } from '../../store/comments';
import UpdateVideoForm from '../Forms/UpdateVideoForm';
import ToolTipMenu from './ToolTip';
import { subscribe } from '../../store/session';
import { unsubscribe } from '../../store/session';

function SingleVideoPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { video_id } = useParams();
    const wrapperRef = useRef(null);
    //import dayjs from 'dayjs' // ES 2015
    const dayjs = require('dayjs')
    let relativeTime = require('dayjs/plugin/relativeTime')
    dayjs().format()

    dayjs.extend(relativeTime)



    const video = Object.values(useSelector(state => state.videos?.singleVideo))[0]
    const allVideos = Object.values(useSelector(state => state.videos?.allVideos))
    const user = useSelector(state => state.session?.user)
    const comments = Object.values(useSelector(state => state.comments?.allComments))



    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [discription, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)
    const [comment, setComment] = useState('')
    const [commentCardId, setCommentCardId] = useState(null)
    const [disabled, setDisabled] = useState(Boolean(user))
    const [videoErr, setVideoErr] = useState(false)

    const [showMore, setShowMore] = useState(false)

    const [editComment, setEditComment] = useState('')
    const [commentEditOpen, setCommentEditOpen] = useState(false)
    const [editEnabled, setEditEnabled] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null)

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userReaction, setUserReaction] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false)
    const [isSubscribed, setIsSubscribed] = useState(false)

    const [menuOpen, setMenuOpen] = useState(false)

    const [errors, setErrors] = useState({})
    // console.log(menuOpen)
    useEffect(() => {
        // Check if reactions exist
        if (video?.reactions && video?.reactions.length > 0) {
            let likeCount = 0;
            let dislikeCount = 0;
            let userReactionType = null;

            // Count likes and dislikes
            video?.reactions.forEach(reaction => {
                if (reaction.reaction_type === 'like') {
                    likeCount++;
                    if (reaction.user_id === user?.id) {
                        userReactionType = 'like';
                    }
                } else if (reaction.reaction_type === 'dislike') {
                    dislikeCount++;
                    if (reaction.user_id === user?.id) {
                        userReactionType = 'dislike';
                    }
                }
            });

            // Update state variables
            setLikes(likeCount);
            setDislikes(dislikeCount);
            setUserReaction(userReactionType);
        }
    }, [video?.reactions]);

    const handleLike = async () => {
        // Check if the user has already liked the video
        if (user) {
            if (userReaction == 'like') {
                //delete reaction
                await setIsDisabled(true)
                await dispatch(thunkDeleteReaction(user.id, video.id))
                await setUserReaction(null)
                await setLikes(likes - 1)
                await setIsDisabled(false)
            } else if (userReaction == null) {
                //set video reaction to like
                await setIsDisabled(true)
                await dispatch(thunkCreateReaction(user.id, video.id, 'like'))
                await setUserReaction('like');
                await setLikes(likes + 1)
                await setIsDisabled(false)
            } else {
                await setIsDisabled(true)
                await setDislikes(dislikes - 1)
                await setLikes(likes + 1)
                await setUserReaction('like');
                await dispatch(thunkDeleteReaction(user.id, video.id))
                await dispatch(thunkCreateReaction(user.id, video.id, 'like'))
                await setIsDisabled(false)
            }
        }
    };

    const handleDislike = async () => {
        // Check if the user has already disliked the video
        if (user) {
            if (userReaction == 'dislike') {
                // Delete reaction
                await setIsDisabled(true)
                await dispatch(thunkDeleteReaction(user.id, video.id))
                await setUserReaction(null)
                await setDislikes(dislikes - 1)
                await setIsDisabled(false)
            } else if (userReaction == null) {
                // set video reaction to dislike
                await setIsDisabled(true)
                await dispatch(thunkCreateReaction(user.id, video.id, 'dislike'))
                await setUserReaction('dislike');
                await setDislikes(dislikes + 1)
                await setIsDisabled(false)
            } else {
                await setIsDisabled(true)
                await setDislikes(dislikes + 1)
                await setLikes(likes - 1)
                await setUserReaction('dislike');
                await dispatch(thunkDeleteReaction(user.id, video.id))
                await dispatch(thunkCreateReaction(user.id, video.id, 'dislike'))
                await setIsDisabled(false)
            }
        }
    };


    useEffect(() => {
        if (video) {
            setUrl(video.video)
            setTitle(video.title)
            setDescription(video.description)
            setDate(video.updated_at)
            // setIsloaded(true)
        }

    }, [video])
    // console.log(disabled)
    // console.log(dayjs(date).fromNow())

    useEffect(() => {
        const fetchData = async () => {
            setIsLoaded(false);
            await dispatch(thunkSingleVideo(video_id));
            await dispatch(thunkAllVideosRand());
            await dispatch(thunkAllComments(video_id));
            setIsLoaded(true);
        };
        fetchData();
    }, [dispatch, user?.id, history.location])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        const err = {}

        const user_name = user?.username
        const video_id = video?.id
        const user_id = user?.id

        if (comment.length < 1) err.comment = 'Comment must be filled in with at least one character'
        if (comment.length > 1000) err.comment = 'Comment must be 1000 characters or less'

        if (!Object.values(err).length) {
            setErrors(err)
            const data = await dispatch(thunkCreateComment(video_id, user_id, comment, user_name));

            if (data) {
                // console.log('SERVER ERRORS')
                // console.log(data)
            }
            else {
                // console.log("SUBMITTED")
                setComment('')
                return
            }

            return
        } else {
            setErrors(err)
            alert(err.comment)
            // console.log(err)
            // console.log('FRONT END ERROR FRONT END ERROR')
            return
        }
    }

    function openTTMFunc(e) {
        e.preventDefault()
        if (!menuOpen) {
            setMenuOpen(true)
        } else {
            setMenuOpen(false)
        }

    }

    function openMenuFunc(id) {
        if (!commentEditOpen) {
            setCommentEditOpen(true)
            setCommentCardId(id)
        } else {
            setCommentEditOpen(false)
            setCommentCardId(null)
        }

    }
    function videoError() {
        setUrl('https://www.youtube.com/watch?v=YnP94m5pwls')
        setVideoErr(true)
        return
    }

    function editHelper(id, comment) {
        setEditComment(comment)
        setEditCommentId(id)
        setEditEnabled(true)
    }
    // console.log(video)
    const handleEditComment = async (e, comment_id) => {
        e.preventDefault()
        const err = {}
        if (editComment.length < 1) err.comment = 'Comment must be greater than 1 character in length'
        if (editComment.length > 1000) err.comment = 'Comment must be 1000 or less characters in length'

        const video_id = video.id
        // console.log('ERRORS => ', err)
        // console.log('NEW COMMENT DATA => ', editComment)
        if (!Object.values(err).length) {
            setErrors(err)
            const data = await dispatch(thunkUpdateComment(video_id, comment_id, editComment));

            if (data) {
                // console.log('SERVER ERROR')
                // console.log(data)
            }
            else {
                // console.log('COMMENT UPDATED')
                setEditCommentId(null)
                setEditEnabled(false)
                setEditComment('')
                return
            }
        }
        else {
            setErrors(err)
            // console.log('ELSE ELSE')
            return
        }

    }

    function handleCommentDelete(e, comment_id) {
        e.preventDefault()
        const video_id = video?.id
        dispatch(thunkDeleteComment(video_id, comment_id))
        return
    }

    function handleVideoStart() {
        dispatch(thunkUpdateViews(video.id))
    }

    const handleSubscribe = async () => {
        if (user) {
            if (!isSubscribed) {
                await dispatch(subscribe(user.id, video.user_id))
                setIsSubscribed(true)
            } else {
                await dispatch(unsubscribe(user.id, video.user_id))
                setIsSubscribed(false)
            }
        }
    }


    useEffect(() => {
        if (user !== null && video) {
            for (let i = 0; i < user.subscriptions?.length; i++) {
                if (video.user_id == user.subscriptions[i].subscribed_to_id) {
                    setIsSubscribed(true)
                }
            }
        }
    })


    return (
        (!isLoaded) ? <div className='LOADING-SCREEN'></div> :
            (

                <div className='VP-Wrapper'>
                    <div className='VP-Left-Wrapper'>
                        {/* VIDEO PLAYER LEFT */}
                        <div className='player-wrapper' ref={wrapperRef}>
                            <ReactPlayer
                                url={url}
                                controls={true}
                                className="react-player"
                                width={'100%'}
                                height={'100%'}
                                onError={(e) => videoError()}
                                playing={videoErr}
                                onStart={() => handleVideoStart()}
                            // onEnded={((e) => '')
                            />
                        </div>
                        <div className='VP-UnderPlayer-Wrapper'>
                            <div className='VP-Title-Wrapper'>
                                <p className='VP-Title'>{title}</p>
                            </div>
                            <div className='VP-Lower-Wrapper'>
                                <div className='VP-Creator-Left'>
                                    <div className='VP-Creator-Wrapper'>
                                        <div className='VP-Creator-Img-Wrapper'>
                                            <img className='VP-Creator-Img' src={video?.cover_image} alt='creatorImg' />
                                        </div>
                                        <div className='VP-CreatorName-Wrapper'>
                                            <p className='VP-CreatorName'>{video?.uploader}</p>
                                            <p className='VP-Subscribers'>{`${normalizeViews(video?.subscribers?.length)} subscribers`}</p>
                                        </div>
                                    </div>
                                    <div className='VP-Subscribe-Wrapper' onClick={() => { handleSubscribe() }}>
                                        {user && (user.id !== video.user_id) && (
                                            isSubscribed ? (
                                                <p className='VP-Subscribe' style={{ backgroundColor: 'white', color: 'black', cursor:'pointer' }}>Subscribed</p>
                                            ) : (
                                                <p className='VP-Subscribe' style={{cursor:'pointer'}}>Subscribe</p>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className='VP-UserInteration-Wrapper'>
                                    <div className='VP-Reactions-Wrapper' style={{ width: '160px', height: '36px' }}>
                                        <div className='VP-Reactions'>
                                            <div className='VP-Like-Container' onClick={!isDisabled ? handleLike : null} style={{ cursor: 'pointer' }}>
                                                {userReaction == 'like' ?
                                                    <i className="fa-solid fa-thumbs-up" id='like'></i>
                                                    : <i className="fa-regular fa-thumbs-up" id='like'></i>
                                                }
                                                <p className='VP-Like-Count'>{likes}</p>
                                            </div>
                                            <div className='VP-Dislike-Container' onClick={!isDisabled ? handleDislike : null} style={{ cursor: 'pointer' }}>
                                                {userReaction == 'dislike' ?
                                                    <i className="fa-solid fa-thumbs-down" id='dislike' ></i>
                                                    : <i className="fa-regular fa-thumbs-down" id='dislike'></i>
                                                }
                                                <p className='VP-Dislike-Count'>{dislikes}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {menuOpen && user?.id === video?.user_id &&<ToolTipMenu video={video} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
                                    {user?.id === video?.user_id && <div className='VP-ContextMenu-Wrapper' onClick={(e) => openTTMFunc(e)} style={{ cursor: 'pointer' }}>
                                        <div className='VP-ContextMenuIcon' >
                                            <span className="material-symbols-outlined">more_horiz</span>
                                        </div>
                                    </div>}
                                </div>
                                {/* <div className='VP-Buttons-Wrapper'>
                                    {(user?.id === video?.user_id) && (
                                        <div className='VP-Buttons'>
                                            <OpenModalButton
                                                className='VP-UpdateBtn'
                                                buttonText='Update'
                                                modalComponent={<UpdateVideoForm video_id={video_id} />}
                                            />
                                            <div className='VP-DeleteBtn' onClick={(e) => handleDelete(e)}>Delete</div>
                                        </div>
                                    )}
                                </div> */}
                            </div>
                        </div>

                        {showMore ?

                            (<div className='VP-DescriptionBox-Wrapper-Sl'>
                                <div className='VP-Desc-ViewsAndTime-Sl'>
                                    <p className='VP-Desc-Views-Sl'>{`${normalizeViews(video.views)} views`}&nbsp;•&nbsp;</p>
                                    <p className='VP-Desc-Time-Sl'>{dayjs(date).fromNow()}</p>
                                </div>
                                <div className='VP-Description-Wrapper-Sl'>
                                    <p className='VP-Description-Sl'>{discription}</p>
                                </div>
                                <p className='VP-Desc-ShowLess' onClick={(e) => setShowMore(false)}>Show less</p>
                            </div>
                            )
                            :
                            (<div className='VP-DescriptionBox-Wrapper-Sm' onClick={(e) => setShowMore(true)}>
                                <div className='VP-Desc-ViewsAndTime-Sm'>
                                    <p className='VP-Desc-Views-Sm'>{`${normalizeViews(video.views)} views`}&nbsp;•&nbsp;</p>
                                    <p className='VP-Desc-Time-Sm'>{dayjs(date).fromNow()}</p>
                                </div>
                                <div className='VP-Description-Wrapper-Sm'>
                                    <p className='VP-Description-Sm'>{discription}</p>
                                    <p className='VP-Desc-ShowMore'>Show more</p>
                                </div>

                            </div>)
                        }

                        {/* CREATE COMMENT */}
                        <div className='VP-Comments-Wrapper'>
                            <div className='VP-AddComments-Wrapper'>
                                <div className='VP-Comments-UserIcon'>
                                    <i className="fa-solid fa-circle-user"></i>
                                </div>
                                <div className='VP-InputAndButtons-Wrapper'>
                                    <div className='VP-Input-Wrapper'>
                                        <textarea className='VP-Comment-Input' type="text" placeholder='Add a Comment...' value={comment} onChange={(e) => setComment(e.target.value)} disabled={!disabled} id="Comment-Box" name="Comment-Box" required minLength="1" maxLength="1000" />
                                    </div>
                                    <div className='VP-CommentInputButton-Wrapper' onClick={(e) => !disabled ? alert('Please Login or Create a gooo account to comment on this video :)') : handleCommentSubmit(e)}>
                                        <div className='VP-Submit'>
                                            <p className='VP-Submit-Text'>Comment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* USER COMMENTS */}
                            <div className='VP-UC-Main-Wrapper'>

                                {!(comments[1] === 404) ? (

                                    comments?.slice().reverse().map((comment, idx) => (

                                        editEnabled && comment.id === editCommentId ? (


                                            <div className='VP-UC-EditComment-Wrapper' key={`Comment_${idx}`}>
                                                <div className='VP-UC-Icon-Wrapper'>
                                                    <i id='VP-UC-Icon' className="fa-solid fa-circle-user"></i>
                                                </div>
                                                <div className='VP-InputAndButtons-Wrapper'>
                                                    <div className='VP-Input-Wrapper'>
                                                        <textarea className='VP-Comment-Input' type="text" placeholder='Add a Comment...' value={editComment} onChange={(e) => setEditComment(e.target.value)} id="Edit-Comment-Box" name="Edit-Comment-Box" required minLength="1" maxLength="1000" />
                                                    </div>
                                                    <div className='VP-Edit-CommentInputButton-Wrapper' >
                                                        <div className='VP-Cancel' onClick={(e) => setEditEnabled(false)}>
                                                            <p className='VP-Cancel-Text'>Cancel</p>
                                                        </div>
                                                        <div className='VP-Submit' onClick={(e) => handleEditComment(e, comment.id)}>
                                                            <p className='VP-Submit-Text'>Comment</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        ) : (


                                            <div key={`Comment_${idx}`} className='VP-UC-Card-Wrapper'>
                                                <div className='VP-UC-Icon-Wrapper'>
                                                    {/* <i id='VP-UC-Icon' className="fa-solid fa-circle-user"></i> */}
                                                    <img id='VP-UC-Icon' src={comment?.cover_image} alt='userImg' />
                                                </div>
                                                <div className='VP-UC-RightBox-Wrapper'>
                                                    <div className='VP-UC-Commenter-Wrapper'>
                                                        <p className='VP-UC-Commenter'>{comment?.user_name}</p>
                                                        <p className='VP-UC-Time'>{dayjs(comment?.updated_at).fromNow()}</p>
                                                    </div>
                                                    <div className='VP-UC-Comment-Wrapper'>
                                                        <p className='VP-UC-Comment'>{comment?.comment}</p>
                                                    </div>
                                                </div>
                                                {user?.id === comment?.user_id && (
                                                    <div className='VP-UC-OwnerEdit-Wrapper' onClick={(e) => { openMenuFunc(idx) }}>
                                                        <span id='VP-UC-Edit' className="material-symbols-outlined"> more_vert </span>
                                                        {commentEditOpen && commentCardId == idx && (
                                                            <div className='VP-EditMenu-Wrapper'>
                                                                <p className='VP-EditMenu-EditBtn' onClick={(e) => { editHelper(comment.id, comment.comment) }}>Edit</p>
                                                                <p className='VP-EditMenu-DeleteBtn' onClick={((e) => handleCommentDelete(e, comment.id))}>Delete</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    ))
                                ) : (
                                    <div className='VP-UC-NoComments-Wrapper'>
                                        <p className='VP-UC-NoComment-Title'>No Comments Yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    {/* RECOMENDED VIDEOS RIGHT SIDE */}
                    <div className='VP-Right-Wrapper'>
                        <div className='VP-Recomended-Wrapper'>
                            {allVideos?.map((video, idx) => (
                                <div key={`Recomended_${idx}`} className='VP-Rec-Card-Wrapper' onClick={(e) => { history.push(`/Videos/${video.id}`) }}>
                                    <div className='VP-Rec-Container'>
                                        <div className='VP-Rec-Img-Wrapper'>
                                            <img src={video?.thumbnail} alt='recomeneded thumbnail' className='VP-Recomended-Img' />
                                        </div>
                                        <div className='VP-Rec-Text-Wrapper'>
                                            <div className='VP-Rec-Title-Wrapper'>
                                                <p className='VP-Rec-Title'>{video?.title}</p>
                                            </div>
                                            <div className='VP-Rec-Uploader-Wrapper'>
                                                <img className='VP-Rec-Uploader-Img' src={video?.cover_image} alt='' />
                                                <p className='VP-Rec-Uploader'>{video?.uploader}</p>
                                            </div>
                                            <div className='VP-Rec-ViewsAndTime-Wrapper'>
                                                <p className='VP-Rec-Views'>{`${normalizeViews(video.views)} views`}&nbsp;</p>
                                                <p className='VP-Rec-Time'>•&nbsp;{dayjs(video?.updated_at).fromNow()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>)
    )
}

export default SingleVideoPage;
