import React, { Component } from 'react';
import '../css/App.css';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    (function(d, s, id) {
        var js;
        var fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src =
          "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v3.2&appId=703214296759759&autoLogAppEvents=1";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
  }

  async loginFacebook(){
    window.FB.login(
        result =>{
            Axios.post('http://10.4.56.94/adminlogin', { facebookToken: result.authResponse.accessToken })
            .then(response => {
              if(response.data=!"" & response.data !=null) {
                localStorage.setItem("userId", response.data);
                window.location.replace("/")
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
        ,{ scope: "public_profile,email" }
    )
  }

  render() {
    return (
        <div>
            <header className="App-header">
                <img src="../images/app_logo.png" className="App-logo" alt="app_logo" />
                <Button onClick={()=>{this.loginFacebook()}} variant="contained" color="primary" style={{backgroundColor:'#3b5998'}}>
                    <img src="../images/facebook.png" height="33px" alt="facebook"/>
                    Login with Facebook
                </Button>
            </header>
        </div>
    );
  }
}