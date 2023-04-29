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
            url: '/dashboard/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'shops',
            title: 'Shops',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBuildingStore,
            breadcrumbs: false
        },
        {
            id: 'products',
            title: 'Products',
            type: 'collapse',
            url: '/sample-page',
            icon: icons.IconBox,
            breadcrumbs: false,
            children: [
                {
                    id: 'listproduct',
                    title: 'List Product',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'addproduct',
                    title: 'Add Product',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'category',
            title: 'Category',
            type: 'collapse',
            url: '/sample-page',
            icon: icons.IconCategory,
            breadcrumbs: false,
            children: [
                {
                    id: 'listcategory',
                    title: 'List Category',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    breadcrumbs: false
                },
                {
                    id: 'addcategory',
                    title: 'Add Category',
                    type: 'item',
                    url: '/icons/material-icons',
                    breadcrumbs: false
                }
            ]
        },
        {
            id: 'sales',
            title: 'Sales',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconTimeline,
            breadcrumbs: false
        },
        {
            id: 'customers',
            title: 'Customers',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
