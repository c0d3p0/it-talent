package com.iorix2k2.ittalent.person;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class ItTalentPersonApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(ItTalentPersonApplication.class, args);
	}
}
