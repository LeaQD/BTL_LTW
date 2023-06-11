package com.example.library.service;
//package com.example.library.user;
//
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.library.model.User;

@Service
public interface UserService {
	// them user
	public User addUser(User user);
	// sua user
	public User updateUser(int id,User user);
	// xoa user
	public boolean deleteUser(int id);
	// lấy ra 1 user theo id
	public User getOneUser(int id);
	// check đăng nhập
	public User checkUser(String email);
	// Lấy ra tất cả User
	public List<User> getAllUser();
	
	
}
