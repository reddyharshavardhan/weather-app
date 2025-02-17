import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Switch from '@mui/material/Switch';

const Navbar = ({ onSearch, onCurrentLocation, onThemeChange, checked }) => {
  const [searchCity, setSearchCity] = useState("");

  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
    }
  };

  return (
    <nav
      style={{
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        padding: "10px",
        paddingLeft: "30px",
        paddingRight: "30px",
        color: "red",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <FilterDramaTwoToneIcon />
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Weather</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <TextField
          variant="outlined"
          placeholder="Search city 'London'"
          size="small"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "2rem",
            width: "22rem",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSearchClick} style={{ borderRadius: "6px", backgroundColor: "#4B5550" }}>
          Search
        </Button>
      </div>
      <div
        style={{
          marginTop: "1rem",
          fontSize: "16px",
          fontWeight: "700",
          backgroundColor: "#4B5550",
          height: "35px",
          width: "150px",
          color: "white",
          gap: "2px",
          borderRadius: "6px",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={onCurrentLocation}
      >
        <GpsFixedIcon />
        <p style={{ fontSize: "14px" }}>Current Location</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <p style={{ fontSize: "14px", color: checked ? "white" : "black" }}></p>
        <Switch
          checked={checked}
          onChange={onThemeChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
