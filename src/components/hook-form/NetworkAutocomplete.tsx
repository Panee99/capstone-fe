import { Fragment, useCallback, useEffect, useState } from 'react';
// mui
import {
  Autocomplete,
  Button,
  createFilterOptions,
  FilterOptionsState,
  ListItem,
  TextField,
} from '@mui/material';
// @types
import { FetchModel } from 'src/@types/generic';
// hooks
import useIsMountedRef from 'src/hooks/useIsMountedRef';
// form
import { Controller, useFormContext } from 'react-hook-form';
// utils
import axios from 'src/utils/axios';
// components
import SearchNotFound from '../SearchNotFound';
// react route dom
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label?: string;
  endpoint: string;
  sx?: any;
};

const DEFAULT_FETCH_SIZE = 10;

const filter = createFilterOptions<any>();

// ----------------------------------------------------------------------

export default function NetworkAutocomplete({ name, label, endpoint, sx }: IProps) {
  const isMountedRef = useIsMountedRef();

  const [search, setSearch] = useState('');

  const { control } = useFormContext();

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value: string) => {
    setSearch(value);
  };

  const loadOptions = useCallback(
    async (value: string) => {
      try {
        // *uncomment this bracket to disable autoload on render
        // if (value) {
        const response = await axios.post(endpoint, {
          params: { keyword: value, size: DEFAULT_FETCH_SIZE },
        });

        if (isMountedRef.current) {
          setSearchResults(response.data);
        }
        // }
      } catch (error) {
        console.error(error);
      }
    },
    [endpoint, isMountedRef, searchResults]
  );

  useEffect(() => {
    loadOptions(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const filterOptions = (options: FetchModel[], params: FilterOptionsState<FetchModel>) => {
    const filtered = filter(options, params);

    return filtered;
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: FetchModel) => (
    <Fragment key={option.id}>
      {
        <ListItem sx={{ display: 'flex', alignItems: 'center' }} {...props}>
          {option.name}
        </ListItem>
      }
    </Fragment>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          options={searchResults}
          onInputChange={(event, value) => handleChangeSearch(value)}
          getOptionLabel={(element) => element.name}
          renderOption={renderOption}
          filterOptions={filterOptions}
          noOptionsText={<SearchNotFound searchQuery={search} />}
          renderInput={(params: any) => <TextField label={label} {...params} />}
          value={value}
          onChange={(_, data) => onChange(data)}
          sx={sx}
          isOptionEqualToValue={(option: FetchModel, value: FetchModel) => option.id === value.id}
        />
      )}
    />
  );
}
