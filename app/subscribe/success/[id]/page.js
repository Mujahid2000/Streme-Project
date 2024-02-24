import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import Link from 'next/link';
const SuccessPageId = async ({ params }) => {
    console.log('params', params)
    const res = await axios.get(`https://endgame-team-server.vercel.app/payments/${params?.id}`)
    const paymentData = await res.data;

    return (
        <Box margin={2} marginTop={6}>
            <Box paddingTop={3} sx={{ maxWidth: '360px', margin: 'auto', color: '#eeeeee', boxShadow: '0px 2px 15px rgba(241, 251, 252, 0.4)', }}>
                <Typography textAlign={'center'} fontSize={20} color={'#51f57d'}>Payment Successfully</Typography>
                <Box marginTop={2} display={'flex'} justifyContent={'center'}><CheckCircleIcon sx={{ color: '#51f57d', fontSize: '50px' }} /></Box>
                <Box margin={3}>
                    <Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography>Payment Type</Typography><Typography>{paymentData?.paymentType}</Typography></Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography>Bank</Typography><Typography>{paymentData?.bank}</Typography></Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography>Mobile</Typography><Typography>{paymentData?.mobile}</Typography></Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography>Email</Typography><Typography>{paymentData?.email}</Typography></Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography marginY={2} fontWeight={700}>Paid Amount</Typography><Typography marginY={2} fontWeight={700}>{paymentData?.amount}</Typography></Box>
                        <Box display={'flex'} justifyContent={'space-between'}><Typography>TransactionId</Typography><Typography>{paymentData?.transactionId?.slice(0, 15)}</Typography></Box>
                    </Box>
                </Box>
                <Box paddingBottom={3} display={'flex'} justifyContent={'center'}>
                    <Link href={"/home"}><Button variant="outlined" className='text-white border-rose-300'>Enjoy Video</Button></Link>
                </Box>
            </Box>
        </Box>

    );
};

export default SuccessPageId;
