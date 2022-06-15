package com.iorix2k2.ittalent.skill.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iorix2k2.ittalent.skill.model.Skill;



public interface SkillRepository extends JpaRepository<Skill, Long>
{
	List<Skill> findByTitleContainingIgnoreCase(String name);
	List<Skill> findAllByIdIn(Long[] ids);
}
