package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.javaguides.ems.enums.MajorCodes;
import net.javaguides.ems.enums.Positions;

//use this class to transfer data between client and server aka responds to restAPI's. uses the mapper to map this to employee entity and vice versa
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private long id;
    private String firstName;
    private String lastName;
    //this contains display name, which is eventually mapped to Enum Position. This is because front end only needs to see the display name string
    private String position;
    private MajorCodes major;
    private String email;


}
