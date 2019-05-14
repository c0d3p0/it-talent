package com.iorix2k2.ittalent.personskill.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.repository.PersonSkillRepository;

@Component
public class PersonSkillStartupRunner implements CommandLineRunner
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
			ClassPathResource cpr = new ClassPathResource("data/person_skill_data.json");
			PersonSkill[] personSkills = new ObjectMapper().readValue(cpr.getInputStream(), PersonSkill[].class);
			
			for(int i = 0; i < personSkills.length; i++)
				personSkillRepository.save(personSkills[i]);
		}
		catch(Exception e)
		{
			System.out.println("Problems with the file that contains the initial people skills data!");
			System.out.println(e.getMessage());
		}
	}
	
	@Autowired
	private PersonSkillRepository personSkillRepository;
}
