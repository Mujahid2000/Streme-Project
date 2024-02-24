"use client"
import SubscribePage from "@/components/Subscribe/SubscribePage";
import { Box, Typography } from "@mui/material";

const SubscribeUser = () => {


    return (
        <Box sx={{ textAlign: 'center', maxWidth: '1280px', margin: 'auto' }}>
            <Typography sx={{ color: 'white', fontSize: '40px' }}>CHOOSE A PLAN </Typography>
            <Typography sx={{ color: 'white' }}>AND ENJOY ALL VIDEO PREMIUM CONTENTS</Typography>
            <SubscribePage />
        </Box>
    );
};
export default SubscribeUser;


