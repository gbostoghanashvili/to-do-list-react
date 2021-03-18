import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../redux/actions';
import { Snackbar, IconButton } from '@material-ui/core';

const AlertMessage = () => {
	const alertState = useSelector(state => state.alertReducer);
	const dispatch = useDispatch();

	return (
		<div>
			{
				alertState.isPresented ? (
					<Snackbar
						open={true}
						autoHideDuration={2000}
						onClose={() => dispatch(hideAlert())}
						message={alertState.message}
						action={
							<React.Fragment>
								<IconButton size="small"
								            aria-label="close"
								            color="inherit"
								            onClick={() => dispatch(hideAlert())}>
									<CloseIcon fontSize="small"/>
								</IconButton>
							</React.Fragment>
						}/>
				) : (<h1 hidden={true}>123</h1>)
			}
		</div>
	);

};


export default AlertMessage;