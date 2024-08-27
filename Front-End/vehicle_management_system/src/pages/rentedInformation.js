import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

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

function RentedInformation() {
    const [rentedInfo, setRentedInfo] = useState([]);

    useEffect(() => {
        fetchRentedInformation();
    }, []);

    const fetchRentedInformation = () => {
        axios.get('http://localhost:8080/rentedInformation/all-with-status')
            .then(response => {
                const flattenedData = response.data.flat(); // Flatten the array of arrays
                setRentedInfo(flattenedData);
                console.log(flattenedData);
            })
            .catch(error => {
                console.error('Error fetching rented information data:', error);
            });
    };

    return (
        <div>
            <h1 style={{ color: '#4834d4', fontSize: '32px', fontFamily: 'Inter', marginLeft: '68px', marginTop: '14px' }}>
                Rented Information
            </h1>
            <StyledTableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="center">Rented Person</StyledTableCell>
                            <StyledTableCell align="center">NIC</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Mobile</StyledTableCell>
                            <StyledTableCell align="center">Vehicle ID</StyledTableCell>
                            <StyledTableCell align="center">Rental Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rentedInfo.map((info) => (
                            <StyledTableRow key={info.id}>
                                <StyledTableCell align="center">{info.id}</StyledTableCell>
                                <StyledTableCell align="center">{info.rentedPerson}</StyledTableCell>
                                <StyledTableCell align="center">{info.NIC}</StyledTableCell>
                                <StyledTableCell align="center">{info.address}</StyledTableCell>
                                <StyledTableCell align="center">{info.mobile}</StyledTableCell>
                                <StyledTableCell align="center">{info.vehicleId}</StyledTableCell>
                                <StyledTableCell align="center">{info.rentalStatus}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    );
}

export default RentedInformation;
