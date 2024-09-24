package net.javaguides.ems.controller.forenums;

import net.javaguides.ems.enums.FilmRoles;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/onset-roles")
public class RolesController {
    @GetMapping()
    public List<String> getRoles() {
        // Convert the enum values to a list
        return Arrays.stream(FilmRoles.values())
                .map(FilmRoles::name) // Retrieve the enum name
                .collect(Collectors.toList());
    }
}
