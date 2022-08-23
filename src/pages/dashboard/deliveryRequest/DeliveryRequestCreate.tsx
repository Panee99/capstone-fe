import { Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Page from 'src/components/Page';
import useSettings from 'src/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/routes/paths';
import DeliveryRequestNewEditForm from 'src/sections/@dashboard/deliveryRequest/form';

export default function BeginningVoucherCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo phiếu tồn kho đầu kỳ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo phiếu tồn kho đầu kỳ"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Phiếu tồn kho đầu kỳ', href: PATH_DASHBOARD.deliveryRequest.list },
            { name: 'Tạo phiếu' },
          ]}
        />

        <DeliveryRequestNewEditForm />
      </Container>
    </Page>
  );
}
