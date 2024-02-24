"use client"
import { Box, Typography } from '@mui/material';
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import DraftsIcon from '@mui/icons-material/Drafts';
import Link from 'next/link';
const NotifyMessage = ({ notify, handleNotifyRead, userInfo }) => {
    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return date.toLocaleDateString(); // return the full date if it's more than 7 days ago
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    }
    const date = new Date(notify?.notifyPostTime);
    const notifyDate = timeAgo(date);

    const readData = notify?.readeNotify?.find(read => read === userInfo?.email)
    console.log(readData)

    return (

        <Link onClick={() => handleNotifyRead(notify._id)} href={notify.type === "video" ? `http://localhost:3000/videos/${notify.videoId}` : ''}>
            <Box display={'flex'} justifyContent={'space-between'} paddingLeft={2} paddingY={1} marginY={'2px'} gap={3} paddingRight={2} bgcolor={readData ? '#24314f' : '#203a25'} sx={{ '&:hover': { backgroundColor: readData ? '#38476a' : '#395c40' } }}>
                <Box display={'flex'} >
                    <NotificationsNoneIcon sx={{ fontSize: 28, padding: 1, height: { xs: '30px', sm: '50px' }, width: { xs: '30px', sm: '50px' }, borderRadius: '50px', backgroundColor: '#353535', marginRight: '8px', color: readData ? '#ffffff' : '#8ceaa4' }} />

                    <Typography fontSize={15} fontWeight={700} sx={{ width: { xs: '160px', sm: '260px' } }}>
                        {notify.notifyTitle} :
                        <Typography fontSize={13}>
                            {notify.notifyText?.slice(0, 90)}{notify?.notifyText?.length > 90 && '...'}
                        </Typography>
                        <Typography fontSize={10} >
                            {notifyDate}
                        </Typography>
                    </Typography>


                </Box>

                <Box >

                    {notify.type === 'video' ? <Image src={notify.notifyImg} height={30} width={50} alt='image'></Image> : readData ? <DraftsIcon/>:<EmailIcon /> 
                    }

                </Box>
            </Box>
        </Link>
    );
};

export default NotifyMessage;