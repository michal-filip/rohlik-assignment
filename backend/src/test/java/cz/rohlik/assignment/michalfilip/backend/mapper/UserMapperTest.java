package cz.rohlik.assignment.michalfilip.backend.mapper;

import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserUpdateDTO;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserMapperTest {
    @InjectMocks
    private UserMapperImpl userMapper;

    @Test
    void toUserDTOList_mapsList() {
        User user = new User();
        List<UserDTO> dtos = userMapper.toUserDTOList(List.of(user));
        assertNotNull(dtos);
    }

    @Test
    void toDTO_mapsUser() {
        User user = new User();
        UserDTO dto = userMapper.toDTO(user);
        assertNotNull(dto);
    }

    @Test
    void updateUser_mapsUpdate() {
        User user = new User();
        UserUpdateDTO updateDTO = new UserUpdateDTO();
        User updated = userMapper.updateUser(user, updateDTO);
        assertNotNull(updated);
    }
}
