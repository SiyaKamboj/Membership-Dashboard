package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.enums.MajorCodes;
import net.javaguides.ems.enums.ProjectType;

//creates getter and setter methods, and 2 constructors: one with no args and one with all args
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Entity says this class is a JPA entity: n entity represents a table stored in a database. Every instance of an entity represents a row in the table.
@Entity
//@Table allows you to customize the table (ie choose a name or even set a schema)
@Table(name="projects")
public class Project {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    //@Column allows you to specify the name of the column. if you dont include it, the name of the column will just be firstName
    @Column(name="title", nullable=false)
    private String title;

    @Column(name="project_type")
    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    @Column(name="description")
    private String description;

    //create list of projectEmployees for everyone who worked on the project


}
