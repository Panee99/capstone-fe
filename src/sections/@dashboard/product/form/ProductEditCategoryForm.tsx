import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { FormProvider } from '../../../../components/hook-form';
import { LoadingButton } from '@mui/lab';
import { Alert, Stack } from '@mui/material';
import { useDispatch } from '../../../../redux/store';
import { UpdateProductCategorySchema } from 'src/@types/product';
import { searchProduct, updateProductCategory } from 'src/redux/slices/product';
import { debugError } from 'src/utils/foundation';
import NetworkAutocomplete from '../../../../components/hook-form/NetworkAutocomplete';

type FormValuesProps = UpdateProductCategorySchema & {
  afterSubmit?: string;
};

type Props = {
    payload: UpdateProductCategorySchema;
    onSuccess?: Function;
};

export default function ProductAddForm({ payload, onSuccess }: Props) {
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const YupSchema = Yup.object().shape({
        category: Yup.string().required('Category is required'),
    });

    const defaultValues = useMemo(
        () => ({
            category: null
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const methods = useForm<FormValuesProps>({
        // resolver: yupResolver(YupSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setError,
        formState: { isSubmitting, errors },
    } = methods;

    const onSubmit = async (value: UpdateProductCategorySchema) => {
        const data = {
            ...value,
            id: payload.id
        };

        try {
            await dispatch(updateProductCategory(data));
            enqueueSnackbar('Update Product Category success!');
            if (onSuccess) {
                onSuccess();
            }
            await dispatch(searchProduct({}));
        } catch (error) {
            debugError(error);
            setError('afterSubmit', { message: error.message || error });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ width: { sm: '100%', md: '100%' } }}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                <NetworkAutocomplete
                    name="category"
                    label="Category"
                    endpoint="/category/fetch"
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
