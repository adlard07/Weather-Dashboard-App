from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv("config.env")

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000", 
    "http://52.66.143.178/", # frontend
    "http://13.203.90.88/" # backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

class WeatherResponse(BaseModel):
    temperature: float
    weather_description: str
    humidity: int
    wind_speed: float


@app.get("/weather/", response_model=WeatherResponse)
async def get_weather(city: str = Query(..., description="The city name to fetch weather for")):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")

    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()

        weather_info = {
            "temperature": data["main"]["temp"],
            "weather_description": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"]
        }

        return weather_info

    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=404, detail="City not found or API error")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching weather data")


@app.get("/air-quality/", response_model=dict)
async def get_air_quality(city: str = Query(..., description="The city name to fetch air quality for")):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="API key not configured")
    geocode_params = {
        "q": city,
        "appid": API_KEY
    }
    geocode_url = "http://api.openweathermap.org/geo/1.0/direct"
    try:
        geocode_response = requests.get(geocode_url, params=geocode_params)
        geocode_response.raise_for_status()
        geocode_data = geocode_response.json()
        lat = geocode_data[0]["lat"]
        lon = geocode_data[0]["lon"]
    except Exception as e:
        raise HTTPException(status_code=404, detail="City not found")

    air_quality_url = "http://api.openweathermap.org/data/2.5/air_pollution"
    air_quality_params = {
        "lat": lat,
        "lon": lon,
        "appid": API_KEY
    }

    try:
        air_quality_response = requests.get(air_quality_url, params=air_quality_params)
        air_quality_response.raise_for_status()
        air_quality_data = air_quality_response.json()

        return air_quality_data

    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=404, detail="Air quality data not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching air quality data")


@app.get("/weather/forecast/", response_model=dict)
async def get_weather_forecast(city: str = Query(..., description="The city name to fetch weather forecast for")):
    forecast_url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(forecast_url, params=params)
        response.raise_for_status()
        forecast_data = response.json()

        return forecast_data
    except requests.exceptions.HTTPError:
        raise HTTPException(status_code=404, detail="City not found or API error")
    except Exception:
        raise HTTPException(status_code=500, detail="An error occurred while fetching forecast data")


@app.get("/uv-index/", response_model=dict)
async def get_uv_index(city: str = Query(..., description="The city name to fetch UV index for")):
    geocode_url = "http://api.openweathermap.org/geo/1.0/direct"
    geocode_params = {
        "q": city,
        "appid": API_KEY
    }

    try:
        geocode_response = requests.get(geocode_url, params=geocode_params)
        geocode_response.raise_for_status()
        geocode_data = geocode_response.json()
        lat = geocode_data[0]["lat"]
        lon = geocode_data[0]["lon"]

        uv_url = "http://api.openweathermap.org/data/2.5/uvi"
        uv_params = {
            "lat": lat,
            "lon": lon,
            "appid": API_KEY
        }

        uv_response = requests.get(uv_url, params=uv_params)
        uv_response.raise_for_status()
        uv_data = uv_response.json()

        return uv_data
    except Exception:
        raise HTTPException(status_code=500, detail="An error occurred while fetching UV index data")
