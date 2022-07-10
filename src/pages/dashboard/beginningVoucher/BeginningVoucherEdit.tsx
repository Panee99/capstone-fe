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
import { getBeginningVoucher } from 'src/redux/slices/beginningVoucher';
import BeginningVoucherEditForm from 'src/sections/@dashboard/beginningVoucher/form/BeginningVoucherEditForm';

export default function BeginningVoucherEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.beginningVoucher);

  console.log(JSON.stringify(single));

  useEffect(() => {
    if (!!id) dispatch(getBeginningVoucher({ id: id }));
  }, [dispatch]);

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Beginning Voucher"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Beginning Voucher', href: PATH_DASHBOARD.invoice.list },
            { name: single?.code || '' },
          ]}
        />
        {single}
        <BeginningVoucherEditForm isEdit payload={single!} />
      </Container>
    </Page>
  );
}
