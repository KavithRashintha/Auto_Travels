import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, TextField, Button, Box, Grid } from '@mui/material';

function AddVehicleModal({ open, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        millage: '',
        vehicleNumber: '',
        rentalStatus: 'Available', // Default value, will be overridden in handleSave
        photo: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {

        const updatedFormData = {
            ...formData,
            year: parseInt(formData.year, 10),
            millage: parseFloat(formData.millage),
            rentalStatus: false
        };

        console.log(updatedFormData);

        axios.post('http://localhost:8080/vehicle/add', updatedFormData)
            .then(response => {
                console.log('Vehicle added:', response.data);
                onSuccess();
                onClose();
            })
            .catch(error => {
                console.error('There was an error adding the vehicle:', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ pt: 4 }}>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            <TextField
                                id="brand"
                                label="Brand"
                                variant="outlined"
                                value={formData.brand}
                                name="brand"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            <TextField
                                id="model"
                                label="Model"
                                variant="outlined"
                                value={formData.model}
                                name="model"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            <TextField
                                id="year"
                                label="Year"
                                variant="outlined"
                                value={formData.year}
                                name="year"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            <TextField
                                id="millage"
                                label="Millage"
                                variant="outlined"
                                value={formData.millage}
                                name="millage"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sx={{ mb: 2 }}>
                            <TextField
                                id="vehicleNumber"
                                label="Vehicle Number"
                                variant="outlined"
                                value={formData.vehicleNumber}
                                name="vehicleNumber"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="photo"
                                label="Photo URL"
                                variant="outlined"
                                value={formData.photo}
                                name="photo"
                                onChange={handleChange}
                                size="small"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pr: 2 }}>
                <Button onClick={onClose} color="primary" sx={{ fontSize: '12px', pr: 2, pb: 2, pt: 2, pl: 2 }}>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" sx={{ fontSize: '12px', pr: 2, pb: 2, pt: 2, pl: 2 }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddVehicleModal;
