package com.klef;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Books {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 100)
    private String author;

    @Column(unique = true, nullable = false, length = 20)
    private String isbn;

    @Column(nullable = false)
    private Double price;

    @Column(length = 50)
    private String genre;

    // ---------- Constructors ----------
    public Books() {
    }

    public Books(String title, String author, String isbn, Double price, String genre) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.genre = genre;
    }

    // ---------- Getters & Setters ----------
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    // ---------- toString ----------
    @Override
    public String toString() {
        return "Books{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", isbn='" + isbn + '\'' +
                ", price=" + price +
                ", genre='" + genre + '\'' +
                '}';
    }
}
