import Login from "./login";
import React, { useContext } from "react";
import { NumContext } from "../../NumContext";
export default function LoginPage() {
  const { setisLogin, getcartNumber } = useContext(NumContext);
  document.title = "Askadenya | Login and Signup Page";

  return (
    <div>
      <Login setisLogin={setisLogin} getcartNumber={getcartNumber} />
    </div>
  );
}
