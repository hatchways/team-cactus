import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
// import axios from "axios";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    formLabel: {
        // margin: '50px',
    },
    sectionHeader: {
        // margin: '20px 50px',
        fontWeight: 600,
        letterSpacing: "1px",
        textDecoration: "none"
    },
    button: {
        boxShadow: "none",
        borderRadius: 0,
        padding: "15px 20px",
        margin: "60px 0px",
        width: "30%"
    }
});

class InformationForm extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div style={{ textAlign: "center" }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={this.props.handleBack}
                    disabled={!this.props.handleBack}
                    className={classes.button}
                >
                    Back
                </Button>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={this.props.handleNext}
                    className={classes.button}
                >
                    Next
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(InformationForm);
