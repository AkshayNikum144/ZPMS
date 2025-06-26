package com.zpms.demo.Service;

import org.springframework.web.multipart.MultipartFile;

import com.zpms.demo.Register.UserRegister;

public interface RegisterService {
 String registerUser(UserRegister userDTO, MultipartFile photo) throws Exception;
}
