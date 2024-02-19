import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { updateActivityPost } from "../../services/updateActivity";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import { ActivityPost } from "../../services/ActivityPostList"


type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (editedData: { title: string; description: string; newField: string }) => void;
  initialData: { _id: string; title: string; description: string; newField: string };
};

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [editedData, setEditedData] = useState(initialData);
  const dispatch = useDispatch();


  useEffect(() => {
    setEditedData(initialData);
  }, [initialData]);

  const handleSave = async () => {
    try {
      const updatedData: Partial<ActivityPost> = {
        title: editedData.title,
        description: editedData.description,
      };

      await updateActivityPost(initialData._id, updatedData);

      onSave(editedData);
      console.log(editedData, "edited")
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating activity post:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle className="text-xl font-semibold mb-4">Edit Data</DialogTitle>
      <DialogContent>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Edit Title</label>
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Edit Description</label>
          <textarea
            rows={4}
            value={editedData.description}
            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-blue-500"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default EditModal;
