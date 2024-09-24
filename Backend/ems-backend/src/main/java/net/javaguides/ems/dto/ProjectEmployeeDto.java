package net.javaguides.ems.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.entity.Project;
import net.javaguides.ems.enums.FilmRoles;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEmployeeDto {
    private long id;
    private Employee member;
    private Project project;
    private FilmRoles role;
}
