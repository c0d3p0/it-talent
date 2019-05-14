package com.iorix2k2.ittalent.personskill.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


public class Skill
{
	public Long getId()
	{
		return id;
	}
	
	public void setId(Long id)
	{
		this.id = id;
	}
	
	public String getTitle()
	{
		return title;
	}
	
	public void setTitle(String title)
	{
		this.title = title;
	}
	
	public String getDescription()
	{
		return description;
	}
	
	public void setDescription(String description)
	{
		this.description = description;
	}
	
	public List<Person> getPeopleList()
	{
		return peopleList;
	}

	public void setPeopleList(List<Person> peopleList)
	{
		this.peopleList = peopleList;
	}
	
	@JsonIgnore
	public boolean isEmpty()
	{
		if(id == null && title == null && description == null)
			return true;
		
		return false;
	}
	
	
	
	private Long id;
	private String title;
	private String description;
	private List<Person> peopleList;
}
