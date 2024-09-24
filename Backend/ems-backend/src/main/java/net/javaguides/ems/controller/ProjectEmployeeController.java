package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.ProjectEmployeeDto;
import net.javaguides.ems.service.ProjectEmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*") //ensures no CORS issues when trying to get data through react app
@AllArgsConstructor //need this so service is not null and it can actually get a request
@RestController
@RequestMapping("/api/connectProjectEmployee")
public class ProjectEmployeeController {
    private ProjectEmployeeService projEmployeeService;

    @PostMapping
    public ResponseEntity<ProjectEmployeeDto> createProjEmployee(@RequestBody ProjectEmployeeDto projEmployeeDto){
        ProjectEmployeeDto savedProjEmployee= projEmployeeService.createProjEmployee(projEmployeeDto);
        return new ResponseEntity<>(savedProjEmployee, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProjEmployee(@PathVariable("id") long projEmployeeId){
        projEmployeeService.deleteProjEmployee(projEmployeeId);
        return ResponseEntity.ok("Project-Employee Connection deleted successfully");
    }
}
