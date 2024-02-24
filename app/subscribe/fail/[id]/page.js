import { Box, Button, Typography } from '@mui/material';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Link from 'next/link';
import React from 'react';

const PaymentFail = () => {
    return (
        <Box margin={2} marginTop={6}>
            <Box paddingTop={3} sx={{ maxWidth: '360px', margin: 'auto', color: '#eeeeee', boxShadow: '0px 2px 15px rgba(241, 251, 252, 0.4)', }}>
                <Typography textAlign={'center'} fontSize={20} color={'#e1e1e1'}>Oh,Your Payment Fail</Typography>
                <Box marginTop={2} display={'flex'} justifyContent={'center'}><MoodBadIcon sx={{ color: '#f95c5c', fontSize: '50px' }} /></Box>
                <Box>
                    <Typography textAlign={'center'} marginY={3} color={'#e1e1e1'}>
                        Don't Worry. We'll try your payment <br /> again over the next few days.
                    </Typography>
                </Box>
                <Box paddingBottom={3} display={'flex'} justifyContent={'center'}>
                    <Link href={"/subscribe"}><Button variant="outlined" className='text-white border-rose-300 mt-10'>Go Back Payment</Button></Link>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentFail;