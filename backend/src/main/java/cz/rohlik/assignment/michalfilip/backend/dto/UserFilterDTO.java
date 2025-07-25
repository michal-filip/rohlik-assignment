package cz.rohlik.assignment.michalfilip.backend.dto;

import lombok.Data;

@Data
public class UserFilterDTO {
    private String name;
    private String surname;
    private String email;
    private Boolean active;
}
