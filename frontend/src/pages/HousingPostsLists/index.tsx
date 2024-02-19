import React from "react";
import HousingPostLists from "../../components/Admin/HousingPostLists"
import Sidebar from "../../components/Admin/Sidebar"

const RecentHousingPosts: React.FC = () => {
  return (
    <div style={styles.container}>
      <Sidebar/>
      <div style={styles.content}>
        <HousingPostLists />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',

  },
  content: {
    flex: '1',
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
};
export default RecentHousingPosts;
