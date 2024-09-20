package net.javaguides.ems.controller;

import net.javaguides.ems.enums.MajorCodes;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/majors")
public class MajorController {

    @GetMapping()
    public List<String> getMajors() {
        // Convert the enum values to a list of codes (e.g., "AT25", "AN27", etc.)
        return Arrays.stream(MajorCodes.values())
                .map(MajorCodes::name) // Retrieve the enum name (i.e., the code)
                .collect(Collectors.toList());
    }
}
