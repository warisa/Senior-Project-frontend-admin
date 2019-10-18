import React,{ useState, useEffect} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Store from '@material-ui/icons/Store';
import Typography from '@material-ui/core/Typography';
import Description from '@material-ui/icons/Description';
import LocationCity from '@material-ui/icons/LocationCity';
import AccessTime from '@material-ui/icons/AccessTime';
import WatchLater from '@material-ui/icons/WatchLater';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Call from '@material-ui/icons/Call';
import Language from '@material-ui/icons/Language';
import Appbar from '../component/Appbar';
import "../css/restaurantDetail.css"
import Axios from 'axios';
import { Button } from '@material-ui/core';

import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin:50,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
      marginRight:100
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }),
);

function RestaurantDetail()  {
    const classes = useStyles();
    let { id } = useParams();
    const [restaurantDetail,setRestaurantDetail] = useState(
        {
            placeId: 29,
            placeName: "Home Cuisine Lslamic Restaurant",
            placeOpeningTime: "11:00:00",
            placeClosingTime: "21:30:00",
            placeTelno: "0891292006",
            placeDescription: "Indian Restaurant",
            placePriceRange: "100-150 Baht",
            placeCarParking: 0,
            placePrayerRoom: 1,
            placeAirconditioner: 1,
            placeReserve: 0,
            placeCreditcard: 0,
            placeAddress: "186 Chareonkrung 36 Bangrak Bangkok",
            placeLinkPage: "",
            placeDate: "2019-09-30T06:38:42.000Z",
            latitude: 13.51214,
            longitude: 0,
            placeTypeId: 1,
            userId: 2,
            status: "Checking",
            imageId: 71,
            imageName: "https://firebasestorage.googleapis.com/v0/b/daily-life-of-muslims.appspot.com/o/posts%2F2%2F3082019%3A1338515-IMG_20190929_192320.jpg?alt=media&token=a021256e-d008-465c-bf25-96291deb9b12"
        }
      )

      const getDetail = async () =>{
        const response =  await Axios.get('http://10.4.56.94/placeDetail/'+ id);
        console.log(response.data)
        setRestaurantDetail(response.data[0]);
      } 

      useEffect(()=>{
        getDetail();
      },[]);

    return (
        <div>
        <Appbar/>
        <Container maxWidth="md">
          <List className={classes.root}>
            <ListItem >
              <Typography className={classes.heading}> <Store /> &nbsp; Name: </Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeName}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}><Description/> &nbsp; Description:</Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeDescription}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}><LocationCity/> &nbsp; Address:</Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeAddress}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <AccessTime/> Opening time:</Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeOpeningTime}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <WatchLater/> Closing time:</Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeClosingTime}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <MonetizationOn/> Price Range: </Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placePriceRange}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <Call/> Phone Number: </Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeTelno}</Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <Language/> Link Page: </Typography>
              <Typography className={classes.secondaryHeading}>{restaurantDetail.placeLinkPage}</Typography>
            </ListItem>
            <Divider/>
          </List>
        </Container>
        <center>
            <Button variant="contained" color="secondary" style={{margin:20}}>
                Delete
            </Button>
            <Button variant="contained" color="primary">
                Submit
            </Button>
        </center>
      </div>
    );
  
    }
  export default RestaurantDetail;