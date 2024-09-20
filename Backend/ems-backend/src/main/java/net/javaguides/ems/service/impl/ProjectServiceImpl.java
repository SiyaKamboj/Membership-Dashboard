package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ProjectDTO;
import net.javaguides.ems.entity.Project;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.ProjectMapper;
import net.javaguides.ems.repository.ProjectRepository;
import net.javaguides.ems.service.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private ProjectRepository projectRepository;

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        //first convert dto to entity because need to store entity into database
        Project project= ProjectMapper.mapToProject(projectDTO);
        //save into database
        Project savedProject= projectRepository.save(project);
        //return the object that you saved into the database back to the client
        return ProjectMapper.mapToProjectDto(savedProject);
    }

    @Override
    public ProjectDTO getProjectById(long projectId) {
        Project project= projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with given id " + projectId));

        return ProjectMapper.mapToProjectDto(project);
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        //can get method from what you inherited
        List<Project> projects=projectRepository.findAll();
        //change employee entity list to employeedto list
        return projects.stream().map(ProjectMapper::mapToProjectDto).toList();
    }

    @Override
    public ProjectDTO updateProject(long projectId, ProjectDTO updatedProject) {
        Project project= projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with given id " + projectId));

        project.setTitle(updatedProject.getTitle());
        project.setProjectType(updatedProject.getProjectType());
        project.setDescription(updatedProject.getDescription());

        //if contains id, perform update operation; else, perform insert operation
        Project updatedProjectObject= projectRepository.save(project);

        //need to convert updatedEmployeeObject to Dto aka to front-end
        return ProjectMapper.mapToProjectDto(updatedProjectObject);
    }

    @Override
    public void deleteProject(long projectId) {
        Project project= projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project does not exist with given id " + projectId));
        projectRepository.deleteById(projectId);
    }

}
