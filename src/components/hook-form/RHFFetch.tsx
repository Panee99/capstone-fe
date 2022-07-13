import { Autocomplete, MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FetchModel } from 'src/@types/generic';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import { DEFAULT_FETCH_SIZE } from 'src/utils/constants';
import SearchNotFound from '../SearchNotFound';

type IProps = {
  name: string;
  endpoint: string;
};

type Props = IProps & TextFieldProps;

export default function RHFFetch({ name, endpoint, ...other }: Props) {
  const isMountedRef = useIsMountedRef();

  const { control } = useFormContext();

  const [searchResults, setSearchResults] = useState<FetchModel[]>([]);
  const [search, setSearch] = useState<string>('');

  const loadOptions = useCallback(
    async (value: string) => {
      try {
        // *uncomment this bracket to disable autoload on render
        // if (value) {
        const response = await axios.post(endpoint, {
          params: { keyword: value, size: DEFAULT_FETCH_SIZE },
        });

        if (isMountedRef.current) {
          setSearchResults(searchResults.concat(response.data));
        }
        // }
      } catch (error) {
        console.error(error);
      }
    },
    [endpoint, isMountedRef]
  );

  useEffect(() => {
    loadOptions(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          options={searchResults}
          onInputChange={(_, value) => setSearch(value)}
          onChange={(_, data) => onChange(data)}
          getOptionLabel={(element) => element.name}
          renderOption={(props, value) => (
            <MenuItem
              {...props}
              sx={{
                mx: 1,
                borderRadius: 0.75,
                typography: 'body2',
                fontStyle: 'italic',
                color: 'text.secondary',
              }}
            >
              {value.name}
            </MenuItem>
          )}
          renderInput={(params) => <TextField {...params} {...other} />}
          noOptionsText={<SearchNotFound searchQuery={search} />}
          value={value}
          isOptionEqualToValue={(option: FetchModel, value: FetchModel) => option.id === value.id}
        />
      )}
    />
  );
}
