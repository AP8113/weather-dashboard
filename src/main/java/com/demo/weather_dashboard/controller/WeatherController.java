package com.demo.weather_dashboard.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping
    public ResponseEntity<String> getWeather(@RequestParam String city) {
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
                "&appid=" + apiKey + "&units=metric";
        String result = restTemplate.getForObject(url, String.class);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/common")
    public ResponseEntity<List<Map>> getCommonCitiesWeather() {
        List<String> cities = Arrays.asList("Pune", "Bangalore", "Mumbai", "Hyderabad");
        List<Map> weatherList = new ArrayList<>();

        for (String city : cities) {
            String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
                    "&appid=" + apiKey + "&units=metric";
            Map response = restTemplate.getForObject(url, Map.class);
            weatherList.add(response);
        }
        return ResponseEntity.ok(weatherList);
    }


}
