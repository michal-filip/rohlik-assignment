package cz.rohlik.assignment.michalfilip.backend.spec;

import cz.rohlik.assignment.michalfilip.backend.dto.UserFilterDTO;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import cz.rohlik.assignment.michalfilip.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class UserSpecificationTest {

  @Autowired
  private UserRepository userRepository;

  @Test
  void build_withNameAndId_filtersCorrectly() {
    // Given mocked data from migration

    UserFilterDTO filter = new UserFilterDTO();
    filter.setName("John");
    filter.setActive(true);

    Specification<User> spec = UserSpecification.build(filter);
    List<User> result = userRepository.findAll(spec);

    assertEquals(1, result.size());
    assertEquals("John", result.get(0).getName());
    assertTrue(result.get(0).isActive());
  }

  @Test
  void build_withEmptyFilter_returnsAll() {
    // Given mocked data from migration

    UserFilterDTO filter = new UserFilterDTO();
    Specification<User> spec = UserSpecification.build(filter);
    List<User> result = userRepository.findAll(spec);

    assertEquals(10, result.size());
  }
}
