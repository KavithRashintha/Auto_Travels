import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, TextField, Button, Grid, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function RentedInformationModal({ open, onClose, rentedInformation, vehicleInfo }) {
    const [formData, setFormData] = useState({
        rentedPerson: '',
        nic: '',
        address: '',
        mobile: '',
        vehicleId: '',
        rentalStatus: ''
    });

    useEffect(() => {
        if (rentedInformation && vehicleInfo) {
            const rentalStatusText = vehicleInfo.rentalStatus ? 'Rented' : 'Released';

            setFormData({
                rentedPerson: rentedInformation.rentedPerson || '',
                nic: rentedInformation.nic || '', // Use 'nic' here
                address: rentedInformation.address || '',
                mobile: rentedInformation.mobile || '',
                vehicleId: rentedInformation.vehicleId || '',
                rentalStatus: rentalStatusText
            });
        }
    }, [rentedInformation, vehicleInfo]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleStatusChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            rentalStatus: value
        });
    };

    const handleUpdate = () => {
        const rentalStatusBoolean = formData.rentalStatus === 'Rented';
        const hasChanges = Object.keys(formData).some(key => formData[key] !== (vehicleInfo[key] || ''));

        const updatePromises = [];

        // Update rentalStatus if it has changed
        if (vehicleInfo.rentalStatus !== rentalStatusBoolean) {
            const updatedVehicle = {
                ...vehicleInfo,
                rentalStatus: rentalStatusBoolean
            };
            updatePromises.push(
                axios.put('http://localhost:8080/vehicle/update', updatedVehicle)
                    .then(response => console.log('Vehicle updated:', response.data))
                    .catch(error => console.error('Error updating vehicle:', error))
            );
        }

        // Update other fields if they have changed
        if (hasChanges) {
            const updatedRentedInformation = {
                ...rentedInformation,
                rentedPerson: formData.rentedPerson,
                nic: formData.nic, // Use 'nic' here
                address: formData.address,
                mobile: formData.mobile,
                vehicleId: formData.vehicleId
            };
            updatePromises.push(
                axios.put('http://localhost:8080/rentedInformation/update', updatedRentedInformation)
                    .then(response => console.log('Rented Information updated:', response.data))
                    .catch(error => console.error('Error updating rented information:', error))
            );
        }

        // Send requests simultaneously
        Promise.all(updatePromises)
            .then(() => {
                console.log('All updates completed');
                onClose();
            })
            .catch(error => console.error('Error with one or more update requests:', error));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ pt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Rented Person"
                            name="rentedPerson"
                            value={formData.rentedPerson}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="NIC"
                            name="nic" // Use 'nic' here
                            value={formData.nic}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Vehicle ID"
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="rental-status-label">Rental Status</InputLabel>
                            <Select
                                labelId="rental-status-label"
                                id="rental-status"
                                value={formData.rentalStatus}
                                onChange={handleStatusChange}
                                label="Rental Status"
                            >
                                <MenuItem value="Released">Released</MenuItem>
                                <MenuItem value="Rented">Rented</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RentedInformationModal;
