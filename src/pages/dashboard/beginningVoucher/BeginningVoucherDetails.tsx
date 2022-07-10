import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { getBeginningVoucher } from 'src/redux/slices/beginningVoucher';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import BeginningVoucher from '../../../sections/@dashboard/beginningVoucher/details';

export default function BeginningVoucherDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.beginningVoucher);

  useEffect(() => {
    dispatch(getBeginningVoucher({ id: id! }));
    // const fetch = async () => {
    //   try {

    //     enqueueSnackbar('Create user success!');
    //     if (onSuccess) {
    //       onSuccess();
    //     }
    //     await dispatch(searchAppUser({}));
    //   } catch (error) {
    //     setError('afterSubmit', { message: error.message || error });
    //   }
    // };
    // fetch();
  }, [dispatch]);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Beginning Voucher',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: single?.code || '' },
          ]}
        />

        <BeginningVoucher payload={single!} />
      </Container>
    </Page>
  );
}
