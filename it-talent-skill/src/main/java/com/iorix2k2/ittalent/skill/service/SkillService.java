package com.iorix2k2.ittalent.skill.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public List<Skill> getByIds(Long[] ids)
	{
		return skillRepository.findAllByIdIn(ids);
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
		
		skillRepository.deleteById(id);
		return op.get();
	}
	
	public Skill remove(Skill skill)
	{
		return remove(skill.getId());
	}
	

	
	@Autowired
	private SkillRepository skillRepository;
}
