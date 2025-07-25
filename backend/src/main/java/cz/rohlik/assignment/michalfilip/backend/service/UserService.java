package cz.rohlik.assignment.michalfilip.backend.service;

import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import java.util.UUID;
import reactor.core.publisher.Mono;

public interface UserService {
  Mono<PageResponseDTO<UserDTO>> findUsers();
  Mono<Void> deleteUser(UUID id);
  Mono<Void> updateUserActive(UUID id, boolean active);
}
