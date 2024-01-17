//package com.hackathon.service.AwsService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//
//import java.io.IOException;
//
//@Service
//public class S3UploadService {
//
//    @Autowired
//    private AmazonS3 amazonS3;
//
//    @Value("${aws.bucketName}")
//    private String defaultBucketName;
//
//    @Value("${aws.accessKeyId}")
//    private String accessKeyId;
//
//    public void uploadFile(String defaultBucketName, String accessKeyId, MultipartFile file) throws IOException {
//        // Use the corrected parameter names here
//        amazonS3.putObject(new PutObjectRequest(defaultBucketName, accessKeyId, file.getInputStream(), null));
//    }
//}
