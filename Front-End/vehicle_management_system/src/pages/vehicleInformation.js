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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center', // Center-align text in header cells
        paddingRight: '32px', // Add right padding to header cells
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center', // Center-align text in body cells
        paddingRight: '32px', // Add right padding to body cells
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

    useEffect(() => {
        axios.get('http://localhost:8080/vehicle/getAll')
            .then(response => {
                setVehicles(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching vehicle data:', error);
            });
    }, []);

    return (
        <div>
            <h1 style={{ color: '#4834d4', fontSize: '32px', fontFamily: 'Inter', marginLeft: '64px', marginBottom: '36px' }}>
                Vehicle Information
            </h1>
            <StyledTableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{ paddingLeft: '12px' }}>ID</StyledTableCell>
                            <StyledTableCell>Brand</StyledTableCell>
                            <StyledTableCell>Model</StyledTableCell>
                            <StyledTableCell>Year</StyledTableCell>
                            <StyledTableCell>Millage</StyledTableCell>
                            <StyledTableCell>Vehicle Number</StyledTableCell>
                            <StyledTableCell>Rental Status</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vehicles.map((vehicle) => (
                            <StyledTableRow key={vehicle.id}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    style={{ paddingLeft: '32px' }} // Inline style for left padding in data cell
                                >
                                    {vehicle.id}
                                </TableCell>
                                <StyledTableCell>{vehicle.brand}</StyledTableCell>
                                <StyledTableCell>{vehicle.model}</StyledTableCell>
                                <StyledTableCell>{vehicle.year}</StyledTableCell>
                                <StyledTableCell>{vehicle.millage}</StyledTableCell>
                                <StyledTableCell>{vehicle.vehicleNumber}</StyledTableCell>
                                <StyledTableCell>
                                    {vehicle.rentalStatus ? 'Rented' : 'Available'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ fontSize: '8px', padding: '8px 14px 8px 14px' }} // Inline style for button text size
                                    >
                                        View
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    );
}

export default VehicleInformation;
