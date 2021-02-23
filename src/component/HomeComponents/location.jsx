import React from "react";
import "./location.scss";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Component } from "react";
import RoomIcon from "@material-ui/icons/Room";
// import LocalShippingIcon from '@material-ui/icons/LocalShipping';

const mapStyle = {
  width: "100%",
  height: "45vh",
  position: "relative",
};
class Location extends Component {
  render() {
    return (
      <div
        data-aos="fade-in"
        data-aos-duration="1500"
        className="container-Location"
      >
        <div class="row">
          <div class="column">
            <div class="card">
              <div style={mapStyle}>
                <Map
                  google={this.props.google}
                  zoom={14}
                  google={this.props.google}
                  initialCenter={{
                    lat: 31.97,
                    lng: 35.9092,
                  }}
                >
                  <Marker
                    onClick={this.onMarkerClick}
                    name={"Current location"}
                  />

                  <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
                </Map>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <h2>
                <RoomIcon style={{ color: "#02594d", fontSize: "2rem" }} /> Our
                location
              </h2>
              {/* <p>We will to see you</p> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCORk1D7UpDb5z_7mVnLpvdLqJog5rR9Ak",
})(Location);
