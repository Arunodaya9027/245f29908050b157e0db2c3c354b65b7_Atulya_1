package com.hackathon.controller.postcontroller;

import java.util.List;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.model.postmodel.postmodel;
import com.hackathon.service.postservice.postservice;

@RestController
@RequestMapping("/api/posts")
public class postcontroller {

    @Autowired
    private postservice postService;

    // Endpoint to get all posts
    @GetMapping
    public List<postmodel> getAllPosts() {
        return postService.getAllpostList();
    }

    // Endpoint to save a post
    @PostMapping(value = "/save")
    public ResponseEntity<String> savePost(@RequestBody postmodel postModel) {
        try {
            postService.savePost(postModel);
            return ResponseEntity.ok("Post saved successfully");
        } catch (DataAccessException e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to save post due to a database issue");
        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR).body("Failed to save post");
        }
    }
}

