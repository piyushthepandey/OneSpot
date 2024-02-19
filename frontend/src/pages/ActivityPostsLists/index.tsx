import React from "react";
import Sidebar from "../../components/Admin/Sidebar"
import ActivityPostList from "../../components/Admin/ActivityPostsLists";

const ActivityPostsLists: React.FC = () => {
  return (
    <div style={styles.container}>
      <Sidebar/>
      <div style={styles.content}>
        <ActivityPostList />
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
export default ActivityPostsLists;
