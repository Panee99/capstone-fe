import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
import { fDate } from '../../../../utils/formatTime';
// @types
import { Invoice } from '../../../../@types/invoice';
//
import styles from './InvoiceStyle';

// ----------------------------------------------------------------------

type Props = {
  invoice: Invoice;
};

export default function InvoicePDF({ invoice }: Props) {
  const {
    items,
    taxes,
    status,
    dueDate,
    discount,
    invoiceTo,
    createDate,
    totalPrice,
    invoiceFrom,
    invoiceNumber,
    subTotalPrice,
  } = invoice;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{status}</Text>
            <Text> {`INV-${invoiceNumber}`} </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Hóa đơn từ</Text>
            <Text style={styles.body1}>{invoiceFrom.name}</Text>
            <Text style={styles.body1}>{invoiceFrom.address}</Text>
            <Text style={styles.body1}>{invoiceFrom.phone}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Hóa đơn đến</Text>
            <Text style={styles.body1}>{invoiceTo.name}</Text>
            <Text style={styles.body1}>{invoiceTo.address}</Text>
            <Text style={styles.body1}>{invoiceTo.phone}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày tạo</Text>
            <Text style={styles.body1}>{fDate(createDate)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Ngày đáo hạn</Text>
            <Text style={styles.body1}>{fDate(dueDate)}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Chi tiết hóa đơn</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Mô tả</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Số lượng</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Đơn vị tiền tệ</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Tổng giá trị</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {items.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{item.title}</Text>
                  <Text>{item.description}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{item.price}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(item.price * item.quantity)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Tổng phụ</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(subTotalPrice)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Giảm giá</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(-discount)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Thuế</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(taxes)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(totalPrice)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>
              We appreciate your business. Should you need us to add VAT or extra notes let us know!
            </Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@abcapp.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
