import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { CreateUserGroupSchema, UpdateUserGroupSchema, UserGroup } from 'src/@types/userGroup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import PermissionFormField from './PermissionFormField';
import { DEFAULT_ERROR } from 'src/utils/constants';
import { createUserGroup, updateUserGroup } from 'src/redux/slices/userGroup';
import { dispatch } from 'src/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';

type IFormValuesProps = Omit<UserGroup, 'id' | 'inWarehouse' | 'canUpdate'>;

interface FormValuesProps extends IFormValuesProps {
  afterSubmit?: string;
}

type Props = {
  isEdit?: boolean;
  currentGroup?: UserGroup;
  onSuccess?: Function;
};

const UserGroupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

export default function UserGroupAddEditForm({ isEdit, currentGroup, onSuccess }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      name: currentGroup?.name || '',
      description: currentGroup?.description || '',
      permissions: currentGroup?.permissions || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentGroup]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UserGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentGroup) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentGroup]);

  const onSubmit = async () => {
    try {
      let result;
      if (!isEdit) {
        const data: CreateUserGroupSchema = {
          ...values,
        };
        result = await dispatch(createUserGroup(data));

        console.log(data);
      } else {
        const data: UpdateUserGroupSchema = {
          id: currentGroup!.id,
          ...values,
        };
        console.log(data);
        result = await dispatch(updateUserGroup(data));
      }
      unwrapResult(result);
      enqueueSnackbar((isEdit ? 'Cập nhật' : 'Tạo') + ' nhóm người dùng thành công!');
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      setError('afterSubmit', { message: error?.message || error || DEFAULT_ERROR });
    }
  };

  return (
    <FormProvider methods={methods}>
      <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <RHFTextField name="name" label="Tên" autoFocus/>
        <RHFTextField name="description" label="Mô tả"/>
        <PermissionFormField name="permissions"/>
      </Stack>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isEdit ? 'Update' : 'Create'} Group
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
