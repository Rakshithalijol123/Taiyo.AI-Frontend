import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

// Fetch chart data from the API
const fetchChartData = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
};

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);

  // Fetch country data from the API
  const fetchCountryData = async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');
    const data = res.data;

    const countryData = data.map((country) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));

    setCountryData(countryData);
  };

  // Fetch chart data on component mount
  useEffect(() => {
    fetchChartData().then((res) =>
      setChartData({
        labels: Object.keys(res.data.cases),
        datasets: [
          {
            label: 'COVID-19 Cases',
            data: Object.values(res.data.cases),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      })
    );
    fetchCountryData();
  }, []);

  // Initialize chart
  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'COVID-19 Dashboard',
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  }, [chartData]);

  return (
    <div>
      <div id="charts_page_div">
        <div style={{ padding: '30px', margin: 'auto', width: '79%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', border: '1px solid gray' }}>
          <canvas id="myChart" width="400" height="200"></canvas>
          <br />
          <br />
          <MapContainer style={{ height: "400px", width: "100%" }} center={[20, 0]} zoom={2}>
            <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=NLe8DG6CVIhkI4PpAXR1" />
            {countryData.map((country) => (
              <Marker key={country.name} position={[country.lat, country.long]}>
                <Popup>
                  <h4>Name: {country.name}</h4>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered Cases: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
