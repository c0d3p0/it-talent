package com.iorix2k2.ittalent.skill;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class ItTalentSkillApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(ItTalentSkillApplication.class, args);
	}
}
