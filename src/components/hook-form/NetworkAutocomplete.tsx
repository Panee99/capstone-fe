import { Fragment, useCallback, useEffect, useState } from 'react';
// mui
import {
  Autocomplete,
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
import { DEFAULT_FETCH_SIZE } from 'src/utils/constants';

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label?: string;
  endpoint: string;
  [rest: string]: any;
  sx?: any;
  size?: 'small' | 'medium';
  InputLabelProps?: any;
};

const filter = createFilterOptions<any>();

// ----------------------------------------------------------------------

export default function NetworkAutocomplete({
  name,
  label,
  endpoint,
  sx,
  size,
  InputLabelProps,
  ...rest
}: IProps) {
  const isMountedRef = useIsMountedRef();

  const [search, setSearch] = useState('');

  const { control } = useFormContext();

  const [searchResults, setSearchResults] = useState<FetchModel[]>([{ id: '', name: '' }]);

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

  const filterOptions = (options: FetchModel[], params: FilterOptionsState<FetchModel>) => {
    const filtered = filter(options, params);

    return filtered;
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: FetchModel) => (
    // <Fragment key={option.id}>
    //   {
    //     <ListItem sx={{ display: 'flex', alignItems: 'center' }} {...props}>
    //       {option.name}
    //     </ListItem>
    //   }
    // </Fragment>
    <Fragment key={option.id}>
      {option.id === '' ? (
        <div />
      ) : (
        <ListItem sx={{ display: 'flex', alignItems: 'center' }} {...props}>
          {option.name}
        </ListItem>
      )}
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
          renderInput={(params: any) => (
            <TextField
              {...params}
              size={size}
              InputLabelProps={InputLabelProps}
              label={label}
              InputProps={{ ...params.InputProps, ...rest.InputProps }}
              variant={rest.variant ?? 'outlined'}
              sx={rest.renderSx}
            />
            // <TextField label={label} {...params} InputLabelProps={InputLabelProps} />
          )}
          value={value}
          onChange={(_, data) => onChange(data)}
          sx={sx}
          size={size}
          isOptionEqualToValue={(option: FetchModel, value: FetchModel) => option.id === value.id}
        />
      )}
    />
  );
}

// import { Fragment, useCallback, useEffect, useState } from 'react';
// // mui
// import {
//   Autocomplete,
//   AutocompleteRenderInputParams,
//   Button,
//   createFilterOptions,
//   FilterOptionsState,
//   ListItem,
//   SxProps,
//   TextField,
// } from '@mui/material';
// // @types
// import { FetchModel } from 'src/@types/generic';
// // hooks
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
// // utils
// import axios from 'src/utils/axios';
// // components
// import SearchNotFound from '../SearchNotFound';
// // react route dom
// import { Link as RouterLink } from 'react-router-dom';
// import { debugError } from 'src/utils/foundation';
// import { Controller, useFormContext } from 'react-hook-form';

// // ----------------------------------------------------------------------

// interface IProps {
//   label?: string;
//   endpoint: string;
//   onAddNew?: (name: string) => void;
//   sx?: SxProps;
//   [rest: string]: any;
//   size?: 'small' | 'medium';
//   InputLabelProps?: any;
//   name: string;
// }

// const DEFAULT_FETCH_SIZE = 5;

// const filter = createFilterOptions<any>();

// // ----------------------------------------------------------------------

// export default function NetworkAutocomplete({
//   label,
//   endpoint,
//   sx,
//   onAddNew,
//   size,
//   InputLabelProps,
//   name,
//   ...rest
// }: IProps) {
//   const isMountedRef = useIsMountedRef();

//   const [search, setSearch] = useState('');

//   const [searchResults, setSearchResults] = useState([{ id: '', name: '' }]);
//   const { control } = useFormContext();

//   const handleChangeSearch = async (value: string) => {
//     setSearch(value);
//   };

//   const loadOptions = useCallback(
//     async (value: string) => {
//       try {
//         // *uncomment this bracket to disable autoload on render
//         // if (value) {
//         const response = await axios.post(endpoint, {
//           keyword: value,
//           size: DEFAULT_FETCH_SIZE,
//         });

//         if (isMountedRef.current) {
//           setSearchResults(searchResults.concat(response.data));
//         }
//         // }
//       } catch (error) {
//         debugError(error);
//       }
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [endpoint, isMountedRef]
//   );

//   useEffect(() => {
//     loadOptions(search);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [search]);

//   const filterOptions = (options: FetchModel[], params: FilterOptionsState<FetchModel>) => {
//     const filtered = filter(options, params);

//     return filtered;
//   };

//   const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: FetchModel) => (
//     <Fragment key={option.id}>
//       {option.id === '' ? (
//         <div />
//       ) : (
//         <ListItem sx={{ display: 'flex', alignItems: 'center' }} {...props}>
//           {option.name}
//         </ListItem>
//       )}
//     </Fragment>
//   );

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field: { value, onChange } }) => (
//         <Autocomplete
//           options={searchResults}
//           onInputChange={(event, value) => handleChangeSearch(value)}
//           getOptionLabel={(element) => element.name}
//           renderOption={renderOption}
//           filterOptions={filterOptions}
//           noOptionsText={<SearchNotFound searchQuery={search} />}
//           renderInput={(params: AutocompleteRenderInputParams) => (
//             <TextField
//               {...params}
//               size={size}
//               InputLabelProps={InputLabelProps}
//               label={label}
//               InputProps={{ ...params.InputProps, ...rest.InputProps }}
//               variant={rest.variant ?? 'outlined'}
//               sx={rest.renderSx}
//             />
//           )}
//           sx={sx}
//           isOptionEqualToValue={(option: FetchModel, value: FetchModel) => option.id === value.id}
//         />
//       )}
//     />
//   );
// }
