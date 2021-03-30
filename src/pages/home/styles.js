import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	typo: {
		marginTop: 50,
	},

	list: {
		listStyle: 'none',
	},

	button: {
		marginRight: 10,
	},

	countLabel: {
		alignContent: 'left',
		marginLeft: 10,
	}

});