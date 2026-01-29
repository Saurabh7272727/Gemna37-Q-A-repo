import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';


const MagicButton = ({ text, css, submitHandler }) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className={`ring-2 ring-blue-600 float-right mt-5 w-fit flex justify-center`} onClick={() => submitHandler(setOpen)}>
            <Button type="submit" className={`${css}`} onClick={handleOpen}>{open ? "searching..." : text}</Button>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default MagicButton