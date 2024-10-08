import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import VehicleModal from '../components/modals/viewVehicle';
import AddVehicleModal from '../components/modals/addVehicle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '1350px',
    margin: 'auto',
}));

function VehicleInformation() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false); // State for Add Vehicle Modal

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('http://localhost:8080/vehicle/getAll')
            .then(response => {
                setVehicles(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicle data:', error);
            });
    };

    const handleViewClick = (vehicleId) => {
        axios.get(`http://localhost:8080/vehicle/get/${vehicleId}`)
            .then(response => {
                setSelectedVehicle(response.data);
                setModalOpen(true);
            })
            .catch(error => {
                console.error('Error fetching vehicle details:', error);
            });
    };

    const handleDelete = (vehicleId) => {
        axios.delete(`http://localhost:8080/vehicle/delete/${vehicleId}`)
            .then(response => {
                console.log('Vehicle deleted:', response.data);
                fetchVehicles(); // Reload data after successful deletion
            })
            .catch(error => {
                console.error('There was an error deleting the vehicle:', error);
            });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenAddModal = () => {
        setAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setAddModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginTop: '14px' }}>
                <h1 style={{ color: '#4834d4', fontSize: '32px', fontFamily: 'Inter', marginLeft: '68px' }}>
                    Vehicle Information
                </h1>
                <Button
                    variant="contained"
                    sx={{
                        marginLeft: 'auto',
                        fontSize: '11px',
                        padding: '8px 14px',
                        marginRight: '70px',
                        backgroundColor: '#22a6b3',
                        color: 'white'
                    }}
                    onClick={handleOpenAddModal}
                >
                    Add Vehicle
                </Button>
            </div>
            <StyledTableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ paddingLeft: '16px' }}>ID</StyledTableCell>
                            <StyledTableCell align="center">Brand</StyledTableCell>
                            <StyledTableCell align="center">Model</StyledTableCell>
                            <StyledTableCell align="center">Year</StyledTableCell>
                            <StyledTableCell align="center">Millage</StyledTableCell>
                            <StyledTableCell align="center">Vehicle Number</StyledTableCell>
                            <StyledTableCell align="center">Rental Status</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <StyledTableRow key={vehicle.id}>
                                <StyledTableCell align="center">{vehicle.id}</StyledTableCell>
                                <StyledTableCell align="center">{vehicle.brand}</StyledTableCell>
                                <StyledTableCell align="center">{vehicle.model}</StyledTableCell>
                                <StyledTableCell align="center">{vehicle.year}</StyledTableCell>
                                <StyledTableCell align="center">{vehicle.millage}</StyledTableCell>
                                <StyledTableCell align="center">{vehicle.vehicleNumber}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {vehicle.rentalStatus ? 'Rented' : 'Available'}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ fontSize: '9px', padding: '8px 14px' }}
                                        onClick={() => handleViewClick(vehicle.id)}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        style={{ fontSize: '9px', padding: '8px 14px', marginLeft: '8px' }}
                                        onClick={() => handleDelete(vehicle.id)}
                                    >
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            {selectedVehicle && (
                <VehicleModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    vehicle={selectedVehicle}
                />
            )}

            <AddVehicleModal
                open={addModalOpen}
                onClose={handleCloseAddModal}
                onSuccess={fetchVehicles} // Reload data after successful addition
            />
        </div>
    );
}

export default VehicleInformation;
