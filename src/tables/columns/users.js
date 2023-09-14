import { DateFormater } from 'utils/functions';

export const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'google_Id',
        headerName: 'Google ID'
    },
    {
        field: 'first_name',
        headerName: 'First Name',
        type: 'name'
    },
    {
        field: 'middle_name',
        headerName: 'Middle Name',
        type: 'name'
    },
    {
        field: 'username',
        headerName: 'Username',
        type: 'name'
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        sortable: true
    },
    {
        field: 'gender',
        headerName: 'Gender',
        type: 'gender',
        sortable: true
    },
    {
        field: 'category',
        headerName: 'Category',
        sortable: true
    },
    {
        field: 'phone',
        headerName: 'Phone',
        type: 'phone',
        sortable: true
    },
    {
        field: 'created_at',
        headerName: 'Joined at',
        valueFormatter: (params) => {
            const formattedDate = DateFormater(params.value);
            return formattedDate;
        }
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
        }
    }
];
