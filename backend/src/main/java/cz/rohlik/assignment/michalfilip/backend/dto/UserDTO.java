package cz.rohlik.assignment.michalfilip.backend.dto;

import java.util.Date;
import java.util.UUID;
import lombok.Data;

@Data
public class UserDTO {
  private UUID id;
  private String name;
  private String surname;
  private String email;
  private String phoneNumber;
  private boolean active;
  private Date createdAt;
}
