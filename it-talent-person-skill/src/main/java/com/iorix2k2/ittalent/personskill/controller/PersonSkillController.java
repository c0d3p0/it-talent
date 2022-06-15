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
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.service.PersonSkillService;



@RestController
@RequestMapping("/person-skill")
public class PersonSkillController
{
	@RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<PersonSkill>> getAll()
	{
		var psc = new Catalogue<>(personSkillService.getAll());
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/by-person-id/{personId}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<PersonSkill>> getByPersonId(@PathVariable Long personId)
	{
		var psc = new Catalogue<>(personSkillService.getByPersonId(personId));
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/by-skill-id/{skillId}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<PersonSkill>> getBySkillId(@PathVariable Long skillId)
	{
		var psc = new Catalogue<>(personSkillService.getBySkillId(skillId));
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "", method = RequestMethod.POST)
	public ResponseEntity<PersonSkill> add(@RequestBody PersonSkill personSkill)
	{
		PersonSkill ps = personSkillService.add(personSkill);
		return new ResponseEntity<PersonSkill>(ps, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/by-id/{personId}/{skillId}", method = RequestMethod.DELETE)
	public ResponseEntity<PersonSkill> remove(@PathVariable Long personId, @PathVariable Long skillId)
	{
		PersonSkill ps = personSkillService.removeById(personId, skillId);
		return new ResponseEntity<PersonSkill>(ps, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/by-person-id/{personId}", method = RequestMethod.DELETE)
	public ResponseEntity<Catalogue<PersonSkill>> removeAllByPersonId(@PathVariable Long personId)
	{
		Catalogue<PersonSkill> psc = new Catalogue<>(personSkillService.removeAllByPersonId(personId));
		return new ResponseEntity<Catalogue<PersonSkill>>(psc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/by-skill-id/{skillId}", method = RequestMethod.DELETE)
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
