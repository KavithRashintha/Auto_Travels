import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

function RentedInformationModal({ open, onClose, rentedInformation, vehicleInfo, onAdd }) {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(vehicleInfo ? vehicleInfo.id : '');
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

    const handleAdd = () => {
        if (onAdd) {
            onAdd(selectedVehicle);
        }
        onClose();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {/*<DialogTitle>Rented Information</DialogTitle>*/}
            <DialogContent>
                <div>
                    <TextField
                        margin="dense"
                        label="Rented Person"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={rentedInformation?.rentedPerson || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="NIC"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={rentedInformation?.nic || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={rentedInformation?.address || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ mb: 2 }}  // margin-bottom for 16px gap
                    />
                    <TextField
                        margin="dense"
                        label="Mobile"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={rentedInformation?.mobile || ''}
                        InputProps={{
                            readOnly: true,
                        }}
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
