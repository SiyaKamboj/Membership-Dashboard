package net.javaguides.ems.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.enums.Positions;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

//tells spring to create bean for EmployeeServiceImpl class
@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        //first convert employeeDto to employee entity because need to store entity into database
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        //save the employee into database
        Employee savedEmployee= employeeRepository.save(employee);
        //return the object that you saved into the database back to the client
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    //before doing anything here, make sure that if they try to get employee by and ID that does not exist, an exception is thrown under exception package
    @Override
    public EmployeeDto getEmployeeById(long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id " + employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        //can get method from what you inherited
        List<Employee> employees=employeeRepository.findAll();
        //change employee entity list to employeedto list
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto).toList();
    }

    @Override
    public EmployeeDto updateEmployee(long employeeId, EmployeeDto updatedEmployee) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id " + employeeId));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        //employee.setPosition(updatedEmployee.getPosition());
        //converts string display name ot enum and sets that in the backend
        employee.setPosition(Positions.fromDisplayName(String.valueOf(updatedEmployee.getPosition())));
        employee.setMajor(updatedEmployee.getMajor());
        //if contains id, perform update operation; else, perform insert operation
        Employee updatedEmployeeObject= employeeRepository.save(employee);

        //need to convert updatedEmployeeObject to Dto aka to front-end
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObject);
    }

    @Transactional
    @Override
    public void deleteEmployee(long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id " + employeeId));
        //delete all instances of member in projectemployees table
        employeeRepository.deleteAllProjectEmployees(employeeId);
        //delete references of employeeRepository everywhere
        employeeRepository.deleteById(employeeId);
    }

    @Override
    public void updateEmployeePositions(String currentPosition, String newPosition) {
        Positions currentEnumPosition = Positions.fromDisplayName(currentPosition); // Convert from display name to enum
        Positions newEnumPosition = Positions.fromDisplayName(newPosition); // Convert from display name to enum

        // Update all employees with the current position
        List<Employee> employeesToUpdate = employeeRepository.findByPosition(currentEnumPosition);
        employeesToUpdate.forEach(employee -> employee.setPosition(newEnumPosition));

        // Save the updated employees
        employeeRepository.saveAll(employeesToUpdate);
    }
    
    //get the current member's all projects worked on and their role on that project
    public List<Map<String, Object>> retrieveAllProjectsAndCorrespRoles(Long memberId){
        List<Object[]> results =employeeRepository.findProjectRolesByMemberId(memberId);
        // Map each result to a more readable structure
        return results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("projectName", result[0]);
                    map.put("role", result[1]);
                    return map;
                })
                .collect(Collectors.toList());
    }


}
