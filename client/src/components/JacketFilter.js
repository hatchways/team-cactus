import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({

});

class JacketFilter extends Component {

    state = {
        type: '',
        size: '',
        price: '',
        responseError: ''
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({ [event.target.name]: event.target.value });
        this.props.update(this.state, { [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.expansionPanelContainer}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Jacket Type</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="JacketType"
                            name="type"
                            className={classes.group}
                            value={this.state.type}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="" control={<Radio color="primary" />} label="All" />
                            <FormControlLabel value="denim" control={<Radio color="primary" />} label="Denim" />
                            <FormControlLabel value="vintage" control={<Radio color="primary"/>} label="Vintage" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={classes.heading}>Size</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="JacketType"
                            name="size"
                            className={classes.group}
                            value={this.state.size}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="xsmall" control={<Radio color="primary" />} label="XSmall" />
                            <FormControlLabel value="small" control={<Radio color="primary" />} label="Small" />
                            <FormControlLabel value="medium" control={<Radio color="primary"/>} label="Medium" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography className={classes.heading}>Price</Typography>
                    </ExpansionPanelSummary>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(JacketFilter);
