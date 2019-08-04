package com.iorix2k2.ittalent.personskill;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
public class ItTalentPersonSkillApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(ItTalentPersonSkillApplication.class, args);
	}
}
