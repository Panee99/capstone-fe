import { Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import DeliveryRequestNewEditForm from 'src/sections/@dashboard/deliveryRequest/form';

export default function BeginningVoucherCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Beginning Voucher: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Beginning Voucher"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Beginning Voucher', href: PATH_DASHBOARD.deliveryRequest.list },
            { name: 'New Beginning Voucher' },
          ]}
        />

        <DeliveryRequestNewEditForm />
      </Container>
    </Page>
  );
}
