import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AudienceDetail from 'views/users/audience/audienceDetail';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

//ticket routing
const Tickets = Loadable(lazy(() => import('views/tickets')));
const TicketDetail = Loadable(lazy(() => import('views/tickets/ticket-detail')));

//Ads routing
const AdsPage = Loadable(lazy(() => import('views/ads-page')));
const CreateAds = Loadable(lazy(() => import('views/create-ads')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Audience = Loadable(lazy(() => import('views/users/audience')));
const ChangePassword = Loadable(lazy(() => import('views/users/audience/changePassword')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Events = Loadable(lazy(() => import('views/events')));
const EventDetail = Loadable(lazy(() => import('views/Event-details/EventDetail')));
const AddEvent = Loadable(lazy(() => import('views/events/add-event')));
const UpdateEvent = Loadable(lazy(() => import('views/events/update-event')));
const CustomerSupport = Loadable(lazy(() => import('views/customer-support')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/',
            children: [
                {
                    path: '/',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },

        {
            path: 'change-password',
            element: <ChangePassword />
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'events',
            element: <Events />
        },
        {
            path: 'event-detail',
            element: <EventDetail />
        },
        {
            path: 'add-event',
            element: <AddEvent />
        },
        {
            path: 'update-event',
            element: <UpdateEvent />
        },
        {
            path: 'customer-support',
            element: <CustomerSupport />
        },
        {
            path: 'tickets',
            element: <Tickets />
        },
        {
            path: 'ticket-detail',
            element: <TicketDetail />
        },
        {
            path: 'ads',
            element: <AdsPage />
        },
        {
            path: 'create-ads',
            element: <CreateAds />
        },

        {
            path: 'audience',
            element: <Audience />
        },
        {
            path: 'audience-detail',
            element: <AudienceDetail />
        }
    ]
};

export default MainRoutes;
