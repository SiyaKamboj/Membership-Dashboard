package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;

import java.util.List;
import java.util.Map;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(long employeeId, EmployeeDto updatedEmployee);
    void deleteEmployee(long employeeId);
    void updateEmployeePositions(String currentPosition, String newPosition);
    List<Map<String, Object>> retrieveAllProjectsAndCorrespRoles(Long memberId);
}
