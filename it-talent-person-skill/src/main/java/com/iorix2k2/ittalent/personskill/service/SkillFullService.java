package com.iorix2k2.ittalent.personskill.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iorix2k2.ittalent.personskill.model.Person;
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.model.Skill;


@Service
public class SkillFullService
{
	public List<Skill> getAll()
	{
		var skillList = skillService.getAll();
		skillList.forEach((skill) -> {
				skill.setPeopleList(getAllPeople(skill.getId()));});
		return skillList;
	}
	
	public Skill getById(Long id)
	{
		var skill = skillService.getById(id);

		if(skill.getId() != null)
			skill.setPeopleList(getAllPeople(skill.getId()));

		return skill;
	}
	
	public List<Skill> getByIds(Long[] ids)
	{
		var skillList = skillService.getByIds(ids);
		skillList.forEach((skill) -> {
				skill.setPeopleList(getAllPeople(skill.getId()));});
		return skillList;
	}

	public List<Skill> getByTitleWith(String title)
	{
		var skillList = skillService.getByTitleWith(title);
		skillList.forEach((skill) -> {
				skill.setPeopleList(getAllPeople(skill.getId()));});
		return skillList;
	}

	public List<Skill> getByPersonId(Long personId)
	{
		var personSkillList = personSkillService.getByPersonId(personId);
		var skillIds = personSkillList.stream().map(PersonSkill::getSkillId).
				collect(Collectors.toList()).toArray(Long[]::new);
		skillIds = skillIds != null && skillIds.length > 0 ?
				skillIds : new Long[]{-1L};
		var skillList = skillService.getByIds(skillIds);
		skillList.forEach((skill) -> {
				skill.setPeopleList(getAllPeople(skill.getId()));});
		return skillList;
	}

	public Skill remove(Long id)
	{
		var peopleList = getAllPeople(id);
		personSkillService.removeAllBySkillId(id);
		var skill = skillService.remove(id);

		if(skill.getId() != null)
			skill.setPeopleList(peopleList);

		return skill;
	}

	private List<Person> getAllPeople(Long skillId)
	{
		var personSkillList = personSkillService.getBySkillId(skillId);
		var peopleIds = personSkillList.stream().map(PersonSkill::getPersonId).
				collect(Collectors.toList()).toArray(Long[]::new);
		peopleIds = peopleIds != null && peopleIds.length > 0 ?
				peopleIds : new Long[]{-1L};
		return personService.getByIds(peopleIds);
	}


  @Autowired
  private PersonService personService;

  @Autowired
  private SkillService skillService;

  @Autowired
  private PersonSkillService personSkillService;  
}
