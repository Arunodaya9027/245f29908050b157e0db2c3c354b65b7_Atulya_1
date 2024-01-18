//package com.hackathon.service.AwsService;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.GetObjectRequest;
//import com.amazonaws.services.s3.model.S3Object;
//
//import java.io.IOException;
//import java.io.InputStream;
//
//@Service
//public class S3DownloadService {
//
//    @Autowired
//    private AmazonS3 amazonS3;
//
//    public byte[] downloadFile(String bucketName, String key) throws IOException {
//        S3Object s3Object = amazonS3.getObject(new GetObjectRequest(bucketName, key));
//        InputStream objectInputStream = s3Object.getObjectContent();
//        return objectInputStream.readAllBytes();
//    }
//}
