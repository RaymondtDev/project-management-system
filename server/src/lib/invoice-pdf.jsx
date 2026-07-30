import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 12, fontFamily: "Helvetica", color: "#111" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold" },
  label: { color: "#6b7280", fontSize: 9, marginBottom: 2 },
  value: { fontSize: 11 },
  section: { marginBottom: 24 },
  table: { marginTop: 8 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#e5e7eb", paddingVertical: 8 },
  total: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }
});

export function InvoicePDF({ invoice, project, client }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
          <View>
            <Text style={styles.label}>Invoice No.</Text>
            <Text style={styles.value}>{invoice.number}</Text>
            <Text style={[styles.label, { marginTop: 8 }]}>Date</Text>
            <Text style={styles.value}>{new Date(invoice.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: "row", gap: 40 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Billed To</Text>
            <Text style={styles.value}>{client.name}</Text>
            <Text style={styles.value}>{client.email}</Text>
            <Text style={styles.value}>{client.phone}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Project</Text>
            <Text style={styles.value}>{project.title}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.row, { backgroundColor: "#f9fafb" }]}>
            <Text style={{ flex: 3, fontWeight: "bold" }}>Description</Text>
            <Text style={{ flex: 1, textAlign: "right", fontWeight: "bold" }}>Amount</Text>
          </View>
          {invoice.lineItems.map((item, i) => (
            <View key={i} style={styles.row}>
              <Text style={{ flex: 3 }}>{item.description}</Text>
              <Text style={{ flex: 1, textAlign: "right" }}>{item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            Total: R{invoice.total.toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}