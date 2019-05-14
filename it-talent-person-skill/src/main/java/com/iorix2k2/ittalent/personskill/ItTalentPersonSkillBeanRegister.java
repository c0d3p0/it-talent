package com.iorix2k2.ittalent.personskill;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class ItTalentPersonSkillBeanRegister
{
	@Bean
	@LoadBalanced
	public WebClient webClient()
	{
		return WebClient.builder().build();
	}
	
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate()
	{
		return new RestTemplate();
	}
}
