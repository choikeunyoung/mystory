import axios from "axios";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";

const { width: SCRREN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const getGeocodeAsync = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
        );
        setCity(response.data.results[6].address_components[0].long_name);
      } catch (error) {
        console.error(error);
      }
    };
    getGeocodeAsync(latitude, longitude);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.descript}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  city: {
    flex: 1.2,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
  },
  weather: {
    backgroundColor: "blue",
  },
  day: {
    width: SCRREN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
    fontWeight: "600",
  },
  descript: {
    marginTop: -30,
    fontSize: 60,
  },
});
