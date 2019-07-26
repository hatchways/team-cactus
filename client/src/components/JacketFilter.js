import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TitleWrapperXSmall from './Wrappers/TitleWrapperXSmall';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    expansionPanel: {
        margin: '0px',
        backgroundColor: 'transparent' 
    },
    expansionPanelSummary: {
        margin: '0px !important',

    },
    expansionPanelSummaryRoot: {
        minHeight: '0px !important',
        '&.Mui-expanded': {
            borderTop: '.8px solid #eee',
        }
    },
    formControlLabel: {
        fontSize: '0.9rem'
    },  
    heading: {
        fontSize: '13px',
        fontWeight: '600'
    },
    title: {
        marginBottom: '30px',
    }
});

class JacketFilter extends Component {

    state = {
        priceValue: [0, 500]
    }

    handleChange = (event, newValue) => {
        event.preventDefault();
        this.props.updateFilterState({ [event.target.name]: newValue });
    }

    handleChangeSlider = (event, newValue) => {
        event.preventDefault();
        this.props.updateFilterState({ lower_price: newValue[0], higher_price: newValue[1] });
        this.setState({priceValue: newValue});
    }

    valuetext(value) {
        return `$${value}`;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.expansionPanelContainer}>
                <TitleWrapperXSmall className={classes.title}>FILTERS</TitleWrapperXSmall>
                <ExpansionPanel classes={{ root: classes.expansionPanel }}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    classes={{ content: classes.expansionPanelSummary, root: classes.expansionPanelSummaryRoot }}
                    >
                    <Typography className={classes.heading}>JACKET TYPE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="JacketType"
                            name="type"
                            className={classes.group}
                            value={this.props.filterState.type}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="" control={<Radio color="primary" />} classes={{ label: classes.formControlLabel }} label="All" />
                            <FormControlLabel value="denim" control={<Radio color="primary" />} classes={{ label: classes.formControlLabel }} label="Denim" />
                            <FormControlLabel value="vintage" control={<Radio color="primary"/>} classes={{ label: classes.formControlLabel }} label="Vintage" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: classes.expansionPanel }}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    classes={{ content: classes.expansionPanelSummary, root: classes.expansionPanelSummaryRoot }}
                    >
                    <Typography className={classes.heading}>SIZE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <div className={classes.root}>
                        <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup
                            aria-label="JacketType"
                            name="size"
                            className={classes.group}
                            value={this.props.filterState.size}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="" control={<Radio color="primary" />} classes={{ label: classes.formControlLabel }}  label="All" />
                            <FormControlLabel value="xsmall" control={<Radio color="primary" />} classes={{ label: classes.formControlLabel }}  label="XSmall" />
                            <FormControlLabel value="small" control={<Radio color="primary" />} classes={{ label: classes.formControlLabel }}  label="Small" />
                            <FormControlLabel value="medium" control={<Radio color="primary"/>} classes={{ label: classes.formControlLabel }}  label="Medium" />
                            <FormControlLabel value="large" control={<Radio color="primary"/>} classes={{ label: classes.formControlLabel }}  label="Large" />
                            <FormControlLabel value="xlarge" control={<Radio color="primary"/>} classes={{ label: classes.formControlLabel }}  label="XLarge" />
                            <FormControlLabel value="xxlarge" control={<Radio color="primary"/>} classes={{ label: classes.formControlLabel }}  label="XXLarge" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel classes={{ root: classes.expansionPanel }}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    classes={{ content: classes.expansionPanelSummary, root: classes.expansionPanelSummaryRoot }}
                    >
                    <Typography className={classes.heading}>PRICE</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Slider
                        value={this.state.priceValue}
                        onChange={this.handleChangeSlider}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={this.valuetext}
                        min={0}
                        max={500}
                    />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(JacketFilter);
