// assets
import {
    IconDashboard,
    IconBrandChrome,
    IconBox,
    IconCategory,
    IconBuildingStore,
    IconTimeline,
    IconCalendarEvent,
    IconTicket,
    IconUsers,
    IconSpeakerphone,
    IconHeadset,
    IconNotification
} from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconCalendarEvent,
    IconTicket,
    IconBrandChrome,
    IconBox,
    IconCategory,
    IconBuildingStore,
    IconTimeline,
    IconUsers,
    IconSpeakerphone,
    IconHeadset,
    IconNotification
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
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
            url: '/events',
            icon: icons.IconCalendarEvent,
            breadcrumbs: false
        },
        {
            id: 'tickets',
            title: 'Tickets',
            type: 'collapse',
            url: '/tickets',
            icon: icons.IconTicket,
            breadcrumbs: false,
            children: [
                {
                    id: 'tickets',
                    title: 'All Tickets',
                    type: 'item',
                    url: '/tickets',
                    breadcrumbs: false
                },
                {
                    id: 'soldtickects',
                    title: 'Sold Tickets',
                    type: 'item',
                    url: '/sample-page',
                    breadcrumbs: false
                }
            ]
        },

        {
            id: 'ads',
            title: 'Ads Management',
            type: 'item',
            url: '/ads',
            icon: icons.IconSpeakerphone,
            breadcrumbs: false
        },
        {
            id: 'notification',
            title: 'Notifications',
            type: 'item',
            url: '/notifications',
            icon: icons.IconNotification,
            breadcrumbs: false
        },
        {
            id: 'users',
            title: 'User',
            type: 'item',
            url: '/audience',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'customersupport',
            title: 'Customer Support',
            type: 'item',
            url: '/customer-support',
            icon: icons.IconHeadset,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
