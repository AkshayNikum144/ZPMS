package com.zpms.demo.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.zpms.demo.Service.RegisterService;
import com.zpms.demo.Register.UserRegister;
import com.zpms.demo.Repository.RegisterRepository;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @Autowired
    private RegisterRepository registerRepository;  // << Add this injection!!

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> registerUser(
            @ModelAttribute UserRegister userDTO,
            @RequestParam("photo") MultipartFile photo) {
        Map<String, String> response = new HashMap<>();
        try {
            String result = registerService.registerUser(userDTO, photo);
            response.put("message", result != null ? result : "नोंदणी यशस्वी");
            return ResponseEntity.ok(response); // 200 OK with JSON message
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "नोंदणी अयशस्वी: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Fix the URL path to avoid "/api/register/api/users" -> change to just "/users"
    @GetMapping("/users")
    public List<UserRegister> getAllUsers() {
        return registerRepository.findAll();
    }
}
