package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ProjectDTO;
import net.javaguides.ems.dto.ProjectEmployeeDto;
import net.javaguides.ems.service.ProjectEmployeeService;
import net.javaguides.ems.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

//makes this class capable of handling HTTP request. This serves data through REST api
@CrossOrigin("*") //ensures no CORS issues when trying to get data through react app
@AllArgsConstructor //need this so projectservice is not null and it can actually get a request
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private ProjectService projectService;
    private ProjectEmployeeService projectEmployeeService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProjects(@RequestBody ProjectDTO projectDto){
        ProjectDTO savedProject= projectService.createProject(projectDto);
        return new ResponseEntity<>(savedProject, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable("id") long projectId){
        ProjectDTO projectDto= projectService.getProjectById(projectId);
        return ResponseEntity.ok(projectDto);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects(){
        List<ProjectDTO> projects= projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProjectDTO> updatedProject(@PathVariable("id") long projectId, @RequestBody ProjectDTO updatedProject){
        ProjectDTO projectDTO= projectService.updateProject(projectId, updatedProject);
        return ResponseEntity.ok(projectDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProjects(@PathVariable("id") long projectId){
        projectService.deleteProject(projectId);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    //for removing existing members and roles & adding new members and role into projectEmployee table
    @PutMapping("/update-members/{projectId}")
    public ResponseEntity<Void> updateProjectMembers(
            @PathVariable Long projectId,
            @RequestBody List<ProjectEmployeeDto> projectMembers) {
        projectEmployeeService.updateProjectMembers(projectId, projectMembers);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all-members/{id}")
    public ResponseEntity<List<Map<String, Object>>> getMembersAndRoles(@PathVariable("id") long projectId){
        List<Map<String, Object>> allMembersAndRoles= projectService.retrieveAllMembersAndCorrespRoles(projectId);
        return ResponseEntity.ok(allMembersAndRoles);
    }

}
