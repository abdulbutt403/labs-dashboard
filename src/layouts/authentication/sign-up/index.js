import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { endPoint } from "contants";
import axios from "axios";
import React, { useState } from "react";
import { MenuItem, Select } from "@mui/material";
import toast, { Toaster } from 'react-hot-toast';


function Cover() {
  var [email, setEmail] = useState("admin@pharmacist.com");
  var [fullName, setfullName] = useState("admin@pharmacist.com");
  var [password, setPassword] = useState("");
  var [address, setAddress] = useState("");
  var [role, setRole] = useState("LAB");

  async function createUser(login, password, fullName, role) {
    if (!!login && !!password && !!role) {
      try {
        const res = await axios.post(endPoint + "/users/create", {
          email: login,
          password: password,
          role: role,
          fullName: fullName,
          address: address
        });
        if (res.data.success) {
          toast.success("Successfully Registered Lab");
        }
        if (res.data.msg.length) {
          toast.error(`Lab already exist`);
        }
      } catch (error) {
        console.log(error);
      }

      console.log(role);
    } else {
      toast.error(`${role} An Error Occured`);
    }
  }

  return (
    <React.Fragment>
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <Select
                style={{ width: "100%", marginTop: 30, height: 40, marginBottom: 20 }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"LAB"}>LAB</MenuItem>
              </Select>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                  label="Name"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  label="Address"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => createUser(email, password, fullName, role)}
                >
                  sign up
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
      <Toaster position="top-center" reverseOrder={false} />
    </React.Fragment>
  );
}

export default Cover;
