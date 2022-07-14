import { UpdateAppUserPermissionSchema } from '../../../../@types/appUser';
import { useDispatch } from '../../../../redux/store';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePermission } from '../../../../redux/slices/appUser';
import { unwrapResult } from '@reduxjs/toolkit';
import { DEFAULT_ERROR } from '../../../../utils/constants';
import { FormProvider } from '../../../../components/hook-form';
import { Alert, Stack } from '@mui/material';
import NetworkAutocomplete from '../../../../components/hook-form/NetworkAutocomplete';
import { LoadingButton } from '@mui/lab';

type FormValuesProps = UpdateAppUserPermissionSchema & {
  afterSubmit?: string;
};

type Props = {
  payload: UpdateAppUserPermissionSchema;
  onSuccess?: Function;
};

export default function AppUserPermissionForm({ payload, onSuccess }: Props) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const YupSchema = Yup.object().shape({
    groupId: Yup.string().required('GroupId is required'),
  });
  const defaultValues = useMemo(
    () => ({
      groupId: null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(YupSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [payload]);

  const onSubmit = async (values: UpdateAppUserPermissionSchema) => {
    const data = {
      ...values,
      userId: payload.id,
    };

    try {
      const result = await dispatch(updatePermission(data));
      unwrapResult(result);
      enqueueSnackbar('Update Successfully');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <NetworkAutocomplete
          name="groupId"
          label="UserGroup"
          endpoint="/warehouse/group/fetch"
          sx={{ width: '100%' }}
        />
      </Stack>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
