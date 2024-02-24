import PaymentBox from "@/components/Subscribe/PaymentBox";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const PaymentPage = async ({ params }) => {
console.log(params)
    const res = await axios.get(`https://endgame-team-server.vercel.app/packages/${params?.id}`);
    const packages = await res.data;
    console.log(packages)

    
    return (
        <Box margin={2}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{
                    color: 'white',
                    marginTop: '20px'
                }}>Choose payment method</Typography>
            </Box>
            <Typography sx={{
                color: 'white',
                backgroundColor: 'gray',
                width: '300px',
                margin: 'auto',
                textAlign: 'center',
                borderRadius: '10px',
                marginTop: '20px'
            }}>Monthly {packages?.packageName} - {packages?.price} BDT / 1 Month</Typography>
            <PaymentBox packages={packages}/>
        </Box>
    );
};

export default PaymentPage;