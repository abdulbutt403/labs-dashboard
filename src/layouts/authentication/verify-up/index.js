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
import toast, { Toaster } from "react-hot-toast";

function Cover() {
  var [email, setEmail] = useState("");
  var [code, setCode] = useState("");
  var [role, setRole] = useState("DOCTOR");
  const [checked, setChecked] = React.useState(true);
  const [terms, setTerms] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }


  async function VerifyUser() {
    let body = {email,code,role}
    if (!ValidateEmail(email)) {
      toast.error(`Please Enter a valid email..!`);
    } 
    else if (!!email && !!code && !!role) {
      try {
        const res = await axios.post(endPoint + "/users/verify", body);
        console.log({res})
        if (res.data.success) {
          toast.success("Successfully Verified");
          setTimeout(() => {
            window.location.href = '/authentication/sign-in'
          }, 1500);
        }
        else{
          toast.error("Verification Unsuccessful");
        }
      } catch (error) {
        console.log(error);
      }

      console.log(role);
    } else {
      toast.error(`Please Check Your Fields...`);
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
              Account Verification
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter 6 digit verification code
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
            <Select
                style={{
                  width: "100%",
                  marginTop: 30,
                  height: 40,
                  marginBottom: 20,
                }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"LAB"}>LAB</MenuItem>
              </Select>
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
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                  }}
                  label="code"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => VerifyUser()}
                >
                  verify account
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>

      <>
        <div className={terms? "overlay open": "overlay"} style={{padding: '3rem'}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                <div className="titles">
                  <h1 className="title">Terms & Conditions and Privacy Notice</h1>
                  <h2 className="subtitle">
                    To create an account with Tiger Staffing, please read and
                    agree to our Terms & Conditions and Privacy Notice
                  </h2>
                </div>

                <div className="legal">
                  <div className="legal__instructions">
                    <div className="alert alert-info" role="alert">
                      <strong>
                        <i className="fa fa-exclamation-triangle"></i>
                        Important.
                      </strong>
                      <span>
                        In order to continue, you must read the Terms &
                        Conditions and Privacy Notice by scrolling to the
                        bottom.
                      </span>
                    </div>
                  </div>
                  <nav className="legal__navigation">
                    <span>Navigate to:</span>
                    <ol>
                      <li>
                        <a className="terms-nav" href="#terms-and-conditions">
                          Terms & Conditions
                        </a>
                      </li>
                      <li>
                        <a className="terms-nav" href="#privacy-notice">
                          Privacy Policy
                        </a>
                      </li>
                    </ol>
                    <div className="legal__progress"></div>
                  </nav>
                  <div className="legal__terms">
                    <div className="legal__terms-scroll">
                      <div id="terms-and-conditions">
                        <strong>Terms and Conditions</strong>
                        <p>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula, eget lacinia odio sem nec elit.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                      </div>
                      <div id="privacy-notice">
                        <strong>Privacy Notice</strong>
                        <p>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula, eget lacinia odio sem nec elit.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                        <p>
                          Cum sociis natoque penatibus et magnis dis parturient
                          montes, nascetur ridiculus mus. Cum sociis natoque
                          penatibus et magnis dis parturient montes, nascetur
                          ridiculus mus. Etiam porta sem malesuada magna mollis
                          euismod. Nulla vitae elit libero, a pharetra augue.
                          Nullam id dolor id nibh ultricies vehicula ut id elit.
                          Donec ullamcorper nulla non metus auctor fringilla.
                          Maecenas sed diam eget risus varius blandit sit amet
                          non magna.
                        </p>
                        <p>
                          Nullam quis risus eget urna mollis ornare vel eu leo.
                          Donec id elit non mi porta gravida at eget metus.
                          Donec sed odio dui. Donec sed odio dui. Vivamus
                          sagittis lacus vel augue laoreet rutrum faucibus dolor
                          auctor. Integer posuere erat a ante venenatis dapibus
                          posuere velit aliquet. Donec ullamcorper nulla non
                          metus auctor fringilla. Cras mattis consectetur purus
                          sit amet fermentum. Curabitur blandit tempus
                          porttitor. Lorem ipsum dolor sit amet, consectetur
                          adipiscing elit.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam id dolor id nibh ultricies vehicula ut id
                          elit. Donec id elit non mi porta gravida at eget
                          metus. Maecenas sed diam eget risus varius blandit sit
                          amet non magna.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="legal__rules"
                    aria-expanded="false"
                    aria-hidden="true"
                    style={{display: 'none', opacity:0, filter:'alpha(opacity=0)'}}
                  >
                    <div className="legal__rule">
                      <div className="toggle--checkbox">
                        <label className="toggle__label" htmlFor="">
                          This is hidden and removed from the DOM
                        </label>
                        <label className="toggle__agree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">
                            Please agree to our
                            <a href="#">
                              terms and conditions{" "}
                              <i className="fa fa-external-link"></i>
                            </a>
                            and
                            <a href="#">
                              privacy policy <i className="fa fa-external-link"></i>
                            </a>
                            to continue.
                            <sup>1</sup>
                          </span>
                        </label>
                        <label className="toggle__disagree">
                          <input type="checkbox" className="checkbox" />
                          <span className="toggle__button">Disagree</span>
                        </label>
                      </div>
                    </div>
                    <div className="legal__rule">
                      <div className="toggle--checkbox">
                        <label className="toggle__label" htmlFor="">
                          This is hidden and removed from the DOM
                        </label>
                        <label className="toggle__agree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">
                            I would like to be informed about special offers,
                            such as events in my area.<sup>2</sup>
                          </span>
                        </label>
                        <label className="toggle__disagree">
                          <input type="checkbox" className="checkbox" />
                          <span className="toggle__button">Disagree</span>
                        </label>
                      </div>
                    </div>
                    <div className="legal__rule is-required">
                      <div className="toggle--checkbox">
                        <label className="toggle__label" htmlFor="">
                          This is hidden and removed from the DOM
                        </label>
                        <label className="toggle__agree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">
                            I agree to the terms and conditions
                          </span>
                        </label>
                        <label className="toggle__disagree">
                          <input type="checkbox" className="checkbox" />
                          <span className="toggle__button">Disagree</span>
                        </label>
                      </div>
                    </div>
                    <div className="legal__rule">
                      <div className="toggle--buttons">
                        <label className="toggle__label" htmlFor="">
                          I agree to the terms and conditions
                        </label>
                        <label className="toggle__agree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">Agree</span>
                        </label>
                        <label className="toggle__disagree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">Disagree</span>
                        </label>
                      </div>
                    </div>
                    <div className="legal__rule is-required">
                      <div className="toggle--buttons">
                        <label className="toggle__label" htmlFor="">
                          I agree to the terms and conditions
                        </label>
                        <label className="toggle__agree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">Agree</span>
                        </label>
                        <label className="toggle__disagree">
                          <input type="checkbox" className="checkbox" />
                          <span className="control-indicator"></span>
                          <span className="toggle__button">Disagree</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="legal__actions" style={{paddingBottom: 50}}>
                    <div style={{float: 'right'}}>
                      <button
                        type="button"
                        className="btn btn-default overlay--close"
                        onClick={() => setTerms(false)}
                        style={{padding: 5, cursor: 'pointer', background: '#3C95EF', color: '#fff', border: 'none', outline: 'none'}}
                      >
                        I understand
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Toaster position="top-center" reverseOrder={false} />
    </React.Fragment>
  );
}

export default Cover;
