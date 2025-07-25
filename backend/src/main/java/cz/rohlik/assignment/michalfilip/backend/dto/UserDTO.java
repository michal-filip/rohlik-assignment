package cz.rohlik.assignment.michalfilip.backend.dto;

import java.util.Date;
import java.util.UUID;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserDTO extends UserBaseDTO {
  private UUID id;
  private Date createdAt;
}
