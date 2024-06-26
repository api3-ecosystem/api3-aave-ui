import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckIcon from "@mui/icons-material/Check";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import * as React from "react";

import { SlippageTooltip } from "src/components/infoTooltips/SlippageTooltip";

interface ListSlippageButtonProps {
  setSlippage: (value: string) => void;
  selectedSlippage: string;
}

export const ListSlippageButton = ({
  setSlippage,
  selectedSlippage,
}: ListSlippageButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const values: string[] = ["0.1", "0.5", "1"];

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        size="medium"
        endIcon={
          <SlippageTooltip
            text={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <div>
                  <Typography color="text.secondary" variant="description">
                    Slippage tolerance{" "}
                  </Typography>
                  <Typography
                    color="text.main"
                    variant="secondary14"
                    sx={{ px: "4px" }}
                  >
                    {selectedSlippage}%{" "}
                  </Typography>
                  <SvgIcon sx={{ fontSize: "14px !important", mr: "4px" }}>
                    {open ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                  </SvgIcon>
                </div>
              </Box>
            }
            variant="secondary14"
          />
        }
        disabled={false}
        data-cy={`slippageButton_${selectedSlippage}`}
        sx={{ mt: 6 }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        keepMounted={true}
        data-cy={`slippageMenu_${selectedSlippage}`}
      >
        <Box sx={{ px: "16px", py: "12px" }}>
          <Typography variant="secondary12" color="text.secondary">
            <div>Select slippage tolerance</div>
          </Typography>
        </Box>

        {values.map((slippageValue) => {
          const selected = slippageValue === selectedSlippage;

          return (
            <MenuItem
              key={slippageValue}
              selected={selected}
              value={slippageValue}
              onClick={() => {
                setSlippage(slippageValue);

                handleClose();
              }}
            >
              <ListItemText primaryTypographyProps={{ variant: "subheader1" }}>
                {slippageValue}%
              </ListItemText>
              <ListItemIcon>
                <SvgIcon>{selected && <CheckIcon />}</SvgIcon>
              </ListItemIcon>
            </MenuItem>
          );
        })}

        <Divider />
        <Box
          sx={{
            px: "16px",
            py: "12px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant="secondary12"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <div>Powered by</div>
            <SvgIcon
              sx={{
                fontSize: "20px",
                width: "20px",
                color: "#2669F5",
                position: "relative",
                top: "5px",
                left: "5px",
              }}
            ></SvgIcon>
          </Typography>
          <Typography variant="main12" color="text.secondary">
            Paraswap
          </Typography>
        </Box>
      </Menu>
    </>
  );
};
