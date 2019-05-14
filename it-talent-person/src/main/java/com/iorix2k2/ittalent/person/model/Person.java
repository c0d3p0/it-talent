package com.iorix2k2.ittalent.person.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Person
{
	public Long getId()
	{
		return id;
	}
	
	public void setId(Long id)
	{
		this.id = id;
	}
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public Byte getAge()
	{
		return age;
	}
	
	public void setAge(Byte age)
	{
		this.age = age;
	}
	
	public String getCountry()
	{
		return country;
	}
	
	public void setCountry(String country)
	{
		this.country = country;
	}
	
	public String getEmail()
	{
		return email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}

	
	@Id
	@GeneratedValue
	private Long id;
	
	private String name;
	private Byte age;
	private String country;
	private String email;
}
