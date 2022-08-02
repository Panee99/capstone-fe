import { Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import DeliveryVoucherNewEditForm from 'src/sections/@dashboard/deliveryVoucher/form';

export default function DeliveryVoucherCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Beginning Voucher: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Beginning Voucher"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Beginning Voucher', href: PATH_DASHBOARD.deliveryVoucher.list },
            { name: 'New Beginning Voucher' },
          ]}
        />

        <DeliveryVoucherNewEditForm />
      </Container>
    </Page>
  );
}
