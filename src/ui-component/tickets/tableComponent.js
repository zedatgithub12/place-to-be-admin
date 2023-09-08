import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from 'react-router';

const TableComponent = ({ data, status, fixedRows, searchQuery }) => {
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate();

    const fetchTableData = () => {
        const filteredData = data.filter((item) => {
            const matchesStatus = item.status === status;
            const matchesSearch = item.event_name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesStatus && matchesSearch;
        });
        setTableData(filteredData);
    };

    useEffect(() => {
        fetchTableData();
    }, [status, data, searchQuery]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderActions = (item) => (
        <IconButton>
            <MoreVertIcon />
        </IconButton>
    );

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>ID</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Event Name</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Organizer</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Ticket Type</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Quantity</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Price</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Sold</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Added Date</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(tableData.length > 0
                            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : new Array(fixedRows).fill({}).map((_, index) => (
                                  <TableRow key={index}>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                  </TableRow>
                              ))
                        ).map((item) => (
                            <TableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                onClick={() => navigate('/ticket-detail', { state: { ...item } })}
                            >
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.id}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.event_name}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.username}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.tickettype}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.quantity}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.price}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.sold}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{item.created_at}</TableCell>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }}>{renderActions(item)}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell style={{ fontSize: '0.8rem', padding: '6px 12px' }} colSpan={9} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default TableComponent;
