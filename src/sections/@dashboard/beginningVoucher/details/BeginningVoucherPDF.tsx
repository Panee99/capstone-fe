import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
import { BeginningVoucher } from 'src/@types/vouchers/beginningVoucher';
import { fCurrency } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
import styles from './BeginningVoucherStyle';

type Props = {
  payload: BeginningVoucher;
};

export default function BeginningVoucherPDF({ payload }: Props) {
  const { code, reportingDate, warehouse, description, details } = payload;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Code</Text>
            <Text style={styles.body1}>{payload.code}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>reportingDate</Text>
            <Text style={styles.body1}>{payload.reportingDate}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>warehouse</Text>
            <Text style={styles.body1}>{payload.warehouse.name}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>description</Text>
            <Text style={styles.body1}>{payload.description}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Beginning Voucher Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Product</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Qty</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {details.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.product.name}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
