package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.enums.FilmRoles;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Entity says this class is a JPA entity: n entity represents a table stored in a database. Every instance of an entity represents a row in the table.
@Entity
//@Table allows you to customize the table (ie choose a name or even set a schema)
@Table(name="projectEmployees")
public class ProjectEmployee {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Employee member; // Assuming you have an Employee entity

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project; // Assuming you have a Project entity

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private FilmRoles role;
}
