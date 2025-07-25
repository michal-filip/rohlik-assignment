package cz.rohlik.assignment.michalfilip.backend.spec;

import cz.rohlik.assignment.michalfilip.backend.dto.UserFilterDTO;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

public class UserSpecification {
  public static Specification<User> build(UserFilterDTO filter) {
    return (root, query, cb) -> {
      Predicate predicate = cb.conjunction();
      if (filter.getName() != null && !filter.getName().isEmpty()) {
        predicate = cb.and(predicate, cb.like(cb.lower(root.get("name")), "%" + filter.getName().toLowerCase() + "%"));
      }
      if (filter.getSurname() != null && !filter.getSurname().isEmpty()) {
        predicate = cb.and(predicate, cb.like(cb.lower(root.get("surname")), "%" + filter.getSurname().toLowerCase() + "%"));
      }
      if (filter.getEmail() != null && !filter.getEmail().isEmpty()) {
        predicate = cb.and(predicate, cb.like(cb.lower(root.get("email")), "%" + filter.getEmail().toLowerCase() + "%"));
      }
      if (filter.getActive() != null) {
        predicate = cb.and(predicate, cb.equal(root.get("active"), filter.getActive()));
      }
      return predicate;
    };
  }
}
