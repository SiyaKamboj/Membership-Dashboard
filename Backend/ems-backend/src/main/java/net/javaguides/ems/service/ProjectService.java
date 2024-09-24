package net.javaguides.ems.service;

import net.javaguides.ems.dto.ProjectDTO;

import java.util.List;
import java.util.Map;

public interface ProjectService {
    ProjectDTO createProject(ProjectDTO projectDTO);
    ProjectDTO getProjectById(long projectId);
    List<ProjectDTO> getAllProjects();
    ProjectDTO updateProject(long projectId, ProjectDTO updatedProject);
    void deleteProject(long projectId);
    List<Map<String, Object>> retrieveAllMembersAndCorrespRoles(Long projectId);
}
