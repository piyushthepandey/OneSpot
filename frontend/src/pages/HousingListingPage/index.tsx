import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import { Box, CardContent } from "@mui/material";
import ListDivider from "@mui/joy/ListDivider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import LocalLaundryServiceRoundedIcon from "@mui/icons-material/LocalLaundryServiceRounded";
import HvacRoundedIcon from "@mui/icons-material/HvacRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import BathroomRoundedIcon from "@mui/icons-material/BathroomRounded";
import BedroomParentRoundedIcon from "@mui/icons-material/BedroomParentRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import LiquorIcon from "@mui/icons-material/Liquor";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import Button from "@mui/joy/Button";
import MapContainer from "../../components/common/MapContainer";
import { fetchHousingData } from "../../services/fetchhousingdata";
import { HousingData } from "../../models/HouseListing/housingdata";
import Housing from "../../components/Housing/housing";
import EditModal from "../../components/Housing/housing";
import { deleteActivityPost } from "../../services/DeleteHousing";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ListItem = styled.div`
  background-color: #f0f0f0;
  margin: 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    margin: 18px;
    width: fit-content;
    height: fit-content;
  }
`;

export const PostActionItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 12px;
`;

export const ActionsBaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

interface EditableData {
  _id: string; // Add the _id property
  title: string;
  description: string;
  newField: string;
}
const HousingListingPage: React.FC = () => {
  const [housingData, setHousingData] = useState<HousingData | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isRsvp, setIsRsvp] = useState(false);
  const [opneRsvp, setOpneRsvp] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { loggedInUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchHousingData(id as string);
        setHousingData(data);
      } catch (error) {
        console.error("Error fetching housing data:", error);
        setHousingData(null);
        dispatch(
          openToast({
            message: `${t("something_went_wrong")}`,
            open: true,
            severity: "warning",
          })
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    setOpen(true);
  };

  const handleRsvpClick = () => {
    setIsRsvp(!isRsvp);
    setOpneRsvp(true);
  };

  const handleOpenMapClick = () => {
    // Implement logic to open the map in a larger view (e.g., in a modal)
    console.log("Open Map Clicked");
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<EditableData>({
    _id: "", // Include the _id property with a placeholder or default value
    title: "",
    description: "",
    newField: "",
  });

  // Function to open the modal
  const openEditModal = (data: EditableData) => {
    setDataToEdit(data);
    setIsEditModalOpen(true);
  };

  // Function to close the modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // Function to save edited data
  const handleSaveEditedData = (editedData: {
    title: string;
    description: string;
    newField: string;
  }) => {
    // Implement logic to save the edited data
    console.log("Edited Data:", editedData);
  };

  const openEditModalWithTitle = () => {
    openEditModal({
      _id: housingData?._id || "", // Include the _id property from housingData
      title: housingData?.title || "", // Use the title from housingData as the initial value
      description: housingData?.description || "",
      newField: "",
    });
  };

  const handleDeletePost = async () => {
    try {
      if (housingData?._id) {
        await deleteActivityPost(housingData._id);

        dispatch(
          openToast({
            message: "Housing post deleted successfully",
            open: true,
            severity: "success",
          })
        );
        window.location.href = "http://localhost:3001/housing-posts";
      }
    } catch (error) {
      console.error("Error deleting housing post:", error);
      dispatch(
        openToast({
          message: "Error deleting posts",
          open: true,
          severity: "error",
        })
      );
    }
  };

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: 1, maxHeight: "100%" }}
        open={true}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <div>
        {housingData && (
          <>
            <Card variant="outlined">
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={housingData?.housingPostImages?.[0]?.data}
                    alt="Housing Post Image"
                    loading="lazy"
                  />
                </AspectRatio>
              </CardOverflow>
              <ActionsBaseContainer>
                <PostActionItems>
                  <Box sx={{ display: "inline-block", mr: 2 }}>
                    <IconButton
                      variant="soft"
                      onClick={handleFavoriteClick}
                      sx={{ color: isFavorite ? "red" : "inherit" }}
                    >
                      <FavoriteIcon />
                      {isFavorite ? "Saved" : "Save"}
                    </IconButton>
                    <Snackbar
                      variant="soft"
                      color="success"
                      open={open}
                      onClose={() => setOpen(false)}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
                      endDecorator={
                        <IconButton
                          onClick={() => setOpen(false)}
                          size="sm"
                          variant="soft"
                          color="success"
                        >
                          Dismiss
                        </IconButton>
                      }
                    >
                      Post saved successfully.
                    </Snackbar>
                  </Box>
                  <Box sx={{ display: "inline-block", mr: 2 }}>
                    <Button
                      variant="soft"
                      onClick={handleRsvpClick}
                      sx={{ color: isRsvp ? "green" : "inherit" }}
                    >
                      {isRsvp ? "RSVP'd" : "RSVP"}
                    </Button>
                    <Snackbar
                      variant="soft"
                      color="success"
                      open={opneRsvp}
                      onClose={() => setOpneRsvp(false)}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
                      endDecorator={
                        <Button
                          onClick={() => setOpneRsvp(false)}
                          size="sm"
                          variant="soft"
                          color="success"
                        >
                          Dismiss
                        </Button>
                      }
                    >
                      Post RSVP'd successfully.
                    </Snackbar>
                  </Box>
                </PostActionItems>
                {(housingData as any)?.author == loggedInUser?._id && (
                  <PostActionItems>
                    <Button
                      variant="soft"
                      onClick={openEditModalWithTitle}
                      sx={{ mr: 2 }}
                    >
                      Edit Data
                    </Button>
                    <IconButton
                      variant="soft"
                      onClick={handleDeletePost}
                      sx={{ color: "red", mr: 2 }}
                    >
                      <DeleteIcon />
                      Delete
                    </IconButton>
                    <EditModal
                      isOpen={isEditModalOpen}
                      onClose={closeEditModal}
                      onSave={handleSaveEditedData}
                      initialData={dataToEdit}
                    />
                  </PostActionItems>
                )}
              </ActionsBaseContainer>

              <CardContent sx={{ padding: "12px" }}>
                <Typography level="title-md">{housingData?.title}</Typography>
                <Typography level="body-sm">
                  {housingData?.description}
                </Typography>
              </CardContent>
            </Card>
            <ListContainer>
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <MonetizationOnRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.rent}
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <SupervisedUserCircleRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.gender}
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <LocationOnRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.location}
              </ListItem>
              <ListDivider inset="gutter" />
              {housingData?.preferences?.moveInDate && (
                <ListItem>
                  <ListItemDecorator sx={{ mr: 1 }}>
                    <WatchLaterRoundedIcon sx={{ fontSize: "24px" }} />
                  </ListItemDecorator>
                  {new Date(
                    housingData?.preferences?.moveInDate
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </ListItem>
              )}
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <NewReleasesRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.isOnLease ? "On Lease" : "Off Lease"}
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <BedroomParentRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.noOfBeds} Beds
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <BathroomRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.noOfBaths} Baths
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <PeopleRoundedIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.noOfTenants} Tenants
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <LocalDiningIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.veg ? "Veg" : "Non-Veg"}
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <SmokingRoomsIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.smoking ? "Yes" : "No"}
              </ListItem>
              <ListDivider inset="gutter" />
              <ListItem>
                <ListItemDecorator sx={{ mr: 1 }}>
                  <LiquorIcon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {housingData?.preferences?.alcohol ? "Yes" : "No"}
              </ListItem>
              <ListDivider inset="gutter" />
            </ListContainer>
            <Paper elevation={8} square={false} sx={{ p: 2 }}>
              <Typography level="title-md">Benefits</Typography>
              {housingData?.benefits?.freeLaundryInUnit && (
                <Chip
                  icon={<LocalLaundryServiceRoundedIcon />}
                  label="Free Laundry In Unit"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              )}
              {housingData?.benefits?.heatingInUnit && (
                <Chip
                  icon={<HvacRoundedIcon />}
                  label="Heating In Unit"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              )}
              {housingData?.benefits?.gymInBuilding && (
                <Chip
                  icon={<FitnessCenterRoundedIcon />}
                  label="Gym In Building"
                  variant="outlined"
                  sx={{ m: 1 }}
                />
              )}
            </Paper>
            {housingData?.preferences?.location && (
              <MapContainer location={housingData?.preferences?.location} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HousingListingPage;
