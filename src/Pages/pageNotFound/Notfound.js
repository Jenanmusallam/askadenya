import React from 'react'
import not from './nott.png'
import './style.scss'
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom'
function Notfound() {
  return (
    <div className="wrapper">
      <h1>“Oops! The page not found” </h1>
      <img src={not} alt="" className="img" />
      <Link to={`/`}>
        <Button className="btn" >
          Go back to Askadenya
      </Button>
      </Link>
    </div>
  )
}
export default Notfound;