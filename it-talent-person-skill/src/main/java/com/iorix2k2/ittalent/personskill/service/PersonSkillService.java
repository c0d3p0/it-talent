package com.iorix2k2.ittalent.personskill.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iorix2k2.ittalent.personskill.model.Catalogue;
import com.iorix2k2.ittalent.personskill.model.Person;
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.model.PersonSkillPK;
import com.iorix2k2.ittalent.personskill.model.Skill;
import com.iorix2k2.ittalent.personskill.repository.PersonSkillRepository;


@Service
public class PersonSkillService
{		
	public List<PersonSkill> getAll()
	{
		return personSkillRepository.findAll();
	}
	
	public List<Person> getAllPeople()
	{
		Catalogue<Person> personCatalogue = restTemplate.exchange(personServiceURI, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}).getBody();
		List<Person> peopleList = personCatalogue.getList(); 
		setPeopleSkillList(peopleList);
		return peopleList;
	}
	
	public Person getPersonById(Long personId)
	{
		String url = personServiceURI + "/" + personId;		
		Person person = restTemplate.getForObject(url, Person.class);
		
		if(!person.isEmpty())
			setPersonSkillList(person);

		return person;
	}

	public List<Person> getPeopleByNameWith(String name)
	{
		String url = personServiceURI + "/name-with/" + name;
		Catalogue<Person> personCatalogue = restTemplate.exchange(url, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Person>>(){}).getBody();
		List<Person> peopleList = personCatalogue.getList(); 
		setPeopleSkillList(peopleList);
		return peopleList;
	}
	
	public List<Person> getPeopleBySkillId(Long skillId)
	{
		String sUrl = skillServiceURI + "/" + skillId;
		Skill skillShared = restTemplate.getForObject(sUrl, Skill.class);
		List<Person> peopleList = new ArrayList<>();
		
		if(!skillShared.isEmpty())
		{
			List<PersonSkill> personSkillList = personSkillRepository.
					findByPersonSkillPKSkillId(skillId);
			String pUrl = personServiceURI + "/";
			Person person;
			
			for(PersonSkill psp : personSkillList)
			{
				person = restTemplate.getForObject(pUrl + psp.getPersonId(), Person.class);
				
				if(!person.isEmpty())
					peopleList.add(person);
			}
			
			setPeopleSkillList(peopleList);
		}
		
		return peopleList;
	}

	
	public List<Skill> getAllSkills()
	{
		Map<Long, Person> personMap = new HashMap<>();
		Catalogue<Skill> skillCatalogue = restTemplate.exchange(skillServiceURI, HttpMethod.GET,
				null, new ParameterizedTypeReference<Catalogue<Skill>>(){}).getBody();
		String personUrl = personServiceURI + "/";
		List<PersonSkill> personSkillList;
		List<Person> peopleList;
		Person person;
		
		for(Skill skill : skillCatalogue.getList())
		{
			peopleList = new ArrayList<Person>();
			skill.setPeopleList(peopleList);
			personSkillList = personSkillRepository.findByPersonSkillPKSkillId(skill.getId());
			
			for(PersonSkill ps : personSkillList)
			{
				if(!personMap.containsKey(ps.getPersonId()))
				{
					person = restTemplate.getForObject(personUrl + ps.getPersonId(), Person.class);
					
					if(person.isEmpty())
						person = null;
					
					personMap.put(ps.getPersonId(), person);
				}
				else
					person = personMap.get(ps.getPersonId());
				
				if(person != null)
					peopleList.add(person);
			}
		}
			
		return skillCatalogue.getList();
	}
	
	private void setPeopleSkillList(List<Person> peopleList)
	{
		if(peopleList == null || peopleList.size() < 1)
			return;
				
		Map<Long, Skill> skillMap = new HashMap<>();
		List<PersonSkill> personSkillList;
		List<Skill> skillList;
		Skill skill;
		String skillUrl = skillServiceURI + "/";
		
		for(Person person : peopleList)
		{
			skillList = new ArrayList<>();
			personSkillList = personSkillRepository.findByPersonSkillPKPersonId(person.getId());
			
			for(PersonSkill ps : personSkillList)
			{
				if(!skillMap.containsKey(ps.getSkillId()))
				{
					skill = restTemplate.getForObject(skillUrl + ps.getSkillId(), Skill.class);
					
					if(skill.isEmpty())
						skill = null;
					
					skillMap.put(ps.getSkillId(), skill);
				}
				else
					skill = skillMap.get(ps.getSkillId());
				
				if(skill != null)
					skillList.add(skill);
			}
			
			person.setSkillList(skillList);
		}
	}
	
	private void setPersonSkillList(Person person)
	{
		if(person == null)
			return;
			
		Skill skill;
		String url = skillServiceURI + "/";
		List<Skill> skillList = new ArrayList<>();
		List<PersonSkill> personSkillList = personSkillRepository.
				findByPersonSkillPKPersonId(person.getId());
		
		for(PersonSkill ps : personSkillList)
		{
			skill = restTemplate.getForObject(url + ps.getSkillId(), Skill.class);
			
			if(!skill.isEmpty())
				skillList.add(skill);
		}
		
		person.setSkillList(skillList);
	}

	public PersonSkill add(PersonSkill personSkill)
	{	
		String url = personServiceURI + "/" + personSkill.getPersonId();
		Person person = restTemplate.getForObject(url, Person.class);
		
		if(person.isEmpty())
			throw new RuntimeException("Person id not found in the system!");
			
		url = skillServiceURI + "/" + personSkill.getSkillId();
		Skill skill = restTemplate.getForObject(url, Skill.class);
		
		if(skill.isEmpty())
			throw new RuntimeException("Skill id not found in the system!");
		
		return personSkillRepository.save(personSkill);
	}

	public PersonSkill removeById(Long personId, Long skillId)
	{
		if(personId == null || skillId == null)
			throw new RuntimeException("PersonId and SkillId cannot be null");
		
		PersonSkillPK pspk = new PersonSkillPK(personId, skillId);
		
		Optional<PersonSkill> op = personSkillRepository.findById(pspk);
		
		if(op.isEmpty())
			return new PersonSkill();
		
		personSkillRepository.deleteById(pspk);
		return op.get();
	}
	
	public PersonSkill remove(PersonSkill personSkill)
	{
		PersonSkillPK pspk = personSkill.getPersonSkillPK();
		return removeById(pspk.getPersonId(), pspk.getSkillId());
	}
	
	public List<PersonSkill> removeAllByPersonId(Long personId)
	{
		return personSkillRepository.deleteByPersonSkillPKPersonId(personId);
	}
	
	public List<PersonSkill> removeAllBySkillId(Long skillId)
	{
		return personSkillRepository.deleteByPersonSkillPKSkillId(skillId);
	}

	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private PersonSkillRepository personSkillRepository;
	
	
	private String personServiceURI = "http://it-talent-person-service/api/person";
	private String skillServiceURI = "http://it-talent-skill-service/api/skill";
}
