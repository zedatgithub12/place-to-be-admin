import dayjs from 'dayjs';

const myEvents = [
    {
        title: 'ddddddddd',
        description: 'eeeeeeeee',
        startDate: dayjs(Date.now()).format('DD-YYYY-MM'),
        endDate: dayjs(Date.now()).format('DD-YYYY-MM'),
        startTime: dayjs(Date.now()).format('hh:mm A'),
        endTime: dayjs(Date.now()).format('hh:mm A'),
        eventAddress: 'dddddd',
        eventCategory: 'fffffff',
        eventType: 'paid',
        regularPrice: '222',
        phones: [String],
        linkUrl: 'dfddddddddd',
        buttonLabel: 'register',
        poster: null
    }
];

export default myEvents;
