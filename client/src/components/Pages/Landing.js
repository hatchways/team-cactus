import React, { Component } from "react";

class LandingPage extends Component {
  

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        Landing Page
      </div>
    );
  }
}

export default LandingPage;
