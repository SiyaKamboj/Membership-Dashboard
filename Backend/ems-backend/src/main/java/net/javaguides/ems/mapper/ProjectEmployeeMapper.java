package net.javaguides.ems.mapper;


import net.javaguides.ems.dto.ProjectEmployeeDto;
import net.javaguides.ems.entity.ProjectEmployee;

public class ProjectEmployeeMapper {
    //from backend, send it to front end
    public static ProjectEmployeeDto mapToProjectEmployeeDto(ProjectEmployee projEmployee){
        return new ProjectEmployeeDto(
                projEmployee.getId(), projEmployee.getMember(), projEmployee.getProject(), projEmployee.getRole()
        );
    }

    //given client (dto), return map to backend
    public static ProjectEmployee mapToProjectEmployee(ProjectEmployeeDto projEmployeeDto){
        return new ProjectEmployee(
                projEmployeeDto.getId(), projEmployeeDto.getMember(), projEmployeeDto.getProject(), projEmployeeDto.getRole()
        );
    }
}
