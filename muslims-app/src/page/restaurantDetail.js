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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import DeleteForever from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import storage from "../firebase/index";

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
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'red',
    },
    image: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    }
  }),
);

function RestaurantDetail()  {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(0);
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

      const [restaurantCategoryEdit,setRestaurantCategoryEdit] = useState([])


      const [menu, setMenu] = useState([
        {
          categoryId: 1,
          categoryName: "Pizza",
          categoryImage: "https://firebasestorage.googleapis.com/v0/b/daily-life-of-muslims.appspot.com/o/pizza.png?alt=media&token=ec927d9b-45ef-467d-bce3-c075f6b28cb8",
          placeTypeId: 1,
          placeType: "restaurant"
        }
      ])
      
      const ITEM_HEIGHT = 48;
      const ITEM_PADDING_TOP = 8;
      const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

      const getMenuData = (value) =>{
        for(var i = 0; i < menu.length; i++){
          if(menu[i].categoryId==value){
            return menu[i].categoryName;
          }
        }
      }

      const getMenus = async () =>{
        const response =  await Axios.get('http://10.4.56.94/category1/1');
        console.log(response.data)
        setMenu(response.data);
      }

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
        var data = []
        for(var i = 0; i < restaurantCategory.length; i++){
          data.push(restaurantCategory[i].categoryId);
        }
        setRestaurantCategoryEdit(data)
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const submitRestaurantEdit = async () => {
        var formData = {
          placeId: restaurantDetailEdit.placeId,
          placeName: restaurantDetailEdit.placeName,
          placeOpeningTime: restaurantDetailEdit.placeOpeningTime,
          placeClosingTime: restaurantDetailEdit.placeClosingTime,
          placeTelno: restaurantDetailEdit.placeTelno,
          placeDescription: restaurantDetailEdit.placeDescription,
          placePriceRange: restaurantDetailEdit.placePriceRange,
          placeCarParking: restaurantDetailEdit.placeCarParking,
          placePrayerRoom: restaurantDetailEdit.placePrayerRoom,
          placeAirconditioner: restaurantDetailEdit.placeAirconditioner,
          placeReserve: restaurantDetailEdit.placeReserve,
          placeCreditcard: restaurantDetailEdit.placeCreditcard,
          placeAddress: restaurantDetailEdit.placeAddress,
          placeLinkPage: restaurantDetailEdit.placeLinkPage,
          latitude: restaurantDetailEdit.latitude,
          longitude: restaurantDetailEdit.longitude,
          Monday: restaurantDetailEdit.Monday,
          Tuesday: restaurantDetailEdit.Tuesday,
          Wednesday: restaurantDetailEdit.Wednesday,
          Thursday: restaurantDetailEdit.Thursday,
          Friday: restaurantDetailEdit.Friday,
          Saturday: restaurantDetailEdit.Saturday,
          Sunday: restaurantDetailEdit.Sunday,
          placeTypeId: 1,
          categoryId: restaurantCategoryEdit
        }
        await Axios.put('http://10.4.56.94/updateData/'+ id, formData)
        .then((value) => {
          console.log(value.status)
          if(value.status==200){
            setOpen(false);
            getMenus();
            getDetail();
            getImage();
            getCategory();
            Swal.fire(
              'Success!',
              '',
              'success'
            )
          }
        })
      }

      const deleteImageRestaurant = async (valueId) => {
        Swal.fire({
          title: 'Are you sure ?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
          if (result.value) {
            var formData = {
              placeId: id,
              imageId: valueId
            }
            await Axios.delete('http://10.4.56.94/deleteImage/'+ id, { data: formData }).then((value) => {
              console.log(value.status)
              if(value.status==200){
                setOpen(false);
                getMenus();
                getDetail();
                getImage();
                getCategory();
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

      const addImageRestaurant = async () => {
        const { value: file } = await Swal.fire({
          title: 'Select image',
          input: 'file',
          inputAttributes: {
            accept: 'image/*',
            'aria-label': 'Upload your profile picture'
          }
        })
        
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            Swal.fire({
              title: 'Are you sure?',
              imageUrl: e.target.result,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, submit it!'
            }).then(async (result) => {
              if (result.value) {
                setLoading(0)
                console.log(file)
                console.log(file.name)
                var date = new Date().getDate();
                var month = new Date().getMonth();
                var year = new Date().getFullYear();
                var hours = new Date().getHours();
                var minutes = new Date().getUTCMinutes();
                var seconds = new Date().getMilliseconds();
                const uploadTask = storage.ref(`images/`+ date + month + year + ":" + hours + minutes + seconds + '-' + file.name).put(file);
                uploadTask.on(
                  "state_changed",
                  snapshot => {
                    const progress = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log(progress)
                    setLoading(progress)
                  },
                  error => {
                    console.log(error);
                  },
                  () => {
                    storage
                      .ref(`images/`+ date + month + year + ":" + hours + minutes + seconds + '-' + file.name)
                      .getDownloadURL()
                      .then(async (url) => {
                        console.log('==========================================================')
                        console.log(url)
                        console.log('==========================================================')
                        var formData = {
                          placeId: id,
                          imageName: url
                        }
                        console.log(formData)
                        await Axios.post('http://10.4.56.94/addImage/'+ id, formData)
                        .then((value) => {
                          console.log(value.status)
                          if(value.status==200){
                            getMenus();
                            getDetail();
                            getImage();
                            getCategory();
                            setLoading(0)
                            Swal.fire(
                              'Success!',
                              '',
                              'success'
                            )
                          }
                        })
                      });
                  }
                );
              }
            })
          }
          reader.readAsDataURL(file)
        }
      }

      useEffect(()=>{
        getMenus();
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
              <ListItem>
              <Grid item xs={10}>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={()=>{addImageRestaurant()}} >
                  {
                    loading == 0 ? <div>add image</div> : <div> {loading} %</div>
                  }
                </Button>
                </Grid>
              </ListItem>
            <ListItem >
              <GridList className={classes.gridList} cols={2.5}>
                {restaurantImage.map(data => (
                  <GridListTile key={data.imageId}>
                    <img src={data.imageName} alt={data.imageId}/>
                    {/* <GridListTileBar
                      title="DELETE"
                      classes={{
                        image: classes.titleBar,
                        title: classes.title,
                      }}
                      actionIcon={
                        <IconButton>
                          <StarBorderIcon className={classes.title} />
                        </IconButton>
                      }
                    /> */}
                    <GridListTileBar
                      titlePosition="top"
                      actionIcon={
                        <IconButton className={classes.icon} onClick={()=>{deleteImageRestaurant(data.imageId)}}>
                          <DeleteForever/>
                        </IconButton>
                      }
                      actionPosition="right"
                      className={classes.titleBar}
                    />
                  </GridListTile>
                ))}
                  </GridList>
                </ListItem>
                {/* <ListItem>
                  <ImageUpload/>
                </ListItem> */}
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
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeName: val }
                      })
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
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeDescription: val }
                      })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.formControl} fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select 
                        multiple
                        value={restaurantCategoryEdit}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => (
                          <div className={classes.chips}>
                            {(selected).map(value => (
                              <Chip key={value} label={getMenuData(value)} className={classes.chip} />
                            ))}
                          </div>
                        )}
                        MenuProps={MenuProps}
                        onChange={(e)=> {
                          console.log(e)
                          const val = e.target.value;
                          setRestaurantCategoryEdit(val)
                        }}
                      >
                        {menu.map(data => (
                          <MenuItem key={data.categoryId} value={data.categoryId}>
                            {data.categoryName}
                          </MenuItem>
                        ))}
                      </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Address"
                  type="email"
                  value={restaurantDetailEdit.placeAddress}
                  onChange={(e)=> {
                    const val = e.target.value;
                    setRestaurantDetailEdit(prevState => {
                      return { ...prevState, placeAddress: val }
                    })
                  }}
                  fullWidth
                />
                </Grid>
                  <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Opening Time"
                    type="time"
                    value={restaurantDetailEdit.placeOpeningTime}
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeOpeningTime: val }
                      })
                    }}
                    fullWidth
                  /> 
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Closing Time"
                    type="time"
                    value={restaurantDetailEdit.placeClosingTime}
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeClosingTime: val }
                      })
                    }}
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
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placePriceRange: val }
                      })
                    }}
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
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeTelno: val }
                      })
                    }}
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
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeLinkPage: val }
                      })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Latitude"
                    type="text"
                    value={restaurantDetailEdit.latitude}
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, latitude: val }
                      })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Longitude"
                    type="text"
                    value={restaurantDetailEdit.longitude}
                    onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, longitude: val }
                      })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Car Parking</InputLabel>
                    <Select value={restaurantDetailEdit.placeCarParking} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeCarParking: val }
                      })
                    }}>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                      <InputLabel>Air Conditioner</InputLabel>
                      <Select value={restaurantDetailEdit.placeAirconditioner} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeAirconditioner: val }
                      })
                    }}>>
                        <MenuItem value={0}>มี</MenuItem>
                        <MenuItem value={1}>ไม่มี</MenuItem>
                      </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Reserve</InputLabel>
                    <Select value={restaurantDetailEdit.placeReserve} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeReserve: val }
                      })
                    }}>>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Pray Room</InputLabel>
                    <Select value={restaurantDetailEdit.placePrayerRoom} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placePrayerRoom: val }
                      })
                    }}>>
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Credit Card</InputLabel>
                    <Select value={restaurantDetailEdit.placeCreditcard} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, placeCreditcard: val }
                      })
                    }}>> 
                      <MenuItem value={0}>มี</MenuItem>
                      <MenuItem value={1}>ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Monday</InputLabel>
                    <Select value={restaurantDetailEdit.Monday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Monday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Tuesday</InputLabel>
                    <Select value={restaurantDetailEdit.Tuesday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Tuesday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Wednesday</InputLabel>
                    <Select value={restaurantDetailEdit.Wednesday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Wednesday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Thursday</InputLabel>
                    <Select value={restaurantDetailEdit.Thursday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Thursday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Friday</InputLabel>
                    <Select value={restaurantDetailEdit.Friday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Friday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Saturday</InputLabel>
                    <Select value={restaurantDetailEdit.Saturday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Saturday: val }
                      })
                    }}>
                      <MenuItem value={0}>เปิด</MenuItem>
                      <MenuItem value={1}>ปิด</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel>Sunday</InputLabel>
                    <Select value={restaurantDetailEdit.Sunday} onChange={(e)=> {
                      const val = e.target.value;
                      setRestaurantDetailEdit(prevState => {
                        return { ...prevState, Sunday: val }
                      })
                    }}>
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
                <Button onClick={submitRestaurantEdit} color="primary">
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