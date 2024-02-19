import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Divider from "@mui/joy/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import { openToast } from "../../redux/slices/common-toast-slice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Switch, { switchClasses } from "@mui/joy/Switch";
import { Theme } from "@mui/joy/styles";

const buttons = [
  { key: "one", label: "1" },
  { key: "two", label: "2" },
  { key: "three", label: "3" },
  { key: "four", label: "4" },
  { key: "Five", label: "5" },
  { key: "Six", label: "6" },
];

const buttonsBath = [
  { key: "one", label: "1" },
  { key: "two", label: "2" },
  { key: "three", label: "3" },
];

const buttonsGender = [
  { key: "Male", label: "Male" },
  { key: "Female", label: "Female" },
];

const buttonsTenants = [
  { key: "one", label: "1" },
  { key: "two", label: "2" },
  { key: "three", label: "3" },
  { key: "four", label: "4" },
  { key: "Five", label: "5" },
  { key: "Six", label: "6" },
];

interface TransitionsModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filterData: any) => Promise<void>;
}

const TransitionsModal: React.FC<TransitionsModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [selectedValues, setSelectedValues] = useState<any>({
    rent: null,
    noOfBeds: null,
    noOfBaths: null,
    gender: null,
    noOfTenants: null,
    veg: null,
    nonVeg: null,
    smoking: null,
    alcohol: null,
  });
  const [currency, setCurrency] = React.useState("dollar");

  const handleButtonClick = (type: string, value: any) => {
    setSelectedValues((prevValues: any) => ({ ...prevValues, [type]: value }));
  };

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleOpen = () => onClose();
  const handleClose = () => onClose();

  const handleSubmit = async () => {
    try {
      await onSubmit(selectedValues);
    } catch (error: any) {
      dispatch(
        openToast({
          message: `${t("something_went_wrong")}`,
          open: true,
          severity: "warning",
        })
      );
    } finally {
      handleClose();
    }
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
      <Button onClick={handleOpen}></Button>
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
              Filter by preferences:
            </Typography>
            <Divider inset="context" />
            <Box sx={{ width: 300, marginTop: 2 }}>
              <Typography variant="body1">Rent:</Typography>
              <Input
                placeholder="Amount"
                value={selectedValues.rent || ""}
                onChange={(e) => handleButtonClick("rent", e.target.value)}
                startDecorator={{ dollar: "$", baht: "฿", yen: "¥" }[currency]}
                endDecorator={
                  <React.Fragment>
                    <Divider orientation="vertical" />
                    <Select
                      variant="plain"
                      value={currency}
                      onChange={(_, value) => setCurrency(value!)}
                      slotProps={{
                        listbox: {
                          variant: "outlined",
                        },
                      }}
                      sx={{ mr: -1.5, "&:hover": { bgcolor: "transparent" } }}
                    ></Select>
                  </React.Fragment>
                }
                sx={{ width: 300 }}
              />
            </Box>
            <Typography variant="body1">Number of Bedrooms:</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                {buttons.map((button) => (
                  <Button
                    key={button.key}
                    onClick={() => handleButtonClick("noOfBeds", button.label)}
                    sx={{
                      backgroundColor:
                        selectedValues.noOfBeds === button.label
                          ? "#4caf50"
                          : "inherit",
                      color:
                        selectedValues.noOfBeds === button.label
                          ? "white"
                          : "inherit",
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Typography variant="body1">Number of Bathrooms:</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                {buttonsBath.map((button) => (
                  <Button
                    key={button.key}
                    onClick={() => handleButtonClick("noOfBaths", button.label)}
                    sx={{
                      backgroundColor:
                        selectedValues.noOfBaths === button.label
                          ? "#4caf50"
                          : "inherit",
                      color:
                        selectedValues.noOfBaths === button.label
                          ? "white"
                          : "inherit",
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Typography variant="body1">Gender:</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                {buttonsGender.map((button) => (
                  <Button
                    key={button.key}
                    onClick={() => handleButtonClick("gender", button.label)}
                    sx={{
                      backgroundColor:
                        selectedValues.gender === button.label
                          ? "#4caf50"
                          : "inherit",
                      color:
                        selectedValues.gender === button.label
                          ? "white"
                          : "inherit",
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
            <Typography variant="body1">Number of Flatmates:</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                color="secondary"
                aria-label="medium secondary button group"
              >
                {buttonsTenants.map((button) => (
                  <Button
                    key={button.key}
                    onClick={() =>
                      handleButtonClick("noOfTenants", button.label)
                    }
                    sx={{
                      backgroundColor:
                        selectedValues.noOfTenants === button.label
                          ? "#4caf50"
                          : "inherit",
                      color:
                        selectedValues.noOfTenants === button.label
                          ? "white"
                          : "inherit",
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </ButtonGroup>
              <Divider inset="context" />
              <Typography variant="body1">Veg:</Typography>
              {/* Replace ToggleButtonGroup with Switch */}
              <Switch
                checked={selectedValues.veg === true}
                onChange={(event) =>
                  handleButtonClick("veg", event.target.checked)
                }
                sx={(theme: Theme) => ({
                  display: "inherit",
                  "--Switch-thumbShadow": theme.vars.shadow.sm,
                  "--Switch-thumbSize": "18px",
                  "--Switch-trackWidth": "42px",
                  "--Switch-trackHeight": "22px",
                  "--Switch-trackBackground": "#E9E9EA",
                  "&:hover": {
                    "--Switch-trackBackground": "#E9E9EA",
                  },
                  [theme.getColorSchemeSelector("dark")]: {
                    "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
                  },
                  [`&.${switchClasses.checked}`]: {
                    "--Switch-trackBackground": "#65C466",
                    "&:hover": {
                      "--Switch-trackBackground": "#65C466",
                    },
                  },
                })}
              />

              {/* ... */}

              <Typography variant="body1">Non-Veg:</Typography>
              <Switch
                checked={selectedValues.nonVeg === true}
                onChange={(event) =>
                  handleButtonClick("nonVeg", event.target.checked)
                }
                sx={(theme: Theme) => ({
                  display: "inherit",
                  "--Switch-thumbShadow": theme.vars.shadow.sm,
                  "--Switch-thumbSize": "18px",
                  "--Switch-trackWidth": "42px",
                  "--Switch-trackHeight": "22px",
                  "--Switch-trackBackground": "#E9E9EA",
                  "&:hover": {
                    "--Switch-trackBackground": "#E9E9EA",
                  },
                  [theme.getColorSchemeSelector("dark")]: {
                    "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
                  },
                  [`&.${switchClasses.checked}`]: {
                    "--Switch-trackBackground": "#65C466",
                    "&:hover": {
                      "--Switch-trackBackground": "#65C466",
                    },
                  },
                })}
              />

              <Typography variant="body1">Smoking:</Typography>
              <Switch
                checked={selectedValues.smoking === true}
                onChange={(event) =>
                  handleButtonClick("smoking", event.target.checked)
                }
                sx={(theme: Theme) => ({
                  display: "inherit",
                  "--Switch-thumbShadow": theme.vars.shadow.sm,
                  "--Switch-thumbSize": "18px",
                  "--Switch-trackWidth": "42px",
                  "--Switch-trackHeight": "22px",
                  "--Switch-trackBackground": "#E9E9EA",
                  "&:hover": {
                    "--Switch-trackBackground": "#E9E9EA",
                  },
                  [theme.getColorSchemeSelector("dark")]: {
                    "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
                  },
                  [`&.${switchClasses.checked}`]: {
                    "--Switch-trackBackground": "#65C466",
                    "&:hover": {
                      "--Switch-trackBackground": "#65C466",
                    },
                  },
                })}
              />

              <Typography variant="body1">Alcohol:</Typography>
              <Switch
                checked={selectedValues.alcohol === true}
                onChange={(event) =>
                  handleButtonClick("alcohol", event.target.checked)
                }
                sx={(theme: Theme) => ({
                  display: "inherit",
                  "--Switch-thumbShadow": theme.vars.shadow.sm,
                  "--Switch-thumbSize": "18px",
                  "--Switch-trackWidth": "42px",
                  "--Switch-trackHeight": "22px",
                  "--Switch-trackBackground": "#E9E9EA",
                  "&:hover": {
                    "--Switch-trackBackground": "#E9E9EA",
                  },
                  [theme.getColorSchemeSelector("dark")]: {
                    "--Switch-trackBackground": "rgba(255 255 255 / 0.4)",
                  },
                  [`&.${switchClasses.checked}`]: {
                    "--Switch-trackBackground": "#65C466",
                    "&:hover": {
                      "--Switch-trackBackground": "#65C466",
                    },
                  },
                })}
              />
              <Divider inset="context" />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
