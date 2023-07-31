// assets
import { IconDashboard, IconBrandChrome, IconBox, IconCategory, IconBuildingStore, IconTimeline, IconUsers } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconBrandChrome, IconBox, IconCategory, IconBuildingStore, IconTimeline, IconUsers };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'events',
            title: 'Events',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBuildingStore,
            breadcrumbs: false
        },
        {
            id: 'tickets',
            title: 'Tickets',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBox,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'Users',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconCategory,
            breadcrumbs: false
        },
        {
            id: 'ads',
            title: 'Ads Management',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconTimeline,
            breadcrumbs: false
        },
        {
            id: 'customersupport',
            title: 'Customer Support',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
