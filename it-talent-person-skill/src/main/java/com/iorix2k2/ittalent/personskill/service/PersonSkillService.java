package com.iorix2k2.ittalent.personskill.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	
	public List<PersonSkill> getPersonSkillByPersonId(Long personId)
	{
		return personSkillRepository.findByPersonSkillPKPersonId(personId);
	}
	
	public List<PersonSkill> getPersonSkillBySkillId(Long skillId)
	{
		return personSkillRepository.findByPersonSkillPKSkillId(skillId);
	}
	
	public List<Person> getAllPeople()
	{
		List<Person> peopleList = personService.getAllPeople();
		setPeopleSkillList(peopleList);
		return peopleList;
	}
	
	public Person getPersonById(Long personId)
	{
		Person person = personService.getPerson(personId);
		
		if(!person.isEmpty())
		{
			List<PersonSkill> psList = getPersonSkillByPersonId(person.getId());
			person.setSkillList(getSkillList(psList));
		}

		return person;
	}

	public List<Person> getPeopleByNameWith(String name)
	{
		List<Person> peopleList = personService.getPeopleByNameWith(name); 
		setPeopleSkillList(peopleList);
		return peopleList;
	}
	
	public List<Person> getPeopleBySkillId(Long skillId)
	{
		Skill skillShared = skillService.getSkill(skillId);
		List<Person> peopleList = new ArrayList<>();
		
		if(!skillShared.isEmpty())
		{
			List<PersonSkill> personSkillList = getPersonSkillBySkillId(skillId);
			Person person;
			
			for(PersonSkill psp : personSkillList)
			{
				person = getPersonById(psp.getPersonId()); 
				
				if(!person.isEmpty())
					peopleList.add(person);
			}
			
			setPeopleSkillList(peopleList);
		}
		
		return peopleList;
	}

	public List<Skill> getAllSkills()
	{
		Map<Long, Person> peopleMap = new HashMap<>();
		List<Skill> skillList = skillService.getAllSkills();
		List<PersonSkill> personSkillList;
		
		for(Skill skill : skillList)
		{
			personSkillList = getPersonSkillBySkillId(skill.getId());
			skill.setPeopleList(getPeopleCaching(personSkillList, peopleMap));
		}
			
		return skillList;
	}
	
	private void setPeopleSkillList(List<Person> peopleList)
	{
		if(peopleList == null || peopleList.size() < 1)
			return;
				
		Map<Long, Skill> skillMap = new HashMap<>();
		List<PersonSkill> personSkillList;

		
		for(Person person : peopleList)
		{
			personSkillList = getPersonSkillByPersonId(person.getId()); 
			person.setSkillList(getSkillListCaching(personSkillList, skillMap));
		}
	}

	public List<Person> getPeopleCaching(List<PersonSkill> personSkillList, Map<Long, Person> peopleMap)
	{		
		List<Person> peopleList = new ArrayList<>();
		Person person;
		
		for(PersonSkill ps : personSkillList)
		{
			if(!peopleMap.containsKey(ps.getPersonId()))
			{
				person = personService.getPerson(ps.getPersonId());
				
				if(person.isEmpty())
					person = null;
				
				peopleMap.put(ps.getPersonId(), person);
			}
			else
				person = peopleMap.get(ps.getPersonId());
			
			peopleList.add(person);
		}
		
		return peopleList;
	}
	
	public List<Skill> getSkillList(List<PersonSkill> personSkillList)
	{
		List<Skill> skillList = new ArrayList<>();
		Skill skill;
		
		for(PersonSkill ps : personSkillList)
		{
			skill = skillService.getSkill(ps.getSkillId());
			
			if(!skill.isEmpty())
				skillList.add(skill);
		}
		
		return skillList;
	}
	
	public List<Skill> getSkillListCaching(List<PersonSkill> personSkillList, Map<Long, Skill> skillMap)
	{
		List<Skill> skillList = new ArrayList<>();
		Skill skill;
		
		for(PersonSkill ps : personSkillList)
		{
			if(!skillMap.containsKey(ps.getSkillId()))
			{
				skill = skillService.getSkill(ps.getSkillId());
				
				if(skill.isEmpty())
					skill = null;
				
				skillMap.put(ps.getSkillId(), skill);
			}
			else
				skill = skillMap.get(ps.getSkillId());
		
			skillList.add(skill);
		}
		
		return skillList;
	}
	
	public PersonSkill add(PersonSkill personSkill)
	{	
		Person person = personService.getPerson(personSkill.getPersonId());
		
		if(person.isEmpty())
			throw new RuntimeException("Person id not found in the system!");
		
		Skill skill = skillService.getSkill(personSkill.getSkillId());
		
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
	private PersonSkillRepository personSkillRepository;
	
	@Autowired
	private SkillService skillService;
	
	@Autowired
	private PersonService personService;
}
