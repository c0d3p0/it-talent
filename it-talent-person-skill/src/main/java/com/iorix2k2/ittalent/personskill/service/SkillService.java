package com.iorix2k2.ittalent.personskill.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iorix2k2.ittalent.personskill.model.Catalogue;
import com.iorix2k2.ittalent.personskill.model.Skill;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;


@Service
public class SkillService
{
	@HystrixCommand(fallbackMethod = "getAllSkillsOnError",
			commandProperties = {
					@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "6"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "8000")
			},
			
			threadPoolKey = "skillPool",
			threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "30"),
					@HystrixProperty(name = "maxQueueSize", value = "15")
			})
	public List<Skill> getAllSkills()
	{
		Catalogue<Skill> skillCatalogue = restTemplate.exchange(skillServiceURL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Skill>>(){}).getBody();
		return skillCatalogue.getList();
	}
	
	@HystrixCommand(fallbackMethod = "getSkillOnError",
			commandProperties = {
					@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "6"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "8000")
			},
			
			threadPoolKey = "skillPool",
			threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "30"),
					@HystrixProperty(name = "maxQueueSize", value = "15")
			})
	public Skill getSkill(Long id)
	{
		String skillUrl = skillServiceURL + "/" + id;
		return restTemplate.getForObject(skillUrl, Skill.class);
	}
	
	@SuppressWarnings("unused")
	private List<Skill> getAllSkillsOnError()
	{
		return Arrays.asList(getSkillOnError(-1L));
	}
	
	private Skill getSkillOnError(Long id)
	{
		Skill skill = new Skill();
		skill.setId(id);
		skill.setTitle("Unavailable");
		skill.setDescription("Unavailable.");
		return skill;
	}
	
	
	@Autowired
	private RestTemplate restTemplate;
	
	private String skillServiceURL = "http://it-talent-skill-service/api/skill";
}
