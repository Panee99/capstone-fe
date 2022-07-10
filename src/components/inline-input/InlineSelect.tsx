import { TextField } from '@mui/material';
import { useState } from 'react';

export default function InlineSelect({
  onEdit,
  value: initialValue,
  children,
  typoProps,
  ...other
}: any) {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: any) => {
    setValue(event.target.value);

    if (other.onChange) {
      other.onChange(event);
    }
  };

  return (
    <TextField
      select
      variant="standard"
      SelectProps={{ native: true }}
      fullWidth
      {...other}
      value={value}
      onChange={onChange}
    >
      {children}
    </TextField>
  );
}
