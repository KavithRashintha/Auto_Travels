import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Dialog, DialogContent, DialogActions, TextField, Button, Box, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function VehicleModal({ open, onClose, vehicle }) {
    const [formData, setFormData] = useState(vehicle);
    const [rentalStatus, setRentalStatus] = useState('');

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);
            setRentalStatus(vehicle.rentalStatus ? 'Rented' : 'Available');
        }
    }, [vehicle]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setRentalStatus(value);
        setFormData({
            ...formData,
            rentalStatus: value === 'Rented',
        });
    };

    const handleUpdate = () => {
        axios.put('http://localhost:8080/vehicle/update', formData)
            .then(response => {
                console.log('Vehicle updated:', response.data);
                onClose(); // Close the modal on successful update
            })
            .catch(error => {
                console.error('There was an error updating the vehicle:', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ pt: 4 }}> {/* Add padding top */}
                <Box display="flex" alignItems="flex-start">
                    <img
                        src={formData.photo}
                        alt={formData.model}
                        style={{
                            width: '400px', // Increase width as needed
                            height: 'auto',
                            maxWidth: '100%', // Ensure it does not overflow
                            maxHeight: '550px', // Set a max height if needed
                            objectFit: 'contain', // Maintain aspect ratio
                            marginRight: '32px'
                        }}
                    />
                    <Box flex={1}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ mb: 2 }}>
                                <TextField
                                    id="id"
                                    label="ID"
                                    variant="outlined"
                                    value={formData.id || ''}
                                    name="id"
                                    disabled
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ mb: 2 }}>
                                <TextField
                                    id="brand"
                                    label="Brand"
                                    variant="outlined"
                                    value={formData.brand || ''}
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
                                    value={formData.model || ''}
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
                                    value={formData.year || ''}
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
                                    value={formData.millage || ''}
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
                                    value={formData.vehicleNumber || ''}
                                    name="vehicleNumber"
                                    onChange={handleChange}
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel id="rental-status-label">Rental Status</InputLabel>
                                    <Select
                                        labelId="rental-status-label"
                                        id="rental-status"
                                        value={rentalStatus}
                                        label="Rental Status"
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value="Available">Available</MenuItem>
                                        <MenuItem value="Rented">Rented</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ pr: 2 }}> {/* Add padding right */}
                <Button onClick={onClose} color="primary" sx={{ fontSize: '12px', pr: 2, pb:2, pt:2, pl:2 }}> {/* Change font size and padding right */}
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" sx={{ fontSize: '12px', pr: 2, pb:2, pt:2, pl:2 }}> {/* Change font size and padding right */}
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default VehicleModal;
