import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackBarAlert = (props) => {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        props.setOpen(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {props.message}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarAlert