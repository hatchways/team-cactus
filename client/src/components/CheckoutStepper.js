import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const styles = theme => ({
	step: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	}
});

// const QontoConnector = withStyles({
// 	alternativeLabel: {
// 		top: 10,
// 		left: "calc(-50% + 16px)",
// 		right: "calc(50% + 16px)"
// 	},
// 	active: {
// 		"& $line": {
// 			borderColor: "black"
// 		}
// 	},
// 	completed: {
// 		"& $line": {
// 			borderColor: "black"
// 		}
// 	},
// 	disabled: {
// 		"& $line": {
// 			borderColor: "grey"
// 		}
// 	},
// 	line: {
// 		borderTopWidth: 3,
// 		borderRadius: 1
// 	}
// })(StepConnector);

// const useQontoStepIconStyles = makeStyles({
// 	root: {
// 		color: "#eaeaf0",
// 		display: "flex",
// 		height: 22,
// 		alignItems: "center"
// 	},
// 	active: {
// 		color: "#784af4"
// 	},
// 	circle: {
// 		width: 8,
// 		height: 8,
// 		borderRadius: "50%",
// 		backgroundColor: "currentColor"
// 	},
// 	completed: {
// 		color: "#784af4",
// 		zIndex: 1,
// 		fontSize: 18
// 	}
// });

// function QontoStepIcon(props) {
// 	const classes = useQontoStepIconStyles();
// 	const { active, completed } = props;

// 	return (
// 		<div
// 			className={clsx(classes.root, {
// 				[classes.active]: active
// 			})}
// 		>
// 			{completed ? (
// 				<Check className={classes.completed} />
// 			) : (
// 				<div className={classes.circle} />
// 			)}
// 		</div>
// 	);
// }

// QontoStepIcon.propTypes = {
// 	active: PropTypes.bool,
// 	completed: PropTypes.bool
// };

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		width: "90%"
// 	},
// 	button: {
// 		marginRight: theme.spacing(1)
// 	},
// 	instructions: {
// 		marginTop: theme.spacing(1),
// 		marginBottom: theme.spacing(1)
// 	}
// }));

class CheckoutStepper extends Component {
	render() {
		const { classes } = this.props;
			
		return (
			<div>
				<Stepper activeStep={this.props.currentStep}>
					{this.props.steps.map((label, index) => {
						return (
							<Step key={label} className={classes.step}>
								<StepLabel>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
			</div>
		);
	}
}

export default withStyles(styles)(CheckoutStepper);