import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    image: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginRight: '10px'
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '600'
    }
}));

const Profile = () => {

    const classes = useStyles();

    return (
        <div className={classes.profile}>
            <img src="https://cactus-jacketshop.s3.us-east-2.amazonaws.com/profilepic.jpg" className={classes.image} />
            <p>Jessica Smith</p>
        </div>
  );
}

export default Profile;
