package com.zpms.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zpms.demo.Register.UserRegister;

public interface RegisterRepository extends JpaRepository<UserRegister, Long> {
   boolean existsByEmail(String email);
UserRegister findByEmail(String email);
Optional<UserRegister> findByEmailAndPassword(String email, String password);

}
