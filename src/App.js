import React from 'react'
import {Cards, Chart, CountryPicker} from "./components"
import styles from "./App.module.css"
import { fetchData } from './apis'
import { Typography } from '@material-ui/core'

class App extends React.Component {
    state = { 
        data: {},
        country: ''
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        let fetchedData = await fetchData(country);
        
        this.setState({data: fetchedData, country: country})    
        console.log(fetchedData)
    }

    render(){
        const {data, country} = this.state

        return(
            <div className={styles.container}>
                <Typography variant="h3">Status Persebaran Covid-19</Typography>
                <Cards data={data}/>
                <CountryPicker data={data} country={this.country} handleChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;