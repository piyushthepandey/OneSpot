import React from "react";
import UserList from "../../components/Admin/UserList"
import Sidebar from "../../components/Admin/Sidebar"

const UsersList: React.FC = () => {
  return (
    <div style={styles.container}>
      <Sidebar/>
      <div style={styles.content}>
        <UserList />
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
export default UsersList;
