import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 100,
	},

	textField: {
		marginBottom: 10,
	},

	button: {
		marginRight: 10,
	}
});