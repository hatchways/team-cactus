import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '600'
    },
    toggleButton: {
        margin: '0 10px',
        border: '1px solid rgba(0, 0, 0, 0.12) !important'
    }, 
    toggleButtonGroup: {
        backgroundColor: 'transparent',
    }
}));

const SizePicker = () => {
    const [size, setSize] = React.useState('');

    const handleSize = (event, newSize) => {
        setSize(newSize);
    };

    const classes = useStyles();

    return (

            <div className={classes.toggleContainer}>
                Size: 
                <ToggleButtonGroup value={size} size="small" exclusive onChange={handleSize} classes={{ root: classes.toggleButtonGroup }}>
                    <ToggleButton value="xsmall" classes={{ root: classes.toggleButton }}>
                        XS
                    </ToggleButton>
                    <ToggleButton value="small" classes={{ root: classes.toggleButton }}>
                        S
                    </ToggleButton>
                    <ToggleButton value="medium" classes={{ root: classes.toggleButton }}>
                        M
                    </ToggleButton>
                    <ToggleButton value="large" disabled classes={{ root: classes.toggleButton }}>
                        L
                    </ToggleButton>
                    <ToggleButton value="xlarge" disabled classes={{ root: classes.toggleButton }}>
                        XL
                    </ToggleButton>
                    <ToggleButton value="xxlarge" disabled classes={{ root: classes.toggleButton }}>
                        XXL
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
  );
}

export default SizePicker;
