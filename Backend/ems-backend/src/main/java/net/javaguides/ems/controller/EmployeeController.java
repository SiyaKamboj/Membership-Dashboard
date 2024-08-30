package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//makes this class capable of handling HTTP request. This serves data through REST api
@CrossOrigin("*") //ensures no CORS issues when trying to get data through react app
@AllArgsConstructor //need this so employeeservice is not null and it can actually get a request
@RestController
@RequestMapping("/api/employees") //define base url for all api's made using this controller
public class EmployeeController {
    private EmployeeService employeeService;

    //Build Add employee REST API using springboot- just make a method then make it a rest api using spring annotations
    //@PostMapping maps incoming http post request to this method
    //@RequestBody extracts json from the request and convert it into a java object. make sure json attributes are the same as the dto fields
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee= employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build getemployee REST API. map incominb http request to this method
    //need to pass uri template name (id) to the method argument (employeeid) becuase those are 2 different names
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") long employeeId){
        EmployeeDto employeeDto= employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    //build getallemployees restapi
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees(){
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    //build update employee rest api
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updatedEmployee(@PathVariable("id") long employeeId, @RequestBody EmployeeDto updatedEmployee){
        EmployeeDto employeeDto= employeeService.updateEmployee(employeeId, updatedEmployee);
        return ResponseEntity.ok(employeeDto);
    }

    //build hte delete employee rest api
    //map incoming http delete request to this
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully");
    }
}
