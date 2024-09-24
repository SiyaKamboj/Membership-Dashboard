package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.enums.FilmRoles;
import net.javaguides.ems.enums.Positions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//don't need to annotate @Repository because it extends JpaRepository, which already is annotated with @Repository
//type of JpaRepository is of class Employee and the unique ID is of type long as specified in the class/entity Employee
//by extending JpaRepository, this new EmployeeRepository now inherits methods that perform CRUD database operations on employee JPA Entity ( aka provides the mechanism for storage, retrieval, update, delete and search operation on objects.)
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.position = :position")
    List<Employee> findByPosition(@Param("position") Positions desiredPosition);

    //given a member id/employee, retrieve a list of all the projects they worked on and their corresponding role in that project
    //projectRole[0] is project name; projectRole[1] is the member's corresponding role
    @Query("SELECT p.title, pe.role " +
            "FROM ProjectEmployee pe " +
            "JOIN pe.project p " +  // Use the entity attribute 'project' to join
            "JOIN pe.member e " +    // Use the entity attribute 'member' to join
            "WHERE e.id = :memberId")
    List<Object[]> findProjectRolesByMemberId(@Param("memberId") Long memberId);

    //when you delete a member, you should delete all occurences of that member in this database
    @Modifying //necessary so that it knows this is not a read only operation
    @Query("DELETE FROM ProjectEmployee pe WHERE pe.member.id = :memberId")
    void deleteAllProjectEmployees(@Param("memberId") Long memberId);


}