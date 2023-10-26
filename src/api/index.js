const Connections = {
    // api: 'http://192.168.100.3:8000/api/',
    api: 'https://backend.placetobeethiopia.com/api/', //remote server api endpoint
    url: 'https://backend.placetobeethiopia.com/api/',

    //admin dashboard end points
    adminsignin: 'adminsignin',
    changeEventStatus: 'change-event-status/',

    //admin dashboard endpoints
    admincards: 'admincards',
    // end users api end points
    signUp: 'signup',
    signIn: 'signin',
    googleSignUp: 'continue-with-google',
    googleSignIn: 'signin-with-google',
    profile: 'profile/', // need closer look
    changeprofile: 'changeprofile/', // need closer look
    userInfo: 'user-info/',
    MetaData: 'meta-info/',
    updateUserInfo: 'update/',
    ChangePassword: 'changepassword',

    // ads related endpoints
    ads: 'ads',
    createdAds: 'create-ads',
    singleAd: 'single-ads/',
    adstats: 'ad-stats/',
    updateAds: 'update-ads/',
    deleteAds: 'delete-ads/',
    changeAdStatus: 'change-ad-status/',
    //user related endpoints
    users: 'users',

    //event related api's
    AddEvent: 'add-event',
    events: 'events',
    eventDetail: 'single-event/',
    moreEventDetails: 'event-more-detail',
    sectionOneUpdate: 'section-one-update/',
    sectionTwoUpdate: 'section-two-update/',
    sectionThreeUpdate: 'section-three-update/',
    sectionFourUpdate: 'section-four-update/',
    deleteEvent: 'delete-event/',
    TodayEvents: 'today-events',
    WeekEvents: 'week-events',
    UpcomingEvents: 'upcoming-events',
    categoryFilter: 'search-category/',
    search: 'search-event',
    YourEvents: 'your-events/',

    MakeEventFeatured: 'make-event-featured/',
    MakeEventCancelled: 'make-event-cancelled/',

    //ticker related Endpoints
    changeTicketStatus: 'change-ticket-status/',

    follow: 'follow',
    followers: 'followers/',
    following: 'following/',
    upload: 'uploadimage.php',
    assets: 'images/',

    //business api end points
    organizer: 'organizer', //updated
    singleBusiness: 'singleBusiness',

    //notification end points
    notification: 'notifications',
    sendAlert: 'send-alert',
    getNotification: 'fetchNotifications/',
    notified: 'notified-users',

    OrganizerFollowCounter: 'organizer-followers/',
    organizerEvents: 'organizer-event/',
    organizerUpcomings: 'organizer-upcoming-event/',

    forgotPassword: 'forgotPassword',
    status: 'status', //*********** need pilot */
    Images: 'Images',
    appInfo: 'appinfo',

    // second version connnections
    AddTicket: 'create-ticket',
    myTickets: 'mytickets/',
    Soldout: 'soldout/',
    EventPoster: 'events-poster',
    UpdateTicket: 'update-ticket/',
    updateEvent: 'update-event/',
    Cancelled: 'cancel-event/',
    eventTicket: 'eventticket/',
    detailTicket: 'event-detail-ticket/',
    Payment: 'payment',
    Event: 'single-event/', // a file to retrive single event by its event ID
    createReservation: 'create-reservation',
    Tickets: 'tickets',
    FeaturedEvent: 'featured-event',
    soldTickets: 'soldticket/',
    singleTicket: 'single-ticket/',

    //refunding related api's
    requestRrefunding: 'refunding-request',

    //rating end points
    addRating: 'add-ratings',
    getRating: 'get-ratings/',
    updateRating: 'update-ratings/',

    //ads endpoints
    fetchAds: 'display-ads',

    //viewed ads end points
    adViewed: 'consumed-create',

    //tickets endpoints
    requestRefunding: 'ticket-refunds',
    refundingInfo: 'ticket-refunds/',

    //customer support api end points
    queries: 'feedback',
    changeQueryStatus: 'update-query-status/'
};

export default Connections;
