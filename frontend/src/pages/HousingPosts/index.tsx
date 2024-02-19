import React, { useState, useEffect } from "react";
import { CardMedia, CssBaseline, Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import ButtonGroup from "@mui/material/ButtonGroup";
import housingStyles from "../../components/Housing/HousingCard.module.css";
import { HousingData } from "../../models/HouseListing/housingdata";
import { fetchHousingDataApi } from "../../services/fetchhousing";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded";
import BathroomRoundedIcon from "@mui/icons-material/BathroomRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import CreatePostModal from "../../components/Homepage/CreatePostModal";
import { HousingPost } from "../../components/Homepage/types";
import TransitionsModal from "../../components/common/filterModal";
import { filterHousingDataApi } from "../../services/filterHousing";
import { useTranslation } from "react-i18next";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

const HousingCard: React.FC = () => {
  const [housingData, setHousingData] = useState<HousingData[]>([]);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isSavedModalOpen, setSavedModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const data = await fetchHousingDataApi();
        if (data) {
          setHousingData(data);
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
    fetchDataFromApi();
  }, []);

  const handleFilterSubmit = async (filterData: any) => {
    try {
      const filteredData = await filterHousingDataApi(filterData);
      setHousingData(filteredData);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "error",
        })
      );
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

  const clearFilters = async () => {
    try {
      const data = await fetchHousingDataApi();
      if (data) {
        setHousingData(data);
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

  const viewSelectedCard = (event: React.MouseEvent, data: any) => {
    event.preventDefault();
    navigate(`/housing-post/${data._id}`);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = housingData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <CssBaseline />
        <main>
          <div>
            <Card className={housingStyles.housingintro} variant="plain">
              <Typography level="h1">Housing Posts</Typography>
              <div className={housingStyles.buttonGroup}>
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button onClick={handleCreatePostClick}>Create a post</Button>
                  <Button onClick={handleSavedClick}>Filter posts</Button>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </ButtonGroup>
                {isCreatePostModalOpen && (
                  <CreatePostModal
                    open={isCreatePostModalOpen}
                    onClose={handleCloseCreatePostModal}
                    onSave={(newPost: HousingPost) => {
                      console.log("New post:", newPost);
                      setCreatePostModalOpen(false);
                    }}
                  />
                )}
                {isSavedModalOpen && (
                  <TransitionsModal
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
              {paginatedData.map((data) => (
                <Grid item key={data._id} xs={16} sm={6} md={3}>
                  <div
                    className={housingStyles.nohover}
                    onClick={(e) => viewSelectedCard(e, data)}
                  >
                    <Card variant="outlined" className={housingStyles.card}>
                      <CardOverflow>
                        <AspectRatio ratio={2}>
                          <CardMedia
                            image={
                              data.housingPostImages.length > 0
                                ? data.housingPostImages[0].data
                                : "https://source.unsplash.com/random"
                            }
                            title="Image Title"
                            className={housingStyles.cardMedia}
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent className={housingStyles.cardContent}>
                        <Typography level="title-lg">{data.title}</Typography>
                        <Typography level="body-sm">
                          {data.preferences.location}{" "}
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
                            <MonetizationOnRoundedIcon
                              sx={{ fontSize: "20px" }}
                            />
                            :{data.preferences.rent}
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            <KingBedRoundedIcon sx={{ fontSize: "20px" }} />:
                            {data.preferences.noOfBeds}
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            <BathroomRoundedIcon sx={{ fontSize: "20px" }} />:
                            {data.preferences.noOfBaths}
                          </Typography>
                          <Divider orientation="vertical" />
                          <Typography
                            level="body-xs"
                            fontWeight="md"
                            textColor="text.secondary"
                          >
                            <SupervisedUserCircleRoundedIcon
                              sx={{ fontSize: "20px" }}
                            />
                            :{data.preferences.gender}
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
            count={Math.ceil(housingData.length / itemsPerPage)}
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

export default HousingCard;
