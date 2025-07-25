package cz.rohlik.assignment.michalfilip.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserBaseDTO {
    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Surname is required")
    @Size(max = 100)
    private String surname;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 200)
    private String email;

    @NotBlank(message = "Phone number is required")
    @Size(max = 30)
    private String phoneNumber;

    private boolean active;
}
