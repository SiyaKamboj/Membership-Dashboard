//Explains entities really well: https://www.baeldung.com/jpa-entities
package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.*;
import net.javaguides.ems.enums.Positions;

//creates getter and setter methods, and 2 constructors: one with no args and one with all args
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Entity says this class is a JPA entity: n entity represents a table stored in a database. Every instance of an entity represents a row in the table.
@Entity
//@Table allows you to customize the table (ie choose a name or even set a schema)
@Table(name="employees")
public class Employee {
    //need to generate primary key to put it in table. this says that private Long id is your primary key and it is auto generated
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    //@Column allows you to specify the name of the column. if you dont include it, the name of the column will just be firstName
    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="current_position")
    @Enumerated(EnumType.STRING)
    private Positions position;

    //make it optional and unique
    @Column(name="email_id", nullable=false, unique=true)
    private String email;

    //projects
}