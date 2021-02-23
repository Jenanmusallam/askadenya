import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Breadcrumbs } from "@material-ui/core";
import categories from "../../Data/categories";

export default function AllProducts() {
  return (
    <div className="AllProducts">
      <section className="Breadcrumbs">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link to="/">Home</Link>
          <Typography color="textPrimary">All Products</Typography>
        </Breadcrumbs>
      </section>
      {categories.map((categorie) => (
        <section
          data-aos="fade-in"
          data-aos-duration="1500"
          className="products"
        >
          <main className="card-container">
            <Container maxWidth="md">
              <h2 style={{ color: "#02594d" }}>{categorie.name}</h2>
              <Grid container spacing={4}>
                {categorie.data.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Link to={`/menu/${categorie.name}/${card.name}`}>
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
      ))}
    </div>
  );
}
