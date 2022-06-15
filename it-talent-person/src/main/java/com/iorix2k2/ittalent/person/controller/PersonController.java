package com.iorix2k2.ittalent.person.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iorix2k2.ittalent.person.model.Catalogue;
import com.iorix2k2.ittalent.person.model.Person;
import com.iorix2k2.ittalent.person.service.PersonService;


@RestController
@RequestMapping("/person")
public class PersonController
{	
	@RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getAll()
	{
		Catalogue<Person> pc = new Catalogue<Person>(personService.getAll());
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Person> getById(@PathVariable Long id)
	{
		Person person = personService.getById(id);
		
		if(person == null)
			person = new Person();
		
		return new ResponseEntity<Person>(person, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/ids/{ids}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getByIds(@PathVariable Long[] ids)
	{
		var pc = new Catalogue<Person>(personService.getByIds(ids));
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/name-with/{name}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Person>> getByNameWith(@PathVariable String name)
	{
		Catalogue<Person> pc = new Catalogue<Person>(personService.getByNameWith(name));
		return new ResponseEntity<Catalogue<Person>>(pc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "", method = RequestMethod.POST)
	public ResponseEntity<Person> add(@RequestBody Person person)
	{
		return new ResponseEntity<Person>(personService.add(person), getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Person> update(@PathVariable Long id, @RequestBody Person person)
	{
		person.setId(id);
		return new ResponseEntity<Person>(personService.update(person), getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Person> remove(@PathVariable Long id)
	{
		return new ResponseEntity<Person>(personService.remove(id), getHeaders(), HttpStatus.OK);
	}
	
	private HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return headers;
	}
	
	
	@Autowired
	private PersonService personService;
}
