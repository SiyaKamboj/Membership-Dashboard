package net.javaguides.ems.controller.forenums;

import net.javaguides.ems.enums.ProjectType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/projecttypes")
public class ProjectTypeController {
    @GetMapping()
    public List<String> getProjectTypes() {
        // Convert the enum values to a list of strings
        return Arrays.stream(ProjectType.values())
                .map(ProjectType::name) // Retrieve the enum name (ie AS, Collab, etc)
                .collect(Collectors.toList());
    }
}
