import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, IconButton } from '@material-ui/core';

import { hideAlert } from '../../redux/actions';
import {alertSelector} from '../../redux/selectors';

const Alert = () => {
	const alertState = useSelector(alertSelector);
	const dispatch = useDispatch();
	const {Fragment} = React

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
							<Fragment>
								<IconButton size="small"
								            aria-label="close"
								            color="inherit"
								            onClick={() => dispatch(hideAlert())}>
									<CloseIcon fontSize="small"/>
								</IconButton>
							</Fragment>
						}/>
				) : (<h1 hidden={true}>123</h1>)
			}
		</div>
	);
};


export default Alert;