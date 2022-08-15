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
import BeginningNewEditForm from 'src/sections/@dashboard/beginningVoucher/form';
import Loading from 'src/components/Loading';

export default function BeginningVoucherEdit() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const { list, single, loading } = useSelector((state) => state.beginningVoucher);

  useEffect(() => {
    if (!!id) dispatch(getBeginningVoucher({ id: id }));
  }, [dispatch]);

  return (
    <Page title="Chỉnh sửa phiếu tồn kho đầu kỳ">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa phiếu tồn kho đầu kỳ"
          links={[
            { name: 'Thống kê', href: PATH_DASHBOARD.root },
            { name: 'Phiếu tồn kho đầu kỳ', href: PATH_DASHBOARD.invoice.list },
            { name: single?.code || '' },
          ]}
        />
        {loading && <Loading />}
        {!loading &&
          (!!single ? <BeginningNewEditForm isEdit currentVoucher={single!} /> : <p>Not Found</p>)}
      </Container>
    </Page>
  );
}
