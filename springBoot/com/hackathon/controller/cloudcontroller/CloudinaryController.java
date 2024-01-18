package com.hackathon.controller.cloudcontroller;

import org.apache.http.HttpStatus;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.service.cloudservice.CloudinaryUploadService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cloudinary")
public class CloudinaryController {

    @Autowired
    private CloudinaryUploadService uploadService;

//  String fileurlString=   uploadService.result.get
//    
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam MultipartFile file ,@RequestParam String title,@RequestParam String description) {
    	 System.out.println("upload conrtoller working ");
    	try {
            String url = uploadService.uploadFile(file,title,description);
            return ResponseEntity.ok("File uploaded successfully! URL: " + url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading file.");
        }
    }
    @GetMapping("/getAllData")
    public ResponseEntity<List<Map<?, ?>>> getAllData() {
        try {
            List<Map<?, ?>> data = uploadService.getAllData();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body(null);
        }
    }
    	
    }

    // Downloading doesn't require specific endpoint as Cloudinary serves files through URLs.

