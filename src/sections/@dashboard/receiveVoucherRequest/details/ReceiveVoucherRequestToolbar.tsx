import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import { useNavigate } from 'react-router';
import { ReceiveVoucherRequest } from 'src/@types/vouchers/receiveVoucherRequest';
import Iconify from 'src/components/Iconify';
import useToggle from 'src/hooks/useToggle';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDate } from 'src/utils/formatTime';
import ReceiveVoucherRequestPDF from './ReceiveVoucherRequestPDF';

type Props = {
  payload: ReceiveVoucherRequest;
};

export default function ReceiveVoucherRequestToolbar({ payload }: Props) {
  const navigate = useNavigate();

  const { toggle: open, onOpen, onClose } = useToggle();

  const handleEdit = () => {
    navigate(PATH_DASHBOARD.invoice.edit(payload.id));
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Chỉnh sửa">
            <IconButton onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xem">
            <IconButton onClick={onOpen}>
              <Iconify icon={'eva:printer-fill'} />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<ReceiveVoucherRequestPDF payload={payload} />}
            fileName={fDate(payload.reportingDate)}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Tải về">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon={'eva:download-fill'} />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>

        {/* <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:checkmark-fill'} />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Mark as Paid
        </Button> */}
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Đóng">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <ReceiveVoucherRequestPDF payload={payload} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
