import React from 'react';
import { useLocation } from 'react-router';

function TicketDetail() {
    const { state } = useLocation();
    console.log(state);
    return (
        <div>
            <p>Ticket Detail</p>
        </div>
    );
}

export default TicketDetail;
