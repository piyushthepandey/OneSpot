import React, { useState, useEffect } from "react";
import { CardMedia, CssBaseline, Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../../components/Housing/houseStyles.css";
import { ActivityPostData } from "../../models/Activity/activity";
import { fetchActivityDataApi } from "../../services/fetchactivity";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import CreateActivityModal from "../../components/common/CreateActivityModal";
import { ActivityPost } from "../../components/Homepage/types";
import ActivityFilterModal from "../../components/common/filterActivity";
import { filterActivityDataApi } from "../../services/filterActivity";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import housingStyles from "../../components/Housing/HousingCard.module.css";
import Pagination from "@mui/material/Pagination";

const ActivitiesPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityPostData[]>([]);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isSavedModalOpen, setSavedModalOpen] = useState(false);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = activityData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchActivityDataApi();
        if (data) {
          setActivityData(data);
        }
      } catch (error: any) {
        dispatch(
          openToast({
            message: `${t("something_went_wrong")}`,
            open: true,
            severity: "error",
          })
        );
      }
    };
    fetchDataFromApi();
  }, []);

  const handleFilterSubmit = async (filterData: any) => {
    try {
      console.log("filter data", filterData);
      const filteredData = await filterActivityDataApi(filterData);
      console.log("filtered data", filteredData);
      setActivityData(filteredData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  const handleCloseCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  const handleCloseSavedModal = () => {
    setSavedModalOpen(false);
  };

  const handleCreatePostClick = () => {
    setCreatePostModalOpen(true);
  };

  const handleSavedClick = () => {
    setSavedModalOpen(true);
  };

  const viewSelectedCard = (event: React.MouseEvent, data: any) => {
    event.preventDefault();
    navigate(`/activity-post/${data._id}`);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const clearFilters = async () => {
    try {
      const data = await fetchActivityDataApi();
      if (data) {
        setActivityData(data);
      }
    } catch (error: any) {
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "error",
        })
      );
    }
  };

  return (
    <>
      <div>
        <CssBaseline />
        <main>
          <div>
            <Card className="housingintro" variant="plain">
              <Typography level="h1">Activity Posts</Typography>
              <div className="buttonGroup">
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={handleCreatePostClick}>
                    Create activity post
                  </Button>
                  <Button onClick={handleSavedClick}>
                    Filter activity posts
                  </Button>
                  <Button onClick={clearFilters}>Reset Filters</Button>
                </ButtonGroup>
                {isCreatePostModalOpen && (
                  <CreateActivityModal
                    open={isCreatePostModalOpen}
                    onClose={handleCloseCreatePostModal}
                    onSave={(newPost: ActivityPost) => {
                      console.log("New post:", newPost);
                      setCreatePostModalOpen(false);
                    }}
                  />
                )}
                {isSavedModalOpen && (
                  <ActivityFilterModal
                    open={isSavedModalOpen}
                    onClose={handleCloseSavedModal}
                    onSubmit={handleFilterSubmit}
                  />
                )}
              </div>
            </Card>
          </div>

          <Container maxWidth="xl">
            <Grid container spacing={5}>
              {activityData.map((data) => (
                <Grid item key={data._id} xs={16} sm={6} md={3}>
                  <div
                    className={housingStyles.nohover}
                    onClick={(e) => viewSelectedCard(e, data)}
                  >
                    <Card variant="outlined" className="card">
                      <CardOverflow>
                        <AspectRatio ratio={2}>
                          <CardMedia
                            image={
                              data.activityPostImages.length > 0
                                ? data.activityPostImages[0].data
                                : "https://source.unsplash.com/random"
                            }
                            title="Image Title"
                            className="cardMedia"
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent className="cardContent">
                        <Typography level="title-lg">{data.title}</Typography>
                        <Typography level="body-sm">
                          {new Date(data.createdDate).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}{" "}
                        </Typography>
                      </CardContent>
                      <CardOverflow
                        variant="soft"
                        sx={{ bgcolor: "background.level1" }}
                      >
                        <Divider inset="context" />
                        <CardContent orientation="horizontal">
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            Category :
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            {data.category}
                          </Typography>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
          <Pagination
            count={Math.ceil(activityData.length / itemsPerPage)}
            page={currentPage}
            onChange={handleChangePage}
            shape="rounded"
            size="large"
            color="primary"
            sx={{ mt: 2, display: "flex", justifyContent: "center" }}
          />
        </main>
      </div>
    </>
  );
};

export default ActivitiesPage;
