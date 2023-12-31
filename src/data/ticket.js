const tabData = [
    {
        id: 1,
        ticketid: 'TICKET002',
        event_id: 'EVENT002',
        userId: 'USER002',
        event_name: 'Summer Concert',
        tickettype: 'VIP',
        quantity: 100,
        price: 500,
        sold: 20,
        date: '2023-08-15',
        time: '12:00',
        status: 'sold out',
        p_gateway: 'Stripe',
        transactionId: 'TRANS002',
        username: 'Jane Smith',
        phone: '987-654-3210',
        created_at: '2023-08-10',
        updated_at: '2023-08-11'
    },
    {
        id: 2,
        ticketid: 'TICKET003',
        event_id: 'EVENT003',
        userId: 'USER003',
        event_name: 'Rock Festival',
        tickettype: 'Regular',
        quantity: 200,
        price: 250,
        sold: 150,
        date: '2023-09-05',
        time: '12:00',
        status: 'active',
        p_gateway: 'PayPal',
        transactionId: 'TRANS003',
        username: 'John Doe',
        phone: '123-456-7890',
        created_at: '2023-07-25',
        updated_at: '2023-08-09'
    },
    {
        id: 3,
        ticketid: 'TICKET004',
        event_id: 'EVENT002',
        userId: 'USER004',
        event_name: 'Summer Concert',
        tickettype: 'Regular',
        quantity: 100,
        price: 300,
        sold: 80,
        date: '2023-08-15',
        time: '12:00',
        status: 'active',
        p_gateway: 'Stripe',
        transactionId: 'TRANS004',
        username: 'Alice Johnson',
        phone: '555-123-4567',
        created_at: '2023-07-30',
        updated_at: '2023-08-10'
    },
    {
        id: 4,
        ticketid: 'TICKET005',
        event_id: 'EVENT004',
        userId: 'USER005',
        event_name: 'Comedy Night',
        tickettype: 'Early Bird',
        quantity: 50,
        price: 150,
        sold: 40,
        date: '2023-08-20',
        time: '12:00',
        status: 'active',
        p_gateway: 'Stripe',
        transactionId: 'TRANS005',
        username: 'Michael Brown',
        phone: '777-888-9999',
        created_at: '2023-07-20T',
        updated_at: '2023-08-08T'
    },
    {
        id: 5,
        ticketid: 'TICKET006',
        event_id: 'EVENT005',
        userId: 'USER006',
        event_name: 'Art Exhibition',
        tickettype: 'Student',
        quantity: 200,
        price: 100,
        sold: 120,
        date: '2023-08-25',
        time: '12:00',
        status: 'pending',
        p_gateway: 'PayPal',
        transactionId: 'TRANS006',
        username: 'Sophia Wilson',
        phone: '222-333-4444',
        created_at: '2023-07-15T',
        updated_at: '2023-08-07T'
    }
];

export default tabData;

export const TicketType = [
    {
        id: '1',
        name: 'Early Bird',
        icon: 'bird'
    },
    {
        id: '2',
        name: 'Regular',
        icon: 'ticket'
    },
    {
        id: '3',
        name: 'VIP',
        icon: 'star-outline'
    },
    {
        id: '4',
        name: 'VVIP',
        icon: 'star-shooting-outline'
    },
    {
        id: '5',
        name: 'Student',
        icon: 'book-education-outline'
    },
    {
        id: '6',
        name: 'Kids',
        icon: 'baby-face-outline'
    },
    {
        id: '7',
        name: 'Adult',
        icon: 'face-man'
    },
    {
        id: '8',
        name: 'Member',
        icon: 'account-group-outline'
    }
];

export const TicketStatuses = [
    {
        id: 1,
        label: 'Approve',
        value: 1,
        color: '#00aa00'
    },
    {
        id: 2,
        label: 'Save as Draft',
        value: 0,
        color: '#808080'
    },
    {
        id: 3,
        label: 'Sold Out',
        value: 2,
        color: '#808080'
    },
    {
        id: 4,
        label: 'Declined',
        value: 3,
        color: '#aa0000'
    }
];
