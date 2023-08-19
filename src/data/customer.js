const customers = [
    {
        id: 1,
        name: 'john Doe',
        email: 'johndoe@gmail.com',
        message: 'How can I create an event on the website or app?',
        date: '09-12-2023',
        status: 'new'
    },
    {
        id: 2,
        name: 'john Doe',
        email: 'johndoe@gmail.com',
        message: 'How can I create an event on the website or app?',
        date: '09-12-2023',
        status: 'answered'
    },
    {
        id: 3,
        name: 'Jane Smith',
        email: 'janesmith@gmail.com',
        message: 'How do I purchase tickets for an event?',
        date: '10-12-2023',
        status: 'new'
    },
    {
        id: 4,
        name: 'Jane Smith',
        email: 'janesmith@gmail.com',
        message: 'How do I purchase tickets for an event?',
        date: '10-12-2023',
        status: 'answered'
    },
    {
        id: 5,
        name: 'Michael Johnson',
        email: 'michaeljohnson@gmail.com',
        message: 'Can I cancel or refund my event ticket?',
        date: '11-12-2023',
        status: 'new'
    },
    {
        id: 6,
        name: 'Michael Johnson',
        email: 'michaeljohnson@gmail.com',
        message: 'Can I cancel or refund my event ticket?',
        date: '11-12-2023',
        status: 'answered'
    },
    {
        id: 7,
        name: 'Emily Williams',
        email: 'emilywilliams@gmail.com',
        message: 'How Can I buy ticket?',
        date: '12-12-2023',
        status: 'new'
    },
    {
        id: 8,
        name: 'Emily Williams',
        email: 'emilywilliams@gmail.com',
        message: 'How Can I buy ticket?',
        date: '12-12-2023',
        status: 'answered'
    },
    {
        id: 9,
        name: 'William Brown',
        email: 'williambrown@gmail.com',
        message: 'Is there an age restriction for attending events?',
        date: '13-12-2023',
        status: 'new'
    },
    {
        id: 10,
        name: 'William Brown',
        email: 'williambrown@gmail.com',
        message: 'Is there an age restriction for attending events?',
        date: '13-12-2023',
        status: 'answered'
    },
    {
        id: 11,
        name: 'Sophia Miller',
        email: 'sophiamiller@gmail.com',
        message: 'What payment methods are accepted?',
        date: '14-12-2023',
        status: 'new'
    },
    {
        id: 12,
        name: 'Sophia Miller',
        email: 'sophiamiller@gmail.com',
        message: 'What payment methods are accepted?',
        date: '14-12-2023',
        status: 'answered'
    },
    {
        id: 13,
        name: 'James Wilson',
        email: 'jameswilson@gmail.com',
        message: 'How do I reset my account password?',
        date: '15-12-2023',
        status: 'new'
    },
    {
        id: 14,
        name: 'James Wilson',
        email: 'jameswilson@gmail.com',
        message: 'How do I reset my account password?',
        date: '15-12-2023',
        status: 'answered'
    },
    {
        id: 15,
        name: 'Olivia Taylor',
        email: 'oliviataylor@gmail.com',
        message: 'Can I transfer my ticket to someone else?',
        date: '16-12-2023',
        status: 'new'
    },
    {
        id: 16,
        name: 'Olivia Taylor',
        email: 'oliviataylor@gmail.com',
        message: 'Can I transfer my ticket to someone else?',
        date: '16-12-2023',
        status: 'answered'
    },
    {
        id: 17,
        name: 'Ethan Anderson',
        email: 'ethananderson@gmail.com',
        message: "What should I do if I haven't received my ticket confirmation email?",
        date: '17-12-2023',
        status: 'new'
    },
    {
        id: 18,
        name: 'Ethan Anderson',
        email: 'ethananderson@gmail.com',
        message: "What should I do if I haven't received my ticket confirmation email?",
        date: '17-12-2023',
        status: 'answered'
    },
    {
        id: 19,
        name: 'Ava Martinez',
        email: 'avamartinez@gmail.com',
        message: 'Are tickets refundable if the event is canceled?',
        date: '18-12-2023',
        status: 'new'
    },
    {
        id: 20,
        name: 'Ava Martinez',
        email: 'avamartinez@gmail.com',
        message: 'Are tickets refundable if the event is canceled?',
        date: '18-12-2023',
        status: 'answered'
    },
    {
        id: 21,
        name: 'Noah Hernandez',
        email: 'noahhernandez@gmail.com',
        message: 'Can I upgrade my ticket to a VIP pass?',
        date: '19-12-2023',
        status: 'new'
    },
    {
        id: 22,
        name: 'Noah Hernandez',
        email: 'noahhernandez@gmail.com',
        message: 'Can I upgrade my ticket to a VIP pass?',
        date: '19-12-2023',
        status: 'answered'
    },
    {
        id: 23,
        name: 'Isabella Robinson',
        email: 'isabellarobinson@gmail.com',
        message: 'How can I contact customer support?',
        date: '20-12-2023',
        status: 'new'
    },
    {
        id: 24,
        name: 'Isabella Robinson',
        email: 'isabellarobinson@gmail.com',
        message: 'How can I contact customer support?',
        date: '20-12-2023',
        status: 'answered'
    },
    {
        id: 25,
        name: 'Mason Clark',
        email: 'masonclark@gmail.com',
        message: 'Is there a limit to the number of tickets I can purchase?',
        date: '21-12-2023',
        status: 'new'
    },
    {
        id: 26,
        name: 'Mason Clark',
        email: 'masonclark@gmail.com',
        message: 'Is there a limit to the number of tickets I can purchase?',
        date: '21-12-2023',
        status: 'answered'
    },
    {
        id: 27,
        name: 'Mia Lewis',
        email: 'mialewis@gmail.com',
        message: 'What do I need to bring to the event?',
        date: '22-12-2023',
        status: 'new'
    },
    {
        id: 28,
        name: 'Mia Lewis',
        email: 'mialewis@gmail.com',
        message: 'What do I need to bring to the event?',
        date: '22-12-2023',
        status: 'answered'
    },
    {
        id: 29,
        name: 'Sebastian Lee',
        email: 'sebastianlee@gmail.com',
        message: "Can I get a refund if I can't attend the event?",
        date: '23-12-2023',
        status: 'new'
    },
    {
        id: 30,
        name: 'Sebastian Lee',
        email: 'sebastianlee@gmail.com',
        message: "Can I get a refund if I can't attend the event?",
        date: '23-12-2023',
        status: 'answered'
    },
    {
        id: 31,
        name: 'Harper Walker',
        email: 'harperwalker@gmail.com',
        message: 'Are all events open to people from any location?',
        date: '24-12-2023',
        status: 'new'
    },
    {
        id: 32,
        name: 'Harper Walker',
        email: 'harperwalker@gmail.com',
        message: 'Are all events open to people from any location?',
        date: '24-12-2023',
        status: 'answered'
    },
    {
        id: 33,
        name: 'Evelyn Hall',
        email: 'evelynhall@gmail.com',
        message: 'How can I leave a review for an event I attended?',
        date: '25-12-2023',
        status: 'new'
    },
    {
        id: 34,
        name: 'Evelyn Hall',
        email: 'evelynhall@gmail.com',
        message: 'How can I leave a review for an event I attended?',
        date: '25-12-2023',
        status: 'answered'
    },
    {
        id: 35,
        name: 'Oliver Allen',
        email: 'oliverallen@gmail.com',
        message: 'What happens if the event date or location changes?',
        date: '26-12-2023',
        status: 'new'
    },
    {
        id: 36,
        name: 'Oliver Allen',
        email: 'oliverallen@gmail.com',
        message: 'What happens if the event date or location changes?',
        date: '26-12-2023',
        status: 'answered'
    },
    {
        id: 37,
        name: 'Amelia Young',
        email: 'ameliayoung@gmail.com',
        message: 'How early should I arrive at the event?',
        date: '27-12-2023',
        status: 'new'
    },
    {
        id: 38,
        name: 'Amelia Young',
        email: 'ameliayoung@gmail.com',
        message: 'How early should I arrive at the event?',
        date: '27-12-2023',
        status: 'answered'
    },
    {
        id: 39,
        name: 'Henry Scott',
        email: 'henryscott@gmail.com',
        message: 'Can I get a refund for a partially used ticket?',
        date: '28-12-2023',
        status: 'new'
    },
    {
        id: 40,
        name: 'Henry Scott',
        email: 'henryscott@gmail.com',
        message: 'Can I get a refund for a partially used ticket?',
        date: '28-12-2023',
        status: 'answered'
    },
    {
        id: 41,
        name: 'Elizabeth King',
        email: 'elizabethking@gmail.com',
        message: 'What should I do if I lost my event ticket?',
        date: '29-12-2023',
        status: 'new'
    },
    {
        id: 42,
        name: 'Elizabeth King',
        email: 'elizabethking@gmail.com',
        message: 'What should I do if I lost my event ticket?',
        date: '29-12-2023',
        status: 'answered'
    },
    {
        id: 43,
        name: 'Daniel Green',
        email: 'danielgreen@gmail.com',
        message: 'Are there any discounts available for group bookings?',
        date: '30-12-2023',
        status: 'new'
    },
    {
        id: 44,
        name: 'Daniel Green',
        email: 'danielgreen@gmail.com',
        message: 'Are there any discounts available for group bookings?',
        date: '30-12-2023',
        status: 'answered'
    },
    {
        id: 45,
        name: 'Sofia Hill',
        email: 'sofiahill@gmail.com',
        message: 'Can I change the name on my event ticket?',
        date: '31-12-2023',
        status: 'new'
    },
    {
        id: 46,
        name: 'Sofia Hill',
        email: 'sofiahill@gmail.com',
        message: 'Can I change the name on my event ticket?',
        date: '31-12-2023',
        status: 'answered'
    },
    {
        id: 47,
        name: 'Aiden Baker',
        email: 'aidenbaker@gmail.com',
        message: 'Do I need to create an account to purchase tickets?',
        date: '01-01-2024',
        status: 'new'
    },
    {
        id: 48,
        name: 'Aiden Baker',
        email: 'aidenbaker@gmail.com',
        message: 'Do I need to create an account to purchase tickets?',
        date: '01-01-2024',
        status: 'answered'
    },
    {
        id: 49,
        name: 'Avery Turner',
        email: 'averyturner@gmail.com',
        message: 'What happens if the event gets postponed?',
        date: '02-01-2024',
        status: 'new'
    },
    {
        id: 50,
        name: 'Avery Turner',
        email: 'averyturner@gmail.com',
        message: 'What happens if the event gets postponed?',
        date: '02-01-2024',
        status: 'answered'
    },
    {
        id: 51,
        name: 'Ella Brooks',
        email: 'ellabrooks@gmail.com',
        message: 'Can I purchase tickets at the venue on the day of the event?',
        date: '03-01-2024',
        status: 'new'
    },
    {
        id: 52,
        name: 'Ella Brooks',
        email: 'ellabrooks@gmail.com',
        message: 'Can I purchase tickets at the venue on the day of the event?',
        date: '03-01-2024',
        status: 'answered'
    },
    {
        id: 53,
        name: 'Liam Cooper',
        email: 'liamcooper@gmail.com',
        message: 'Do I need to print my event ticket?',
        date: '04-01-2024',
        status: 'new'
    },
    {
        id: 54,
        name: 'Liam Cooper',
        email: 'liamcooper@gmail.com',
        message: 'Do I need to print my event ticket?',
        date: '04-01-2024',
        status: 'answered'
    },
    {
        id: 55,
        name: 'Aria Richardson',
        email: 'ariarichardson@gmail.com',
        message: 'Are there any age-specific ticket prices?',
        date: '05-01-2024',
        status: 'new'
    }
];

export default customers;
