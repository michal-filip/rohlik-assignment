package cz.rohlik.assignment.michalfilip.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

@Entity
@Data
@Table(name = "\"user\"")
public class User {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Setter(AccessLevel.NONE)
  private UUID id;
  @Column(nullable = false, length = 100)
  private String name;
  @Column(nullable = false, length = 100)
  private String surname;
  @Column(nullable = false, length = 200)
  private String email;
  @Column(nullable = false, length = 30)
  private String phoneNumber;
  @Column
  private boolean active;
  @Column(nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;
}
