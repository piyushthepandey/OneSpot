import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import CreatePostModal from "../../components/Homepage/CreatePostModal";
import { HousingPost, ActivityPost } from "../../components/Homepage/types";
import { fetchHousingPosts } from "../../services/fetchlatesthousing";
import { fetchActivityPosts } from "../../services/fetchlatestactivity";
import CreateActivityModal from "../../components/common/CreateActivityModal";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import AspectRatio from "@mui/joy/AspectRatio";
import { openToast } from "../../redux/slices/common-toast-slice";
import {
  HomePageContainer,
  VideoContainer,
  Video,
  TextOverlay,
  Heading,
  Subtitle,
  SubSectionContainer,
  TextContainer,
  TextTitle,
  SectionDescription,
  CTACardContainer,
  CardContainer,
  CardTextContainer,
  ImageTag,
  CTAButton,
  CarouselContainer,
  CarouselImageAndTextContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE_PATHS } from "../../constants";
import Card from "@mui/joy/Card";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "8px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h2: {
          color: "#333",
        },
        subtitle1: {
          fontStyle: "italic",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

const HomePage: React.FC = () => {
  const [housingPosts, setHousingPosts] = useState<HousingPost[]>([]);
  const [activityPosts, setActivityPosts] = useState<ActivityPost[]>([]);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isActivityModalOpen, setActivityPostModal] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const housingPosts = await fetchHousingPosts();
        console.log("Housing posts:", housingPosts);
        setHousingPosts(housingPosts);

        const activityPosts = await fetchActivityPosts();
        console.log("Activity posts:", activityPosts);
        setActivityPosts(activityPosts);
      } catch (error) {
        dispatch(
          openToast({
            message: `${t("something_went_wrong")}`,
            open: true,
            severity: "warning",
          })
        );
      }
    };

    fetchData();
  }, []);

  const handleCreatePostClick = () => {
    setCreatePostModalOpen(true);
  };

  const handleCloseCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  const handleActivityPostClick = () => {
    setActivityPostModal(true);
  };

  const handleCloseActivityPostModal = () => {
    setActivityPostModal(false);
  };

  const navigateToHousing = () => {
    navigate(APP_ROUTE_PATHS.HOUSING_POSTS);
  };

  const navigateToActivites = () => {
    navigate(APP_ROUTE_PATHS.ACTIVITIES);
  };

  const navigateToSelectedHousing = (data: any) => {
    console.log(data, "event hosunig");
    navigate(`/housing-post/${data._id}`);
  };

  const navigateToSelectedActivity = (data: any) => {
    console.log(data, "event activity");
    navigate(`/activity-post/${data._id}`);
  };

  return (
    <HomePageContainer>
      <VideoContainer>
        <Video src="/onespot3.mp4" autoPlay loop muted />
        <TextOverlay>
          <Heading>{t("home_page_texts.heading")}</Heading>
          <Subtitle>{t("home_page_texts.heading2")}</Subtitle>
        </TextOverlay>
      </VideoContainer>
      <SubSectionContainer>
        <TextContainer>
          <TextTitle>{t("home_page_texts.subTitle")}</TextTitle>
          <SectionDescription>
            {t("home_page_texts.subText1")}
          </SectionDescription>
          <SectionDescription>
            {t("home_page_texts.subText2")}
          </SectionDescription>
        </TextContainer>
      </SubSectionContainer>

      {isCreatePostModalOpen && (
        <CreatePostModal
          open={isCreatePostModalOpen}
          onClose={handleCloseCreatePostModal}
          onSave={(newPost: HousingPost) => {
            console.log("New post:", newPost);
            setCreatePostModalOpen(false);
            dispatch(
              openToast({
                message: `${t("common_constants.post_created")}`,
                open: true,
                severity: "success",
              })
            );
          }}
        />
      )}

      {isActivityModalOpen && (
        <CreateActivityModal
          open={isActivityModalOpen}
          onClose={handleCloseActivityPostModal}
          onSave={(newPost: ActivityPost) => {
            console.log("New post:", newPost);
            setActivityPostModal(false);
            dispatch(
              openToast({
                message: `${t("common_constants.post_created")}`,
                open: true,
                severity: "success",
              })
            );
          }}
        />
      )}

      <CarouselContainer>
        <Card color="primary" variant="outlined">
          <TextTitle>Latest Housing Posts</TextTitle>
          <Carousel autoPlay>
            {housingPosts.map((post, index) => (
              <AspectRatio
                variant="outlined"
                ratio="4/3"
              >
                <CarouselImageAndTextContainer
                  key={index}
                  onClick={(e: any) => navigateToSelectedHousing(post)}
                  className="housingPost-slider"
                >
                  <ImageTag
                    src={post?.housingPostImages?.[0]?.data}
                    alt={`Housing Post ${index}`}
                  />
                  <div>
                    <h2>{post?.title}</h2>
                  </div>
                </CarouselImageAndTextContainer>
              </AspectRatio>
            ))}
          </Carousel>
        </Card>
      </CarouselContainer>

      <CarouselContainer>
        <Card color="primary" variant="outlined">
          <TextTitle>Latest Activity Posts</TextTitle>
          <Carousel autoPlay>
            {activityPosts?.map((post, index) => (
              <AspectRatio
                variant="outlined"
                ratio="4/3"
              >
                <CarouselImageAndTextContainer
                  key={index}
                  onClick={(e: any) => navigateToSelectedActivity(post)}
                  className="activityPost-slider"
                >
                  <ImageTag
                    src={post?.activityPostImages?.[0]?.data}
                    alt={"Activities Image"}
                  />
                  <div>
                    <h2>{post?.title}</h2>
                  </div>
                </CarouselImageAndTextContainer>
              </AspectRatio>
            ))}
          </Carousel>
        </Card>
      </CarouselContainer>

      <CTACardContainer>
        <CardContainer>
          <CardTextContainer>
            <ImageTag src="/images/housing_image.png" alt="housing post" />
            <CTAButton onClick={handleCreatePostClick}>
              {t("create_post_modal.create_housing_post")}
            </CTAButton>
          </CardTextContainer>
        </CardContainer>
        <CardContainer>
          <CardTextContainer>
            <ImageTag
              src="/images/housing_image_2.png"
              alt="view housing post"
            />
            <CTAButton onClick={navigateToHousing}>
              {t("create_post_modal.view_housing_posts")}
            </CTAButton>
          </CardTextContainer>
        </CardContainer>
        <CardContainer>
          <CardTextContainer>
            <ImageTag src="/images/basket_ball.png" alt="activity post" />
            <CTAButton onClick={handleActivityPostClick}>
              {t("create_post_modal.create_activity_post")}
            </CTAButton>
          </CardTextContainer>
        </CardContainer>
        <CardContainer>
          <CardTextContainer>
            <ImageTag
              src="/images/activities_Image.png"
              alt="view activity post"
            />
            <CTAButton onClick={navigateToActivites}>
              {t("create_post_modal.view_activity_posts")}
            </CTAButton>
          </CardTextContainer>
        </CardContainer>
      </CTACardContainer>
    </HomePageContainer>
  );
};

export default HomePage;
