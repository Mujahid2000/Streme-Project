import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Link, ListItemText, Typography } from "@mui/material";
import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
const packageCard = ({ data }) => {

    const bgColor = data.packageName === 'Free' && '#A8B6B6' ||
        data.packageName === 'Basic' && '#72A4A4' ||
        data.packageName === 'Standard' && '#3865FD' ||
        data.packageName === 'Premium' && '#0F254E';
    const bgColorCardBody = data.packageName === 'Free' && '#c8d2d2' ||
        data.packageName === 'Basic' && '#8fc2c2' ||
        data.packageName === 'Standard' && '#587efb' ||
        data.packageName === 'Premium' && '#1d3666';
    const btnBgColor = data.packageName === 'Free' && '#8fc2c2' ||
        data.packageName === 'Basic' && '#1d3666' ||
        data.packageName === 'Standard' && '#c8d2d2' ||
        data.packageName === 'Premium' && '#587efb';


    return (
        <Grid key={data._id} lg={3} sm={6} xs={12} >
            <Card item sx={{ backgroundColor: bgColor, margin: '10px', maxWidth: '300px', marginX: 'auto' }}>
                <Box sx={{ backgroundColor: bgColor, borderRadius: '16px', color: data.packageName === 'Free' ? 'black' : 'white' }}>
                    <Typography variant='h6' sx={{ whiteSpace: "pre-wrap" }}>
                        {data.packageName}
                    </Typography>
                    <Typography variant='h3' sx={{ fontWeight: '600' }}>
                        <Typography variant="span" sx={{ fontSize: '16px', marginRight: '3px' }}>BDT</Typography>{data.price}
                    </Typography>
                </Box>


                <CardContent sx={{ textAlign: 'left', padding: '20px', backgroundColor: bgColorCardBody, color: data.packageName === 'Free' ? 'black' : 'white' }}>
                   
                    <Typography gutterBottom variant="p" component="div">
                        {data.feature1Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature1}
                    </Typography>
                    <Divider />

                    <Typography gutterBottom variant="p" component="div">
                    {data.feature2Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature2}
                    </Typography>
                    <Divider />

                    <Typography gutterBottom variant="p" component="div">
                    {data.feature3Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature3}
                    </Typography>
                    <Divider />

                    <Typography gutterBottom variant="p" component="div">
                    {data.feature4Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature4}
                    </Typography>
                    <Divider />
                    
                    <Typography gutterBottom variant="p" component="div">
                        {data.feature5Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature5}
                    </Typography>
                    <Divider />

                    <Typography gutterBottom variant="p" component="div">
                       {data.feature6Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />}  {data.feature6}
                    </Typography>
                    <Divider />
                    
                    <Typography gutterBottom variant="p" component="div">
                        {data.feature7Benefit ? <CheckCircleIcon sx={{ color: 'green' }} />:<CloseIcon sx={{ color: 'red' }} />} {data.feature7}
                    </Typography>


                </CardContent>
                <Box sx={{ paddingBottom: '8px', backgroundColor: bgColorCardBody }}>
                    <Link href={data.packageName === 'Free'? '/home': `/subscribe/${data._id}`}><Button variant="contained" style={{ backgroundColor: btnBgColor, color: data.packageName === 'Standard' ? 'black' : 'white' }} >Continue Plan</Button></Link>
                </Box>
            </Card>
        </Grid>
    );
};

export default packageCard;