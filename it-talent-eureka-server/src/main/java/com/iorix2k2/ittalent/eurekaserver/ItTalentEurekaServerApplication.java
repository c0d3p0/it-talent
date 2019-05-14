package com.iorix2k2.ittalent.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ItTalentEurekaServerApplication
{
	public static void main(String[] args)
	{
		SpringApplication.run(ItTalentEurekaServerApplication.class, args);
	}
}
