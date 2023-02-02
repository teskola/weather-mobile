import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Temperature from './Temperature';
import Wind from './Wind';
import WeatherIcon from './WeatherIcon';

const WeatherListItem = props => {
  const API_KEY = 'db665b34ad76791b17f190401a72755f';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${API_KEY}&units=metric`;
  const [name, setName] = useState('');
  const [temp, setTemp] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [weatherIconId, setWeatherIconId] = useState(802);
  const [sunIsSet, setSunIsSet] = useState(false);
  const [isLoading, setLoadingState] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchWeatherData() {
    const unixTime = Date.now() / 1000;
    setLoadingState(true);
    try {
      const response = await fetch(url);
      console.log(`${response.status} ${url}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      setName(data.name);
      setTemp(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setWindSpeed(data.wind.speed);
      setWindDirection(data.wind.deg);
      setSunIsSet(unixTime <= data.sys.sunrise || unixTime >= data.sys.sunset);
      setWeatherIconId(data.weather[0].id);
    } catch (err) {
      setError(err.message);
    }
    setLoadingState(false);
  }

  let content;
  if (error) {
    content = (
      <View style={styles.text}>
        <Text style={styles.text}>{error}</Text>
      </View>
    );
  } else if (isLoading) {
    content = (
      <View style={styles.text}>
        <Text>Fetching weather data...</Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.data}>
        <Text style={styles.name}>{name}</Text>
        <Temperature temp={temp} feelsLike={feelsLike} />
        <Wind direction={windDirection} speed={windSpeed} />
        <WeatherIcon
          style={styles.name}
          weatherId={weatherIconId}
          sunIsSet={sunIsSet}
          width={50}
          height={50}
        />
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingLeft: 10,
    paddingRight: 10,
  },
  data: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  name: {
    fontSize: 18,
    flexGrow: 1,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default WeatherListItem;
