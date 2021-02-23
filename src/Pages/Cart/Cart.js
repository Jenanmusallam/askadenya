import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "./style.scss";
import axios from "axios";
import { NumContext } from "../../NumContext";
import Empyt from "./Empyt";
import Drawer from "react-drag-drawer";
import { WaveTopBottomLoading } from "react-loadingg";

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,Breadcrumbs
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Cart() {
  document.title = "Askadenya | Cart Page";
  document.getElementsByTagName(
    "META"
  )[4].content = `categories, Askadenya, menu, Add, Buy, Order`;
  document.getElementsByTagName(
    "META"
  )[3].content = "This page is dedicated to displaying products for each category";


  const { decresNum , setcartNumber } = useContext(NumContext);

  const [cartItems, setcartItems] = useState([]);
  const [updateT, setupdateT] = useState(false);
  const [selectedOption, setselectedOption] = useState([]);
  const [numberOfMeals, setNumberOfMeals] = useState(1);
  const [confirmMsg, setconfirmMsg] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const getItems = () => {
    axios
      .get("http://localhost:8000/cart/" + sessionStorage.getItem("userId"))
      .then((res) => {
        setcartItems(res.data);
        setisLoading(false)
      });
  };
  useEffect(() => {
    getItems();
  }, []);
  const deleteitem = (id) => {
    axios
      .delete(
        "http://localhost:8000/cart/" +
          sessionStorage.getItem("userId") +
          "/" +
          id
      )
      .then(() => {
        decresNum();
        getItems();
      });
  };
  const handleCheckbox = (e, name) => {
    console.log(name);
    let so = selectedOption;
    for (let i = 0; i < so.length; i++) {
      if (so[i].name == name) {
        so[i].value = e.target.checked;
      }
    }
    // updateT.adds = so;
    setselectedOption(so);
  };
  const handleNumber = (e) => {
    setNumberOfMeals(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      number: numberOfMeals,
      adds: selectedOption,
    };

    axios
      .put(
        "http://localhost:8000/cart/update/" +
          sessionStorage.getItem("userId") +
          "/" +
          updateT._id,
        obj
      )
      .then((res) => {
        getItems();
        setupdateT(false);
      });
  };
  const confirm = () => {
    axios
      .delete(
        "http://localhost:8000/cart/all/" + sessionStorage.getItem("userId")
      )
      .then(() => {
        setcartItems([])
        setcartNumber(0);
        
      });
  };
  if(isLoading){
    return (
      <>
        <div className="marginLoading"></div>
        {/* <CoffeeLoading size="small" color="#02594d" /> */}
        <WaveTopBottomLoading size="large" color="#02594d" />
      </>
    );

  }
  if (cartItems.length) {
    return (
      <section className="cart">
        <section className="Breadcrumbs">
        <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link to="/">
          
        {/* <HomeIcon/> */}
          Home
        </Link>
        <Typography color="textPrimary">Cart</Typography>
      </Breadcrumbs>
        </section>
        
        <main className="card-container">
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {cartItems.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4}>
                  <Card className="card">
                    <CardMedia
                      className="cardMedia"
                      image={card.imgUrl}
                      title="Image title"
                    />
                    <CardContent className="cardContent">
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.adds.map((add) => add.value && add.name + " | ")}
                      </Typography>
                      <Typography>Quantity: {card.number}</Typography>
                      <Typography>
                        Price: {card.price * card.number} JOD
                      </Typography>
                    </CardContent>
                    <CardActions className="CardActions">
                      <Button
                        onClick={() => {
                          setupdateT(card);
                          setselectedOption(card.adds);
                          setNumberOfMeals(card.number);
                        }}
                        size="small"
                        className="Button"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          deleteitem(card._id);
                        }}
                        size="small"
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div className="hr"></div>
            <div className="chickout-div">
              <h2>Confirm your order</h2>
              <Button
                size="large"
                style={{
                  background: " #02594d",
                  marginTop: "1.1rem",
                  fontSize: "0.8rem",
                  marginLeft: "1rem",
                  color: "#ffedff",
                }}
                className="SaveButton"
                onClick={() => {
                  confirm();
                  setconfirmMsg(true)
                }}
              >
                Confirm
              </Button>
            </div>
          </Container>
        </main>

        <Drawer open={updateT} onRequestClose={() => setupdateT(false)}>
          {/* <Grid item key={updateT._id} xs={12} sm={6} md={4}> */}
          <Card className="card cardEdit">
            <img src={updateT.imgUrl} alt="" />
            <form action="" onSubmit={handleSubmit}>
              <CardContent className="cardContent">
                <Typography gutterBottom variant="h5" component="h2">
                  {updateT.name}
                </Typography>
                <Typography>
                  {updateT.adds &&
                    updateT.adds.map((option) => (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={option.value}
                              onChange={(e) => {
                                // option.value = !option.value;
                                handleCheckbox(e, option.name);
                              }}
                              color="primary"
                            />
                          }
                          label={option.name}
                        />
                      </div>
                    ))}
                </Typography>
                <Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    className="Quantity"
                    InputProps={{ inputProps: { min: 1, max: 30 } }}
                    defaultValue={updateT.number}
                    onChange={(e) => {
                      handleNumber(e);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                  <Button
                    size="large"
                    style={{
                      background: " #02594d",
                      marginTop: "1.1rem",
                      fontSize: "0.8rem",
                      marginLeft: "1rem",
                      color: "#ffedff",
                    }}
                    className="SaveButton"
                    type="submit"
                  >
                    Save
                  </Button>
                </Typography>
              </CardContent>
            </form>
          </Card>
          {/* </Grid> */}
        </Drawer>
        
      </section>
    );
  } else {
    return (
    <>
    <Drawer open={confirmMsg} onRequestClose={() => setconfirmMsg(false)}>
          <div className="popup">
            Your order has been confirmed,<br/> you can check it in
            <Link to={`/profile`}>
              <button className="AwesomeBtn msgBtn">your profile ➜</button>
            </Link>
            
          </div>
        </Drawer>
        <Empyt />
    </>
    );
  }
}
