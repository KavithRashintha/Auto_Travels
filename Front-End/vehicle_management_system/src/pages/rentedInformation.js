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
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import RentedInformationModal from "../components/modals/viewRentedInformation"; // Ensure this path is correct
import AddRentedInformationModal from '../components/modals/addRentedInformation'; // Ensure this path is correct

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
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false); // State for Add Rented Information Modal
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading
    const [error, setError] = useState(null); // State for error

    useEffect(() => {
        fetchRentedInformation();
    }, []);

    const fetchRentedInformation = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.get('http://localhost:8080/rentedInformation/all-with-status');
            const flattenedData = response.data.flat();
            setRentedInfo(flattenedData);
        } catch (error) {
            setError('Error fetching rented information data.');
            console.error('Error fetching rented information data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewClick = async (infoId) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const response = await axios.get(`http://localhost:8080/rentedInformation/get/${infoId}`);
            setSelectedInfo(response.data);
            await getVehicleInfo(response.data.vehicleId);
            setModalOpen(true);
        } catch (error) {
            setError('Error fetching rented information details.');
            console.error('Error fetching rented information details:', error);
        } finally {
            setLoading(false);
        }
    };

    const getVehicleInfo = async (vehicleId) => {
        try {
            const response = await axios.get(`http://localhost:8080/vehicle/get/${vehicleId}`);
            setSelectedVehicle(response.data);
        } catch (error) {
            setError('Error fetching vehicle details.');
            console.error('Error fetching vehicle details:', error);
        }
    };

    const handleDelete = async (infoId) => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            await axios.delete(`http://localhost:8080/rentedInformation/delete/${infoId}`);
            fetchRentedInformation();
        } catch (error) {
            setError('Error deleting rented information.');
            console.error('Error deleting rented information:', error);
        } finally {
            setLoading(false);
        }
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
                    Rented Information
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
                    Add Rented Information
                </Button>
            </div>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
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
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rentedInfo.map((info) => (
                                    <StyledTableRow key={info.id}>
                                        <StyledTableCell align="center">{info.id}</StyledTableCell>
                                        <StyledTableCell align="center">{info.rentedPerson}</StyledTableCell>
                                        <StyledTableCell align="center">{info.nic}</StyledTableCell>
                                        <StyledTableCell align="center">{info.address}</StyledTableCell>
                                        <StyledTableCell align="center">{info.mobile}</StyledTableCell>
                                        <StyledTableCell align="center">{info.vehicleId}</StyledTableCell>
                                        <StyledTableCell align="center">{info.rentalStatus ? 'Rented' : 'Available'}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ fontSize: '9px', padding: '8px 14px' }}
                                                onClick={() => handleViewClick(info.id)}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                style={{ fontSize: '9px', padding: '8px 14px', marginLeft: '8px' }}
                                                onClick={() => handleDelete(info.id)}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </StyledTableContainer>
                </>
            )}
            {selectedInfo && (
                <RentedInformationModal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    rentedInformation={selectedInfo}
                    vehicleInfo={selectedVehicle}
                />
            )}
            <AddRentedInformationModal
                open={addModalOpen}
                onClose={handleCloseAddModal}
                onSuccess={fetchRentedInformation} // Reload data after successful addition
            />
        </div>
    );
}

export default RentedInformation;
