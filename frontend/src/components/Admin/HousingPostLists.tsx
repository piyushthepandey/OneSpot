import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Title from "./Title";
import { useDispatch } from "react-redux";
import { openToast } from "../../redux/slices/common-toast-slice";
import {
  HousingPost,
  fetchHousingPosts,
  updateHousingPost,
  deleteHousingPost,
} from "../../services/HousingPostsLists";
import { useTranslation } from "react-i18next";

export default function HousingPostList() {
  const { t } = useTranslation();
  const [housingPosts, setHousingPosts] = useState<HousingPost[]>([]);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedAuthor, setEditedAuthor] = useState<string>("");
  const [editedLocation, setEditedLocation] = useState<string>("");
  const [editedRent, setEditedRent] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchHousingPosts();
        setHousingPosts(posts);
      } catch (error) {
        console.error("Error fetching housing posts:", error);
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

  const handleEditClick = (post: HousingPost) => {
    setEditPostId(post._id);
    setEditedTitle(post.title);
    setEditedAuthor(post.author);
    setEditedLocation(post.preferences.location);
    setEditedRent(post.preferences.rent);
  };

  const handleCancel = () => {
    setEditPostId(null);
  };

  const handleSave = async () => {
    if (editPostId) {
      const updatedPost = {
        title: editedTitle,
        author: editedAuthor,
        preferences: {
          location: editedLocation,
          rent: editedRent,
        },
      };

      try {
        await updateHousingPost(editPostId, updatedPost);
        setHousingPosts((prev) =>
          prev.map((post) =>
            post._id === editPostId ? { ...post, ...updatedPost } : post
          )
        );
        setEditPostId(null);
      } catch (error) {
        console.error("Error updating housing post:", error);
        dispatch(
          openToast({
            message: `${t("something_went_wrong")}`,
            open: true,
            severity: "warning",
          })
        );
      }
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deleteHousingPost(postId);
      setHousingPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting housing post:", error);
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
      <Title>{t("housing_posts_list.recent_housing_posts")}</Title>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 text-left">{t("housing_posts_list.title")}</th>
              <th className="p-3 text-left">
                {t("housing_posts_list.author")}
              </th>
              <th className="p-3 text-left">
                {t("housing_posts_list.location")}
              </th>
              <th className="p-3 text-left">{t("housing_posts_list.rent")}</th>
              <th className="p-3 text-right">
                {t("housing_posts_list.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {housingPosts.map((post) => (
              <tr key={post._id}>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedAuthor}
                      onChange={(e) => setEditedAuthor(e.target.value)}
                    />
                  ) : (
                    post.author
                  )}
                </td>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedLocation}
                      onChange={(e) => setEditedLocation(e.target.value)}
                    />
                  ) : (
                    post.preferences.location
                  )}
                </td>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      type="number"
                      value={editedRent}
                      onChange={(e) => setEditedRent(Number(e.target.value))}
                    />
                  ) : (
                    post.preferences.rent
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  {editPostId === post._id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                        className="text-sm"
                      >
                        {t("housing_posts_list.save")}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCancel}
                        className="text-sm"
                      >
                        {t("housing_posts_list.cancel")}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => handleEditClick(post)}
                        className="text-sm"
                      >
                        {t("housing_posts_list.edit")}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(post._id)}
                        className="text-sm"
                      >
                        {t("housing_posts_list.delete")}
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link
        color="primary"
        href="#"
        onClick={(event) => event.preventDefault()}
        sx={{ mt: 3 }}
      >
        {t("housing_posts_list.see_more_housing_posts")}
      </Link>
    </React.Fragment>
  );
}
