"use client";
import { Avatar, Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import axios from "axios";
import Swal from 'sweetalert2';
import useUserInfo from '@/hooks/useUser';

const Comments = ({videoId}) => {
    const [backendComments, setBackendComment] = useState([]);
    const [activeComment, setActiveComment] = useState(null)
    const [data, setData] = useState(0)
    const userInfo = useUserInfo();
    const rootComments = backendComments.filter(backendComment => backendComment.parentId === 'null')
    const date = new Date()
    // const videoId = '123456'
    const user = {
        displayName: userInfo?.userName,
        email: userInfo?.email,
        photoURL: userInfo?.photoURL,
    }
    console.log(backendComments)

    //new comment add
    const addComment = (text, parentId) => {

        console.log('addComment', text, parentId)
        const postComment = {
            body: text,
            username: user.displayName,
            userId: user.email,
            userImage: user.photoURL,
            parentId: parentId ? parentId : "null",
            createdAt: date,
            videoId,
        }
        axios.post('https://endgame-team-server.vercel.app/comments', postComment)
            .then(res => {
                if (res.data.acknowledged) {
                    setData(data + 1)
                }
            })
            .catch(error => {
                console.log(error)
            })

        setActiveComment(null)

    }
    //delete comment
    const deleteComment = (commentId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://endgame-team-server.vercel.app/comments/${commentId}`)
                    .then(res => {
                        console.log(res.data.deletedCount)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setData(data + 1)
                        }
                    })
            }
        });
    }


    //Update Comment 
    const updateComment = (text, commentId) => {
        // updateCommentApi(text, commentId).then(() => {


        axios.patch(`https://endgame-team-server.vercel.app/comments/${commentId}`, { body: text })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    setData(data + 1)
                }
            })

        setActiveComment(null)
        // });
    };
    //reply data 
    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAd).getTime() - new Date(b.createdAd))
    }


    // Like 
    const handleLike = ({ parentId, _id }) => {
        const userLike = user.email
        const like = { parentId, _id, userLike }
        console.log(like)
        axios.patch(`https://endgame-team-server.vercel.app/comment/like`, { like })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    console.log(res.data)
                    setData(data + 1)
                }
            })
            .catch(error => {
                console.log('like', error)
            })
    }
    
    // disLike
    const handleDislike = ({ parentId, _id }) => {
        const userDislike = user.email
        const dislike = { parentId, _id, userDislike }
        console.log(dislike)
        axios.patch(`https://endgame-team-server.vercel.app/comment/dislike`, { dislike })
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    setData(data + 1)
                }
            })
            .catch(error => {
                console.log('like', error)
            })
    }

    //Root Comment Data
    useEffect(() => {
        axios.get(`https://endgame-team-server.vercel.app/comments?videoId=${videoId}`)
            .then(res => {
                setBackendComment(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [data, videoId])


    return (
        <Box maxWidth={'1280px'} margin={'auto'} >
           

            <Box marginX={2} sx={{ color: "white", }}>
            <Box display={'flex'} justifyContent={'end'}>
          
            </Box>
                <Typography marginBottom={3} sx={{ fontSize: { xs: 17, sm: 20 }, fontWeight: 700, color: "white" }}>({backendComments.length})Comments</Typography>
                <Box display={'flex'} justifyContent={'space-between'} marginRight={4} sx={{ color: "white" }}>
                    <Avatar alt="Remy Sharp" src={user.photoURL} />
                    <CommentForm submitLabel="Comment" handleSubmit={addComment} />

                </Box>
                <Divider sx={{ backgroundColor: '#3f3f42', marginLeft: '63px', marginTop: '12px', marginRight: '10px' }} />
                {/* All Comment...................... */}
                {
                    rootComments.map(rootComment => <Box key={rootComment._id}>
                        <Comment
                            comment={rootComment}
                            replies={getReplies(rootComment._id)}
                            currentUserId={user.email}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            handleLike={handleLike}
                            handleDislike={handleDislike}

                        ></Comment>
                        <Divider sx={{ backgroundColor: '#3f3f42', marginLeft: '63px' }} />
                    </Box>
                    )

                }

            </Box>

        </Box>
    );
};

export default Comments;