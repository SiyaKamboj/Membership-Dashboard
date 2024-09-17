package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.enums.Positions;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.util.List;
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
        //if contains id, perform update operation; else, perform insert operation
        Employee updatedEmployeeObject= employeeRepository.save(employee);

        //need to convert updatedEmployeeObject to Dto aka to front-end
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObject);
    }

    @Override
    public void deleteEmployee(long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with given id " + employeeId));
        employeeRepository.deleteById(employeeId);

    }


}
