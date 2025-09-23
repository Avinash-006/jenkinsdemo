package com.klef;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/books")
public class BooksController {

    @Autowired
    private BooksService booksService;

    // Add a book
    @PostMapping("/add")
    public ResponseEntity<Books> addBook(@RequestBody Books book) {
        return ResponseEntity.ok(booksService.addBook(book));
    }
 @GetMapping("/")
    public String home() {
        return "welcome";
    }
    // Update a book
    @PutMapping("/update/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable Long id, @RequestBody Books book) {
        Books updated = booksService.updateBook(id, book);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    // Delete a book
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        boolean deleted = booksService.deleteBook(id);
        if (deleted) {
            return ResponseEntity.ok("Book deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    // View all books
    @GetMapping("/all")
    public ResponseEntity<List<Books>> getAllBooks() {
        return ResponseEntity.ok(booksService.getAllBooks());
    }

    // Find by ID
    @GetMapping("/{id}")
    public ResponseEntity<Books> getBookById(@PathVariable Long id) {
        Optional<Books> book = booksService.getBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Find by ISBN
    @GetMapping("/isbn/{isbn}")
    public ResponseEntity<Books> getBookByIsbn(@PathVariable String isbn) {
        Books book = booksService.getBookByIsbn(isbn);
        if (book != null) {
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }

    // Find by Author
    @GetMapping("/author/{author}")
    public ResponseEntity<List<Books>> getBooksByAuthor(@PathVariable String author) {
        return ResponseEntity.ok(booksService.getBooksByAuthor(author));
    }

    // Find by Genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Books>> getBooksByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(booksService.getBooksByGenre(genre));
    }
}
