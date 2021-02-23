import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import "./style.scss";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
Breadcrumbs
} from "@material-ui/core";

import juices,{informationJuices} from "../../Data/juices";
import meals,{informationMeals} from "../../Data/meals";
import sweets,{informationSweets} from "../../Data/sweets";
export default function Products({ match }) {
  const [data, setdata] = useState([]);
  useEffect(() => {
    if (match.params.category == "Cold Drinks") {
      setdata(juices);
      document.title = informationJuices.Title;
      document.getElementsByTagName(
        "META"
      )[4].content = informationJuices.keywords;
      document.getElementsByTagName(
        "META"
      )[3].content = informationJuices.description;
    
    } else if (match.params.category == "Fast Food") {
      setdata(meals);
      document.title = informationMeals.Title;
      document.getElementsByTagName(
        "META"
      )[4].content = informationMeals.keywords;
      document.getElementsByTagName(
        "META"
      )[3].content = informationMeals.description;
    } else {
      setdata(sweets);
      document.title = informationSweets.Title;
      document.getElementsByTagName(
        "META"
      )[4].content = informationSweets.keywords;
      document.getElementsByTagName(
        "META"
      )[3].content = informationSweets.description;
    }
  }, [match.params.category]);

  return (
    <section className="products">
      <section className="Breadcrumbs">
        <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link to="/">
          Home
        </Link>
        <Typography color="textPrimary">{match.params.category}</Typography>
      </Breadcrumbs>
        </section>
      <main className="card-container">
        <Container maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Link to={`/menu/${match.params.category}/${card.name}`}>
                  <Card className="card">
                    <CardMedia
                      className="cardMedia"
                      image={card.imgUrl}
                      title="Image title"
                    />
                    <CardContent className="cardContent">
                      <Typography
                        className="Pname"
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        {card.name}
                      </Typography>
                      <Typography className="Pprice">
                        Price: {card.price} JOD
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </section>
  );
}
