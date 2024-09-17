package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.enums.Positions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//don't need to annotate @Repository because it extends JpaRepository, which already is annotated with @Repository
//type of JpaRepository is of class Employee and the unique ID is of type long as specified in the class/entity Employee
//by extending JpaRepository, this new EmployeeRepository now inherits methods that perform CRUD database operations on employee JPA Entity ( aka provides the mechanism for storage, retrieval, update, delete and search operation on objects.)
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    @Query("SELECT e FROM Employee e WHERE e.position = :position")
    List<Employee> findByPosition(@Param("position") Positions desiredPosition);

}