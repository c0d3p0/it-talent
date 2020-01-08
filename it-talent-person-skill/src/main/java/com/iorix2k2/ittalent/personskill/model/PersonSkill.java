package com.iorix2k2.ittalent.personskill.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;


@Entity
public class PersonSkill
{	
	public PersonSkill()
	{
		personSkillPK = new PersonSkillPK();
	}
	
	@JsonIgnore
	public PersonSkillPK getPersonSkillPK()
	{
		return personSkillPK;
	}
	
	@JsonIgnore
	public void setPersonSkillPK(PersonSkillPK personSkillPK)
	{
		this.personSkillPK = personSkillPK;
	}
	
	@JsonProperty(value = "personId", access = Access.READ_ONLY)
	public Long getPersonId()
	{
		return personSkillPK.getPersonId();
	}

	@JsonProperty(value = "personId", access = Access.WRITE_ONLY)
	public void setPersonId(Long personId)
	{
		this.personSkillPK.setPersonId(personId);
	}

	@JsonProperty(value = "skillId", access = Access.READ_ONLY)
	public Long getSkillId()
	{
		return personSkillPK.getSkillId();
	}

	@JsonProperty(value = "skillId", access = Access.WRITE_ONLY)
	public void setSkillId(Long skillId)
	{
		this.personSkillPK.setSkillId(skillId);
	}

	
	@EmbeddedId
	private PersonSkillPK personSkillPK;
}
