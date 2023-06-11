package com.example.library.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.library.model.Book;
import com.example.library.repository.BookRepository;


@Service
public class BookServiceImpl implements BookService {
	@Autowired
	private BookRepository repo;
	@Override
	public Book addBook(Book book) {
		if(book != null) {
			return repo.save(book);
		}
		return null;
	}

	@Override
	public Book updateBook(int id, Book book) {
		if(book != null) {
			Book book1 = repo.findById(id).orElse(null);
			if(book1!=null) {
				book1.setImage(book.getImage());
				book1.setTitle(book.getTitle());
				book1.setAuthor(book.getAuthor());
				book1.setAbout(book.getAbout());
				book1.setCategory(book.getCategory());
				book1.setDate(book.getDate());
				book1.setNpage(book.getNpage());
				book1.setNsold(book.getNsold());
				return repo.save(book1);
			}
		}
		return null;
	}

	@Override
	public boolean deleteBook(int id) {
		if(id >=1 ) {
			Book book = repo.findById(id).orElse(null);
			if(book != null) {
				 repo.delete(book);
				 return true;
			}
		}
		return false;
	}

	@Override
	public List<Book> getAllBook() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public Book getOneBook(int id) {
		// TODO Auto-generated method stub
		Book book = repo.findById(id).orElse(null);
		return book;
	}
//	private BookRepository repo;
//	
//	public List<Book> getBooks(){
//		return repo.findAll();
//	}
//	public Book getBooks(Integer id) {
//		return repo.findById(id).orElse(null);
//	}

	@Override
	public boolean checkBook(String title, String author) {
		return repo.existsByTitleAndAuthor(title, author);
	}
}
