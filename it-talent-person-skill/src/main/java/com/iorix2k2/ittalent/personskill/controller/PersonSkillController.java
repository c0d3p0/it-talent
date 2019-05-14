package com.iorix2k2.ittalent.personskill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iorix2k2.ittalent.personskill.model.Catalogue;
import com.iorix2k2.ittalent.personskill.model.Person;
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.model.Skill;
import com.iorix2k2.ittalent.personskill.service.PersonSkillService;



@RestController
@RequestMapping("/person-skill")
public class PersonSkillController
{
	@RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<PersonSkill>> getAll()
	{
		Catalogue<PersonSkill> psc = new Catalogue<PersonSkill>(personSkillService.getAll());
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/person", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getAllPeople()
	{
		Catalogue<Person> pc = new Catalogue<Person>(personSkillService.getAllPeople());
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/person/{personId}", method = RequestMethod.GET)
	public ResponseEntity<Person> getPersonById(@PathVariable Long personId)
	{   
		Person person = personSkillService.getPersonById(personId);
		return new ResponseEntity<Person>(person, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/person/name-with/{name}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getPeopleByNameWith(@PathVariable String name)
	{
		Catalogue<Person> pc = new Catalogue<>(personSkillService.getPeopleByNameWith(name)); 
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/person/with-skill/{skillId}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getPeopleBySkillId(@PathVariable Long skillId)
	{
		Catalogue<Person> pc = new Catalogue<>(personSkillService.getPeopleBySkillId(skillId)); 
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/skill", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getAllSkills()
	{
		Catalogue<Skill> sc = new Catalogue<Skill>(personSkillService.getAllSkills());
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "", method = RequestMethod.POST)
	public ResponseEntity<PersonSkill> add(@RequestBody PersonSkill personSkill)
	{
		PersonSkill ps = personSkillService.add(personSkill);
		return new ResponseEntity<PersonSkill>(ps, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{personId}/{skillId}", method = RequestMethod.DELETE)
	public ResponseEntity<PersonSkill> remove(@PathVariable Long personId, @PathVariable Long skillId)
	{
		PersonSkill ps = personSkillService.removeById(personId, skillId);
		return new ResponseEntity<PersonSkill>(ps, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/person/{personId}", method = RequestMethod.DELETE)
	public ResponseEntity<Catalogue<PersonSkill>> removeAllByPersonId(@PathVariable Long personId)
	{
		Catalogue<PersonSkill> psc = new Catalogue<>(personSkillService.removeAllByPersonId(personId));
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/skill/{skillId}", method = RequestMethod.DELETE)
	public ResponseEntity<Catalogue<PersonSkill>> removeAllBySkillId(@PathVariable Long skillId)
	{
		Catalogue<PersonSkill> psc = new Catalogue<>(personSkillService.removeAllBySkillId(skillId));
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}
	
	private HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return headers;
	}
	
	
	@Autowired
	private PersonSkillService personSkillService;
}
