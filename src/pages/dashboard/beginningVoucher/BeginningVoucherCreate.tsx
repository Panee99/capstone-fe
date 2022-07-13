import { Container } from '@mui/material';
import React from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import BeginningNewEditForm from 'src/sections/@dashboard/beginningVoucher/form';

export default function BeginningVoucherCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Beginning Voucher: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Beginning Voucher"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Beginning Voucher', href: PATH_DASHBOARD.beginningVoucher.list },
            { name: 'New Beginning Voucher' },
          ]}
        />

        <BeginningNewEditForm />
      </Container>
    </Page>
  );
}
