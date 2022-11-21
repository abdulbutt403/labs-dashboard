/*·eslint-disable·*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { endPoint } from "contants";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import {signIn} from 'shared/reducers/UserSlice'

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  var [email, setEmail] = useState("admin@pharmacist.com");
  var [password, setPassword] = useState("password");
  var [role, setRole] = useState("LAB");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const dispatch = useDispatch();

  async function loginUser(login, password, role) {
    if (!!login && !!password && !!role) {
      const res = await axios.post(endPoint + "/users/login", {
        email: login,
        password: password,
        role: role,
      });
      console.log(res);

      if (res.data.token) {
        dispatch(signIn())
        setTimeout(() => {
          localStorage.setItem("token", res.data.token);
          window.location.href="/dashboard"
        }, 2000);
      }
    } else {
    }
  }


  // function signOut(dispatch, history) {
  //   localStorage.removeItem("id_token");
  //   dispatch({ type: "SIGN_OUT_SUCCESS" });
  //   history.push("/login");
  // }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
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
                type="email"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={() => loginUser(email, password, role)}
              >
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
