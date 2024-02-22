import { Avatar, Box, Divider, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import EditIcon from '@mui/icons-material/Edit';
import CommentForm from "./CommentForm";
import { Height } from "@mui/icons-material";
const Comment = ({ comment, replies, currentUserId, deleteComment, updateComment, activeComment, setActiveComment, parentId = null, addComment, handleLike,handleDislike }) => {
    // console.log(comment.like?.length)
    const currentUserLikeMap = comment.like?.find(data => data === currentUserId)
    const currentUserLike = currentUserLikeMap?.length > 0 && currentUserLikeMap?.length;
    // const fiveMinute = 300000;
    // const timePassed = new Date() - new Date(comment.createdAt) > fiveMinute
    const canReply = Boolean(currentUserId);
    const canEdit = currentUserId === comment?.userId;
    const canDelete = currentUserId === comment?.userId;
    const createdAt = new Date(comment?.createdAt).toLocaleDateString();
    const isReplying = activeComment && activeComment.type === "replying" && activeComment.id === comment?._id
    const isEditing = activeComment && activeComment.type === "editing" && activeComment.id === comment?._id
    const replyId = parentId ? parentId : comment?._id;
    return (
        <Box>
            <Box key={comment._id} sx={{ display: 'flex', marginTop: '8px', marginBottom: 2, color: "white" }}>
                <Avatar sx={{ marginTop: 2, width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} alt="Remy Sharp" src={comment?.userImage} />
                <Box sx={{ width: '100%', marginLeft: 3 }}>

                    <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 17 }, marginTop: 2, color: '#828387' }}>{comment.username} <span className='text-xs font-normal'>. {createdAt}</span></Typography>
                    {!isEditing && <Typography display={"block"} marginRight={2} sx={{ fontWeight: 200, fontSize: { xs: 14, sm: 17 }, marginTop: 1, marginBottom: 1, color: 'white' }}>{comment.body}</Typography>}
                    {isEditing && (
                        <Box marginRight={5} marginY={3}>
                            <CommentForm
                                submitLabel="Update"
                                hasCancelButton
                                initialText={comment.body}
                                handleSubmit={(text) => updateComment(text, comment._id)}
                                handleCancel={() => setActiveComment(null)}
                            />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', '& > :not(style)': { marginRight: { xs: '15px', sm: '22px' }, color: '#828387' } }} >
                        {currentUserLike ? <>
                            <Typography onClick={() => handleDislike({ parentId: comment?.parentId, _id: comment._id })} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', fontSize: { xs: 13, sm: 16 }, "&:hover": { color: "rgb(28, 199, 73)" } }}><FavoriteIcon sx={{ color: 'red', marginRight: { xs: 0, sm: 1 }, fontSize: { xs: 19, sm: 22 } }} />{comment.like?.length > 0 ? comment.like?.length : 'Like'}</Typography>
                        </>
                            :
                            <>
                                <Typography onClick={() => handleLike({ parentId: comment.parentId, _id: comment._id })} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', fontSize: { xs: 13, sm: 16 }, "&:hover": { color: "rgb(28, 199, 73)" } }}><FavoriteIcon sx={{ marginRight: { xs: 0, sm: 1 }, fontSize: { xs: 19, sm: 22 } }} />{comment.like?.length > 0 ? comment.like?.length : 'Like'}</Typography>
                            </>}

                        {canReply && <Typography onClick={() => setActiveComment({ id: comment._id, type: 'replying' })} sx={{ alignItems: 'center', fontSize: { xs: 13, sm: 16 }, display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, "&:hover": { color: "rgb(28, 199, 73)" } }}><QuickreplyIcon sx={{ fontSize: { xs: 18, sm: 21 }, marginRight: { xs: 0, sm: 1 } }} />Reply</Typography>}
                        {canEdit && <Typography onClick={() => setActiveComment({ id: comment._id, type: 'editing' })} sx={{ alignItems: 'center', fontSize: { xs: 13, sm: 16 }, display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, "&:hover": { color: "rgb(28, 199, 73)" } }}><EditIcon sx={{ fontSize: { xs: 18, sm: 21 }, display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, marginRight: { xs: 0, sm: 1 } }} />Edit</Typography>}
                        {canDelete && <Typography onClick={() => deleteComment(comment._id)} sx={{ alignItems: 'center', fontSize: { xs: 13, sm: 16 }, display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, "&:hover": { color: "rgb(28, 199, 73)" } }}><DeleteIcon sx={{ fontSize: { xs: 18, sm: 21 }, display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'column', sm: 'row' }, marginRight: { xs: 0, sm: 1 } }} />Delete</Typography>}
                    </Box>
                    {/* Reply Comment Sections...................................... */}
                    {isReplying && (
                        <Box marginRight={5} marginTop={2}>
                            <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId)} />
                        </Box>
                    )}
                    {replies.length > 0 && (
                        <Box>
                            {replies.map(reply => (<Comment key={reply._id}
                                comment={reply}
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment._id}
                                addComment={addComment}
                                handleLike={handleLike}
                                handleDislike={handleDislike}
                            />
                            ))}
                        </Box>
                    )}

                </Box>

            </Box>

        </Box>
    );
};

export default Comment;