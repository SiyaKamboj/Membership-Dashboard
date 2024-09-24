package net.javaguides.ems.service;

import net.javaguides.ems.dto.ProjectEmployeeDto;

import java.util.List;

public interface ProjectEmployeeService {
    ProjectEmployeeDto createProjEmployee(ProjectEmployeeDto projEmployeeDto);
    //ProjectEmployeeDto updateProjEmployee(long projEmployeeId, ProjectEmployeeDto updatedProjEmployee);
    void deleteProjEmployee(long projEmployeeId);
    void updateProjectMembers(Long projectId, List<ProjectEmployeeDto> projectMembers);
}
