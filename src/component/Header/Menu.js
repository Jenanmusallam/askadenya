import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

export default function SimpleMenu(x) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {x.isLogin ? (
        <Button 
        edge="start"
        className="color JoinUsBtn"
        aria-label="menu"
        onClick={handleClick}
      >
        Menu{" "}
      </Button>
      ) : (
        <Button 
        edge="start"
        variant="outlined"
        className="color"
        aria-label="menu"
        onClick={handleClick}
      >
        Menu{" "}
      </Button>
      )}
      

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to={`/menu/Fast Food`}>
        <MenuItem onClick={handleClose}>Fast Food</MenuItem>
        </Link>
        <Link to={`/menu/Cold Drinks`}>
        <MenuItem onClick={handleClose}>Cold Drinks</MenuItem>
        </Link>
        <Link to={`/menu/Desserts`}>
        <MenuItem onClick={handleClose}>Desserts</MenuItem>
        </Link>
        <Link to={`/menu`}>
        <MenuItem onClick={handleClose}>All Products</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
