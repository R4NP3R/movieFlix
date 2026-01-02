package com.movieflix.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

  @Bean
  public OpenAPI getOpenAPI () {

    Contact contact = new Contact();

    contact.name("Rafael Silva Santos");
    contact.url("https://vs-portfolio-ochre.vercel.app/");

    Info info = new Info();

    info.title("MovieFlix - Catalogo de Filmes");
    info.version("0.0.1");
    info.description("O MovieFlix é uma API REST desenvolvida em Java com Spring Boot para gerenciamento de um catálogo de filmes");

    return new OpenAPI().info(info);

  }
}
