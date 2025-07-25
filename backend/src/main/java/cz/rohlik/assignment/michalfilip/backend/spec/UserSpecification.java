package cz.rohlik.assignment.michalfilip.backend.spec;

import cz.rohlik.assignment.michalfilip.backend.dto.UserFilterDTO;
import cz.rohlik.assignment.michalfilip.backend.model.User;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

public class UserSpecification {
  public static Specification<User> build(UserFilterDTO filter) {
    return (root, query, cb) -> {
      Predicate predicate = cb.conjunction();
      if (filter.getId() != null && !filter.getId().isEmpty()) {
        predicate = cb.and(predicate, cb.like(cb.lower(root.get("id").as(String.class)), "%" + filter.getId().toLowerCase() + "%"));
      }
      if (filter.getName() != null && !filter.getName().isEmpty()) {
        String[] tokens = filter.getName().trim().toLowerCase().split("\\s+");
        if (tokens.length == 1) {
          // Match either name or surname
          Predicate nameMatch = cb.like(cb.lower(root.get("name")), "%" + tokens[0] + "%");
          Predicate surnameMatch = cb.like(cb.lower(root.get("surname")), "%" + tokens[0] + "%");
          predicate = cb.and(predicate, cb.or(nameMatch, surnameMatch));
        } else if (tokens.length >= 2) {
          // Try to match name and surname pair
          Predicate nameMatch = cb.like(cb.lower(root.get("name")), "%" + tokens[0] + "%");
          Predicate surnameMatch = cb.like(cb.lower(root.get("surname")), "%" + tokens[1] + "%");
          predicate = cb.and(predicate, nameMatch, surnameMatch);
        }
      }
      if (filter.getActive() != null) {
        predicate = cb.and(predicate, cb.equal(root.get("active"), filter.getActive()));
      }
      if (filter.getCreatedAtFrom() != null && !filter.getCreatedAtFrom().isEmpty()) {
        predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get("createdAt"), java.sql.Timestamp.valueOf(filter.getCreatedAtFrom() + " 00:00:00")));
      }
      if (filter.getCreatedAtTo() != null && !filter.getCreatedAtTo().isEmpty()) {
        predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get("createdAt"), java.sql.Timestamp.valueOf(filter.getCreatedAtTo() + " 23:59:59")));
      }
      return predicate;
    };
  }
}
