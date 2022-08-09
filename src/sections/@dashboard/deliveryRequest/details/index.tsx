import {
  Box,
  Card,
  Divider,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { DeliveryRequest } from 'src/@types/vouchers/deliveryRequest';
import Image from 'src/components/Image';
import Label from 'src/components/Label';
import Scrollbar from 'src/components/Scrollbar';
import DeliveryRequestToolbar from './DeliveryRequestToolbar';

type Props = {
  payload?: DeliveryRequest;
};

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function DeliveryRequestDetails({ payload }: Props) {
  const theme = useTheme();
  let totalQuantity = 0;

  if (!payload) {
    return null;
  }

  const { id, code, description, reportingDate, warehouse, details } = payload;

  return (
    <>
      <DeliveryRequestToolbar payload={payload} />

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Code
            </Typography>
            <Typography variant="body2">{payload.code}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Reporting Date
            </Typography>
            <Typography variant="body2">{reportingDate}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Warehouse
            </Typography>
            <Typography variant="body2">{warehouse.name}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Description
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align="left">Product</TableCell>
                  <TableCell align="right">Qty</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {details.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">{row.product.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TextField hidden={true} value={totalQuantity += row.quantity} />
                  </TableRow>
                ))}

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{totalQuantity > 0 ? totalQuantity : 0}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
}
