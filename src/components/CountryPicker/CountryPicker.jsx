import React from "react";
import { FormControl, NativeSelect, TextField } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { fetchCountries } from "../../apis";
import Autocomplete from '@material-ui/lab/Autocomplete';

const CountryPicker = ({country, handleChange}) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, []);

  function changeHandler(opt){
    console.log(`final value: ${opt.value}`)
    if(opt != null){
      handleChange(opt.value)
    }
  }

  function inputChangeHandler(value){
    console.log(`input value: ${value}`)
    if(value === ''){
      handleChange(value)
    }
  }

  console.log(fetchedCountries);
  return (
    <FormControl className={styles.countrypicker}>
      <Autocomplete
        options={fetchedCountries}
        getOptionLabel={opt => opt.label}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        value={country}
        onChange={(e, newValue) => newValue && changeHandler(newValue)}
        onInputChange={(e, inputValue) => inputChangeHandler(inputValue)}
      />
      {/* <NativeSelect value={country} onChange={(e) => handleChange(e.target.value)}>
          <option value="">Global</option>
        {fetchedCountries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </NativeSelect> */}
    </FormControl>
  );
};

export default CountryPicker;
