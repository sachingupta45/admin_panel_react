import React, { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Typography,
    Chip,
    TextField,
    InputAdornment,
    TablePagination,
} from '@mui/material';
import { Eye, Trash2, Search } from 'lucide-react';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
}

interface DataTableProps {
    title: string;
    columns: Column[];
    rows: any[];
    onDelete: (id: any) => void;
    onView: (id: any) => void;
    searchPlaceholder?: string;
}

const DataTable: React.FC<DataTableProps> = ({
    title,
    columns,
    rows,
    onDelete,
    onView,
    searchPlaceholder = "Search..."
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    // Filtering logic
    const filteredRows = useMemo(() => {
        const rowsArray = Array.isArray(rows) ? rows : [];
        if (!searchQuery) return rowsArray;
        const lowerQuery = searchQuery.toLowerCase();
        return rowsArray.filter((row) =>
            Object.keys(row).some((key) => {
                const value = row[key];
                return value && String(value).toLowerCase().includes(lowerQuery);
            })
        );
    }, [rows, searchQuery]);

    // Pagination logic
    const paginatedRows = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderCellContent = (row: any, columnId: string) => {
        const value = row[columnId];

        if (columnId === 'status') {
            const isActive = value === 'active' || value === 'Active';
            return (
                <Chip
                    label={value}
                    size="small"
                    sx={{
                        bgcolor: isActive ? '#f0fdf4' : '#fef2f2',
                        color: isActive ? '#16a34a' : '#dc2626',
                        fontWeight: 700,
                        fontSize: '0.7rem'
                    }}
                />
            );
        }

        return value;
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' }, gap: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
                        {filteredRows.length} records found
                    </Typography>
                </Box>

                <TextField
                    size="small"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: { xs: '100%', sm: 300 },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            bgcolor: 'white',
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={18} color="#94a3b8" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    overflowX: 'auto',
                    maxWidth: '100%',
                    '&::-webkit-scrollbar': {
                        height: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: '#f1f5f9',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: '#cbd5e0',
                        borderRadius: 3,
                        '&:hover': { bgcolor: '#94a3b8' }
                    },
                }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ bgcolor: '#f8fafc' }}>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        fontWeight: 700,
                                        color: '#64748b',
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        borderBottom: '2px solid #f1f5f9'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                align="right"
                                sx={{
                                    fontWeight: 700,
                                    color: '#64748b',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    borderBottom: '2px solid #f1f5f9'
                                }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow
                                key={row.id}
                                hover
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#f8fafc' }
                                }}
                            >
                                {columns.map((column) => (
                                    <TableCell key={column.id} sx={{ color: '#334155', fontWeight: 500, fontSize: '0.875rem' }}>
                                        {renderCellContent(row, column.id)}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => onView(row.id)}
                                            sx={{
                                                color: '#6366f1',
                                                bgcolor: '#f5f3ff',
                                                '&:hover': { bgcolor: '#ede9fe' }
                                            }}
                                        >
                                            <Eye size={16} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => onDelete(row.id)}
                                            sx={{
                                                color: '#ef4444',
                                                bgcolor: '#fef2f2',
                                                '&:hover': { bgcolor: '#fee2e2' }
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {paginatedRows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 8 }}>
                                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                                        No records found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ borderTop: '1px solid #f1f5f9' }}
                />
            </TableContainer>
        </Box>
    );
};

export default DataTable;
