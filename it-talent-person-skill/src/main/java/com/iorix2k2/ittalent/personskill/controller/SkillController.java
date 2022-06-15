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
import com.iorix2k2.ittalent.personskill.model.Skill;
import com.iorix2k2.ittalent.personskill.service.SkillFullService;


@RestController
@RequestMapping("/skill")
public class SkillController
{
  @RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getAll()
	{
		var sc = new Catalogue<>(skillFullService.getAll());
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
  }

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Skill> getById(@PathVariable Long id)
	{   
		var s = skillFullService.getById(id);
		return new ResponseEntity<Skill>(s, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/ids/{ids}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getByIds(@PathVariable Long[] ids)
	{   
		var sc = new Catalogue<>(skillFullService.getByIds(ids));
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/title-with/{title}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getByNameWith(@PathVariable String title)
	{
		var sc = new Catalogue<>(skillFullService.getByTitleWith(title)); 
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/by-person/{personId}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getBySkillId(@PathVariable Long personId)
	{
		var sc = new Catalogue<>(skillFullService.getByPersonId(personId)); 
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Skill> remove(@PathVariable Long id)
	{
		var s = skillFullService.remove(id);
		return new ResponseEntity<Skill>(s, getHeaders(), HttpStatus.OK);
	}

	private HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return headers;
	}


  @Autowired
  private SkillFullService skillFullService;
}
