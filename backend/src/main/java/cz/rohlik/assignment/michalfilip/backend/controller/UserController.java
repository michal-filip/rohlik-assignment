
package cz.rohlik.assignment.michalfilip.backend.controller;

import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserActiveDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserFilterDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserUpdateDTO;
import cz.rohlik.assignment.michalfilip.backend.service.UserService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  public Mono<PageResponseDTO<UserDTO>> findUsers(
      @RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
      @RequestParam(value = "limit", defaultValue = "10") int limit,
      @RequestParam(value = "id", required = false) String id,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "active", required = false) Boolean active,
      @RequestParam(value = "createdAtFrom", required = false) String createdAtFrom,
      @RequestParam(value = "createdAtTo", required = false) String createdAtTo
  ) {
    var filter = new UserFilterDTO();
    filter.setId(id);
    filter.setName(name);
    filter.setActive(active);
    filter.setCreatedAtFrom(createdAtFrom);
    filter.setCreatedAtTo(createdAtTo);
    return userService.findUsers(pageNumber, limit, filter);
  }

  @PutMapping("/{id}")
  public Mono<Void> updateUser(@PathVariable("id") UUID id, @RequestBody @Valid UserUpdateDTO dto) {
    return userService.updateUser(id, dto);
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
