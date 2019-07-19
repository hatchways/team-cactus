import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
	paper: {
		height: "100%",
		width: "100%",
		alignItems: 'center',
        justifyContent: 'center',
		// margin: "20px",
	},
	image: {
		maxHeight: '100%', 
		maxWidth: '100%', 
		objectFit: 'cover',
		overflow: 'hidden'
	}, 
	icon: {
		fontSize: '100px'
	}
});

class UploadCardWrapper extends Component {

	render() {
		const { classes, imgSrc, handleClick } = this.props;
		let content = null;

		if (imgSrc) {
			content = <div> <img src={imgSrc} alt="" className={classes.image} /> </div>
		} else {
			content = 
				<IconButton>
                    <AddIcon fontSize="large" className={classes.icon} onClick={handleClick}/>
				</IconButton>
		}

		return (
			<Paper classes={{root: classes.paper}} square={true}>
				{ content }
			</Paper>
		);
	}

}

export default withStyles(styles)(UploadCardWrapper);