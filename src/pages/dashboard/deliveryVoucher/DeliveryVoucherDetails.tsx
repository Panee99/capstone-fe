import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { getDeliveryVoucher } from 'src/redux/slices/deliveryVoucher';
import { useDispatch, useSelector } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import DeliveryVoucher from '../../../sections/@dashboard/deliveryVoucher/details';

export default function DeliveryVoucherDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.deliveryVoucher);

  useEffect(() => {
    dispatch(getDeliveryVoucher({ id: id! }));
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
    <Page title="Chi tiết phiếu">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết phiếu"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            {
              name: 'Phiếu tồn kho đầu kỳ',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: single?.code || '' },
          ]}
        />

        <DeliveryVoucher payload={single!} />
      </Container>
    </Page>
  );
}
