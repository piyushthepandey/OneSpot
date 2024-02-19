import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import { Box, CardContent } from "@mui/material";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import WatchLaterRoundedIcon from "@mui/icons-material/WatchLaterRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/joy/Snackbar";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import Button from "@mui/joy/Button";
import MapContainer from "../../components/common/MapContainer";
import { fetchActivityData } from "../../services/fetchactivitydata";
import { HousingData } from "../../models/HouseListing/housingdata";
import { ActivityPostData } from "../../models/Activity/activity";
import EditModal from "../../components/Activity/activity";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteActivityPost } from "../../services/DeleteActivity";
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
  _id: string;
  title: string;
  description: string;
  newField: "";
}

const ActivityListingPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityPostData | null>(
    null
  );
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
        const data = await fetchActivityData(id as string);
        setActivityData(data);
      } catch (error) {
        console.error("Error fetching housing data:", error);
        setActivityData(null);
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
      _id: activityData?._id || "", // Include the _id property from housingData
      title: activityData?.title || "", // Use the title from housingData as the initial value
      description: activityData?.description || "",
      newField: "",
    });
  };

  const handleDeletePost = async () => {
    try {
      if (activityData?._id) {
        await deleteActivityPost(activityData._id);
        dispatch(
          openToast({
            message: "Housing post deleted successfully",
            open: true,
            severity: "success",
          })
        );
        window.location.href = "http://localhost:3001/activities";
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
        {activityData && (
          <>
            <Card variant="outlined">
              <CardOverflow>
                <AspectRatio ratio="2">
                  <img
                    src={activityData?.activityPostImages?.[0]?.data}
                    alt="Activity Post Image"
                    loading="lazy"
                  />
                </AspectRatio>
              </CardOverflow>
              <ActionsBaseContainer>
                <PostActionItems>
                  <Box sx={{ display: "inline-block", mr: 1 }}>
                    <IconButton
                      variant="soft"
                      onClick={handleFavoriteClick}
                      sx={{ color: isFavorite ? "red" : "inherit", mr: 1 }}
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
                  <Box sx={{ display: "block", mr: 2 }}>
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
                {(activityData as any)?.author == loggedInUser?._id && (
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

              <CardContent>
                <Typography level="title-md">{activityData?.title}</Typography>
                <Typography level="body-sm">
                  {activityData?.description}
                </Typography>
              </CardContent>
            </Card>
            <ListContainer>
              <ListItem>
                <ListItemDecorator sx={{ mr: 2 }}>
                  <Diversity3Icon sx={{ fontSize: "24px" }} />
                </ListItemDecorator>
                {activityData?.category}
              </ListItem>
              <ListDivider inset="gutter" />
              {activityData?.createdDate && (
                <ListItem>
                  <ListItemDecorator sx={{ mr: 2 }}>
                    <WatchLaterRoundedIcon sx={{ fontSize: "24px" }} />
                  </ListItemDecorator>
                  {new Date(activityData?.createdDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </ListItem>
              )}
            </ListContainer>
          </>
        )}
      </div>
    </>
  );
};

export default ActivityListingPage;
