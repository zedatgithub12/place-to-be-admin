import { useTheme } from '@mui/material';

export const ArrivalTime = () => {
    const d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    var time;
    if (hour > 12) {
        time = hour - 12 + ':' + minute + ' pm';
    } else if (hour == 12) {
        time = hour + ':' + minute + ' pm';
    } else {
        time = hour + ':' + minute + ' am';
    }

    return time;
};

export const DateFormater = (startingDate) => {
    var date = new Date(startingDate);
    let day = date.getDay();
    let month = date.getMonth();
    let happeningDay = date.getDate();

    // return weekname
    var weekday = new Array(7);
    weekday[1] = 'Mon, ';
    weekday[2] = 'Tue, ';
    weekday[3] = 'Wed, ';
    weekday[4] = 'Thu, ';
    weekday[5] = 'Fri, ';
    weekday[6] = 'Sat, ';
    weekday[0] = 'Sun, ';

    //an array of month name
    var monthName = new Array(12);
    monthName[1] = 'Jan';
    monthName[2] = 'Feb';
    monthName[3] = 'Mar';
    monthName[4] = 'Apr';
    monthName[5] = 'May';
    monthName[6] = 'Jun';
    monthName[7] = 'Jul';
    monthName[8] = 'Aug';
    monthName[9] = 'Sep';
    monthName[10] = 'Oct';
    monthName[11] = 'Nov';
    monthName[12] = 'Dec';

    return weekday[day] + monthName[month + 1] + ' ' + happeningDay;
};

export const TimeFormater = (eventTime) => {
    var time = eventTime;
    var result = time.slice(0, 2);
    var minute = time.slice(3, 5);
    var globalTime;
    var postMeridian;
    var separator = ':';
    if (result > 12) {
        postMeridian = result - 12;
        globalTime = 'PM';
    } else {
        postMeridian = result;
        globalTime = 'AM';
    }

    return postMeridian + separator + minute + ' ' + globalTime;
};

export const EntranceFee = (price) => {
    var eventPrice;
    var free = 'Free';
    var currency = ' ETB';
    if (price != null) {
        eventPrice = price + currency;
    } else {
        eventPrice = free;
    }
    return eventPrice;
};

export const CategoryColor = (category) => {
    var color;
    switch (category) {
        case 'Entertainment':
            color = '#007bc2';
            break;
        case 'Travelling':
            color = '#0c790c';
            break;

        case 'Cinema & Theater':
            color = '#00e8e0';
            break;

        case 'Community':
            color = '#F96666';
            break;
        case 'Trade Fairs & Expo':
            color = '#f57a00';
            break;
        case 'Nightlife':
            color = '#472D2D';
            break;
        case 'Professional':
            color = '#2c2e27';
            break;
        case 'Shopping':
            color = '#9306c2';
            break;
        case 'Sport':
            color = '#ff0571';
            break;
        case 'Others':
            color = '#e8b200';
            break;
        default:
            color = '#ffbb00';
    }
    return color;
};

export const Status = (Tstatus) => {
    var ticketStatus;

    switch (Tstatus) {
        case 0:
            ticketStatus = 'Pending';
            break;

        case 1:
            ticketStatus = 'Upcoming';
            break;

        case 2:
            ticketStatus = 'Attended';
            break;

        case 3:
            ticketStatus = 'Expired';
            break;

        default:
            ticketStatus = 'Cancelled';
    }
    return ticketStatus;
};

export const StatusText = (textColor) => {
    var StatusColor;

    switch (textColor) {
        case 0:
            StatusColor = '#787878';
            break;

        case 1:
            StatusColor = '#0075FF';
            break;

        case 'active':
            StatusColor = '#007500';
            break;

        case 'used':
            StatusColor = '#787878';
            break;

        case 'cancelled':
            StatusColor = '#ff3d4d';
            break;

        case 2:
            StatusColor = '#ff3d4d';
            break;

        case 3:
            StatusColor = '#787878';
            break;

        default:
            StatusColor = '#787878';
    }
    return StatusColor;
};

