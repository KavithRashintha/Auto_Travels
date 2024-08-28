import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

function RentedInformationModal({ open, onClose, rentedInformation, vehicleInfo, onAdd }) {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(vehicleInfo ? vehicleInfo.id : '');
    const [rentedPerson, setRentedPerson] = useState(rentedInformation?.rentedPerson || '');
    const [nic, setNic] = useState(rentedInformation?.nic || '');
    const [address, setAddress] = useState(rentedInformation?.address || '');
    const [mobile, setMobile] = useState(rentedInformation?.mobile || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchAvailableVehicles();
        }
    }, [open]);

    const fetchAvailableVehicles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/vehicle/available');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching available vehicles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVehicleChange = (event) => {
        setSelectedVehicle(event.target.value);
    };

    const handleAdd = async () => {
        const newRentedInformation = {
            rentedPerson,
            nic,
            address,
            mobile,
            vehicleId: selectedVehicle
        };

        try {
            // Create rentedInformation record
            await axios.post('http://localhost:8080/rentedInformation/add', newRentedInformation);

            // Find the selected vehicle details
            const selectedVehicleDetails = vehicles.find(vehicle => vehicle.id === selectedVehicle);

            // Update vehicle rentalStatus and send the complete vehicle object
            await axios.put(`http://localhost:8080/vehicle/update`, {
                ...selectedVehicleDetails, // Spread the existing vehicle details
                rentalStatus: true, // Update the rentalStatus
            });

            // Notify parent component
            if (onAdd) {
                onAdd(selectedVehicle);
            }

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error adding rented information:', error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Rented Information</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        margin="dense"
                        label="Rented Person"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={rentedPerson}
                        onChange={(e) => setRentedPerson(e.target.value)}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="NIC"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="Vehicle"
                        fullWidth
                        select
                        variant="outlined"
                        size="small"
                        value={selectedVehicle}
                        onChange={handleVehicleChange}
                        disabled={loading}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    >
                        {loading ? (
                            <MenuItem disabled>
                                <CircularProgress size={24} />
                            </MenuItem>
                        ) : (
                            vehicles.map((vehicle) => (
                                <MenuItem key={vehicle.id} value={vehicle.id}>
                                    {`${vehicle.brand} ${vehicle.model} - ${vehicle.year}`}
                                </MenuItem>
                            ))
                        )}
                    </TextField>
                </div>
            </DialogContent>
            <DialogActions sx={{ pr: 2 }}>
                <Button onClick={handleClose} color="primary" sx={{ fontSize: '12px', pr: 2, pb: 2, pt: 2, pl: 2 }}>
                    Close
                </Button>
                <Button onClick={handleAdd} color="primary" sx={{ fontSize: '12px', pr: 2, pb: 2, pt: 2, pl: 2 }}>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RentedInformationModal;
