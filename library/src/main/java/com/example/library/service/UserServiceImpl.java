package com.example.library.service;
//package com.example.library.user;
//
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.library.model.User;
import com.example.library.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository repo;
	@Override
	public User addUser(User user) {
		if(user != null) {
			return repo.save(user);
		}
		return null;
	}

	@Override
	public User updateUser(int id, User user) {
		if(user != null) {
			User user1 = repo.findById(id).orElse(null);
			if(user1 != null) {
				user1.setUsername(user.getUsername());
				user1.setPassword(user1.getPassword());
				user1.setEmail(user.getEmail());
				user1.setNumberPhone(user.getNumberphone());
				return repo.save(user1);
			}
		}
		return null;
	}

	@Override
	public boolean deleteUser(int id) {
		if( id >= 1) {
			User user = repo.findById(id).orElse(null);
			if(user != null) {
				repo.delete(user);
				return true;
			}
			
		}
		return false;
	}

	@Override
	public User getOneUser(int id) {
		User user = repo.findById(id).orElse(null);
		return user;
	}
	@Override
	public List<User> getAllUser() {
		
		return repo.findAll();
	}

	@Override
	public User checkUser(String email) {
		User user = repo.findByEmail(email);
		return user;
	}

}
