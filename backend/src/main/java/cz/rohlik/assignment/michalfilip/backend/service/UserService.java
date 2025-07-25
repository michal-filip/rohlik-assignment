package cz.rohlik.assignment.michalfilip.backend.service;

import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserUpdateDTO;
import java.util.UUID;
import reactor.core.publisher.Mono;

public interface UserService {
  Mono<PageResponseDTO<UserDTO>> findUsers();
  Mono<Void> updateUser(UUID id, UserUpdateDTO dto);
  Mono<Void> updateUserActive(UUID id, boolean active);
  Mono<Void> deleteUser(UUID id);
}
