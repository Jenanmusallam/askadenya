import React,{useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Drawer from "react-drag-drawer";
export default function Contact() {
  const [email, setemail] = useState("")
  const [msg, setmsg] = useState("")
  const [msgTogel, setmsgTogel] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
      const obj = {
        email:email,
        msg: msg,
      };
      axios
        .post(
          "http://localhost:8000/contactUs/",
          obj
        ).then(()=>{
          setmsgTogel(true)
        })

    
  };
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
        Your opinion matters
        </Typography>
        <form className="Youropinion" onSubmit={handleSubmit}>
          <TextField
          value={email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e)=>{
              setemail(e.target.value)
            }}
          />
          <TextField
          value={msg}

            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Your message"
            type="text"
            onChange={(e)=>{
              setmsg(e.target.value)
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Send
          </Button>
        </form>
      </div>
      <Drawer open={msgTogel} onRequestClose={() => {setmsgTogel(false); setemail(""); setmsg("")}}>
            <div className="popup ourGreen">
              Thank you for sharing your opinion with us. 
            </div>
          </Drawer>
    </Container>
  );
}
