package com.tictactoe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Value("${app.react.app.url}")
    private String react_app_url;
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("config frontendurl : " + react_app_url);

        registry.addMapping("/**")
                .allowedOrigins(react_app_url)
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
