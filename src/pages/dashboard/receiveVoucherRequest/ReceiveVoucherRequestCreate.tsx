import { Container } from '@mui/material';
import React from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import BeginningNewEditForm from 'src/sections/@dashboard/receiveVoucherRequest/form';

export default function ReceiveVoucherRequestCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo phiếu tồn kho đầu kỳ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo phiếu tồn kho đầu kỳ"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Phiếu tồn kho đầu kỳ', href: PATH_DASHBOARD.receiveVoucherRequest.list },
            { name: 'Tạo phiếu' },
          ]}
        />

        <BeginningNewEditForm />
      </Container>
    </Page>
  );
}
