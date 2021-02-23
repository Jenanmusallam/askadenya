import React, { useState, useEffect, useContext } from "react";
import "./style.scss";
import juices from "../../Data/juices";
import meals from "../../Data/meals";
import sweets from "../../Data/sweets";
import axios from "axios";
import { NumContext } from "../../NumContext";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import Drawer from "react-drag-drawer";
import { Link } from "react-router-dom";

function Products({ match }) {
  const { incresNum } = useContext(NumContext);
  const [data, setdata] = useState([]);
  const [product, setproduct] = useState({});
  const [selectedOption, setselectedOption] = useState([]);
  const [numberOfMeals, setNumberOfMeals] = useState(1);
  const [msgTogel, setmsgTogel] = useState(false);
  const [msgloginTogel, setmsgloginTogel] = useState(false);
  const getdata = async () => {
    if (match.params.category == "Cold Drinks") {
      setdata(juices);
    } else if (match.params.category == "Fast Food") {
      setdata(meals);
    } else {
      setdata(sweets);
    }
  };

  useEffect(() => {
    getdata().then(async () => {
      const productobj = data.find(
        (producto) => producto.name == match.params.product
      );
      setproduct(productobj);
    });
  }, [data]);
  // =====================
  if (product) {
    document.title = `Askadenya | ${match.params.category} | ${match.params.product}`;
    document.getElementsByTagName("META")[4].content = product.keywords;
    document.getElementsByTagName("META")[3].content = product.description;
  }
  // ========================
  useEffect(() => {
    if (product && product.options) {
      let so = [];
      product.options.map((op) => {
        so.push({ name: op, value: false });
      });
      setselectedOption(so);
    }
  }, [product]);

  const handleCheckbox = (e, name) => {
    let so = selectedOption;
    for (let i = 0; i < so.length; i++) {
      if (so[i].name == name) {
        so[i].value = e.target.checked;
      }
    }
    setselectedOption(so);
  };

  const handleNumber = (e) => {
    setNumberOfMeals(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem("userId")) {
      const obj = {
        name: product.name,
        imgUrl: product.imgUrl,
        pid: product.id,
        number: numberOfMeals,
        adds: selectedOption,
        price: product.price,
      };
      axios
        .post(
          "http://localhost:8000/cart/" + sessionStorage.getItem("userId"),
          obj
        )
        .then((res) => {
          incresNum();
          setmsgTogel(true);
        });
    } else {
      setmsgloginTogel(true);
    }
  };

  if (product)
    return (
      <>
        <section className="Breadcrumbs">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link to="/">Home</Link>
            <Link to={"/menu/" + match.params.category}>
              {match.params.category}
            </Link>
            <Typography color="textPrimary">{match.params.product}</Typography>
          </Breadcrumbs>
        </section>
        <section className="productPage">
          <section className="productContainer">
            <img src={product.imgUrl} alt={product.name} className="mealImg" />
            <article className="discription">
              <h2 className="mealName">{product.name}</h2>
              <p className="mealInfo">{product.description}</p>{" "}
              <span id="price">{product.price} JOD</span>
              <div className="options">
                <form onSubmit={handleSubmit}>
                  {product.options &&
                    product.options.map((option) => (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) => {
                                handleCheckbox(e, option);
                              }}
                              color="primary"
                            />
                          }
                          label={option}
                        />
                      </div>
                    ))}

                  <TextField
                    label="Quantity"
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 30 } }}
                    defaultValue={1}
                    onChange={(e) => {
                      handleNumber(e);
                    }}
                    className="Quantity"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />

                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    className="order"
                  >
                    Order | {product.price * numberOfMeals} JOD
                  </Button>
                </form>
              </div>
            </article>
          </section>
          <Drawer open={msgTogel} onRequestClose={() => setmsgTogel(false)}>
            <div className="popup">
              Awesome! Your food is on the Cart
              <Link to={`/cart`}>
                <button className="AwesomeBtn msgBtn">
                  Check it out now! ➜
                </button>
              </Link>
            </div>
          </Drawer>
          <Drawer
            open={msgloginTogel}
            onRequestClose={() => setmsgloginTogel(false)}
          >
            <div className="loginMsg">
              It's seems like you don't have an account, you still can join us.
              <Link to={`/login`}>
                <button className="msgBtn">Signup now! ➜</button>
              </Link>
            </div>
          </Drawer>
        </section>
      </>
    );
  else {
    return <p>loding...</p>;
  }
}

export default Products;
