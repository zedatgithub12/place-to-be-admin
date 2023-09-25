import { DateFormater } from 'utils/functions';

export const SupportColumns = [
    { field: 'id', headerName: 'ID', width: 90 },

    {
        field: 'name',
        headerName: 'Name',
        type: 'name',
        width: 200
    },
    {
        field: 'email',
        headerName: 'Email',
        type: 'email',
        width: 240
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
            if (params.value == 0) {
                return 'New';
            } else {
                return 'Answered';
            }
        },
        width: 120
    }
];
