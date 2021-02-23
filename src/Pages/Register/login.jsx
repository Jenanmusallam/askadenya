import React, { Component } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import validator from "validator";
import "./style.scss";
import chef from "./chef.png";
import waiter from "./waiter.png";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Redirect } from "react-router-dom";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullNameS: "",
      emailS: "",
      phoneS: "",
      passwordS: "",
      emailL: "",
      passwordL: "",
      redirect: false,
      emailErrorL: "",
      passwordErrorL: "",
      passwordErrorS: "",
      emailErrorS: "",
      phoneErrorS: "",
      islogin: false,
      display: "block",
      display2: "block",
    };
    // this.
  }

  responseFacebook = (response) => {
    if (response) {
      if (response.name) {
        const registered = {
          fullName: response.name,
          email: response.email,
          avatar: response.picture.data.url,
        };
        axios
          .post("http://localhost:8000/users/facebook", registered)
          .then((res) => {
            sessionStorage.setItem("userId", res.data._id);
            this.props.setisLogin(true);
            this.props.getcartNumber();

            this.setState({
              redirect: true,
            });
          });
      }
    }
  };

  htoggle = () => {
    this.setState({ display: "none", display2: "block" });
  };

  htoggle2 = () => {
    this.setState({ display2: "none", display: "block" });
  };
  hchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitS = (event) => {
    event.preventDefault();
    this.setState({
      emailErrorL: "",
      passwordErrorL: "",
      passwordErrorS: "",
      emailErrorS: "",
      phoneErrorS: "",
    });

    const emailError = validator.isEmail(this.state.emailS);
    const passwordError = validator.isStrongPassword(this.state.passwordS, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    });
    if (emailError && passwordError) {
      const registered = {
        fullName: this.state.fullNameS,
        email: this.state.emailS,
        password: this.state.passwordS,
      };
      axios
        .post("http://localhost:8000/users/signup", registered)
        .then((res) => {
          if (res.data === "user already registered") {
            this.setState({
              emailErrorS: "User already registered",
            });
          } else {
            sessionStorage.setItem("userId", res.data._id);
            this.props.setisLogin(true);
            this.props.getcartNumber();
            this.setState({
              redirect: true,
            });
          }
        });
    } else if (!passwordError) {
      this.setState({
        passwordErrorS:
          "must include at least 1 Lowercase, Uppercase, and Number",
      });
    }
    if (!emailError) {
      this.setState({
        emailErrorS: "Invalid Email",
      });
    }
  };

  onSubmitL = (e) => {
    e.preventDefault();
    this.setState({
      emailErrorL: "",
      passwordErrorL: "",
      passwordErrorS: "",
      emailErrorS: "",
      phoneErrorS: "",
    });
    const user = {
      email: this.state.emailL,
      password: this.state.passwordL,
    };
    axios.post("http://localhost:8000/users/login", user).then((res) => {
      if (res.data === "user not found") {
        this.setState({
          emailErrorL: "User not found",
        });
      } else if (res.data === "wrong password") {
        this.setState({
          passwordErrorL: "Wrong password",
        });
      } else {
        sessionStorage.setItem("userId", res.data._id);
        this.props.setisLogin(true);
        this.props.getcartNumber();
        this.setState({
          redirect: true,
        });
      }
    });
  };
  // ---------------------------------------------
  // -----------------------------------------
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.islogin) {
      return (
        <div className="register">
          {/*------------------------ login form ------------------------------ */}
          <div className="container mt-5 ">
            <div className="form-container sign-up-container mt-2">
              <form onSubmit={this.onSubmitS}>
                <h1 className="font-weight-bold">Create Account</h1>
                <div className="social-container">
                  <FacebookLogin
                    className="social"
                    appId="436529724191626"
                    autoLoad={false}
                    fields="name,email,picture.type(large)"
                    callback={this.responseFacebook}
                    render={(renderProps) => (
                      <a onClick={renderProps.onClick} className="social">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                  />
                  {/* <a href="#" className="social">
                    <i className="fab fa-facebook-f"></i>
                  </a> */}

                  {/* <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a> */}
                </div>

                <span>or create your own account</span>

                <TextField
                  required
                  label=" Full Name"
                  name="fullNameS"
                  onChange={this.hchange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                />
                <TextField
                  required
                  error={this.state.emailErrorS}
                  type="email"
                  label=" Email"
                  name="emailS"
                  onChange={this.hchange}
                  helperText={this.state.emailErrorS}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  required
                  error={this.state.passwordErrorS}
                  type="password"
                  label=" Password"
                  name="passwordS"
                  onChange={this.hchange}
                  helperText={this.state.passwordErrorS}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                />
                <Button
                  size="large"
                  className="btn btn-info btn-rounded"
                  type="submit"
                >
                  Sign up
                </Button>
              </form>
            </div>

            <div className="form-container sign-in-container">
              <form onSubmit={this.onSubmitL}>
                <h1 className="font-weight-bold">Sign in</h1>
                <div className="social-container">
                  {/* <a className="social"> */}
                  {/* <label htmlFor="tessst">
                      <i className="fab fa-facebook-f"></i>
                    </label>
                  </a> */}

                  <FacebookLogin
                    className="social"
                    appId="436529724191626"
                    autoLoad={false}
                    fields="name,email,picture.type(large)"
                    callback={this.responseFacebook}
                    render={(renderProps) => (
                      <a onClick={renderProps.onClick} className="social">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    )}
                  />
                  {/* <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" className="social">
                    <i className="fab fa-linkedin-in"></i>
                  </a> */}
                </div>
                <span>or use your account</span>

                <TextField
                  required
                  // className="input"
                  error={this.state.emailErrorL}
                  helperText={this.state.emailErrorL}
                  name="emailL"
                  label=" Email"
                  onChange={this.hchange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  required
                  error={this.state.passwordErrorL}
                  helperText={this.state.passwordErrorL}
                  label=" Password"
                  type="password"
                  name="passwordL"
                  onChange={this.hchange}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                />
                <Button
                  size="large"
                  className="btn btn-info btn-rounded "
                  type="submit"
                >
                  Sign In
                </Button>
              </form>
            </div>

            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <img className="chef" src={chef} alt="" />

                  <h1 className="font-weight-bold">Good to see you!</h1>
                  <p className="pargraph">
                    You already have an account? <br></br> Sign in!
                  </p>
                  <Button size="large" className="but" id="signIn">
                    Sign In
                  </Button>
                </div>
                <div className="overlay-panel overlay-right">
                  <img className="chef" src={waiter} alt="" />

                  <h1 className="font-weight-bold">Hello, Friend!</h1>
                  <p className="pargraph">
                    You don't have account yet? Don't worry! You still can join
                    us
                  </p>
                  <Button
                    size="large"
                    className="but"
                    id="signUp"
                    onClick={() => {
                      this.setState({ islogin: false });
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* ///// */}
        </div>
      );
    }

    {
      /*------------------------ signup form ------------------------------ */
    }

    return (
      <div className="register">
        <div className="container mt-5 right-panel-active">
          <div
            className="form-container sign-up-container mt-2"
            style={{ display: this.state.display2 }}
          >
            <form onSubmit={this.onSubmitS}>
              <h1 className="font-weight-bold">Create Account</h1>
              <div className="social-container">
                {/* <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a> */}
                <FacebookLogin
                  className="social"
                  appId="436529724191626"
                  autoLoad={false}
                  fields="name,email,picture.type(large)"
                  callback={this.responseFacebook}
                  render={(renderProps) => (
                    <a onClick={renderProps.onClick} className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                />
                {/* <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a> */}
              </div>
              <span>or create your own account</span>

              <TextField
                required
                label="Full Name"
                name="fullNameS"
                onChange={this.hchange}
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <TextField
                required
                error={this.state.emailErrorS}
                type="email"
                label=" Email"
                name="emailS"
                onChange={this.hchange}
                helperText={this.state.emailErrorS}
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                error={this.state.passwordErrorS}
                type="password"
                label=" Password"
                name="passwordS"
                onChange={this.hchange}
                helperText={this.state.passwordErrorS}
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <Button
                size="large"
                className="btn btn-info btn-rounded"
                type="submit"
              >
                Sign up
              </Button>
              <div className=" btn-hidden" onClick={this.htoggle2}>
                Already have an account? Sign in
              </div>
            </form>
          </div>

          <div
            className="form-container sign-in-container"
            style={{ display: this.state.display }}
          >
            <form onSubmit={this.onSubmitL}>
              <h1 className="font-weight-bold">Sign in</h1>
              <div className="social-container">
                <FacebookLogin
                  className="social"
                  appId="436529724191626"
                  autoLoad={false}
                  fields="name,email,picture.type(large)"
                  callback={this.responseFacebook}
                  render={(renderProps) => (
                    <a onClick={renderProps.onClick} className="social">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  )}
                />
                {/* <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a> */}
                {/* <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a> */}
              </div>
              <span>or use your account</span>
              <TextField
                required
                error={this.state.emailErrorL}
                helperText={this.state.emailErrorL}
                name="emailL"
                label=" Email"
                onChange={this.hchange}
                variant="outlined"
                margin="normal"
                fullWidth
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                error={this.state.passwordErrorL}
                helperText={this.state.passwordErrorL}
                label=" Password"
                type="password"
                name="passwordL"
                onChange={this.hchange}
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
              />
              <Button
                size="large"
                className="btn btn-info btn-rounded "
                type="submit"
              >
                Sign In
              </Button>
              <div className=" btn-hidden" onClick={this.htoggle}>
                Don't have an account? Sign Up
              </div>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <img className="chef" src={chef} alt="" />
                <h1 className="font-weight-bold">Good to see you!</h1>
                <p className="pargraph">
                  You already have an account? <br></br> Sign in!
                </p>
                <Button
                  size="large"
                  className="but"
                  id="signIn"
                  onClick={() => {
                    this.setState({ islogin: true });
                  }}
                >
                  Sign In
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <img className="chef" src={waiter} alt="" />

                <h1 className="font-weight-bold">Hello, Friend!</h1>
                <p className="pargraph">
                  You don't have account yet? Don't worry! You still can join us
                </p>
                <Button
                  size="large"
                  className="but"
                  id="signUp"
                  onClick={() => {
                    this.setState({ islogin: true });
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* /// */}
      </div>
    );
  }
}
