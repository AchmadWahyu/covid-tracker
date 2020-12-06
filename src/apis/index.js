import axios from "axios"

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    let newUrl = url;
    if(country){
        console.log(`fetch data for country ${country}`)
        newUrl =  `${url}/countries/${country}`
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(newUrl);
        
        return {confirmed, recovered, deaths, lastUpdate}
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try{
        const {data} = await axios.get(`${url}/daily`)
        const modifiedData = data.map(dailyData => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData
    }
    catch(err) {
        console.log(err)
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`)
        return countries.map(country => {
            return {label: country.name, value: country.name}
        })
    } catch (error) {
        console.log(error)
    }
}