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

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;


@Service
public class SkillService
{
	@CircuitBreaker(name = SKILL_SERVICE_CB, fallbackMethod = "getAllOnError")
	public List<Skill> getAll()
	{
		var skillCatalogue = restTemplate.exchange(SKILL_BASE_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Skill>>(){}).getBody();
		return skillCatalogue.getList();
	}
	
	@CircuitBreaker(name = SKILL_SERVICE_CB, fallbackMethod = "getByIdOnError")
	public Skill getById(Long id)
	{	
		return restTemplate.getForObject(SKILL_BY_ID_URL, Skill.class, id);
	}

	@CircuitBreaker(name = SKILL_SERVICE_CB, fallbackMethod = "getByIdsOnError")
	public List<Skill> getByIds(Long[] ids)
	{
		var param = Arrays.toString(ids).replaceAll("(\\[)*( )*(\\])*", "");
		var skillCatalogue = restTemplate.exchange(SKILL_BY_IDS_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Skill>>(){}, param).getBody();
		return skillCatalogue.getList();
	}
	
	@CircuitBreaker(name = SKILL_SERVICE_CB, fallbackMethod = "getByTitleWithOnError")
	public List<Skill> getByTitleWith(String title)
	{
		var skillCatalogue = restTemplate.exchange(SKILL_BY_TITLE_URL, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Skill>>(){}, title).getBody();
		return skillCatalogue.getList();
	}

	@CircuitBreaker(name = SKILL_SERVICE_CB, fallbackMethod = "removeOnError")
	public Skill remove(Long id)
	{
		return restTemplate.exchange(SKILL_BY_ID_URL, HttpMethod.DELETE,
				null, Skill.class, id).getBody();
	}
	
	@SuppressWarnings("unused")
	private List<Skill> getAllOnError(Throwable T)
	{
		return Arrays.asList(createUnavailableSkill(-1L));
	}
	
	@SuppressWarnings("unused")
	private Skill getByIdOnError(Throwable T)
	{
		return createUnavailableSkill(-1L);
	}

	@SuppressWarnings("unused")
	private List<Skill> getByIdsOnError(Throwable T)
	{
		return Arrays.asList(createUnavailableSkill(-1L));
	}

	@SuppressWarnings("unused")
	private List<Skill> getByTitleWithOnError(Throwable T)
	{
		return Arrays.asList(createUnavailableSkill(-1L));
	}
	
	@SuppressWarnings("unused")
	private Skill removeOnError(Throwable T)
	{
		return createUnavailableSkill(-1L);
	}

	private Skill createUnavailableSkill(Long id)
	{
		var skill = new Skill();
		skill.setId(id != null ? id : -1L);
		skill.setTitle("Unavailable");
		skill.setDescription("Unavailable data.");
		return skill;
	}


	@Autowired
	private RestTemplate restTemplate;

	private static final String SKILL_BASE_URL = "http://it-talent-skill-service/api/skill";
	private static final String SKILL_BY_ID_URL = SKILL_BASE_URL + "/{id}";
	private static final String SKILL_BY_IDS_URL = SKILL_BASE_URL + "/ids/{ids}";
	private static final String SKILL_BY_TITLE_URL = SKILL_BASE_URL + "/title-with/{title}";

	private static final String SKILL_SERVICE_CB = "skillServiceCB";
}
