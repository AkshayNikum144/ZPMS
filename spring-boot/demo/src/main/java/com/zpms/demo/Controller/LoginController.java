package com.zpms.demo.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zpms.demo.Register.LoginRequest;
import com.zpms.demo.Register.UserRegister;
import com.zpms.demo.Repository.RegisterRepository;
@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
public class LoginController {
 
    @Autowired
    private RegisterRepository userRepository;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<UserRegister> userOpt = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());

        if (userOpt.isPresent()) {
            UserRegister user = userOpt.get();

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "department", user.getDepartment(),
                "role", user.getRole()
            ));

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "Invalid email or password"));
        }
    }
}