package cz.rohlik.assignment.michalfilip.backend.service;

import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.mapper.UserMapper;
import cz.rohlik.assignment.michalfilip.backend.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final UserMapper userMapper;
  private final Scheduler jdbcScheduler = Schedulers.boundedElastic();

  @Override
  public Mono<PageResponseDTO<UserDTO>> findUsers() {
    return Mono.fromCallable(() -> userRepository.findAll())
        .map(userMapper::toUserDTOList)
        .zipWith(Mono.fromCallable(() -> userRepository.count()))
        .subscribeOn(jdbcScheduler)
        .map(tuple -> new PageResponseDTO<UserDTO>(tuple.getT1(), tuple.getT2().longValue()));
  }

  @Override
  public Mono<Void> deleteUser(UUID id) {
    return Mono.fromRunnable(() -> userRepository.deleteById(id))
        .subscribeOn(jdbcScheduler)
        .then();
  }
}
