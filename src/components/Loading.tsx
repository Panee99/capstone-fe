import { Box, useTheme } from '@mui/material';
import { SyncLoader } from 'react-spinners';

export default function Loading() {
  const theme = useTheme();
  return (
    <Box textAlign="center">
      <SyncLoader color={theme.palette.primary.main} loading={true} size={7} />
    </Box>
  );
}
