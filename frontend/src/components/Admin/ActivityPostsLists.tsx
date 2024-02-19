import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { openToast } from "../../redux/slices/common-toast-slice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Title from "./Title";
import {
  ActivityPost,
  fetchActivityPosts,
  updateActivityPost,
  deleteActivityPost,
} from "../../services/ActivityPostList";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

export default function ActivityPostList() {
  const { t } = useTranslation(); // Initialize the t function to translate text
  const [activityPosts, setActivityPosts] = useState<ActivityPost[]>([]);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedAuthor, setEditedAuthor] = useState<string>("");
  const [editedPreferences, setEditedPreferences] = useState<string[]>([]);

  const [titleError, setTitleError] = useState<string>("");
  const [authorError, setAuthorError] = useState<string>("");
  const [preferencesError, setPreferencesError] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await fetchActivityPosts();
        setActivityPosts(posts);
      } catch (error) {
        console.error("Error fetching activity posts:", error);
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

  const handleEditClick = (post: ActivityPost) => {
    setEditPostId(post._id);
    setEditedTitle(post.title);
    setEditedAuthor(post.author);
    setEditedPreferences(post.preferences);

    setTitleError("");
    setAuthorError("");
    setPreferencesError("");
  };

  const handleCancel = () => {
    setEditPostId(null);
  };

  const handleSave = async () => {
    let hasErrors = false;
    if (!editedTitle) {
      setTitleError(t("activity_posts.validation_errors.title_required")); // Translate error message
      hasErrors = true;
    }
    if (!editedAuthor) {
      setAuthorError(t("activity_posts.validation_errors.author_required")); // Translate error message
      hasErrors = true;
    }
    if (editedPreferences.length === 0) {
      setPreferencesError(
        t("activity_posts.validation_errors.preferences_required")
      ); // Translate error message
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    if (editPostId) {
      const updatedPost = {
        title: editedTitle,
        author: editedAuthor,
        preferences: editedPreferences,
      };

      try {
        await updateActivityPost(editPostId, updatedPost);
        setActivityPosts((prev) =>
          prev.map((post) =>
            post._id === editPostId ? { ...post, ...updatedPost } : post
          )
        );
        setEditPostId(null);
      } catch (error) {
        console.error("Error updating activity post:", error);
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
      await deleteActivityPost(postId);
      setActivityPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting activity post:", error);
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <React.Fragment>
      <Title>{t("activity_posts.page_title")}</Title>{" "}
      {/* Translate page title */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 text-left">
                {t("activity_posts.table_columns.title")}
              </th>{" "}
              {/* Translate table column */}
              <th className="p-3 text-left">
                {t("activity_posts.table_columns.author")}
              </th>{" "}
              {/* Translate table column */}
              <th className="p-3 text-left">
                {t("activity_posts.table_columns.created_date")}
              </th>{" "}
              {/* Translate table column */}
              <th className="p-3 text-left">
                {t("activity_posts.table_columns.preferences")}
              </th>{" "}
              {/* Translate table column */}
              <th className="p-3 text-right">
                {t("activity_posts.table_columns.actions")}
              </th>{" "}
              {/* Translate table column */}
            </tr>
          </thead>
          <tbody>
            {activityPosts.map((post) => (
              <tr key={post._id}>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedTitle}
                      onChange={(e) => {
                        setEditedTitle(e.target.value);
                        setTitleError("");
                      }}
                      error={!!titleError}
                      helperText={titleError}
                    />
                  ) : (
                    post.title
                  )}
                </td>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedAuthor}
                      onChange={(e) => {
                        setEditedAuthor(e.target.value);
                        setAuthorError("");
                      }}
                      error={!!authorError}
                      helperText={authorError}
                    />
                  ) : (
                    post.author
                  )}
                </td>
                <td className="p-3">
                  {formatDate(post.createdDate.toString())}
                </td>
                <td className="p-3">
                  {editPostId === post._id ? (
                    <TextField
                      value={editedPreferences.join(", ")}
                      onChange={(e) => {
                        setEditedPreferences(e.target.value.split(", "));
                        setPreferencesError("");
                      }}
                      error={!!preferencesError}
                      helperText={preferencesError}
                    />
                  ) : (
                    post.preferences.join(", ")
                  )}
                </td>
                <td className="p-3 text-right space-x-2">
                  {editPostId === post._id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSave()}
                        className="text-sm"
                      >
                        {t("activity_posts.buttons.save")}{" "}
                        {/* Translate button label */}
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleCancel}
                        className="text-sm"
                      >
                        {t("activity_posts.buttons.cancel")}{" "}
                        {/* Translate button label */}
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
                        {t("activity_posts.buttons.edit")}{" "}
                        {/* Translate button label */}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(post._id)}
                        className="text-sm"
                      >
                        {t("activity_posts.buttons.delete")}{" "}
                        {/* Translate button label */}
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
        {t("activity_posts.see_more")} {/* Translate link text */}
      </Link>
    </React.Fragment>
  );
}
