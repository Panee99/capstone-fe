import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useSettings from 'src/hooks/useSettings';
import { _invoices } from 'src/_mock';
import Page from 'src/components/Page';
import InvoiceNewEditForm from 'src/sections/@dashboard/invoice/new-edit-form';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { dispatch, useSelector } from 'src/redux/store';
import { getReceiveVoucherRequest } from 'src/redux/slices/receiveVoucherRequest';
// import ReceiveVoucherRequestNewEditForm from 'src/sections/@dashboard/receiveVoucherRequest/form';
import ReceiveVoucherRequestNewEditForm from 'src/sections/@dashboard/receiveVoucherRequest/form';
import Loading from 'src/components/Loading';

export default function ReceiveVoucherRequestEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.receiveVoucherRequest);

  useEffect(() => {
    if (!!id) dispatch(getReceiveVoucherRequest({ id: id }));
  }, [dispatch]);

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit ReceiveVoucherRequest Voucher"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'ReceiveVoucherRequest Voucher', href: PATH_DASHBOARD.invoice.list },
            { name: single?.code || '' },
          ]}
        />
        {loading && <Loading />}
        {!loading &&
          (!!single ? (
            <ReceiveVoucherRequestNewEditForm isEdit currentVoucher={single!} />
          ) : (
            <p>Not Found</p>
          ))}
      </Container>
    </Page>
  );
}
