package com.iorix2k2.ittalent.skill.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.iorix2k2.ittalent.skill.model.Skill;
import com.iorix2k2.ittalent.skill.repository.SkillRepository;


@Service
public class SkillService
{
	public List<Skill> getAll()
	{
		return skillRepository.findAll();
	}
	
	public Skill getById(Long id)
	{
		Optional<Skill> os = skillRepository.findById(id);
		
		if(os.isEmpty())
			return null;
		
		return os.get();
	}
	
	public List<Skill> getByTitleWith(String title)
	{
		return skillRepository.findByTitleContainingIgnoreCase(title);
	}
	
	public Skill add(Skill skill)
	{
		return skillRepository.save(skill);
	}
	
	public Skill updateDescription(Skill skill)
	{
		Skill updateSkill = getById(skill.getId());
		updateSkill.setDescription(skill.getDescription());
		return skillRepository.save(updateSkill);
	}
	
	public Skill remove(Long id) 
	{
		Optional<Skill> op = skillRepository.findById(id);
		
		if(op.isEmpty())
			return new Skill();

		try
		{
			restTemplate.delete("http://it-talent-person-skill-service/api/person-skill/skill/" + id);
		}
		catch(Exception e)
		{
			String errorMessage = "Problems to remove the skills of this person in the system! ";
			throw new RuntimeException(errorMessage + e.getMessage());
		}
		
		skillRepository.deleteById(id);
		return op.get();
	}
	
	public Skill remove(Skill skill)
	{
		return remove(skill.getId());
	}
	

	
	@Autowired
	private SkillRepository skillRepository;
	
	@Autowired
	private RestTemplate restTemplate;
}
