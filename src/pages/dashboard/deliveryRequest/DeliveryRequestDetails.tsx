import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { getDeliveryRequest } from 'src/redux/slices/deliveryRequest';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import DeliveryRequest from '../../../sections/@dashboard/deliveryRequest/details';

export default function DeliveryRequestDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.deliveryRequest);

  useEffect(() => {
    dispatch(getDeliveryRequest({ id: id! }));
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
  console.log(single);

  return (
    <Page title="Chi tiết phiếu tồn kho đầu kỳ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết phiếu tồn kho đầu kỳ"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            {
              name: 'Phiếu tồn kho đầu kỳ',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: single?.code || '' },
          ]}
        />

        <DeliveryRequest payload={single!} />
      </Container>
    </Page>
  );
}
