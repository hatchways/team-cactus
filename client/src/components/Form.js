import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '350px',
        marginTop: '80px'
    }
}));

const Form = props => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                Sign Up
                </Typography>
                
            </CardContent>
            <CardActions>
                <Button size="small">Sign Up</Button>
            </CardActions>
        </Card>
    );
}

export default Form;