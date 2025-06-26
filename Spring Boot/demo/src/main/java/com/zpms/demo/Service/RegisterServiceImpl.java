package com.zpms.demo.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.zpms.demo.Repository.RegisterRepository;
import com.zpms.demo.Register.UserRegister;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Prefer relative path stored in DB, absolute path for saving on disk
    private final String UPLOAD_DIR = "C:/uploads/photos/";

    @Override
    public String registerUser(UserRegister userDTO, MultipartFile photo) throws IOException {
        if (registerRepository.existsByEmail(userDTO.getEmail())) {
            return "हा ईमेल आधीच नोंदणीकृत आहे.";
        }

        if (photo == null || photo.isEmpty()) {
            throw new IOException("फोटो अपलोड करा.");
        }

        String originalFilename = photo.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IOException("फोटोचे नाव वैध नाही.");
        }

        // You can sanitize filename here if needed

        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename to avoid collisions
        String fileName = UUID.randomUUID().toString() + "_" + originalFilename;

        Path filePath = uploadPath.resolve(fileName);

        try {
            photo.transferTo(filePath.toFile());
        } catch (IOException e) {
            throw new IOException("फोटो सेव्ह करताना त्रुटी: " + e.getMessage());
        }

        // Keep original password if you want to return or log it temporarily
        String originalPassword = userDTO.getPassword();

        // Encrypt password before saving to DB
        // userDTO.setPassword(passwordEncoder.encode(originalPassword));
        userDTO.setPassword(userDTO.getPassword());

        // Store relative path in DB, easier to migrate & display later
        userDTO.setPhotoPath("uploads/photos/" + fileName);

        registerRepository.save(userDTO);

        // Return success message (optionally with original password)
        return "नोंदणी यशस्वी! तुमचा पासवर्ड: " + originalPassword;
    }
}
