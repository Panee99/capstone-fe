import { Controller, useFormContext } from 'react-hook-form';
import { Box, Card, InputAdornment, TextField, TextFieldProps, Typography } from '@mui/material';
import { RHFMultiCheckbox } from 'src/components/hook-form';
import { useEffect, useState } from 'react';
import { dispatch } from 'src/redux/store';
import { getListPermission } from 'src/redux/slices/userGroup';
import { unwrapResult } from '@reduxjs/toolkit';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';

type IProps = {
  name: string;
};

type Props = IProps & TextFieldProps;
interface IOption {
  label: string;
  value: string;
}

export default function PermissionFormField({ name, ...other }: Props) {
  const { control } = useFormContext();
  const [options, setOptions] = useState<IOption[]>([]);
  const [permissions, setPermissions] = useState<IOption[]>([]);
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const actionResult = await dispatch(getListPermission());
        const data = unwrapResult(actionResult);
        const options = Array.from(data).map((x) => {
          const p = x.split('.');

          return { label: `${p[1]} ${p[2]}`, value: x } as IOption;
        });
        setPermissions(options);
        setOptions(options);
      } catch (error) {}
    };

    fetchOptions();
  }, []);

  const onFilterKeyword = (keyword: string) => {
    setFilterKeyword(keyword);
    setOptions(
      permissions.filter(
        (item: IOption) =>
          item.label
            .toLowerCase()
            .replace(/ /g, '')
            .indexOf(keyword.toLowerCase().replace(/ /g, '')) !== -1
      )
    );
  };

  return (
    <Card sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
                Phân quyền
            </Typography>
            <TextField
                value={filterKeyword}
                onChange={(event) => onFilterKeyword(event.target.value)}
                placeholder="Tìm từ khóa"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Iconify
                                icon={'eva:search-fill'}
                                sx={{ color: 'text.disabled', width: 25, height: 25 }}
                            />
                        </InputAdornment>
                    ),
                }}
                size="small"
            />
        </Box>

      <Scrollbar sx={{ height: 400, mt: 3 }}>
        <Controller
          name={name}
          control={control}
          render={() => <RHFMultiCheckbox name={name} options={options} />}
        />
      </Scrollbar>
    </Card>
  );
}
