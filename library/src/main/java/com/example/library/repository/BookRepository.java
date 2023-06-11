package com.example.library.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.library.model.Book;
import com.example.library.model.User;
@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {
	boolean existsByTitleAndAuthor(String title, String author);
}
