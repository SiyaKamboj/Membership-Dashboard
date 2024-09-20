package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.enums.Positions;

//map from one to the other so that client and server can communicate
//dto interacts with client side
public class EmployeeMapper {
    //from backend, send it to front end aka only send display name
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getPosition().getDisplayName(), employee.getMajor(), employee.getEmail()
        );
    }

    //given client (dto), return map to backend employee aka convert display name to Position enum
    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(), employeeDto.getFirstName(), employeeDto.getLastName(), Positions.fromDisplayName(String.valueOf(employeeDto.getPosition())), employeeDto.getMajor(), employeeDto.getEmail()
        );
    }
}
