package com.iorix2k2.ittalent.person.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iorix2k2.ittalent.person.model.Person;
import com.iorix2k2.ittalent.person.repository.PersonRepository;


@Service
public class PersonService
{
	public List<Person> getAll()
	{
		return personRepository.findAll();	
	}

	public Person getById(Long id)
	{
		Optional<Person> op = personRepository.findById(id);
		
		if(op.isEmpty())
			return null;
		
		return op.get();
	}
	
	public List<Person> getByIds(Long[] ids)
	{
		return personRepository.findAllByIdIn(ids);
	}

	public List<Person> getByNameWith(String name)
	{
		return personRepository.findByNameContainingIgnoreCase(name);
	}
	
	public Person add(Person person)
	{
		return personRepository.save(person);
	}
	
	public Person update(Person person)
	{
		return personRepository.save(person);
	}
	
	public Person remove(Long id)
	{		
		Optional<Person> op = personRepository.findById(id);
		
		if(op.isEmpty())
			return new Person();

		personRepository.deleteById(id);
		return op.get();			
	}
	
	public Person remove(Person person)
	{
		return remove(person.getId());
	}
	
	
	@Autowired
	private PersonRepository personRepository;
}
