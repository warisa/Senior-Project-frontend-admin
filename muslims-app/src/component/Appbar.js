import React,{useState,useEffect} from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios';
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color:"#CC6633"
    },
  }),
);

function AppBars () {
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

    const changePage = (page) => {
        window.location.replace(page)
      }

    useEffect(()=>{
        getUser();
    },[]);

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:'#282c34'}}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{changePage('/')}}>
                    <img src="../images/admin-web.png" style={{height:60}} alt="index_logo" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    muslimdailylifeadmin
                </Typography>
                <Button color="inherit" onClick={()=>{changePage('/profile')}}>
                    <Avatar src={userData.userImage} height="33px" alt="user"/> &nbsp; {userData.userFName}  {userData.userLName}
                </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
export default AppBars;