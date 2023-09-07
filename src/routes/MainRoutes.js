import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Tickets from 'views/tickets';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Audience = Loadable(lazy(() => import('views/audience/index')));
const ChangePassword = Loadable(lazy(() => import('views/audience/changePassword')));

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
            path: 'audience',
            element: <Audience />
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
        }
    ]
};

export default MainRoutes;
