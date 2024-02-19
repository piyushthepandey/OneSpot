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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { HousingPost } from "../../models/HomePage/types";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { addNewPost } from "../../services/handleSavePost";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newPost: HousingPost) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const loggedInUser = useSelector((state: any) => state.user.loggedInUser);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  console.log(loggedInUser, "loggedInUser create post modal");
  const [newPost, setNewPost] = useState<HousingPost>({
    title: "",
    description: "",
    preferences: {
      gender: "",
      location: "",
      rent: 0,
      moveInDate: "",
      isOnLease: false,
      noOfBeds: 0,
      noOfBaths: 0,
      noOfTenants: 0,
      smoking: false,
      alcohol: false,
      veg: false,
      nonVeg: false,
    },
    benefits: {
      freeLaundryInUnit: false,
      heatingInUnit: false,
      gymInBuilding: false,
      freeWifi: false,
      balcony: false,
      parkingSpace: false,
    },
    author: loggedInUser ? loggedInUser._id : "",
    housingPostImages: [],
    // rsvps: [],
    // savedByUsers: [],
    createdDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
  });

  const handleSavePost = async () => {
    try {
      const response = await addNewPost(newPost);
      console.log("res", response);

      if (response.status === 200) {
        const data = response.data;
        console.log("Post saved successfully:", data);
        onSave(newPost);
        onClose();
        window.location.reload();

      } else {
        dispatch(
          openToast({
            message: `${t("something_went_wrong")}`,
            open: true,
            severity: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "error",
        })
      );
    }
  };

  const handleCheckboxChange = (
    preference:
      | keyof HousingPost["preferences"]
      | keyof HousingPost["benefits"]
      | "smoking"
      | "alcohol"
      | "veg"
      | "nonVeg"
  ) => {
    if (preference in newPost.preferences) {
      setNewPost((prevPost) => ({
        ...prevPost,
        preferences: {
          ...prevPost.preferences,
          [preference]:
            !prevPost.preferences[
            preference as keyof HousingPost["preferences"]
            ],
        },
      }));
    } else if (preference in newPost.benefits) {
      setNewPost((prevPost) => ({
        ...prevPost,
        benefits: {
          ...prevPost.benefits,
          [preference]:
            !prevPost.benefits[preference as keyof HousingPost["benefits"]],
        },
      }));
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
          housingPostImages: [
            ...prevPost.housingPostImages,
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
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        {/* Title */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
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
          value={newPost.description}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              description: e.target.value,
            }))
          }
        />
        {/* Preferences Section */}
        <TextField
          label="Gender"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPost.preferences.gender}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: { ...prevPost.preferences, gender: e.target.value },
            }))
          }
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPost.preferences.location}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: {
                ...prevPost.preferences,
                location: e.target.value,
              },
            }))
          }
        />
        <TextField
          label="Rent"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newPost.preferences.rent}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: { ...prevPost.preferences, rent: +e.target.value },
            }))
          }
        />
        <TextField
          label="Move-In Date"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          value={newPost.preferences.moveInDate}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: {
                ...prevPost.preferences,
                moveInDate: e.target.value,
              },
            }))
          }
        />
        <TextField
          label="Number of Beds"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newPost.preferences.noOfBeds}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: {
                ...prevPost.preferences,
                noOfBeds: +e.target.value,
              },
            }))
          }
        />
        <TextField
          label="Number of Baths"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newPost.preferences.noOfBaths}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: {
                ...prevPost.preferences,
                noOfBaths: +e.target.value,
              },
            }))
          }
        />
        <TextField
          label="Number of Tenants"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={newPost.preferences.noOfTenants}
          onChange={(e) =>
            setNewPost((prevPost) => ({
              ...prevPost,
              preferences: {
                ...prevPost.preferences,
                noOfTenants: +e.target.value,
              },
            }))
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.preferences.isOnLease}
              onChange={() =>
                setNewPost((prevPost) => ({
                  ...prevPost,
                  preferences: {
                    ...prevPost.preferences,
                    isOnLease: !prevPost.preferences.isOnLease,
                  },
                }))
              }
            />
          }
          label="On Lease"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.preferences.smoking}
              onChange={() => handleCheckboxChange("smoking")}
            />
          }
          label="Smoking"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.preferences.alcohol}
              onChange={() => handleCheckboxChange("alcohol")}
            />
          }
          label="Alcohol"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.preferences.veg}
              onChange={() => handleCheckboxChange("veg")}
            />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.preferences.nonVeg}
              onChange={() => handleCheckboxChange("nonVeg")}
            />
          }
          label="Non-Vegetarian"
        />

        {/* Benefits Section */}
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.freeLaundryInUnit}
              onChange={() => handleCheckboxChange("freeLaundryInUnit")}
            />
          }
          label="Free Laundry In Unit"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.heatingInUnit}
              onChange={() => handleCheckboxChange("heatingInUnit")}
            />
          }
          label="Heating In Unit"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.gymInBuilding}
              onChange={() => handleCheckboxChange("gymInBuilding")}
            />
          }
          label="Gym In Building"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.freeWifi}
              onChange={() => handleCheckboxChange("freeWifi")}
            />
          }
          label="Free Wifi"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.balcony}
              onChange={() => handleCheckboxChange("balcony")}
            />
          }
          label="Balcony"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newPost.benefits.parkingSpace}
              onChange={() => handleCheckboxChange("parkingSpace")}
            />
          }
          label="Parking Space"
        />

        {/* Image Upload Section */}
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

        {newPost.housingPostImages.map((image, index) => (
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

export default CreatePostModal;
