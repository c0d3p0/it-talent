package com.iorix2k2.ittalent.person.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iorix2k2.ittalent.person.model.Person;


public interface PersonRepository extends JpaRepository<Person, Long>
{
	List<Person> findByNameContainingIgnoreCase(String name);
}
