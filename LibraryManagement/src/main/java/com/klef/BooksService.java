package com.klef;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BooksService {

    @Autowired
    private BooksRepository booksRepository;

    // Add a book
    public Books addBook(Books book) {
        return booksRepository.save(book);
    }

    // Update a book
    public Books updateBook(Long id, Books updatedBook) {
        Optional<Books> existing = booksRepository.findById(id);
        if (existing.isPresent()) {
            Books book = existing.get();
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setIsbn(updatedBook.getIsbn());
            book.setPrice(updatedBook.getPrice());
            book.setGenre(updatedBook.getGenre());
            return booksRepository.save(book);
        }
        return null;
    }

    // Delete a book
    public boolean deleteBook(Long id) {
        if (booksRepository.existsById(id)) {
            booksRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // View all books
    public List<Books> getAllBooks() {
        return booksRepository.findAll();
    }

    // Find by ID
    public Optional<Books> getBookById(Long id) {
        return booksRepository.findById(id);
    }

    // Find by ISBN
    public Books getBookByIsbn(String isbn) {
        return booksRepository.findByIsbn(isbn);
    }

    // Find by Author
    public List<Books> getBooksByAuthor(String author) {
        return booksRepository.findByAuthor(author);
    }

    // Find by Genre
    public List<Books> getBooksByGenre(String genre) {
        return booksRepository.findByGenre(genre);
    }
}
