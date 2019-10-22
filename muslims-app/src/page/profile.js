import React,{useState,useEffect} from 'react';
import Appbar from '../component/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Avatar, Button } from '@material-ui/core';
import Axios from 'axios';
import { id } from 'postcss-selector-parser';

const useStyles = makeStyles({
    card: {
      width:"350px",
      margin:20,
      height:"500px",
      backgroundColor:"#DCDCDC"
    },
    media: {
      height: 140,
    },
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
      },
  });
  

function Profile() {
    const classes = useStyles();
      const [userData,setUserData] = useState(
          {
              userId: 0,
              userEmail: "example",
              userFName: "",
              userImage: "",
              userLName: ""
          }
      )
  
      const getUser = async()=>{
          var user = localStorage.getItem("userId");
          const response = await Axios.get('http://10.4.56.94/profile/' + user);
          console.log(response)
          setUserData(response.data[0]);
      } 

      useEffect(()=>{
        getUser();
    },[]);

    return (
        <div>
        <Appbar/>
            <Container maxWidth="sm">
                <center>
                <Card className={classes.card}>
                  {/* <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://pbs.twimg.com/media/EBGi39lUwAAwCzV.jpg"
                      image="http://www.daradaily.com/content/news/photo-62485.jpg"
                      title="Contemplative Reptile"
                    /> */}
                    <CardContent>
                        <Typography>
                            <center><Avatar src={userData.userImage} className={classes.bigAvatar}/></center>
                        </Typography>
                      <Typography gutterBottom variant="h6" component="h6">
                        <center>{userData.userFName} {userData.userLName}</center>
                      </Typography>
                      <Typography variant="body2" color="initial" component="p">
                        <center>nutty_barbies@hotmail.com<br/></center>
                      </Typography>
                      <Typography variant="body2" color="textPrimary" component="p">
                        <center><h4 style={{backgroundColor:"#FFCC66",width:70,height:20,padding:1 ,borderRadius: 63}}>ADMIN</h4></center>
                      </Typography>
                      <Button variant="contained" color="primary" onClick={()=>{localStorage.clear(); window.location.replace("/login");}}>
                        Logout
                      </Button>
                    </CardContent>
                  {/* </CardActionArea> */}
                </Card>
                </center>
        </Container>
      </div>
    );
}
export default Profile;   