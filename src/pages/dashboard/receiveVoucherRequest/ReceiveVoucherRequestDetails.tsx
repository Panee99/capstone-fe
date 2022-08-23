import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { getReceiveVoucherRequest } from 'src/redux/slices/receiveVoucherRequest';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ReceiveVoucherRequest from '../../../sections/@dashboard/receiveVoucherRequest/details';

export default function ReceiveVoucherRequestDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.receiveVoucherRequest);

  useEffect(() => {
    dispatch(getReceiveVoucherRequest({ id: id! }));
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
    <Page title="Chi tiết phiếu nhập kho">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết phiếu nhập kho"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            {
              name: 'Phiếu nhập kho',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: single?.code || '' },
          ]}
        />

        <ReceiveVoucherRequest payload={single!} />
      </Container>
    </Page>
  );
}
