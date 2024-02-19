import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import StatCard from "../../components/Admin/Widgets";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { openToast } from "../../redux/slices/common-toast-slice";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import Charts from "../../components/Admin/Charts";
import Featured from "../../components/Admin/Revenue";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  fetchActivityPosts,
  fetchUsers,
  fetchHousingPosts,
} from "../../services/Admin";

const AdminPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  console.log("Current Language:", i18n.language);

  const [activityPostCount, setActivityPostCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [housingPostCount, setHousingPostCount] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activityPosts = await fetchActivityPosts();
        const users = await fetchUsers();
        const housingPosts = await fetchHousingPosts();

        setActivityPostCount(activityPosts.length);
        setUserCount(users.length);
        setHousingPostCount(housingPosts.length);
      } catch (error) {
        console.error("Error fetching data:", error);
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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-5 overflow-auto">
        <div className="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols- xl:grid-cols-4 gap-3 mb-">
          <StatCard
            Icon={PeopleIcon}
            value={userCount.toString()}
            label={t("admin.total_users")}
            percentage=""
          />
          <StatCard
            Icon={DynamicFeedIcon}
            value={activityPostCount.toString()}
            label={t("admin.activity_posts")}
            percentage=""
          />
          <StatCard
            Icon={DynamicFeedIcon}
            value={housingPostCount.toString()}
            label={t("admin.housing_posts")}
            percentage=""
          />
          <StatCard
            Icon={BarChartIcon}
            value="1"
            label={t("admin.active_users")}
            percentage=""
          />
          <StatCard
            Icon={PeopleIcon}
            value="1"
            label={t("admin.new_sign_ups")}
            percentage=""
          />
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-2 h-[calc(50vh-2rem)]">
            <Featured />
          </div>
          <div className="w-full md:w-1/2 p-2 h-[calc(50vh-2rem)]">
            <Charts
              aspect={3 / 1}
              title={t("admin.post_over_time_line_chart")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
