import "assets/scss/components/modal.scss";

import React, { useEffect, useState } from "react";
import { Box, IconButton, Modal as MUIModal, ModalProps } from "@mui/material";
import { useTheme } from "contexts";
import { Custom } from "components";
import { HValidation } from "helpers";

// icons
import { Close, ChevronLeft } from "@mui/icons-material";

type Props = ModalProps & {
  message?: string;
  header: string;
  opened: boolean;
  action?: React.ReactNode;
  subheader?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onOpen?: () => void;
  onScroll?: (done: boolean) => void;
};

export const Modal = (props: Props) => {
  const { theme } = useTheme();
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    if (props.opened) {
      props.onOpen && props.onOpen();
    }
  }, [props.opened]);

  const handleClose = (): void => {
    setOpened(false);
    props.onClose && props.onClose();
  };

  const handleBack = (): void => {
    setOpened(false);
    props.onBack && props.onBack();
  };

  // React.SyntheticEvent
  const handleScroll = (event: any): void => {
    const {
      scrollHeight = 0,
      scrollTop = 0,
      clientHeight = 0,
    } = event.target as HTMLDivElement;
    if (scrollHeight === Math.ceil(scrollTop + clientHeight)) {
      props.onScroll && props.onScroll(true);
    } else {
      props.onScroll && props.onScroll(false);
    }
  };

  return (
    <>
      <MUIModal open={props.opened} onClose={handleClose}>
        <Box className="al-modal" sx={props.sx}>
          <>
            {HValidation.hasValue(props.message) && (
              <>
                <Custom.Alert
                  variant="filled"
                  severity="error"
                  className="al-feedback"
                >
                  <Custom.Typography>{props.message}</Custom.Typography>
                </Custom.Alert>
              </>
            )}
            <Box
              sx={{
                color: theme.palette.font.color,
                borderRadius: theme.border.radius,
                backgroundColor: theme.palette.theme,
              }}
              className="al-wrapper"
            >
              <Box
                className="al-header"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: theme.margin.lg,
                  pt: theme.margin.lg,
                }}
              >
                {props.onBack && (
                  <IconButton
                    sx={{
                      marginRight: theme.margin.xs,
                      color: theme.palette.font.color,
                    }}
                    onClick={handleBack}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
                <Box component="div">
                  <Custom.Typography
                    sx={{
                      fontWeight: theme.font.normal,
                      fontSize: theme.font.lg,
                    }}
                  >
                    {props.header}
                  </Custom.Typography>

                  {props.subheader && (
                    <Custom.Typography
                      sx={{
                        fontSize: theme.font.md,
                        fontWeight: theme.font.normal,
                        color: theme.palette.font.accent,
                      }}
                    >
                      {props.subheader}
                    </Custom.Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center" marginLeft="auto">
                  {props.action && (
                    <Box sx={{ marginRight: theme.margin.xs }}>
                      {props.action}
                    </Box>
                  )}
                  {props.onClose && (
                    <IconButton
                      sx={{
                        color: theme.palette.font.color,
                      }}
                      onClick={handleClose}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Box>
              </Box>
              <Box
                className="al-content"
                sx={{
                  pt: 0,
                  padding: theme.margin.lg,
                }}
                onScroll={handleScroll}
              >
                <Box className="al-wrapper">{props.children}</Box>
              </Box>
              {props.footer && (
                <Box
                  className="al-footer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: theme.margin.lg,
                  }}
                >
                  {props.footer}
                </Box>
              )}
            </Box>
          </>
        </Box>
      </MUIModal>
    </>
  );
};
