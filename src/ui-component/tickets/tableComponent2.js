import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TableComponent2 = ({ data, status, fixedRows }) => {
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchTableData = () => {
        const filteredData = data.filter((item) => item.status === status);
        setTableData(filteredData);
    };

    useEffect(() => {
        fetchTableData();
    }, [status, data]);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (option) => () => {
        setSelectedOption(option);
        setAnchorEl(null);
    };
    const renderActions = (item) => (
        <div>
            <Button variant="contained" onClick={handleMenuClick} sx={{ boxShadow: 'none' }} endIcon={<ArrowDropDownIcon />}>
                {selectedOption || 'Preview'}
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={handleMenuItemClick('Preview')}>Preview</MenuItem>
                <MenuItem onClick={handleMenuItemClick('Update')}>Update</MenuItem>
            </Menu>
        </div>
    );

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Event Name</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Ticket Type</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Added Date</TableCell>
                            <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(tableData.length > 0
                            ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : new Array(fixedRows).fill({}).map((_, index) => (
                                  <TableRow key={index}>
                                      <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                      <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>&nbsp;</TableCell>
                                  </TableRow>
                              ))
                        ).map((item) => (
                            <TableRow key={item.id}>
                                <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{item.event_name}</TableCell>
                                <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{item.tickettype}</TableCell>
                                <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{item.created_at}</TableCell>
                                <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }}>{renderActions(item)}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell style={{ fontSize: '0.9rem', padding: '6px 12px' }} colSpan={9} />
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

export default TableComponent2;
