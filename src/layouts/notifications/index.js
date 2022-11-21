/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartDelete } from "shared/reducers/UserSlice";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const pharmacies = useSelector((store) => store.root.user.pharmacies);
  const cart = useSelector((store) => store.root.user.cart);
  const dispatch = useDispatch();

  console.log({ cart });

  return pharmacies.length > 0 && cart.length > 0 ? (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3} style={{ display: "flex", flexWrap: "wrap" }}>
        {pharmacies.map((element, index) => (
          <React.Fragment key={index}>
            {cart.filter((e) => e.pharmacyId === element.id).length ? (
              <Grid
                container
                spacing={1}
                justifyContent="center"
                style={{ flexBasis: "50%", marginBottom: 50 }}
              >
                <Grid item xs={12} lg={10}>
                  <Card style={{ minHeight: 500 }}>
                    <button className="button-3" role="button">
                      Place Order
                    </button>
                    <MDBox p={2}>
                      <MDTypography variant="h5">{element.name}</MDTypography>
                    </MDBox>
                    {cart
                      .filter((e) => e.pharmacyId === element.id)
                      .map((x, i) => (
                        <MDBox pt={2} px={2} key={i}>
                          <MDAlert
                            color="success"
                            style={{ fontSize: 17, fontWeight: 400 }}
                          >
                            {`${x.medicineName} (${
                              x.purchaseQuantity
                            }) | Total : ${
                              x.purchaseQuantity * x.medicinePrice
                            } RS`}
                            <i
                              className="fa fa-times"
                              style={{
                                position: "absolute",
                                right: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dispatch(cartDelete(x.Identifier))}
                            />
                          </MDAlert>
                        </MDBox>
                      ))}
                  </Card>
                </Grid>
              </Grid>
            ): <></>}
          </React.Fragment>
        ))}
      </MDBox>
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        mt={6}
        mb={3}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 500,
          textTransform: "uppercase",
          color: "red",
          fontSize: 30,
        }}
      >
        Your cart is Empty !
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
