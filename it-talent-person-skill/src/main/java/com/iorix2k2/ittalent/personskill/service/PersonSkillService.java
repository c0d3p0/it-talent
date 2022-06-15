package com.iorix2k2.ittalent.personskill.service;


import java.util.List;
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

	public List<PersonSkill> getByPersonId(Long personId)
	{
		return personSkillRepository.findByPersonSkillPKPersonId(personId);
	}
	
	public List<PersonSkill> getBySkillId(Long skillId)
	{
		return personSkillRepository.findByPersonSkillPKSkillId(skillId);
	}
	
	public PersonSkill add(PersonSkill personSkill)
	{	
		Person person = personService.getById(personSkill.getPersonId());
		
		if(person.isEmpty())
			throw new RuntimeException("Person id not found in the system!");
		
		Skill skill = skillService.getById(personSkill.getSkillId());
		
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
