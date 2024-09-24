package net.javaguides.ems.repository;

import net.javaguides.ems.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    //when you delete a project, you should delete all occurences of that project in this database
    //when u modify a project, u should also delete all occurences of this and then re-add it later
    @Modifying //necessary so that it knows this is not a read only operation
    @Query("DELETE FROM ProjectEmployee pe WHERE pe.project.id = :projectId")
    void deleteAllProjectEmployees(@Param("projectId") Long projectId);

    //used to find a list of member's roles and member's names
    @Query("SELECT e.id, e.firstName, e.lastName, pe.role " +
            "FROM ProjectEmployee pe " +
            "JOIN pe.project p " +  // Use the entity attribute 'project' to join
            "JOIN pe.member e " +    // Use the entity attribute 'member' to join
            "WHERE p.id = :projectId")
    List<Object[]> findMemberRolesByProjectId(@Param("projectId") Long projectId);
}
