package net.javaguides.ems.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ProjectEmployeeDto;
import net.javaguides.ems.entity.Project;
import net.javaguides.ems.entity.ProjectEmployee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.ProjectEmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.repository.ProjectEmployeeRepository;
import net.javaguides.ems.repository.ProjectRepository;
import net.javaguides.ems.service.ProjectEmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectEmployeeServiceImpl implements ProjectEmployeeService {
    ProjectEmployeeRepository projEmployeeRepo;
    ProjectRepository projectRepository;
    EmployeeRepository employeeRepository;

    @Override
    public ProjectEmployeeDto createProjEmployee(ProjectEmployeeDto projEmployeeDto) {
        //first convert dto to entity because need to store entity into database
        ProjectEmployee projEmployee= ProjectEmployeeMapper.mapToProjectEmployee(projEmployeeDto);
        //save into database
        ProjectEmployee savedProjEmployee= projEmployeeRepo.save(projEmployee);
        //return the object that you saved into the database back to the client
        return ProjectEmployeeMapper.mapToProjectEmployeeDto(savedProjEmployee);
    }

    @Override
    public void deleteProjEmployee(long projEmployeeId) {
        ProjectEmployee projEmployee= projEmployeeRepo.findById(projEmployeeId)
                .orElseThrow(() -> new ResourceNotFoundException("ProjectEmployee does not exist with given id " + projEmployeeId));
        projEmployeeRepo.deleteById(projEmployeeId);

    }

    @Transactional
    @Override
    public void updateProjectMembers(Long projectId, List<ProjectEmployeeDto> projectEmployees) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));

        // Remove existing project members
        //projEmployeeRepo.deleteByProjectId(projectId);
        projectRepository.deleteAllProjectEmployees(projectId);

        // Add new project members
        for (ProjectEmployeeDto dto : projectEmployees) {
            ProjectEmployee projectMember = new ProjectEmployee();
            projectMember.setProject(project);
            projectMember.setMember(employeeRepository.findById(dto.getMember().getId()).orElseThrow(() -> new RuntimeException("Member not found")));
            projectMember.setRole(dto.getRole());
            projEmployeeRepo.save(projectMember);
        }
    }
}
