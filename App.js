import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import moment from "moment/moment";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

import { API_KEY } from "@env";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);
  const [city, setCity] = useState("Loading");

  const getWeather = async () => {
    // 사용자 위치 수집 동의
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (!granted) {
      setOk(false);
    }

    // 경도, 위도 찾기
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    // 경도, 위도로 주소 찾기
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      {
        useGoogleMaps: false,
      },
    );

    setCity(location[0].city);

    // 경도, 위도로 날씨 찾기
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    );

    const { list } = await response.json();
    let toDay = moment().format("YYYY-MM-DD");

    const filterData = list.filter(
      data => moment(data.dt_txt).format("YYYY-MM-DD") === toDay,
    );

    setDays(filterData);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    // Container View 가 Flex Container
    // Flex Direction 기본값은 모두 Column
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView
        pagingEnabled
        horizontal
        // indicatorStyle="white"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={{ ...styles.day, alignItems: "center" }}>
            <ActivityIndicator color="white" style={{ marginTop: 200 }} />
          </View>
        ) : (
          days.map((data, idx) => (
            <View key={idx} style={styles.day}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>
                  {parseFloat(data.main.temp.toFixed(1))}
                </Text>
                <Fontisto
                  name={icons[data.weather[0].main]}
                  size={68}
                  color="white"
                />
              </View>

              <Text style={styles.description2}>
                {moment(data.dt_txt).format("YYYY-MM-DD HH:mm")}
              </Text>

              <Text style={styles.description}>{data.weather[0].main}</Text>
              <Text style={styles.tinyText}>{data.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: "500",
    color: "white",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
    color: "white",
  },
  description: {
    marginTop: -5,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  description2: {
    marginTop: -10,
    fontSize: 30,
    color: "white",
    fontWeight: "500",
  },
  tinyText: {
    marginTop: -5,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});
