package com.iorix2k2.ittalent.personskill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.iorix2k2.ittalent.personskill.model.PersonSkill;
import com.iorix2k2.ittalent.personskill.model.PersonSkillPK;


public interface PersonSkillRepository extends JpaRepository<PersonSkill, PersonSkillPK>
{
	List<PersonSkill> findByPersonSkillPKPersonId(Long personId);
	List<PersonSkill> findByPersonSkillPKSkillId(Long skillId);
	
	@Transactional
	List<PersonSkill> deleteByPersonSkillPKPersonId(Long personId);
	
	@Transactional
	List<PersonSkill> deleteByPersonSkillPKSkillId(Long skillId);
}
