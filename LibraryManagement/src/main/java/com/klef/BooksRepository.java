package com.klef;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends JpaRepository<Books, Long> {
    // Custom query methods
    List<Books> findByAuthor(String author);
    List<Books> findByGenre(String genre);
    Books findByIsbn(String isbn);
}
