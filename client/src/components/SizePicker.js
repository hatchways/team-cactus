import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

//TO DO: apply styles to material ui togglebutton properly
const styles = theme => ({
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '600'
    },
    toggleButton: {
        margin: '5px !important',
        border: '1px solid rgba(0, 0, 0, .6) !important',
        borderRadius: '0 !important',
        color: '#000',
        width: '40px'
    }, 
    toggleButtonDisabled: {
        border: '1px solid rgba(0, 0, 0, .2) !important',
        color: 'rgba(0, 0, 0, .2) !important'
    },
    toggleButtonGroup: {
        marginLeft: '5px',
        backgroundColor: 'transparent',
        flexWrap: 'wrap'
    },
    toggleButtonSelected: {
        backgroundColor: 'rgba(0, 0, 0, .83) !important',
        color: '#fff !important'
    }
});

class SizePicker extends Component {
    state = {
        size: ''
    }

    handleSize = (event, newSize) => {
        this.setState({size: newSize});
    };

    render() {
        const { classes, sizesAvailable } = this.props;

        return (

            <div className={classes.toggleContainer}>
                Size: 
                <ToggleButtonGroup value={this.state.size} size="small" exclusive onChange={this.handleSize} classes={{ root: classes.toggleButtonGroup }}>
                    <ToggleButton value="xsmall" disabled={sizesAvailable.xsmall ? false : true}  classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        XS
                    </ToggleButton>
                    <ToggleButton value="small" disabled={sizesAvailable.small ? false : true} classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        S
                    </ToggleButton>
                    <ToggleButton value="medium" disabled={sizesAvailable.medium ? false : true} classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        M
                    </ToggleButton>
                    <ToggleButton value="large" disabled={sizesAvailable.large ? false : true} classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        L
                    </ToggleButton>
                    <ToggleButton value="xlarge" disabled={sizesAvailable.xlarge ? false : true} classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        XL
                    </ToggleButton>
                    <ToggleButton value="xxlarge" disabled={sizesAvailable.xxlarge ? false : true} classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected, disabled: classes.toggleButtonDisabled }}>
                        XXL
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}

export default withStyles(styles)(SizePicker);
