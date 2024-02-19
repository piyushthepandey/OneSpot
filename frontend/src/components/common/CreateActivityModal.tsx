import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  NativeSelect,
  FormControl,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ActivityPost } from "../../models/HomePage/types";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { addNewActivityPost } from "../../services/handleSaveActivity";
import Divider from "@mui/joy/Divider";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newPost: ActivityPost) => void;
}

const CreateActivityModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
  const [newPost, setNewPost] = useState<ActivityPost>({
    title: "",
    description: "",
    userName: "mohit77",
    userId: "656a145ae51ce2cde9d3ccc3",
    author: "615eb2a8b5c4ab001f85d8a0", //setting static value for now
    // author: loggedInUser ? loggedInUser.id : "",
    activityPostImages: [],
    category: "",
    // rsvps: [],
    // savedByUsers: [],
    createdDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
  });

  const handleSavePost = async () => {
    try {
      const response = await addNewActivityPost(newPost);
      console.log("res", response);

      if (response.status === 201) {
        const data = response.data;
        console.log("Activity Post saved successfully:", data);
        onSave(newPost);
        onClose();
        window.location.reload();

      } else {
        console.error("Failed to save post:", response.data);
      }
    } catch (error) {
      console.error("Error saving post:", error);
      throw error;
    }
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const storage = getStorage();
      const fileRef = ref(storage, "images/" + file.name);

      try {
        await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(fileRef);
        setNewPost((prevPost) => ({
          ...prevPost,
          activityPostImages: [
            ...prevPost.activityPostImages,
            {
              data: fileUrl,
              fileName: file.name,
              fileType: file.type,
            },
          ],
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Activity Post</DialogTitle>
      <DialogContent>
        {/* Title */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ marginBottom: "16px" }}
          value={newPost.title}
          onChange={(e) =>
            setNewPost((prevPost) => ({ ...prevPost, title: e.target.value }))
          }
        />
        {/* Description */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          style={{ marginBottom: "16px" }}
          value={newPost.description}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              description: e.target.value,
            }))
          }
        />
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <InputLabel variant="standard" htmlFor="category-native">
          </InputLabel>
          <NativeSelect
            value={newPost.category}
            onChange={(e) =>
              setNewPost((prevPost) => ({
                ...prevPost,
                category: e.target.value as string,
              }))
            }
            inputProps={{
              name: "category",
              id: "category-native",
            }}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value={"Networking"}>Networking</option>
            <option value={"Entertainment"}>Entertainment</option>
            <option value={"Sports"}>Sports</option>
            <option value={"Music"}>Music</option>
            <option value={"Academics"}>Academics</option>
            <option value={"Cooking"}>Cooking</option>
          </NativeSelect>
        </FormControl>

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            color="primary"
            startIcon={<AddPhotoAlternateIcon />}
          >
            Upload Image
          </Button>
        </label>

        {newPost.activityPostImages.map((image, index) => (
          <div key={index}>
            <img
              src={image.data}
              alt={`Uploaded ${index}`}
              style={{ maxWidth: "100%", marginTop: 10 }}
            />
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSavePost} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateActivityModal;
