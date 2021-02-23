import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath:
      "https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2019/07/fea_restaurants-5soc.jpg",
  },
  {
    imgPath:
      "https://images.pexels.com/photos/750073/pexels-photo-750073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    imgPath:
      "https://media3.s-nbcnews.com/j/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422_ae181a762406ae9dce02dd0d5453d1ba.nbcnews-fp-1200-630.jpg",
  },
  // {
  //   imgPath:
  //     "https://images.squarespace-cdn.com/content/v1/579107bc579fb3d29bbf8014/1586407850349-6YII4HP6BFLKECYL1FK5/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UbeDbaZv1s3QfpIA4TYnL5Qao8BosUKjCVjCf8TKewJIH3bqxw7fF48mhrq5Ulr0Hg/Dessert+Goals+Zoom+Background+6.png?format=2500w",
  // },
  {
    imgPath:
      "https://images.pexels.com/photos/1422384/pexels-photo-1422384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    imgPath:
      "https://i0.wp.com/www.eatthis.com/wp-content/uploads/2019/07/dessert-table.jpg?fit=1200%2C879&ssl=1",
  },

  {
    imgPath:
      "https://ffc.com/wp-content/uploads/2019/10/Holiday-table-setting-1030x687.png",
  },
  {
    imgPath:
      "https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 500,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <section className="container-slider">
      <div className={classes.root + " galaryImg"}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {tutorialSteps.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </div>
      <h1 className="nameOfWeb">Askadenya</h1>
      <div id="test"></div>
      <a href="#test">
        <div className="scroll-down"></div>
      </a>
    </section>
  );
}

export default SwipeableTextMobileStepper;
