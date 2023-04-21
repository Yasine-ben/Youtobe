import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkAllVideos, thunkSingleVideo } from '../../store/video';
import ReactPlayer from 'react-player';

import './SingleVideoPage.css'
import { thunkAllComments } from '../../store/comments';

function SingleVideoPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { video_id } = useParams();

    const video = Object.values(useSelector(state => state.videos.singleVideo))[0]
    const allVideos = Object.values(useSelector(state => state.videos.allVideos))
    const user = useSelector(state => state.session.user)
    const comments = Object.values(useSelector(state => state.comments.allComments))
    
    console.log(Object.values(comments))

    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [discription, setDescription] = useState('')
    // add views and createdAt/updatedAt
    // console.log(video)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    function randomInRange(min, max) {
        const SUFFIXES = 'KM'
        let randNum = Math.floor(Math.random() * (max - min + 1) + min);
        let randPicker = Math.floor(Math.random() * (3 - 1 + 1) + 1)
        switch (randPicker) {
            case 1:
                return (randNum + SUFFIXES[0])
            case 2:
                return (randNum + SUFFIXES[1])
            case 3:
                return (randNum.toString())
        }
    }

    //randomizes video order
    allVideos.sort(() => Math.random() - 0.5);



    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (video) {
            setUrl(video.video)
            setTitle(video.title)
            setDescription(video.description)
        }
    }, [video])

    useEffect(() => {
        dispatch(thunkSingleVideo(video_id))
        dispatch(thunkAllVideos())
        dispatch(thunkAllComments(video_id))
    }, [dispatch, user])

    return (
        <div className='VP-Wrapper'>
            <div className='VP-Left-Wrapper'>
                <div className='VP-Player-Wrapper'>
                    <ReactPlayer
                        url={url}
                        controls={true}
                        className='VP-Player'
                        width={1180}
                        height={720}
                    // onEnded={((e) => '')}
                    />
                </div>
                <div className='VP-UnderPlayer-Wrapper'>
                    <div className='VP-Title-Wrapper'>
                        <p className='VP-Title'>{title}</p>
                    </div>
                    <div className='VP-Lower-Wrapper'>
                        <div className='VP-Creator-Wrapper'>

                        </div>
                        <div className='VP-Buttons-Wrapper'>

                        </div>
                    </div>
                </div>
                <div className='VP-DescriptionBox-Wrapper'>
                    <div className='VP-Desc-ViewsAndTime'>
                        <p className='VP-Desc-Views'>{`${randomInRange(1, 100)} views`}&nbsp;</p>
                        <p className='VP-Desc-Time'>1 year ago</p>
                    </div>
                    <div className='VP-Description-Wrapper'>
                        <p className='VP-Description'>{discription}</p>
                    </div>
                </div>
                <div className='VP-Comments-Wrapper'>
                    <div className='VP-AddComments-Wrapper'>
                        <div className='VP-Comments-UserIcon'>
                            <i class="fa-solid fa-circle-user"></i>
                        </div>
                        <div className='VP-InputAndButtons-Wrapper'>
                            <div className='VP-Input-Wrapper'>
                                <input className='VP-Comment-Input' type="text" placeholder='Add a Comment...' id="Comment-Box" name="Comment-Box" required minlength="1" maxlength="10000" />
                            </div>
                            <div className='VP-CommentInputButton-Wrapper'>
                                <div className='VP-Submit'>
                                    <p>Comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='VP-UserComments-Wrapper'>
                        {!comments.status ? comments.map((comment,idx) => (
                            <div key={`Comment_${idx}`} className='VP-Comment-Wrapper'>
                                <div className='VP-UserIcon-Wrapper'>
                                    <i class="fa-solid fa-circle-user"></i>
                                </div>
                                <div className='VP-RightBox-Wrapper'>
                                    <div></div>
                                </div>
                            </div>
                        )) : <div>NONE</div>} 
                    </div>
                </div>
            </div>

            <div className='VP-Right-Wrapper'>
                <div className='VP-Recomended-Wrapper'>
                    {allVideos.map((video, idx) => (
                        <div key={`Recomended_${idx}`} className='VP-Rec-Card-Wrapper'>
                            <div className='VP-Rec-Container'>
                                <div className='VP-Rec-Img-Wrapper'>
                                    <img src={video.thumbnail} alt='recomeneded thumbnail' className='VP-Recomended-Img' />
                                </div>
                                <div className='VP-Rec-Text-Wrapper'>
                                    <div className='VP-Rec-Title-Wrapper'>
                                        <p className='VP-Rec-Title'>{video.title}</p>
                                    </div>
                                    <div className='VP-Rec-Uploader-Wrapper'>
                                        <p className='VP-Rec-Uploader'>{video.uploader}</p>
                                    </div>
                                    <div className='VP-Rec-ViewsAndTime-Wrapper'>
                                        <p className='VP-Rec-Views'>{`${randomInRange(1, 100)} views`}&nbsp;</p>
                                        <p className='VP-Rec-Time'>•&nbsp;1 year ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleVideoPage;