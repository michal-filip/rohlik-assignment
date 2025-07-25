package cz.rohlik.assignment.michalfilip.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserUpdateDTO extends UserBaseDTO {
    // No additional fields for now, but can be extended in the future
}
