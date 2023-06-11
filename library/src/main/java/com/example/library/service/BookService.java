package com.example.library.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.library.model.Book;

@Service
public interface BookService {
	// thêm sách
	public Book addBook(Book book);
	// chỉnh sửa sách
	public Book updateBook(int id, Book book);
	// xóa sách
	public boolean deleteBook(int id);
	// lấy ra tất cả sách
	public List<Book> getAllBook();
	// lấy ra một quyển sách
	public Book getOneBook(int id);
	// tìm sách có tác giả và tiêu đề trùng
	public boolean checkBook(String title, String author);
}
