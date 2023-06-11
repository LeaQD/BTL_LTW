package com.example.library.model;
import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity

public class Book {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String image;
	private String title;
	private String author;
	private String category;
	private String about;
	private Date date;
	private int npage;
	private int nsold;
	public Book(int id,String image, String title, String author, String category,String about, Date date, int npage, int nsold) {
		super();
		this.image = image;
		this.id = id;
		this.title = title;
		this.author = author;
		this.category = category;
		this.about = about;
		this.date = date;
		this.npage = npage;
		this.nsold = nsold;
	}
	public Book() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getAbout() {
		return about;
	}
	public void setAbout(String about) {
		this.about = about;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getNpage() {
		return npage;
	}
	public void setNpage(int npage) {
		this.npage = npage;
	}
	public int getNsold() {
		return nsold;
	}
	public void setNsold(int nsold) {
		this.nsold = nsold;
	}
	
}
