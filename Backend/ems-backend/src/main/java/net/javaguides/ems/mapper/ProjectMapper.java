package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.ProjectDTO;
import net.javaguides.ems.entity.Project;

public class ProjectMapper {
    //from backend, send it to front end aka only send display name
    public static ProjectDTO mapToProjectDto(Project project){
        return new ProjectDTO(
                project.getId(), project.getTitle(), project.getProjectType(), project.getDescription()
        );
    }

    //given client (dto), return map to backend employee aka convert display name to Position enum
    public static Project mapToProject(ProjectDTO projectDto){
        return new Project(
                projectDto.getId(), projectDto.getTitle(), projectDto.getProjectType(), projectDto.getDescription()
        );
    }
}
