import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useSettings from 'src/hooks/useSettings';
import { _invoices } from 'src/_mock';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { dispatch, useSelector } from 'src/redux/store';
import { getDeliveryVoucher } from 'src/redux/slices/deliveryVoucher';
import Loading from 'src/components/Loading';
import DeliveryVoucherNewEditForm from 'src/sections/@dashboard/deliveryVoucher/form';

export default function DeliveryVoucherEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.deliveryVoucher);

  useEffect(() => {
    if (!!id) dispatch(getDeliveryVoucher({ id: id }));
  }, [dispatch]);

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Delivery Request"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'DeliveryVoucher', href: PATH_DASHBOARD.invoice.list },
            { name: single?.code || '' },
          ]}
        />
        {loading && <Loading />}
        {!loading &&
          (!!single ? (
            <DeliveryVoucherNewEditForm isEdit currentVoucher={single!} />
          ) : (
            <p>Not Found</p>
          ))}
      </Container>
    </Page>
  );
}
