import { Divider, Stack } from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import RHFFetch from 'src/components/hook-form/RHFFetch';
import NetworkAutocomplete from "../../../../components/hook-form/NetworkAutocomplete";

export default function CategoryForm() {
    const { control } = useFormContext();

    const { fields } = useFieldArray({
        control,
        name: 'categories',
    });

    return (
        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }}/>} spacing={3}>
            {fields.map((item, index) => (
                <RHFFetch
                    key={item.id}
                    name={`categories[${index}]`}
                    label="Category"
                    size="medium"
                    endpoint="/category/fetch"
                    sx={{ width: '450' }}
                    InputLabelProps={{ shrink: true }}
                />
            ))}
        </Stack>
    );
}