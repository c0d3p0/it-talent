package com.iorix2k2.ittalent.person.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iorix2k2.ittalent.person.model.Person;
import com.iorix2k2.ittalent.person.repository.PersonRepository;


@Component
public class PersonStartupRunner implements CommandLineRunner
{
    @Override
    public void run(String...args) throws Exception
    {
    	persistStartingData();
    }
    
	public void persistStartingData()
	{
		try
		{
			ClassPathResource cpr = new ClassPathResource("data/person_data.json");
			Person[] people = new ObjectMapper().readValue(cpr.getInputStream(), Person[].class);
			
			for(int i = 0; i < people.length; i++)
				personRepository.save(people[i]);
		}
		catch(Exception e)
		{
			System.out.println("Problems with the file that contains the initial people data!");
			System.out.println(e.getMessage());
		}
	}
	
	@Autowired
	private PersonRepository personRepository;
}
