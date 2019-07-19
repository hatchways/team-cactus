import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const styles = theme => ({
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
});

class SizePicker1 extends Component {
    state = {
        size: ''
    }

    handleSize = (event, newSize) => {
        this.setState({size: newSize});
    };

    render() {
        const { classes, sizesAvailable } = this.props;
        console.log('sizes available', sizesAvailable.xsmall);
        return (

            <div className={classes.toggleContainer}>
                Size: 
                <ToggleButtonGroup value={this.state.size} size="small" exclusive onChange={this.handleSize} classes={{ root: classes.toggleButtonGroup }}>
                    <ToggleButton value="xsmall" disabled={sizesAvailable.xsmall ? false : true}  classes={{ root: classes.toggleButton }}>
                        XS
                    </ToggleButton>
                    <ToggleButton value="small" disabled={sizesAvailable.small ? false : true} classes={{ root: classes.toggleButton }}>
                        S
                    </ToggleButton>
                    <ToggleButton value="medium" disabled={sizesAvailable.medium ? false : true} classes={{ root: classes.toggleButton }}>
                        M
                    </ToggleButton>
                    <ToggleButton value="large" disabled={sizesAvailable.large ? false : true} classes={{ root: classes.toggleButton }}>
                        L
                    </ToggleButton>
                    <ToggleButton value="xlarge" disabled={sizesAvailable.xlarge ? false : true} classes={{ root: classes.toggleButton }}>
                        XL
                    </ToggleButton>
                    <ToggleButton value="xxlarge" disabled={sizesAvailable.xxlarge ? false : true} classes={{ root: classes.toggleButton }}>
                        XXL
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}

export default withStyles(styles)(SizePicker1);
