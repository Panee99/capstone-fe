import { TableCell } from '@mui/material';
import { useState } from 'react';

export default function InlineTableCell({ children, value: initialValue, ...other }: any) {
  const [isEditing, setEditing] = useState(false);

  if (isEditing) {
    return children;
  }

  return (
    <TableCell {...other} onClick={() => setEditing(true)}>
      {initialValue}
    </TableCell>
  );
}
