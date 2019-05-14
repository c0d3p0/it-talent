package com.iorix2k2.ittalent.skill.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.iorix2k2.ittalent.skill.model.Catalogue;
import com.iorix2k2.ittalent.skill.model.Skill;
import com.iorix2k2.ittalent.skill.service.SkillService;



@RestController
@RequestMapping("/skill")
public class SkillController
{
	@RequestMapping(path = "", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getAll()
	{
		Catalogue<Skill> sc = new Catalogue<Skill>(skillService.getAll());
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Skill> getById(@PathVariable Long id)
	{
		Skill skill = skillService.getById(id);
		
		if(skill == null)
			skill = new Skill();
		
		return new ResponseEntity<Skill>(skill, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/title-with/{title}", method = RequestMethod.GET)
	public ResponseEntity<Catalogue<Skill>> getByTitleWith(@PathVariable String title)
	{
		Catalogue<Skill> sc = new Catalogue<Skill>(skillService.getByTitleWith(title));
		return new ResponseEntity<Catalogue<Skill>>(sc, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "", method = RequestMethod.POST)
	public ResponseEntity<Skill> add(@RequestBody Skill skill)
	{
		return new ResponseEntity<Skill>(skillService.add(skill), getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.PUT)
	public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill skill)
	{
		skill.setId(id);
		Skill responseSkill = skillService.updateDescription(skill);
		return new ResponseEntity<Skill>(responseSkill, getHeaders(), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Skill> remove(@PathVariable Long id)
	{
		return new ResponseEntity<Skill>(skillService.remove(id), getHeaders(), HttpStatus.OK);
	}

	private HttpHeaders getHeaders()
	{
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json");
		return headers;
	}
	
	
	@Autowired
	private SkillService skillService;
}
