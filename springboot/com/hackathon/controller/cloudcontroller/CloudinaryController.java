package com.hackathon.controller.cloudcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.service.cloudservice.CloudinaryUploadService;

import java.io.IOException;

@RestController
@RequestMapping("/api/cloudinary")
public class CloudinaryController {

    @Autowired
    private CloudinaryUploadService uploadService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file) {
        try {
            String url = uploadService.uploadFile(file);
            return ResponseEntity.ok("File uploaded successfully! URL: " + url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading file.");
        }
    }

    // Downloading doesn't require specific endpoint as Cloudinary serves files through URLs.
}
