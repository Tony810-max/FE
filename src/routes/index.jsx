import AdminLayout from "@/layouts/AdminLayout";
import PrivateLayout from "@/layouts/PrivateLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Account from "@/pages/private/Account";
import Book from "@/pages/private/Book";
import AdminHome from "@/pages/private/Admin/AdminHome";
import AdminBooking from "@/pages/private/Admin/AdminBooking";
import AdminApprovedTable from "@/pages/private/Admin/AdminApprovedTable";
import AdminAccount from "@/pages/private/Admin/AdminAccount";
import AdminLogin from "@/pages/private/Admin/AdminLogin";
import AdminRecruiment from "@/pages/private/Admin/AdminRecruiment";
import AdminReviews from "@/pages/private/Admin/AdminReviews";
import Hire from "@/pages/public/Hire";
import Home from "@/pages/public/Home";

const pageComponents = {
    Home,
    Hire,
    SignIn,
    SignUp,
    Account,
    Book,
    AdminHome,
    AdminBooking,
    AdminApprovedTable,
    AdminAccount,
    AdminLogin,
    AdminRecruiment,
    AdminReviews
};

const layoutComponents = {
    private: PrivateLayout,
    admin: AdminLayout
};

const PageRoutes = [
    { path: '/', component: pageComponents.Home },
    { path: '/hire', component: pageComponents.Hire },
    { path: '/signin', component: pageComponents.SignIn, layout: null },
    { path: '/signup', component: pageComponents.SignUp, layout: null },
    { path: '/book', component: pageComponents.Book, layout: layoutComponents.private },
    { path: '/account', component: pageComponents.Account, layout: layoutComponents.private },
    { path: '/admin', component: pageComponents.AdminLogin, layout: null },
    { path: '/admin/home', component: pageComponents.AdminHome, layout: layoutComponents.admin },
    { path: '/admin/account', component: pageComponents.AdminAccount, layout: layoutComponents.admin },
    { path: '/admin/booking', component: pageComponents.AdminBooking, layout: layoutComponents.admin },
    { path: '/admin/approved-tables', component: pageComponents.AdminApprovedTable, layout: layoutComponents.admin },
    { path: '/admin/recruitment', component: pageComponents.AdminRecruiment, layout: layoutComponents.admin },
    { path: '/admin/reviews', component: pageComponents.AdminReviews, layout: layoutComponents.admin },
];

export { PageRoutes };
