package cz.rohlik.assignment.michalfilip.backend.service;

import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserFilterDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserUpdateDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.PageResponseDTO;
import cz.rohlik.assignment.michalfilip.backend.mapper.UserMapper;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import cz.rohlik.assignment.michalfilip.backend.repository.UserRepository;
import cz.rohlik.assignment.michalfilip.backend.spec.UserSpecification;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserMapper userMapper;
    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void findUsers_returnsPageResponseDTO() {
        UserFilterDTO filter = new UserFilterDTO();
        UserSpecification spec = mock(UserSpecification.class);
        List<User> users = List.of(new User());
        Page<User> page = new PageImpl<>(users);
        when(userRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(page);
        when(userRepository.count(any(Specification.class))).thenReturn(1L);
        when(userMapper.toUserDTOList(any())).thenReturn(List.of(new UserDTO()));

        Mono<PageResponseDTO<UserDTO>> result = userService.findUsers(0, 10, filter);
        PageResponseDTO<UserDTO> dto = result.block();
        assertNotNull(dto);
        assertEquals(1, dto.getTotalElements());
        assertEquals(1, dto.getContent().size());
    }

    @Test
    void updateUser_updatesUser() {
        UUID id = UUID.randomUUID();
        UserUpdateDTO dto = new UserUpdateDTO();
        User user = new User();
        User updatedUser = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userMapper.updateUser(user, dto)).thenReturn(updatedUser);
        when(userRepository.save(updatedUser)).thenReturn(updatedUser);

        Mono<Void> result = userService.updateUser(id, dto);
        result.block();
        verify(userRepository).save(updatedUser);
    }

    @Test
    void updateUserActive_updatesActiveStatus() {
        UUID id = UUID.randomUUID();
        User user = new User();
        user.setActive(false);
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);

        Mono<Void> result = userService.updateUserActive(id, true);
        result.block();
        assertTrue(user.isActive());
        verify(userRepository).save(user);
    }

    @Test
    void deleteUser_deletesUser() {
        UUID id = UUID.randomUUID();

        Mono<Void> result = userService.deleteUser(id);
        result.block();
        verify(userRepository).deleteById(id);
    }
}
