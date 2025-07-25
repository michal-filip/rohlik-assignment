package cz.rohlik.assignment.michalfilip.backend.mapper;

import cz.rohlik.assignment.michalfilip.backend.dto.UserDTO;
import cz.rohlik.assignment.michalfilip.backend.dto.UserUpdateDTO;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

  List<UserDTO> toUserDTOList(List<User> users);

  UserDTO toDTO(User user);

  User updateUser(@MappingTarget User user, UserUpdateDTO userUpdateDTO);

}
