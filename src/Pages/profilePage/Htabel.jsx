import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.Location}</TableCell>
        <TableCell>{row.Date}</TableCell>
        <TableCell>{row.TotalPrice} JOD</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Additions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.name}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.number}</TableCell>
                      <TableCell>
                        {historyRow.price * historyRow.number} JOD
                      </TableCell>
                      <TableCell>
                        {historyRow.adds.map(
                          (add) => add.value && add.name + " | "
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [history, sethistory] = useState([]);
  const [data1, setdata1] = useState([]);

  const createData = (h) => {
    let dataarr = [];
    for (let i = h.length - 1; i >= 0; i--) {
      let Totalprice = 0;
      h[i].p.map((order) => {
        Totalprice += order.price * order.number;
      });

      const obj = [
        {
          id: i + 1,
          Location: "Amman - Marka",
          Date: moment(h[i].created_at).format("DD-MM-YYYY || hh:mm A"),
          TotalPrice: Totalprice,
          history: h[i].p,
        },
      ];

      dataarr = [...dataarr, ...obj];
    }
    setdata1(dataarr);
  };

  const gethistory = async () => {
    axios
      .get("http://localhost:8000/history/" + sessionStorage.getItem("userId"))
      .then((res) => {
        sethistory(res.data);
        createData(res.data);
      });
  };

  useEffect(() => {
    gethistory();
  }, []);

  return (
    <TableContainer className="HTable" component={Paper}>
      <h2>List of orders</h2>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>#</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data1.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
