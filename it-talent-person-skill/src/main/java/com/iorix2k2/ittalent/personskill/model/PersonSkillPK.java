package com.iorix2k2.ittalent.personskill.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
@SuppressWarnings("serial")
public class PersonSkillPK implements Serializable
{
	public Long getPersonId()
	{
		return personId;
	}

	public void setPersonId(Long personId)
	{
		this.personId = personId;
	}

	public Long getSkillId()
	{
		return skillId;
	}

	public void setSkillId(Long skillId)
	{
		this.skillId = skillId;
	}
		
	public PersonSkillPK(Long personId, Long skillId)
	{
		this.personId = personId;
		this.skillId = skillId;
	}
	
	public PersonSkillPK() {}

	
	private Long personId;
	private Long skillId;
}
