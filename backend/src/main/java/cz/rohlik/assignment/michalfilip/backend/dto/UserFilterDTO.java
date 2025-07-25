package cz.rohlik.assignment.michalfilip.backend.dto;

import lombok.Data;

@Data
public class UserFilterDTO {
    private String id;
    private String name;
    private Boolean active;
    private String createdAtFrom;
    private String createdAtTo;
}
