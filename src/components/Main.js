import { useContext } from "react";
import "../styles/components/Main.scss";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import WeatherContext from "../context/weather.context";
import Loader from "./Loader";

function Main() {
    const { loading, currentWeather, dailyForecast, hourlyForecast } =
        useContext(WeatherContext);
    return (
        <div className="Main">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <CurrentWeather data={currentWeather} />
                    <Forecast
                        type="hourly"
                        title="Hourly Forecast"
                        data={hourlyForecast}
                    />
                    <Forecast
                        type="daily"
                        title="21 Day Forecast"
                        data={dailyForecast}
                    />
                </>
            )}
        </div>
    );
}

export default Main;
