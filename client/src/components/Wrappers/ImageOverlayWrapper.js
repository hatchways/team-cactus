import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
// import VerticalAlignTop from '@material-ui/icons/VerticalAlignTop';
import Typography from '@material-ui/core/Typography';


const styles = {
      wrapper: {
      // position: 'relative',
      height: '450px',
   },
   media: {
      // position: 'absolute',
      opacity: 0.5,
   },
   overlay: {
      // position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: 0.5,
      verticalAlign: 'middle',
      textAlign: 'center',
      objectFit: 'contain'
   }
}

class ImageOverlayWrapper extends Component {

   render () {
      const { children } = this.props;

      return (
         <div style={styles.wrapper}>
            <div style={styles.media}>
               { children }
            </div>
            <Card style={styles.overlay}>
               Drag image to upload
               <Typography variant="srOnly">Upload new cover photo</Typography>
            </Card>
         </div>
      );
   }
}

export default withStyles(styles)(ImageOverlayWrapper);