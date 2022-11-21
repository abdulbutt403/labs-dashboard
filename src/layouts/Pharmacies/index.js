import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import Save from "@material-ui/icons/Save";
import ViewColumn from "@material-ui/icons/ViewColumn";
import MaterialTable from "material-table";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Modal from "react-modal";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { endPoint } from "contants";
import { useMediaQuery } from "react-responsive";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { setPharmacies } from "shared/reducers/UserSlice";
import { cartAdd } from "shared/reducers/UserSlice";
import { Navigate } from "react-router-dom";
import MDBadge from "components/MDBadge";
import jwt from "jwt-decode";

function Pharmacies() {
  const isMobile = useMediaQuery({ query: "(max-width: 786px)" });
  const [medicine, setMedicine] = useState(false);
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const isAuth = useSelector((store) => store.root.user.authenticated);

  console.log(isAuth);

  

  const [quant, setQuant] = React.useState(0);
  const [rowData, setRowData] = React.useState(null);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.root.user);
  console.log({ store });





  const tableIcons = {
    Add: forwardRef((props, ref) => (
      <AddBox backgroundColor={"#fff"} {...props} ref={ref} />
    )),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  useEffect(() => {
    getMedicines();
  }, []);



  const removeItem = async (body) => {
    const { title, quantity, price } = body;

    console.log({ title, quantity, price });

    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      setLoading(true);
      const payload = {
        pharmacyId: decoded.id,
        Title: title,
        Quantity: quantity,
        Identifier: Math.floor(Math.random() * 100 + 1) + Date.now(),
        Price: price,
      };

      console.log({payload})
      const posts = await axios.post(endPoint + "/users/removeMedicine", payload);
      toast.success("Successfully Removed Medicine");
      console.log({ posts });
      getMedicines()
      setLoading(false);
    }
  };

  const getMedicines = async () => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/authentication/sign-in";
    else {
      const decoded = jwt(token);
      setLoading(true);
      const posts = await axios.post(endPoint + "/users/medicineByPharmacy", {
        pharmacyId: decoded.id,
      });
      console.log({ posts });
      setStocks(posts.data.orders);
      setLoading(false);
    }
  };
  return isAuth ? (
    <React.Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={0}
                  mt={-3}
                  py={3}
                  px={2}
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Medicines
                  </MDTypography>
              
                </MDBox>
                <MDBox pt={3}>
                  <MaterialTable
                    icons={tableIcons}
                    title=""
                    columns={[
                      {
                        title: "Identifier",
                        render: (rowData) => (
                          <span className="mt_dt">{rowData.Identifier}</span>
                        ),
                      },
                      {
                        title: "Name",
                        render: (rowData) => (
                          <span className="mt_dt">{rowData.Title}</span>
                        ),
                      },
                      {
                        title: "Stock",
                        render: (rowData) => (
                          <span className="mt_dt">{rowData.Quantity}</span>
                        ),
                      },
                      {
                        title: "Price (Per Tablet)",
                        render: (rowData) => (
                          <span className="mt_dt">{rowData.Price}</span>
                        ),
                      },
                    ]}
                    actions={[
                      {
                        icon: () => <Clear />,
                        tooltip: "Delete",
                        onClick: (event, rowData) => removeItem({ title : rowData.Title, quantity: rowData.Quantity, price : rowData.Price}),
                      },
                    ]}
                    data={stocks}
                    options={{
                      actionsColumnIndex: -1,
                      headerStyle: {
                        backgroundColor: "transparent",
                        color: "#7b809a",
                        fontSize: "0.8rem",
                        opacity: 0.7,
                        fontStyle: "normal",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      },
                    }}
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </React.Fragment>
  ) : (
    <Navigate to="/authentication/sign-in" />
  );
}

export default Pharmacies;
