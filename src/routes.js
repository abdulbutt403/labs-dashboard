import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import Pharmacies from "layouts/Pharmacies";
import AddForm from "layouts/AddForm";
import Tests from "layouts/Tests";
import EditProfile from "layouts/EditProfile";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Samopling Requests",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Upload Reports",
    key: "add_medicines",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/form",
    component: <AddForm />,
  },
  {
    type: "collapse",
    name: "Add Test",
    key: "add_test",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/test",
    component: <Tests />,
  },
  {
    type: "collapse",
    name: "Edit Profile",
    key: "edit_profile",
    icon: <Icon fontSize="small">Edit</Icon>,
    route: "/edit_profile",
    component: <EditProfile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
