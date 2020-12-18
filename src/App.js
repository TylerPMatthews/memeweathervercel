import React, { useState} from "react";
import "./App.css";
import Weather from "./components/Weather";
import axios from "axios";
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
import CloudIcon from '@material-ui/icons/Cloud';
import PersonPinIcon from '@material-ui/icons/PersonPin';

const StyledApp = styled.div`
  h2 {
    color: red;
    text-align: center;
    margin-top: 5%;
    font-family: "Architects Daughter", cursive;
  }
  .search-box {
    display: flex;
    justify-content: center;
  }
  input {
    text-align: center;
    color: red;
  
   
  }
  .no-weather {
    text-align: center;
    margin-top: 15%;
    font-size: 1.5rem;
    color: white;
    margin-right: 5%;
    margin-left: 5%;
    font-family: "Architects Daughter", cursive;
  }
  .send-button{
    display:flex;
    justify-content:center;
    margin-top:5%;
  }
  button {
    font-size: 1rem;
    font-family: "Architects Daughter", cursive;
    text-align:center;
    color:white;
  }
  button:hover {
    cursor:pointer;
  }
  footer p {
    text-align: center;
    font-family: "Architects Daughter", cursive;
    color: white;
    margin:10% 0;
  }
 
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState();
 
  const clearWeather = () => {
    setWeather(undefined)
  }
  const search = (evt) => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=10cae7ec92fa4e47ac933047200611&q=${query}&days=1 `
      )
      .then((res) => {
        setQuery("");
        const weatherData = res.data;
        setWeather(weatherData);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    search();
  };
  const classes = useStyles();
  return (
    <StyledApp>
      <h2>Meme Weather</h2>
      <div className="search-box">
        <form onSubmit={onSubmit} className={classes.root} autoComplete='off' >
          <TextField
            type="text"
            id="standard-basic"
            className="search-bar"
            placeholder="City, State"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            color='primary'

          ></TextField>
          <div className='send-button'>
          <Button variant="contained" color="primary" onClick={search} > <PersonPinIcon fontSize='small' /> Send Location</Button>
          </div>
        </form>
      </div>

      {weather === undefined ? (
        <div className="no-weather">
          <p> <WarningIcon color='action'/> No weather to display <WarningIcon color='action'/></p>
          <p>Press Send Location to submit your city , state</p>
        </div>
      ) : (
        <Weather weather={weather} clearWeather={clearWeather}/>
      )}

      <footer>
        <p><CloudIcon fontSize='small' /> Meme Weather 2020 <CloudIcon fontSize='small' /></p> 
      </footer>
    </StyledApp>
  );
}

export default App;
