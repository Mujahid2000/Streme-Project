'use client'
import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
const SubscribePage = () => {
    const [packageData,setPackageData]=useState([]);

    useEffect(()=>{
        axios.get('https://endgame-team-server.vercel.app/packages')
        .then(res =>{
            setPackageData(res.data) 
        })
    },[])

    return (
        <Box sx={{maxWidth: {md: '660px',lg:'1280px'}, margin:{md:'auto'}}}>
            <Grid container>
                {packageData.map(data => <PackageCard key={data._id} data={data} />)}
            </Grid>
        </Box>
    );
};
export default SubscribePage;