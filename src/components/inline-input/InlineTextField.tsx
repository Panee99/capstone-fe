import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

export interface InlineTextFieldProps {
  name: string;
  isNumber?: boolean;
  editable?: boolean;
  value: any;
}

export default function InlineTextField({
  editable = true,
  name,
  isNumber,
  value,
  ...other
}: InlineTextFieldProps) {
  const [isEditing, setEditing] = useState(false);

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          {...other}
          multiline
          type={isNumber ? 'number' : 'text'}
          variant="standard"
          value={isNumber ? new Intl.NumberFormat('de-DE').format(value) : value}
          onChange={onChange}
          onBlur={() => setEditing(false)}
          onClick={editable ? () => setEditing(true) : () => {}}
          InputProps={{ disableUnderline: !isEditing }}
        />
      )}
    />
  );
}