export const discount = (current, origional) => {
    var discount = origional - current;

    if (discount > 0) {
        return origional + ' Birr';
    } else {
        return discount;
    }
};

export const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formattedDate = (date) => {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatNumber = (number) => {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
};

export const TicketName = (iconname) => {
    var name;
    switch (iconname) {
        case 'Early Bird':
            name = 'bird';
            break;

        case 'Regular':
            name = 'ticket';
            break;

        case 'VIP':
            name = 'star-outline';
            break;

        case 'VVIP':
            name = 'star-shooting-outline';
            break;

        case 'Student':
            name = 'book-education-outline';
            break;

        case 'Kids':
            name = 'baby-face-outline';
            break;

        case 'Adult':
            name = 'face-man';
            break;

        case 'Member':
            name = 'account-group-outline';
            break;

        default:
            name = 'ticket';
    }
    return name;
};

export const TicketColor = (iconname) => {
    var Color;

    switch (iconname) {
        case 'Early Bird':
            Color = '#ff24da';
            break;

        case 'Regular':
            Color = '#00a2ff';

            break;

        case 'VIP':
            Color = '#ffc800';

            break;

        case 'VVIP':
            Color = '#ffb300';

            break;

        case 'Student':
            Color = '#00c4de';

            break;

        case 'Kids':
            Color = '#ff3686';

            break;

        case 'Adult':
            Color = '#ff551c';

            break;

        case 'Member':
            Color = '#5fcc41';

            break;

        default:
            Color = '#ffbb00';
    }
    return Color;
};

export function HashEventId(eventId) {
    let hashedId = '';

    for (let i = 0; i < eventId.length; i++) {
        hashedId += eventId.charCodeAt(i).toString(16);
    }
    return hashedId;
}

export function ParseHashedId(hashedId) {
    let eventId = '';

    for (let i = 0; i < hashedId.length; i += 2) {
        eventId += String.fromCharCode(parseInt(hashedId.substr(i, 2), 16));
    }

    return eventId;
}

export function EventStatus(status) {
    var numericStatus = status;
    var literalStatus;
    var statusColor;
    switch (numericStatus) {
        case 0:
            literalStatus = 'Pending';
            statusColor = '#808080';
            break;
        case '1':
            literalStatus = 'Active';
            statusColor = '#00aa00';
            break;
        case '2':
            literalStatus = 'Declined';
            statusColor = '#ff0000';
            break;
        case '3':
            literalStatus = 'Cancelled';
            statusColor = '#aa0000';
            break;
        default:
            literalStatus = 'Pending';
            statusColor = '#808080';
            break;
    }

    return { literalStatus, statusColor };
}

export function TicketStatus(status) {
    var numericStatus = parseInt(status);
    var literalStatus;
    var statusColor;
    switch (numericStatus) {
        case 0:
            literalStatus = 'Pending';
            statusColor = '#808080';
            break;
        case 1:
            literalStatus = 'Active';
            statusColor = '#00aa00';
            break;
        case 2:
            literalStatus = 'Sold out';
            statusColor = '#808080';
            break;
        case 3:
            literalStatus = 'Declined';
            statusColor = '#aa0000';
            break;
        default:
            literalStatus = 'Pending';
            statusColor = '#808080';
            break;
    }

    return { literalStatus, statusColor };
}

export const AdsStatuses = (currentStatus) => {
    const theme = useTheme();
    var color;

    switch (currentStatus) {
        case 'draft':
            color = theme.palette.warning.dark;
            break;
        case 'Draft':
            color = theme.palette.warning.dark;
            break;
        case 'Pending':
            color = theme.palette.grey[400];
            break;
        case 'Active':
            color = theme.palette.success.dark;
            break;
        case 'Done':
            color = theme.palette.primary.dark;
            break;
        case 'Paused':
            color = theme.palette.grey[400];
            break;
        case 'Declined':
            color = theme.palette.error.dark;
            break;
        case 'Cancelled':
            color = theme.palette.error.dark;
            break;
        default:
            color = theme.palette.grey[400];
            break;
    }
    return color;
};
