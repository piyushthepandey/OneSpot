import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/joy/Divider";
import Chip from "@mui/material/Chip";

const categories = [
  "Entertainment",
  "Sports",
  "Music",
  "Cooking",
  "Networking",
  "Academics",
];

interface ActivityFilterModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filterData: any) => Promise<void>;
}

const ActivityFilterModal: React.FC<ActivityFilterModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleChipClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleOpen = () => onClose();
  const handleClose = () => onClose();

  const handleSubmit = async () => {
    await onSubmit({ category: selectedCategory });
    handleClose();
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Filter by category:
            </Typography>
            <Divider inset="context" />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              {categories.map((category) => (
                <Chip
                variant="outlined"
                  key={category}
                  label={category}
                  clickable
                  color={selectedCategory === category ? "primary" : "default"}
                  onClick={() => handleChipClick(category)}
                  sx={{ width: "100%", margin: 0.5 }}
                />
              ))}
              <Divider inset="context" />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ActivityFilterModal;
