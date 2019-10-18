import React, { Component } from 'react';
import Appbar from '../component/Appbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "../css/Index.css";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="index">
          <Appbar/>
          <br/>
          <Grid container direction="column" alignItems="center" >
            <Grid item xs={12} md={6}>
            <ButtonGroup
              variant="contained"
              color="primary"
              size="large"
              aria-label="large contained secondary button group"
            >
                <Button style={{backgroundColor:'#CC6633'}}>Restaurant</Button>
                <Button style={{backgroundColor:'#CC6633'}}>Pray Place</Button>
                <Button style={{backgroundColor:'#CC6633'}}>History</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
          <center>
          <header className="index-header">
                <img src="../images/logo-web.png" className="index-logo"  alt="index_logo" />
            </header>
            </center>
        </div>
    );
  }
}
