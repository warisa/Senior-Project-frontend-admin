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
import DriveEta from '@material-ui/icons/DriveEta';
import AcUnit from '@material-ui/icons/AcUnit';
import EventSeat from '@material-ui/icons/EventSeat';
import CreditCard from '@material-ui/icons/CreditCard';
import LocationOn from '@material-ui/icons/LocationOn';
import Appbar from '../component/Appbar';
import Axios from 'axios';
import { Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 140,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }),
);

function RestaurantDetail()  {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
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
            placeLinkPage: "https://material-ui.com/components/buttons/",
            placeDate: "2019-09-30T06:38:42.000Z",
            latitude: 13.51214,
            longitude: 0,
            placeTypeId: 1,
            userId: 2,
            status: "Checking",
        }
      )

      const [restaurantDetailEdit,setRestaurantDetailEdit] = useState(
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
            placeLinkPage: "https://material-ui.com/components/buttons/",
            placeDate: "2019-09-30T06:38:42.000Z",
            latitude: 13.51214,
            longitude: 0,
            Monday: 0,
            Tuesday: 1,
            Wednesday: 0,
            Thursday: 1,
            Friday: 0,
            Saturday: 1,
            Sunday: 0,
            placeTypeId: 1,
            userId: 2,
            status: "Checking",
        }
      )

      const [restaurantImage,setRestaurantImage] = useState([
        {
          imageId:1,
          imageName:[]
        }]
      )

      const [restaurantCategory,setRestaurantCategory] = useState([
        {
          categoryId:1,
          categoryName:[]
        }]
      )

      const getDetail = async () =>{
        const response =  await Axios.get('http://10.4.56.94/placeDetailData/'+ id);
        console.log(response.data)
        setRestaurantDetail(response.data[0]);
      } 

      const getImage = async () =>{
        const response =  await Axios.get('http://10.4.56.94/placeDetailImage/'+ id);
        console.log(response.data)
        setRestaurantImage(response.data);
      } 

      const getCategory = async () =>{
        const response =  await Axios.get('http://10.4.56.94/placeDetailCategory/'+ id);
        console.log(response.data)
        setRestaurantCategory(response.data);
      } 

      const submitRestaurant = async () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to submit this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, submit it!'
        }).then(async (result) => {
          if (result.value) {
            await Axios.put('http://10.4.56.94/updateStatus/'+ id,
            {
              placeId: id,
              status: 'Complete'
            }).then((value) => {
              console.log(value.status)
              if(value.status==200){
                Swal.fire(
                  'Success!',
                  '',
                  'success'
                )
              }
            })
          }
        })
      }

      const deleteRestaurant = async () => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.value) {
            await Axios.delete('http://10.4.56.94/deleteplace/'+ id).then((value) => {
              console.log(value.status)
              if(value.status==200){
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              }
            })
          }
        })
      }
      const handleClickOpen = () => {
        setOpen(true);
        setRestaurantDetailEdit(restaurantDetail)
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      useEffect(()=>{
        getDetail();
        getImage();
        getCategory();
      },[]);

    return (
        <div>
        <Appbar/>
        <Container maxWidth="md">
          <List className={classes.root}>
          <ListItem>
              <ListItemAvatar>
              <Avatar>
                <Avatar src={restaurantDetail.userImage} height="33px" alt="user"/> &nbsp; 
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={restaurantDetail.userFName + " " + restaurantDetail.userLName} secondary={Moment(restaurantDetail.placeDate).format('DD MMM YYYY')} />
          </ListItem>
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
              <Typography className={classes.heading}><Description/> &nbsp; Category:</Typography>
              {
                restaurantCategory.map( data =>
                  <Typography className={classes.secondaryHeading}>{data.categoryName} &nbsp; </Typography>
              )}
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
            <ListItem >
              <Typography className={classes.heading}> <LocationOn/> Location: </Typography>
              <Typography className={classes.secondaryHeading}><a href={'https://www.google.com/maps/search/?api=1&query=' + restaurantDetail.latitude + ',' + restaurantDetail.longitude } target='_blank'>GoogleMap</a></Typography>
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <DriveEta/> Car Parking:</Typography>
              {restaurantDetail.placeCarParking == 1 ?
                    (    
                      <Typography className={classes.secondaryHeading}>มี</Typography>
                    )
                    :
                    (
                      <Typography className={classes.secondaryHeading}>ไม่มี</Typography>
                    )}
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <AcUnit/> Air Conditioner:</Typography>
              {restaurantDetail.placeAirconditioner == 1 ?
                    (    
                      <Typography className={classes.secondaryHeading}>มี</Typography>
                    )
                    :
                    (
                      <Typography className={classes.secondaryHeading}>ไม่มี</Typography>
                    )}
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <EventSeat/> Reserve:</Typography>
              {restaurantDetail.placeReserve == 1 ?
                    (    
                      <Typography className={classes.secondaryHeading}>มี</Typography>
                    )
                    :
                    (
                      <Typography className={classes.secondaryHeading}>ไม่มี</Typography>
                    )}
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <Language/> Pray Room:</Typography>
              {restaurantDetail.placePrayerRoom == 1 ?
                    (    
                      <Typography className={classes.secondaryHeading}>มี</Typography>
                    )
                    :
                    (
                      <Typography className={classes.secondaryHeading}>ไม่มี</Typography>
                    )}
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <CreditCard/> Credit Card:</Typography>
              {restaurantDetail.placeCreditcard == 1 ?
                    (    
                      <Typography className={classes.secondaryHeading}>มี</Typography>
                    )
                    :
                    (
                      <Typography className={classes.secondaryHeading}>ไม่มี</Typography>
                    )}
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <LocationOn/> Opening Day: </Typography>
              {restaurantDetail.Monday == 1 ?
                (    
                  <Typography style={{color:'green'}}>จันทร์</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>จันทร์</Typography>
                )
              } &nbsp;
              {restaurantDetail.Tuesday == 1 ?
                (    
                  <Typography style={{color:'green'}}>อังคาร</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>อังคาร</Typography>
                )
              } &nbsp;
              {restaurantDetail.Wednesday == 1 ?
                (    
                  <Typography style={{color:'green'}}>พุธ</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>พุธ</Typography>
                )
              } &nbsp;
              {restaurantDetail.Thursday == 1 ?
                (    
                  <Typography style={{color:'green'}}>พฤหัสบดี</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>พฤหัสบดี</Typography>
                )
              } &nbsp;
              {restaurantDetail.Friday == 1 ?
                (    
                  <Typography style={{color:'green'}}>ศุกร์</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>ศุกร์</Typography>
                )
              } &nbsp;
              {restaurantDetail.Saturday == 1 ?
                (    
                  <Typography style={{color:'green'}}>เสาร์</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>เสาร์</Typography>
                )
              } &nbsp;
              {restaurantDetail.Sunday == 1 ?
                (    
                  <Typography style={{color:'green'}}>อาทิตย์</Typography>
                )
                :
                (
                  <Typography style={{color:'red'}}>อาทิตย์</Typography>
                )
              }
            </ListItem>
            <Divider/>
            <ListItem >
              <Typography className={classes.heading}> <LocationOn/> Image: </Typography>
              {
                restaurantImage.map( data =>
                <img src={data.imageName} style={{width:200,height:150, marginRight:10}} />
              )}
            </ListItem>
          </List>
        </Container>
        <center>
            <Button variant="contained" color="secondary" style={{margin:20}} onClick={()=>{deleteRestaurant()}}>
                Delete
            </Button>
            <Button variant="contained" style={{backgroundColor:"yellow"}} onClick={handleClickOpen}>
              Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">EDIT DETAIL</DialogTitle>
              <DialogContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    value={restaurantDetailEdit.placeName}
                    onChange={(e)=> {
                      console.log(e.target.value)
                      setRestaurantDetailEdit({ placeName : e.target.value, placeDescription: restaurantDetailEdit.placeDescription, placeAddress: restaurantDetailEdit.placeAddress })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    type="text"
                    value={restaurantDetailEdit.placeDescription}
                    onChange={(e)=> {
                      console.log(e.target.value)
                      setRestaurantDetailEdit({ placeName : restaurantDetailEdit.placeName, placeDescription: e.target.value, placeAddress: restaurantDetailEdit.placeAddress })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Address"
                  type="email"
                  value={restaurantDetailEdit.placeAddress}
                  fullWidth
                />
                </Grid>
                  <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Opening Time"
                    type="text"
                    value={restaurantDetailEdit.placeOpeningTime}
                    fullWidth
                  /> 
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Closing Time"
                    type="text"
                    value={restaurantDetailEdit.placeClosingTime}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Price Range"
                    type="text"
                    value={restaurantDetailEdit.placePriceRange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Phone Number"
                    type="text"
                    value={restaurantDetailEdit.placeTelno}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Link page"
                    type="text"
                    value={restaurantDetailEdit.placeLinkPage}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Location"
                    type="text"
                    value={restaurantDetailEdit.latitude}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Car Parking</InputLabel>
                    <Select value={restaurantDetailEdit.placeCarParking}>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                      <InputLabel>Air Conditioner</InputLabel>
                      <Select value={restaurantDetailEdit.placeAirconditioner}>
                        <MenuItem value={0}>มี</MenuItem>
                        <MenuItem value={1}>ไม่มี</MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Reserve</InputLabel>
                    <Select value={restaurantDetailEdit.placeReserve}>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Pray Room</InputLabel>
                    <Select value={restaurantDetailEdit.placePrayerRoom}>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Credit Card</InputLabel>
                    <Select value={restaurantDetailEdit.placeCreditcard}>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Monday</InputLabel>
                    <Select value={restaurantDetailEdit.Monday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Tuesday</InputLabel>
                    <Select value={restaurantDetailEdit.Tuesday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Wednesday</InputLabel>
                    <Select value={restaurantDetailEdit.Wednesday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Thursday</InputLabel>
                    <Select value={restaurantDetailEdit.Thursday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Friday</InputLabel>
                    <Select value={restaurantDetailEdit.Friday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Saturday</InputLabel>
                    <Select value={restaurantDetailEdit.Saturday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Sunday</InputLabel>
                    <Select value={restaurantDetailEdit.Sunday}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <Button variant="contained" color="primary" style={{backgroundColor:"green",margin:20}} onClick={()=>{submitRestaurant()}}>
                Submit
            </Button>
        </center>
      </div>
    );
  
    }
  export default RestaurantDetail;