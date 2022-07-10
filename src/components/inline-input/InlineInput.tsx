import { SxProps } from '@mui/material';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export interface InlineInputProps {
  name: string;
  isNumber?: 'number' | 'text';
  editable?: boolean;
  component: any;
  sx?: SxProps;
  rollback?: () => void;
  disableUnderlineOnEdit?: boolean;
}

export default function InlineInput({
  editable = true,
  name,
  isNumber,
  rollback,
  component: Node,
  sx,
  disableUnderlineOnEdit = true,
  ...other
}: any) {
  const [isEditing, setEditing] = useState(false);

  return (
    <Controller
      name={name}
      render={({ field: { onChange, value } }) => (
        <Node
          type={isNumber ? 'number' : 'text'}
          variant="standard"
          {...other}
          value={value}
          onChange={onChange}
          onBlur={() => setEditing(false)}
          onClick={editable ? () => setEditing(true) : rollback}
          InputProps={{
            disableUnderline: !isEditing && !editable && disableUnderlineOnEdit,
            sx: { ...sx, ...(rollback && { color: 'info.main', cursor: 'pointer' }) },
          }}
        />
      )}
    />
  );
}
