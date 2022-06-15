package com.iorix2k2.ittalent.personskill.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iorix2k2.ittalent.personskill.model.Person;
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.model.Skill;


@Service
public class PersonFullService
{
	public List<Person> getAll()
	{
		var peopleList = personService.getAll();
		peopleList.forEach((person) -> {
				person.setSkillList(getAllSkills(person.getId()));});
		return peopleList;
	}
	
	public Person getById(Long id)
	{
		var person = personService.getById(id);
		
		if(person.getId() != null)
			person.setSkillList(getAllSkills(person.getId()));

		return person;
	}
	
	public List<Person> getByIds(Long[] ids)
	{
		var peopleList = personService.getByIds(ids);
		peopleList.forEach((person) -> {
				person.setSkillList(getAllSkills(person.getId()));});
		return peopleList;
	}

	public List<Person> getByNameWith(String name)
	{
		var peopleList = personService.getByNameWith(name);
		peopleList.forEach((person) -> {
				person.setSkillList(getAllSkills(person.getId()));});
		return peopleList;
	}

	public List<Person> getBySkillId(Long skillId)
	{
		var personSkillList = personSkillService.getBySkillId(skillId);
		var peopleIds = personSkillList.stream().map(PersonSkill::getPersonId).
				collect(Collectors.toList()).toArray(Long[]::new);
		peopleIds = peopleIds != null && peopleIds.length > 0 ?
				peopleIds : new Long[]{-1L};
		var peopleList = personService.getByIds(peopleIds);
		peopleList.forEach((person) -> {
				person.setSkillList(getAllSkills(person.getId()));});
		return peopleList;
	}

	public Person remove(Long id)
	{
		var skillList = getAllSkills(id);
		personSkillService.removeAllByPersonId(id);
		var person = personService.remove(id);

		if(person.getId() != null)
			person.setSkillList(skillList);

		return person;
	}

	private List<Skill> getAllSkills(Long personId)
	{
		var personSkillList = personSkillService.getByPersonId(personId);
		var skillIds = personSkillList.stream().map(PersonSkill::getSkillId).
				collect(Collectors.toList()).toArray(Long[]::new);
		skillIds = skillIds != null && skillIds.length > 0 ?
				skillIds : new Long[]{-1L};
		return skillService.getByIds(skillIds);
	}


  @Autowired
  private PersonService personService;

  @Autowired
  private SkillService skillService;

  @Autowired
  private PersonSkillService personSkillService;
}
