"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useEffect } from 'react';
import axios from 'axios';
import useUserInfo from '@/hooks/useUser';
import { useState } from 'react';
import NotifyMessage from './NotifyMessage';
const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openNotification, setOpenNotification] = useState([])
  const [readNotification, setReadNotification] = useState([])
  const [openBox, setOpenBox] = useState(0);
  const [notifyRead, setNotifyRead] = useState(0)
  const userInfo = useUserInfo();
  // console.log(readNotification)
  // console.log(openNotification)



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    axios.patch(`https://endgame-team-server.vercel.app/notifications/openNotify?email=${userInfo?.email}`)
      .then(res => {
        if (res.data) {
          setOpenBox(openBox + 1)
        }
      })
  };
  const handleNotifyRead = (id) => {
    axios.patch(`https://endgame-team-server.vercel.app/notifications/completeRead/${id}?email=${userInfo?.email}`)
      .then(res => {
        if (res.data) {
          setNotifyRead(notifyRead + 1)
          console.log(res.data)
        }
      })
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  // notification box length show
  useEffect(() => {
    if (userInfo?.email) {
      axios.get(`https://endgame-team-server.vercel.app/notifications?email=${userInfo?.email}`)
        .then(res => {
          setOpenNotification(res.data)
        })
    }

  }, [userInfo?.email, openBox])

  //readable notification
  useEffect(() => {
    if (userInfo?.email) {
      axios.get(`https://endgame-team-server.vercel.app/notifications/read?email=${userInfo?.email}`)
        .then(res => {
          setReadNotification(res.data)
        })
    }

  }, [userInfo?.email, notifyRead])
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', position: 'relative', backgroundColor: '#0F172A' }}>
        <Tooltip title="Notification">
          <NotificationsNoneIcon
            onClick={handleClick}
            size="small"
            sx={{ color: 'white' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
          </NotificationsNoneIcon>
          {openNotification.length > 0 && <Typography
            color={'white'}
            bgcolor={'red'}
            borderRadius={30}
            position={'absolute'}
            bottom={10}
            left={15}
            fontSize={13}
            width={20}
            height={20}
          > {openNotification.length > 9 ? '9+' : openNotification.length} </Typography>
          }

        </Tooltip>
      </Box>
      <Menu

        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#1b2743',
            width: { xs: '320px', sm: '440px' },
            height: '500px',

            color: 'white',
            // overflow: '',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 10,
              width: 10,
              height: 10,
              bgcolor: '#1b2743',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ fontSize: 15, fontWeight: 600 }}>
          <NotificationsNoneIcon sx={{ marginRight: 2, fontSize: 20 }} /> Notification ({readNotification.length})
        </MenuItem>
        <Divider />
        {readNotification.map(notify => <NotifyMessage key={notify._id}
          notify={notify}
          handleNotifyRead={handleNotifyRead}
          userInfo={userInfo}
        />

        )}

      </Menu>
    </React.Fragment>
  );
};
export default NotificationMenu;