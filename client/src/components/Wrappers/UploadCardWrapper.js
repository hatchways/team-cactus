import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
	uploadArea: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
	},
	icon: {
		fontSize: '100px',
	}
});

class UploadCardWrapper extends Component {

	render() {
		const { classes, handleClick, height } = this.props;

		return (
			<div className={classes.uploadArea} style={{height: height}}>
				<IconButton onClick={handleClick}>
	                <AddIcon fontSize="large" className={classes.icon}/>
				</IconButton>
			</div>
		);
	}

}

export default withStyles(styles)(UploadCardWrapper);