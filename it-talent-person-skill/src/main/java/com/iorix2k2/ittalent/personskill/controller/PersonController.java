package com.iorix2k2.ittalent.personskill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iorix2k2.ittalent.personskill.model.Catalogue;
import com.iorix2k2.ittalent.personskill.model.Person;
import com.iorix2k2.ittalent.personskill.service.PersonFullService;


@RestController
@RequestMapping("/person")
public class PersonController
{
  @RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getAll()
	{
		var pc = new Catalogue<>(personFullService.getAll());
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
  }

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Person> getById(@PathVariable Long id)
	{   
		var p = personFullService.getById(id);
		return new ResponseEntity<Person>(p, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/ids/{ids}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getByIds(@PathVariable Long[] ids)
	{   
		var pc = new Catalogue<>(personFullService.getByIds(ids));
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/name-with/{name}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getByNameWith(@PathVariable String name)
	{
		var pc = new Catalogue<>(personFullService.getByNameWith(name)); 
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/with-skill/{skillId}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getBySkillId(@PathVariable Long skillId)
	{
		var pc = new Catalogue<>(personFullService.getBySkillId(skillId)); 
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Person> remove(@PathVariable Long id)
	{
		var p = personFullService.remove(id);
		return new ResponseEntity<Person>(p, getHeaders(), HttpStatus.OK);
	}

	private HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return headers;
	}


  @Autowired
  private PersonFullService personFullService;
}
