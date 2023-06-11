package com.example.library.controller;
//package com.example.library.user;
//
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.library.model.User;
import com.example.library.service.UserServiceImpl;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	private UserServiceImpl Service;
	@GetMapping("/users")
	public List<User> getListUser() throws IOException{
		return Service.getAllUser();
	}
	@GetMapping("/users/{id}")
	public User showUser (@PathVariable ("id") int id) {
		User user;
		if(id == -1) {
			user = new User();
		} else {
			user = Service.getOneUser(id);
		}
		return user;
	}
	@PostMapping("/users/add")
	public User createUser( @RequestBody User user) {
		return Service.addUser(user);
	}
	@PutMapping("/users/update")
	public User updateUser (@RequestParam("id") int id, @RequestBody User user) {
		return Service.updateUser(id, user);
	}
	@DeleteMapping("/users/delete/{id}")
	public boolean deleteUser(@PathVariable ("id") Integer id) {
		return Service.deleteUser(id);
	}
	@GetMapping("/users/check/{email}")
	public User checkUser (@PathVariable ("email") String email) {
		User user;
		user = Service.checkUser(email);
		return user;
	}

}
