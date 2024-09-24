package net.javaguides.ems.repository;

import net.javaguides.ems.entity.ProjectEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, Long> {
    //delete all existing project members
    //void deleteByProjectId(Long projectId);
}
