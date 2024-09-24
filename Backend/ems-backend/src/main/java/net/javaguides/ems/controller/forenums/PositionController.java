package net.javaguides.ems.controller.forenums;

import net.javaguides.ems.enums.Positions;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

//used so that, in the front-end, you dont need to hardcode the enums; instead, dynamically retrieve it using an api call
@CrossOrigin("*")
@RestController
@RequestMapping("/api/positions")
public class PositionController {
    @GetMapping()
    public List<String> getPositions() {
        // Convert the enum values to a list of strings
        return Arrays.stream(Positions.values())
                .map(Positions::getDisplayName) // Retrieve the display name instead of enum name
                .collect(Collectors.toList());

    }
}

