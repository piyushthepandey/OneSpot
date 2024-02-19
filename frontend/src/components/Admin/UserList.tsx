import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Title from "./Title";
import { User, fetchUsers, deleteUser } from "../../services/UsersList";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/slices/common-toast-slice";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useTranslation(); // Use the useTranslation hook to access translations
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
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

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Title>{t("userlist.title")}</Title> {/* Translate the title */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("userlist.username")}</TableCell>{" "}
            {/* Translate the table headers */}
            <TableCell>{t("userlist.email")}</TableCell>
            <TableCell>{t("userlist.phoneNumber")}</TableCell>
            <TableCell>{t("userlist.role")}</TableCell>
            <TableCell align="right">{t("userlist.actions")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.userRole}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                >
                  {t("userlist.delete")}{" "}
                  {/* Translate the delete button text */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={(event) => event.preventDefault()}
        sx={{ mt: 3 }}
      >
        {t("userlist.seeMore")} {/* Translate the "See more users" link */}
      </Link>
    </React.Fragment>
  );
}
