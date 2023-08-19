import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    TableRow,
    TableFooter,
    FormControl,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import { useTheme } from '@mui/system';

const CustomerTable = ({ columns, rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, setSelectedRow }) => {
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const [filterValue, setFilterValue] = React.useState('All');

    const handleFilterChange = (event) => {
        setFilterValue(event.target.value);
        handleChangePage(null, 0);
    };

    const customSort = (filterValue) => (a, b) => {
        if (filterValue === 'new') {
            if (a.status === 'new' && b.status !== 'new') return -1;
            if (a.status !== 'new' && b.status === 'new') return 1;
        } else if (filterValue === 'answered') {
            if (a.status === 'answered' && b.status !== 'answered') return -1;
            if (a.status !== 'answered' && b.status === 'answered') return 1;
        }
        return 0;
    };

    const getSortedRows = () => {
        if (filterValue === 'All') return rows;
        return [...rows].sort(customSort(filterValue));
    };

    const sortedRows = getSortedRows();

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <TableContainer sx={{}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{ height: '10px' }}>
                            <TableCell colSpan={columns.length} align="right" sx={{ background: '#FDBA16' }}>
                                <FormControl sx={{ m: 0, width: 90, textAlign: 'left', overflow: 'hidden' }} size="small">
                                    <Select value={filterValue} onChange={handleFilterChange} inputProps={{ 'aria-label': 'filter' }}>
                                        <MenuItem value="All">
                                            <em>All</em>
                                        </MenuItem>

                                        <MenuItem value="new">New</MenuItem>
                                        <MenuItem value="answered">Answered</MenuItem>
                                    </Select>
                                </FormControl>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id} hover onClick={() => handleRowClick(row)}>
                                {columns.map((column) => {
                                    if (column.id === 'status') {
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {row[column.id] === 'new' ? (
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            background: '#FF6767',
                                                            color: '#000000',
                                                            padding: '5px 13px',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: '#FF6767'
                                                            }
                                                        }}
                                                    >
                                                        New
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            display: 'inline-block',
                                                            padding: '6px 14px',
                                                            borderRadius: '4px',
                                                            backgroundColor: '#BFFFC6',
                                                            color: '#000000',
                                                            cursor: 'default',
                                                            '&:hover': {
                                                                backgroundColor: '#BFFFC6'
                                                            }
                                                        }}
                                                    >
                                                        Answered
                                                    </Typography>
                                                )}
                                            </TableCell>
                                        );
                                    }
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof row[column.id] === 'number'
                                                ? column.format(row[column.id])
                                                : row[column.id]}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                colSpan={columns.length}
                                count={sortedRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page'
                                    },
                                    native: false
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CustomerTable;
