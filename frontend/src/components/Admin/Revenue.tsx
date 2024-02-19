import React from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useTranslation } from "react-i18next";

const Featured: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className=" shadow-lg p-4">
      <div className="flex justify-between items-center text-gray-500">
        <h1 className="text-md font-semibold">{t("featured.total_revenue")}</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="p-4 flex flex-col items-center justify-center space-y-2">
        <div className="w-20 h-20">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={4} />
        </div>
        <p className="text-gray-500 font-semibold text-sm">{t("featured.total_sales_today")}</p>
        <p className="text-lg">$420</p>
        <p className="text-gray-500 text-xs font-light text-center">
          {t("featured.previous_transactions_processing")}
        </p>
        <div className="w-full flex items-center justify-between">
          <div className="text-center">
            <p className="text-gray-500 text-xs">{t("featured.target")}</p>
            <div className="flex items-center text-xs">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="ml-1 font-semibold">$12.4k</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">{t("featured.last_week")}</p>
            <div className="flex items-center text-xs">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="ml-1 font-semibold">$12.4k</div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">{t("featured.last_month")}</p>
            <div className="flex items-center text-xs">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="ml-1 font-semibold">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
