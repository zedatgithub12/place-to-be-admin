import { DateFormater } from 'utils/functions';

export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'google_Id',
        headerName: 'Google ID',
        width: 160
    },
    {
        field: 'first_name',
        headerName: 'First Name',
        type: 'name',
        width: 140
    },
    {
        field: 'middle_name',
        headerName: 'Middle Name',
        type: 'name',
        width: 140
    },
    {
        field: 'username',
        headerName: 'Username',
        type: 'name',
        width: 140
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        sortable: true,
        width: 240
    },
    {
        field: 'gender',
        headerName: 'Gender',
        type: 'gender',
        sortable: true,
        width: 160
    },
    {
        field: 'category',
        headerName: 'Category',
        sortable: true,
        width: 160
    },
    {
        field: 'phone',
        headerName: 'Phone',
        type: 'phone',
        sortable: true,
        width: 160
    },
    {
        field: 'created_at',
        headerName: 'Joined at',
        valueFormatter: (params) => {
            const formattedDate = DateFormater(params.value);
            return formattedDate;
        },
        width: 160
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        valueFormatter: (params) => {
            if (params.value == null || 0) {
                return 'Active';
            } else {
                return 'Inactive';
            }
        },
        width: 90
    }
];
