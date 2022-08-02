import { Page, View, Text, Document } from '@react-pdf/renderer';
import { DeliveryVoucher } from 'src/@types/vouchers/deliveryVoucher';
import styles from './DeliveryVoucherStyle';

type Props = {
  payload: DeliveryVoucher;
};

export default function DeliveryVoucherPDF({ payload }: Props) {
  const { code, reportingDate, warehouse, description, details } = payload;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Code</Text>
            <Text style={styles.body1}>{code}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Reporting Date</Text>
            <Text style={styles.body1}>{reportingDate}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Warehouse</Text>
            <Text style={styles.body1}>{warehouse.name}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Description</Text>
            <Text style={styles.body1}>{description}</Text>
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
