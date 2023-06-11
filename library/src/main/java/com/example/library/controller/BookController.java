package com.example.library.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.model.Book;
import com.example.library.service.BookServiceImpl;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
@RestController
@CrossOrigin
public class BookController {
	@Autowired
	private BookServiceImpl Service;
	@GetMapping("/books")
	public List<Book> getListBooks() throws IOException{
		return Service.getAllBook();
	}
	@GetMapping("/books/{id}")
	public Book showBookForm (@PathVariable ("id") int id) {
		Book book;
		if( id == -1) {
			book = new Book();
		} else {
			book = Service.getOneBook(id);
		}
		return book;
	}
	@PostMapping("/books/add")
	public Book createBook(@RequestBody Book book) {
		return Service.addBook(book);
	}
	@PutMapping("/books/update/{id}")
	public Book updateBook(@PathVariable("id") int id, @RequestBody Book book){
		return Service.updateBook(id, book);
	}
	@DeleteMapping("/books/delete/{id}")
	public boolean deleteBook(@PathVariable ("id") Integer id) {
		return Service.deleteBook(id);
	}
	@GetMapping("/books/{title}/{author}")
	public boolean checkBook(@PathVariable ("title") String title,@PathVariable ("author") String author ) {
		return Service.checkBook(title, author);
	}
}
