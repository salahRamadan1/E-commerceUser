import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
export default function Location() {
    const [position, setPosition] = useState(null);

    const handleLocationClick = (e) => {
        setPosition(e.latlng);
        console.log(position);

    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className=' w-25'>
            <Button variant="outlined" onClick={handleClickOpen}>asds</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

            >
                <APIProvider apiKey={'AIzaSyBTc-DbpvDg8ILsPSxwZkrM9j7nOTgpvTE'}>
                    <Map
                        style={{ width: '100vw', height: '100vh' }}
                        defaultCenter={{ lat: 22.54992, lng: 0 }}
                        defaultZoom={3}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    />
                </APIProvider>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

