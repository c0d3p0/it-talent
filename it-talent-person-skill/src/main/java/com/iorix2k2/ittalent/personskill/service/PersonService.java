package com.iorix2k2.ittalent.personskill.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iorix2k2.ittalent.personskill.model.Catalogue;
import com.iorix2k2.ittalent.personskill.model.Person;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;


@Service
public class PersonService
{
	@HystrixCommand(fallbackMethod = "getAllPeopleOnError",
			commandProperties = {
					@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "6"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "8000")
			},
			
			threadPoolKey = "personPool",
			threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "30"),
					@HystrixProperty(name = "maxQueueSize", value = "15")
			})
	public List<Person> getAllPeople()
	{
		Catalogue<Person> personCatalogue = restTemplate.exchange(personServiceURL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}).getBody();
		return personCatalogue.getList();
	}
	
	@HystrixCommand(fallbackMethod = "getPersonOnError",
			commandProperties = {
					@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "6"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "8000")
			},
			
			threadPoolKey = "personPool",
			threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "30"),
					@HystrixProperty(name = "maxQueueSize", value = "15")
			})
	public Person getPerson(Long id)
	{
		String url = personServiceURL + "/" + id;	
		return restTemplate.getForObject(url, Person.class);
	}
	
	@HystrixCommand(fallbackMethod = "getPeopleByNameWithOnError",
			commandProperties = {
					@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "2000"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "6"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50"),
					@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "8000")
			},
			
			threadPoolKey = "personPool",
			threadPoolProperties = {
					@HystrixProperty(name = "coreSize", value = "30"),
					@HystrixProperty(name = "maxQueueSize", value = "15")
			})
	public List<Person> getPeopleByNameWith(String name)
	{
		String url = personServiceURL + "/name-with/" + name;
		Catalogue<Person> personCatalogue = restTemplate.exchange(url, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}).getBody();
		return personCatalogue.getList();
	}
	
	@SuppressWarnings("unused")
	private List<Person> getAllPeopleOnError()
	{
		return Arrays.asList(getPersonOnError(-1L));
	}

	@SuppressWarnings("unused")
	private List<Person> getPeopleByNameWithOnError(String name)
	{
		return Arrays.asList(getPersonOnError(-1L));
	}
	
	private Person getPersonOnError(Long id)
	{
		Person p = new Person();
		p.setId(id);
		p.setName("Unavailable");
		p.setAge((byte)0);
		p.setCountry("Unavailable");
		p.setEmail("unavailable@unavailable.com");
		return p;
	}
	
	
	@Autowired
	private RestTemplate restTemplate;
	
	private String personServiceURL = "http://it-talent-person-service/api/person";
}
