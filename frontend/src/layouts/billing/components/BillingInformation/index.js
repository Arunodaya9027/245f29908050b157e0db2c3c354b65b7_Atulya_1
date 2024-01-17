import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { FormGroup } from "@mui/material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArgonBox from "components/ArgonBox";

function BillingInformation() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    favicon: null,
    likes: 0,
    dislikes: 0,
    comments: [],
  });
  const [openModal, setOpenModal] = useState(false);
  const [openParticularPost, setOpenParticularPost] = useState(null);
  const [openPostFlag, setOpenPostFlag] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [activePostIndex, setActivePostIndex] = useState(null);
  const [attached, setAttached] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleInputChange = (field, value) => {
    setNewPost((prevPost) => ({ ...prevPost, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewPost((prevPost) => ({ ...prevPost, favicon: file }));
    setMediaType(file.type.split("/")[0]);
    setAttached(file);
  };

  const handleLike = (index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].likes += 1;
      return updatedPosts;
    });
  };

  const handleDislike = (index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].dislikes += 1;
      return updatedPosts;
    });
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleComment = (index) => {
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts];
      updatedPosts[index].comments.push(newComment);
      return updatedPosts;
    });
    setNewComment("");
    setActivePostIndex(null);
  };

  const handleSubmit = () => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setNewPost({
      title: "",
      description: "",
      favicon: null,
      likes: 0,
      dislikes: 0,
      comments: [],
    });
    setOpenModal(false); // Close the modal after submission
  };

  const openPost = (post, index) => () => {
    // Create a dialog element
    setOpenPostFlag(true);
    const content = (
      <>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ margin: "15px", marginLeft: "0px" }}
          >
            <Card style={{ marginTop: "16px", width: "170%" }}>
              <CardContent>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="h6">{post.description}</Typography>
                {/* {post.favicon && (
              <CardMedia
                component="img"
                src={URL.createObjectURL(post.favicon)}
                style={{
                  width: "80%",
                  height: "50%",
                  objectFit: "cover",
                  justifyContent: "center",
                  marginLeft: "10%",
                }}
                alt="Favicon"
              />
            )} */}
                <br />
                <Box
                  style={{
                    width: "80%",
                    height: "40%",
                    objectFit: "cover",
                    justifyContent: "center",
                    marginLeft: "10%",
                  }}
                >
                  {renderMedia(post.title)}
                </Box>

                <br />
                <div style={{ display: "flex", justifyContent: "", marginTop: "8px" }}>
                  <div>
                    <IconButton color="primary" onClick={() => handleLike(index)}>
                      <ThumbUpIcon />
                    </IconButton>
                    {post.likes} Likes
                  </div>
                  <div>
                    <IconButton color="primary" onClick={() => handleDislike(index)}>
                      <ThumbDownIcon />
                    </IconButton>
                    {post.dislikes} Dislikes
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <ArgonBox
                      style={{
                        marginLeft: "20%",
                        width: "600px",
                        display: "flex",
                        alignItems: "right",
                      }}
                    >
                      <FormGroup style={{ display: "inline-block" }}>
                        <TextField
                          placeholder="Add Comment"
                          value={newComment}
                          onChange={handleCommentChange}
                          fullWidth
                          multiline
                          maxRows={4}
                          style={{ marginRight: "5px", width: "150%" }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleComment(index)}
                          style={{ marginLeft: "65%", marginTop: "7%" }}
                        >
                          Comment
                        </Button>
                      </FormGroup>
                    </ArgonBox>
                    <br />
                    <br />
                    {post.comments.length > 0 && (
                      <ul style={{ position: "rekative", marginLeft: "20%" }}>
                        {post.comments.map((comment, commentIndex) => (
                          <li key={commentIndex}>{comment}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions></DialogActions>
      </>
    );

    setOpenParticularPost(content);
  };

  const renderMedia = (title) => {
    switch (mediaType) {
      case "image":
        return (
          <CardMedia
            src={URL.createObjectURL(attached)}
            component="img"
            title={title}
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        );
      case "video":
        return (
          <CardMedia
            component="video"
            title={title}
            controls
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={URL.createObjectURL(attached)} type="video/mp4" />
            Your browser does not support the video tag.
          </CardMedia>
        );
      case "audio":
        return (
          <CardMedia
            component="audio"
            title={title}
            controls
            sx={{
              maxWidth: "100%",
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={URL.createObjectURL(attached)} type="audio/mp3" />
            Your browser does not support the audio tag.
          </CardMedia>
        );
      case "application":
        return (
          <CardMedia
            component="iframe"
            title={title}
            sx={{
              width: "100%",
              height: "400px", // Set a suitable height for your application iframe
              margin: 0,
              boxShadow: ({ boxShadows: { md } }) => md,
            }}
            src={URL.createObjectURL(attached)}
          />
        );
      // Add cases for handling other types like documents and PDFs
      default:
        return null; // Handle other types or provide a default behavior
    }
  };

  return (
    <>
      <Card style={{ width: "170%" }}>
        <CardContent>
          <Typography variant="h4" ml={4} style={{ display: "inline-block" }}>
            Create a Post
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            style={{
              color: "white",
              display: "inline-block",
              marginLeft: "20%",
              marginTop: "1%",
              marginBottom: "1%",
              width: "60%",
              height: "50px",
              quality: "100%",
            }}
          >
            Add Post
          </Button>
        </CardContent>
      </Card>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
        <DialogTitle>Add Post</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            style={{ margin: "15px", marginLeft: "0px" }}
          >
            <TextField
              id="outlined-basic1"
              placeholder="Title"
              variant="outlined"
              value={newPost.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              fullWidth
              style={{ margin: "5px", width: "100%" }}
            />
            <br />
            <TextField
              id="outlined-basic2"
              placeholder="Description"
              variant="outlined"
              value={newPost.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              fullWidth
              multiline
              maxRows={8}
              style={{ margin: "5px", width: "100%" }}
            />
            <br />
            <br />
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ margin: "5px" }}
            /> */}
            <Input
              id="file-input"
              type="file"
              accept="*"
              onChange={handleFileChange}
              style={{ margin: "5px" }}
              endAdornment={
                <InputAdornment position="end">
                  <InputLabel htmlFor="file-input">
                    <CloudUploadIcon />
                  </InputLabel>
                </InputAdornment>
              }
            />
            <br />
          </Box>
          {/* <TextField
            placeholder="Add Comment"
            value={newComment}
            onChange={handleCommentChange}
            fullWidth
            multiline
            rows={4}
            style={{ margin: "5px" }}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {posts.map((post, index) => (
        <Card key={index} style={{ marginTop: "16px", width: "170%" }}>
          <CardContent >
            <Typography variant="h4">{post.title}</Typography>
            <Typography variant="h6">{post.description}</Typography>
            {/* {post.favicon && (
              <CardMedia
                component="img"
                src={URL.createObjectURL(post.favicon)}
                style={{
                  width: "80%",
                  height: "50%",
                  objectFit: "cover",
                  justifyContent: "center",
                  marginLeft: "10%",
                }}
                alt="Favicon"
              />
            )} */}
            <br />
            <Box
              style={{
                width: "80%",
                height: "40%",
                objectFit: "cover",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              {renderMedia(post.title)}
            </Box>

            <br />
            <div style={{ display: "flex", justifyContent: "", marginTop: "8px" }}>
              <div>
                <IconButton color="primary" onClick={() => handleLike(index)}>
                  <ThumbUpIcon />
                </IconButton>
                {post.likes} Likes
              </div>
              <div>
                <IconButton color="primary" onClick={() => handleDislike(index)}>
                  <ThumbDownIcon />
                </IconButton>
                {post.dislikes} Dislikes
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <ArgonBox
                  style={{
                    marginLeft: "20%",
                    width: "600px",
                    display: "flex",
                    alignItems: "right",
                  }}
                >
                  <FormGroup style={{ display: "inline-block" }}>
                    <TextField
                      placeholder="Add Comment"
                      value={newComment}
                      onChange={handleCommentChange}
                      fullWidth
                      multiline
                      maxRows={4}
                      style={{ marginRight: "5px", width: "150%" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleComment(index)}
                      style={{ marginLeft: "65%", marginTop: "7%" }}
                    >
                      Comment
                    </Button>
                  </FormGroup>
                </ArgonBox>
                <br />
                <br />
                {post.comments.length > 0 && (
                  <ul style={{ position: "rekative", marginLeft: "20%" }}>
                    {post.comments.map((comment, commentIndex) => (
                      <li key={commentIndex}>{comment}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {openParticularPost && (
        <Dialog open={openPostFlag} onClose={() => setOpenPostFlag(false)} fullScreen>
          {openParticularPost}
        </Dialog>
      )}
    </>
  );
}

export default BillingInformation;