package com.iorix2k2.ittalent.skill.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iorix2k2.ittalent.skill.model.Skill;
import com.iorix2k2.ittalent.skill.repository.SkillRepository;


@Component
public class SkillStartupRunner implements CommandLineRunner
{
	@Override
	public void run(String... args) throws Exception
	{
		persistStartingData();
	}
	
	public void persistStartingData()
	{
		try
		{
			ClassPathResource cpr = new ClassPathResource("data/skill_data.json");
			Skill[] skills = new ObjectMapper().readValue(cpr.getInputStream(), Skill[].class);
			
			for(int i = 0; i < skills.length; i++)
				skillRepository.save(skills[i]);
		}
		catch(Exception e)
		{
			System.out.println("Problems with the file that contains the inital skills data!");
			System.out.println(e.getMessage());
		}
	}
	
	@Autowired
	private SkillRepository skillRepository;
}
