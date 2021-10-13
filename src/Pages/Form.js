import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import clsx from "clsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  box: {
    margin: "100px",
    display: "flex",
  },
  outerBox: {
    marginTop: "25px",
    marginLeft:"500px",
    display: "flex",
  },
  innerBox: {
    margin: "25px",
  },
  buttonGroup: {
    marginRight: "25px",
  },
  button: {
    marginRight: "100px",
  },
  formControl: {
    minWidth: 120,
  },

  TextField: {
    background: '#E9A3A2',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  
});


const Form = () => {


  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [isImperialUnit, setIsImperialUnit] = useState(false);
  const [rows, setRows] = useState([]);

  const switchRef = useRef();

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInformation");
    JSON.parse(savedUserInfo)?.isImperialUnit &&
      setIsImperialUnit(JSON.parse(savedUserInfo).isImperialUnit);
  }, []);

  const surnameHandler = (value) => {
    setSurname(value);
  };

  const userNameHandler = (value) => {
    setUserName(value);
  };

  const weightHandler = (value) => {
    setWeight(value);
  };

  const heightHandler = (value) => {
    setHeight(value);
  };

  const genderHandler = (value) => {
    setGender(value);
  };

  const unitHandler = () => {
    setIsImperialUnit((oldState) => !oldState);
  };

  const countryHandler = (value) => {
    setCountry(value);
  };

  const getSwitchInfo = () => {
    console.log(switchRef);
  };

  const rowsHandler = (userInfo) => {
    setRows([...rows, userInfo]);
  };

  const clearHandler = () => {
    setRows([]);
  };

  const checkCountryArray = (rows, index) => {
    if (countries.length > 0) {
      return countries[rows[index].country].countryName;
    }
  };

  const submitHandler = () => {
    const userInfo = {
      surname,
      weight,
      height,
      userName,
      gender,
      isImperialUnit,
      country,
    };
    
    rowsHandler(userInfo);
    const stringUserInfo = JSON.stringify(userInfo);
    localStorage.setItem("userInformation", stringUserInfo);
  };

  const getCountries = () => {
    axios.get("https://countriesnow.space/api/v0.1/countries").then((res) => {
      const countryArr = res.data.data.map((countryItem, index) => {
        return { countryName: countryItem.country, id: index };
      });

      setCountries(countryArr);
    });
  };

  return (
    <Box classes={classes.box}>
      <Box className={classes.outerBox}>
        <Box className={classes.innerBox}>
          <TextField
            id="name-input"
            label="Name"
            variant="outlined"
            onChange={(e) => userNameHandler(e.target.value)}
            className={classes.TextField}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            required
            id="surname-input"
            label="Surname"
            variant="outlined"
            onChange={(e) => surnameHandler(e.target.value)}
            className={classes.TextField}
          />
        </Box>
        <Box className={classes.innerBox}>
          <FormControl className={classes.formControl}>
            <InputLabel id="coutry-label">Country</InputLabel>
            <Select
              labelId="country-label"
              id="country-select"
              value={country}
              onChange={(e) => countryHandler(e.target.value)}
            >
              {countries.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.countryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.outerBox}>
        
        <Box className={classes.innerBox}>
          <TextField
            label="Weight"
            type="number"
            id="weight-input"
            onChange={(e) => weightHandler(e.target.value)}
            className={classes.TextField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isImperialUnit ? "Lbs" : "Kg"}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className={classes.innerBox}>
          <TextField
            ref={switchRef}
            label="Height"
            id="height-input"
            type="number"
            onChange={(e) => heightHandler(e.target.value)}
            className={classes.TextField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isImperialUnit ? "Inc" : "Cm"}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Box className={classes.innerBox}>
          <FormControlLabel
            control={
              <Switch
                checked={isImperialUnit}
                onChange={() => unitHandler()}
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Is Unit Imperial"
            labelPlacement="top"
          />
        </Box>
        <Box className={classes.innerBox}>
          <FormControl
            className={clsx(classes.buttonGroup, classes.button)}
            component="fieldset"
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={(e) => genderHandler(e.target.value)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        </Box>
        <Box className={classes.outerBox}>
          <Box className={classes.innerBox}>
            <CustomButton
              buttonFunction={() => submitHandler()}
              buttonText={"Submit"}
            ></CustomButton>
          </Box>
          <Box className={classes.innerBox}>
            <CustomButton
              buttonFunction={() => getSwitchInfo()}
              buttonText={"Get Ref Info"}
            ></CustomButton>
          </Box>

          
        </Box>

        <Box className={classes.outerBox}>
          <Box className={classes.innerBox}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Surname</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Weight&nbsp;</TableCell>
                    <TableCell align="right">Height&nbsp;</TableCell>
                    <TableCell align="right">Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {rows.map((row, index) => (
                    <TableRow key={index}>

                      <TableCell align="right">{rows[index].userName}</TableCell>
                      <TableCell align="right">{rows[index].surname}</TableCell>
                      <TableCell align="right">{countries[rows[index].country].countryName}</TableCell>
                      <TableCell align="right">{rows[index].weight}</TableCell>
                      <TableCell align="right">{rows[index].height}</TableCell>
                      <TableCell align="right">{rows[index].gender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box className={classes.innerBox}>
          <CustomButton
            buttonFunction={() => clearHandler()}
            buttonText={"Clear"}
          ></CustomButton>
            
          </Box>
        </Box>

      
    </Box>
  );
};

export default Form;
