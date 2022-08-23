import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
// form
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormProvider,
  RHFRadioGroup,
  RHFSwitch,
  RHFTextField,
} from '../../../../components/hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { CreateUserGroupSchema } from 'src/@types/userGroup';
import { phoneRegExp } from 'src/utils/regexPattern';
import { searchUserGroup, createUserGroup } from 'src/redux/slices/userGroup';
import { GENDER_OPTION } from 'src/utils/constants';
import NetworkAutocomplete from 'src/components/hook-form/NetworkAutocomplete';
import { debugError } from 'src/utils/foundation';
// @types
// components

// ----------------------------------------------------------------------

type FormValuesProps = CreateUserGroupSchema & {
  afterSubmit?: string;
};

type Props = {
  onSuccess?: Function;
};
export default function UserGroupAddForm({ onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(YupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (value: CreateUserGroupSchema) => {
    const data = {
      ...value,
    };

    try {
      await dispatch(createUserGroup(data));
      enqueueSnackbar('Tạo nhóm người dùng thành công!');
      if (onSuccess) {
        onSuccess();
      }
      await dispatch(searchUserGroup({}));
    } catch (error) {
      debugError(error);
      setError('afterSubmit', { message: error.message || error });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="name" label="Tên" autoFocus />
        <RHFTextField name="description" label="Mô tả" />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Tạo
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
