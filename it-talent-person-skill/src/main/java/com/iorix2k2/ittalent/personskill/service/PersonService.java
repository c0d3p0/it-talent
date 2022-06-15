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

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;


@Service
public class PersonService
{
	@CircuitBreaker(name = PERSON_SERVICE_CB, fallbackMethod = "getAllOnError")
	public List<Person> getAll()
	{
		var personCatalogue = restTemplate.exchange(PERSON_BASE_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}).getBody();
		return personCatalogue.getList();
	}

	@CircuitBreaker(name = PERSON_SERVICE_CB, fallbackMethod = "getByIdOnError")
	public Person getById(Long id)
	{
		return restTemplate.getForObject(PERSON_BY_ID_URL, Person.class, id);
	}

	@CircuitBreaker(name = PERSON_SERVICE_CB, fallbackMethod = "getByIdsOnError")
	public List<Person> getByIds(Long[] ids)
	{
		var param = Arrays.toString(ids).replaceAll("(\\[)*( )*(\\])*", "");
		var personCatalogue = restTemplate.exchange(PERSON_BY_IDS_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}, param).getBody();
		return personCatalogue.getList();
	}

	@CircuitBreaker(name = PERSON_SERVICE_CB, fallbackMethod = "getByNameWithOnError")
	public List<Person> getByNameWith(String name)
	{
		var personCatalogue = restTemplate.exchange(PERSON_BY_NAME_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}, name).getBody();
		return personCatalogue.getList();
	}
	
	@CircuitBreaker(name = PERSON_SERVICE_CB, fallbackMethod = "removeOnError")
	public Person remove(Long id)
	{
		return restTemplate.exchange(PERSON_BY_ID_URL, HttpMethod.DELETE,
				null, Person.class, id).getBody();
	}

	@SuppressWarnings("unused")
	private List<Person> getAllOnError(Throwable T)
	{
		return Arrays.asList(createUnavailablePerson(-1L));
	}

	@SuppressWarnings("unused")
	private Person getByIdOnError(Throwable T)
	{
		return createUnavailablePerson(-1L);
	}

	@SuppressWarnings("unused")
	private List<Person> getByIdsOnError(Throwable T)
	{
		return Arrays.asList(createUnavailablePerson(-1L));
	}

	@SuppressWarnings("unused")
	private List<Person> getByNameWithOnError(Throwable T)
	{
		return Arrays.asList(createUnavailablePerson(-1L));
	}
	
	@SuppressWarnings("unused")
	private Person removeOnError(Throwable T)
	{
		return createUnavailablePerson(-1L);
	}

	public Person createUnavailablePerson(Long id)
	{
		var p = new Person();
		p.setId(id != null ? id : -1L);
		p.setName("Unavailable");
		p.setAge((byte) -1);
		p.setCountry("Unavailable");
		p.setEmail("unavailable@unavailable.com");
		return p;
	}


	@Autowired
	private RestTemplate restTemplate;

	private static final String PERSON_BASE_URL = "http://it-talent-person-service/api/person";
	private static final String PERSON_BY_ID_URL = PERSON_BASE_URL + "/{id}";
	private static final String PERSON_BY_IDS_URL = PERSON_BASE_URL + "/ids/{ids}";
	private static final String PERSON_BY_NAME_URL = PERSON_BASE_URL + "/name-with/{name}";

	private static final String PERSON_SERVICE_CB = "personServiceCB";
}
