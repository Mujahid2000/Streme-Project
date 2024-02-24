"use client"
import useUserInfo from '@/hooks/useUser';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Box, Button } from "@mui/material";
import axios from 'axios';


const PaymentBox = ({ packages }) => {
    const userInfo = useUserInfo();
        const handlePayment = () => {
        console.log(packages)
        axios.post(`https://endgame-team-server.vercel.app/payment?email=${userInfo?.email}`, packages)
        .then(res =>{
            console.log(res.data)
            window.location.replace(res.data.url)
        })
        .catch(error =>{
            console.log(error)
        })
    }
    return (
        <Box sx={{ backgroundColor: '#2e2e2e', border: '1px solid', borderColor: 'white', borderRadius: '10px', maxWidth: '500px', height: '150px', margin: 'auto', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
            <Button onClick={handlePayment} sx={{
                marginLeft: '20px',
                color: 'white',
                fontWeight: '600',
                '&:hover': {
                    backgroundColor: '#818080'
                },
                backgroundColor: '#6e6f6f',
            }}><CreditCardIcon sx={{ marginRight: '7px' }} />Pay with SSL</Button>
        </Box>
    );
};

export default PaymentBox;