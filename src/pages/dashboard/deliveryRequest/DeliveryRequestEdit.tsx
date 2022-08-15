import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useSettings from 'src/hooks/useSettings';
import { _invoices } from 'src/_mock';
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { dispatch, useSelector } from 'src/redux/store';
import { getDeliveryRequest } from 'src/redux/slices/deliveryRequest';
import Loading from 'src/components/Loading';
import DeliveryRequestNewEditForm from 'src/sections/@dashboard/deliveryRequest/form';

export default function DeliveryRequestEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.deliveryRequest);

  useEffect(() => {
    if (!!id) dispatch(getDeliveryRequest({ id: id }));
  }, [dispatch]);

  return (
    <Page title="Chỉnh sửa phiếu yêu cầu xuất kho">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa phiếu yêu cầu xuất kho"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Phiếu yêu cầu xuất kho', href: PATH_DASHBOARD.invoice.list },
            { name: single?.code || '' },
          ]}
        />
        {loading && <Loading />}
        {!loading &&
          (!!single ? (
            <DeliveryRequestNewEditForm isEdit currentVoucher={single!} />
          ) : (
            <p>Không tìm thấy</p>
          ))}
      </Container>
    </Page>
  );
}
