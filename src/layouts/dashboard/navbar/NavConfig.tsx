// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  warehouse: <Iconify icon="fa6-solid:warehouse" />,
  customer: <Iconify icon="clarity:users-solid" />,
  speeker: <Iconify icon="bi:speaker-fill" />,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'ecommerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
      //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
      //     { title: 'list', path: PATH_DASHBOARD.user.list },
      //     { title: 'create', path: PATH_DASHBOARD.user.new },
      //     { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
      //     { title: 'account', path: PATH_DASHBOARD.user.account },
      //   ],
      // },
      {
        title: 'user',
        path: PATH_DASHBOARD.appUser.root,
        icon: ICONS.user,
        children: [{ title: 'list', path: PATH_DASHBOARD.appUser.list }],
      },
      {
        title: 'warehouse',
        path: PATH_DASHBOARD.warehouse.root,
        icon: ICONS.warehouse,
        children: [{ title: 'list', path: PATH_DASHBOARD.warehouse.list }],
      },
      {
        title: 'customer',
        path: PATH_DASHBOARD.customer.root,
        icon: ICONS.customer,
        children: [{ title: 'list', path: PATH_DASHBOARD.customer.list }],
      },
      {
        title: 'category',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.speeker,
        children: [{ title: 'list', path: PATH_DASHBOARD.category.list }],
      },
      {
        title: 'product',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.speeker,
        children: [{ title: 'list', path: PATH_DASHBOARD.product.list }],
      },
      {
        title: 'usergroup',
        path: PATH_DASHBOARD.category.root,
        icon: ICONS.speeker,
        children: [{ title: 'list', path: PATH_DASHBOARD.category.list }],
      },

      // E-COMMERCE
      // {
      //   title: 'ecommerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // INVOICE
      // {
      //   title: 'invoice',
      //   path: PATH_DASHBOARD.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
      //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
      //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
      //   ],
      // },

      // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
    ],
  },
  {
    subheader: 'Voucher',
    items: [
      {
        title: 'Beginning Voucher',
        path: PATH_DASHBOARD.beginningVoucher.root,
        icon: ICONS.speeker,
        children: [{ title: 'list', path: PATH_DASHBOARD.beginningVoucher.list }],
      },
      {
        title: 'Beginning Voucher',
        path: PATH_PAGE.comingSoon,
        icon: ICONS.speeker,
        children: [{ title: 'list', path: PATH_PAGE.comingSoon }],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     // {
  //     //   title: 'mail',
  //     //   path: PATH_DASHBOARD.mail.root,
  //     //   icon: ICONS.mail,
  //     //   info: <Label color="error">+32</Label>,
  //     // },
  //     // { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     // { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     // { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },

  // DEMO MENU STATES
  // {
  //   subheader: 'Other cases',
  //   items: [
  // {
  //   // default roles : All roles can see this entry.
  //   // roles: ['user'] Only users can see this item.
  //   // roles: ['admin'] Only admin can see this item.
  //   // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //   // Reference from 'src/guards/RoleBasedGuard'.
  //   title: 'item_by_roles',
  //   path: PATH_DASHBOARD.permissionDenied,
  //   icon: ICONS.menuItem,
  //   roles: ['admin'],
  //   caption: 'only_admin_can_see_this_item',
  // },
  // {
  //   title: 'menu_level_1',
  //   path: '#1',
  //   icon: ICONS.menuItem,
  //   children: [
  //     { title: 'menu_level_2', path: '#2', disabled: true },
  //     {
  //       title: 'menu_level_2',
  //       path: '#3',
  //       children: [
  //         { title: 'menu_level_3', path: '#4' },
  //         { title: 'menu_level_3', path: '#5' },
  //       ],
  //     },
  //   ],
  // },
  // { title: 'item_disabled', path: '#disabled', icon: ICONS.menuItem, disabled: true },
  // {
  //   title: 'item_label',
  //   path: '#label',
  //   icon: ICONS.menuItem,
  //   info: (
  //     <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //       NEW
  //     </Label>
  //   ),
  // },
  // { title: 'item_caption', path: '#caption', icon: ICONS.menuItem, caption: 'description' },
  //   ],
  // },
];

export default navConfig;
