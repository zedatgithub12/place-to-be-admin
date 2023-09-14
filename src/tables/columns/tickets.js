import { DateFormater } from 'utils/functions';

export const TicketColumns = [
    {
        field: 'id',
        headerName: 'ID'
    },
    {
        field: 'event_name',
        headerName: 'Event',
        width: 160
    },
    {
        field: 'tickettype',
        headerName: 'Ticket Type',
        width: 120
    },
    {
        field: 'currentprice',
        headerName: 'Selling Price(ETB)',
        width: 160
    },
    {
        field: 'origionalamount',
        headerName: 'Total Quantity',
        width: 120
    },
    {
        field: 'currentamount',
        headerName: 'Available Quantity',
        width: 160
    },
    {
        field: 'addeddate',
        headerName: 'Added On',
        valueFormatter: (params) => {
            const formattedDate = DateFormater(params.value);
            return formattedDate;
        },
        width: 120
    },
    {
        field: 'expiredate',
        headerName: 'Expire On',
        valueFormatter: (params) => {
            const formattedDate = DateFormater(params.value);
            return formattedDate;
        },
        width: 120
    },
    {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        valueFormatter: (params) => {
            if (params.value == 1) {
                return 'Active';
            } else if (params.value == 2) {
                return 'Soldout';
            } else if (params.value == 3) {
                return 'Declined';
            } else {
                return 'Pending';
            }
        },
        width: 100
    }
];
