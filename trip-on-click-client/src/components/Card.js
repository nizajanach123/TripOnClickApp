import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import '@fontsource/public-sans';
import NoSsr from '@material-ui/core/NoSsr';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Card.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@material-ui/core";
import {
    Info,
    InfoCaption,
    InfoSubtitle,
    InfoTitle,
} from '@mui-treasury/components/info';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useGalaxyInfoStyles } from '@mui-treasury/styles/info/galaxy';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import axios from "axios";

const useStyles = makeStyles(() => ({
    card: {
        borderRadius: '1rem',
        boxShadow: 'none',
        position: 'relative',
        minWidth: 200,
        minHeight: 250,
        height: 15,
        width: 15,
       
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: '64%',
            bottom: 0,
            zIndex: 1,
            background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
        },
    },
    content: {
        position: 'absolute',
        zIndex: 2,
        bottom: 0,

        width: '100%',

    },
}));

export const GalaxyCardDemo = React.memo(function GalaxyCard(props) {
    let tripId = props.id;
    const styles = useStyles();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [trip, setTrip] = useState(null);
   
    const fetchTrip = async () => {
        const {data} = await axios.get(`http://localhost:8080/trips/${tripId}`);
        console.log(data)
        setTrip(data);
    }

    useEffect(()=>{
        if(trip === null){
            return;
        }
        navigate('/DayByDay', {state: {data: trip}});
    },[trip])

    return (
        <>
            <NoSsr>
                <GoogleFontLoader
                    fonts={[
                        { font: 'Arial, Helvetica, sans-serif', weights: [300] },
                        { font: 'Arial, Helvetica, sans-serif', weights: [200, 400, 700] },
                    ]}
                />
            </NoSsr>
         
        <div>
          <Card className={styles.card} id='back' >
            <div className='iconsDiv'>
            <div className='iconsPosition'>
            <PageviewIcon  color="action"  onClick={() => fetchTrip()} style={{ cursor: 'pointer' }} ></PageviewIcon>
            {/* <DeleteOutlineIcon  className='buttondel' onClick={() => props.func(tripId)} style={{ cursor: 'pointer' }} /> */}
            <DeleteIcon  color ="action" onClick={() => props.func(tripId)} fontSize="medium" style={{ cursor: 'pointer' }}/>
            </div>
            </div>
            <div>
               
                <div>
                    <img src={props.img}
                        alt='image' />
                </div>
            </div>
            <div>
                <Box py={3} px={2} className={styles.content} >
                    <Info useStyles={useGalaxyInfoStyles}  >
                        <InfoSubtitle>{props.header}</InfoSubtitle>
                        <InfoTitle>{props.middel}</InfoTitle>
                        <InfoCaption>{props.footer}</InfoCaption>
                    </Info>
                </Box>
            </div>
            </Card>
         </div>
        </>
    );
});
export default GalaxyCardDemo