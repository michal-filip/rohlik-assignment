
package cz.rohlik.assignment.michalfilip.backend.controller;

import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserActiveDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.service.UserService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/api/users", produces = "application/json")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @GetMapping
  public Mono<PageResponseDTO<UserDTO>> findUsers() {
    return userService.findUsers();
  }

  @PutMapping("/{id}/active")
  public Mono<Void> updateUserActive(@PathVariable("id") UUID id, @RequestBody UserActiveDTO dto) {
    return userService.updateUserActive(id, dto.isActive());
  }

  @DeleteMapping("/{id}")
  public Mono<Void> deleteUser(@PathVariable("id") UUID id) {
    return userService.deleteUser(id);
  }

}
