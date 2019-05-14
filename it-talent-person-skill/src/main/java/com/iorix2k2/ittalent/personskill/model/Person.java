package com.iorix2k2.ittalent.personskill.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


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
	
	public List<Skill> getSkillList()
	{
		return skillList;
	}

	public void setSkillList(List<Skill> skillList)
	{
		this.skillList = skillList;
	}

	@JsonIgnore
	public boolean isEmpty()
	{
		if(id == null && name == null && age == null && country == null)
			return true;
		
		return false;
	}
	
	public String getEmail()
	{
		return email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}
	
	
	private Long id;	
	private String name;
	private Byte age;
	private String country;
	private String email;
	
	private List<Skill> skillList;
}
