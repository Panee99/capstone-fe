// @mui
import { IconButton } from '@mui/material';
//
import Iconify from '../Iconify';
import MenuPopover from '../MenuPopover';

// ----------------------------------------------------------------------

type Props = {
  actions: React.ReactNode;
  open?: HTMLElement | null;
  onClose?: VoidFunction;
  onOpen?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function TableMoreMenu({ actions, open, onClose, onOpen }: Props) {
  return (
    <>
      <IconButton onClick={onOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        arrow="left-top"
        sx={{
          mt: -1,
          width: 200,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopover>
    </>
  );
}
