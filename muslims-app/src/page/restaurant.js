import React,{useState,useEffect} from 'react';
import Appbar from '../component/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import Moment from 'moment';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    width:"350px",
    margin:20,
    height:"300px"
  },
  media: {
    height: 140,
  },
});

function Restaurant () {
  const classes = useStyles();
  const [checkData,setCheckData] = useState([
    {
      placeId: 0,
      placeName: "Khanomwhan Clinic",
      placeOpeningTime: "",
      placeClosingTime: "",
      placeTelno: "",
      placeDescription: "",
      placePriceRange: "",
      placeCarParking: "",
      placePrayerRoom: "",
      placeAirconditioner: "",
      placeReserve: "",
      placeCreditcard: "",
      placeAddress: "",
      placeLinkPage: "",
      placeDate: "2019-09-30T06:38:42.000Z",
      placeTypeId: 1,
      userId: 2,
      status: "Checking",
      imageId: 71,
      imageName: "https://firebasestorage.googleapis.com/v0/b/daily-life-of-muslims.appspot.com/o/posts%2F2%2F3082019%3A1338515-IMG_20190929_192320.jpg?alt=media&token=a021256e-d008-465c-bf25-96291deb9b12"
    }
  ])
  const getData = async () =>{
    const response =  await Axios.get('http://10.4.56.94/checkrestaurant');
    console.log(response.data)
    setCheckData(response.data);
} 

useEffect(()=>{
    getData();
},[]);

    return (
        <div>
          <Appbar/>
          <Grid container direction="row">
            {
              checkData.map( data =>
                <Grid key={data.placeId} item md={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={data.imageName}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                          {data.placeName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Date: {Moment(data.placeDate).format('DD MMM YYYY')}<br/>
                          Status: {data.status}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Link to={"/restaurantDetail/" + data.placeId }>
                        <Button size="small" color="primary">
                          See More Detail
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              )
            }
          </Grid>
        </div>
    );
  }

  export default Restaurant;