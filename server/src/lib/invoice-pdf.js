import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 12, fontFamily: "Helvetica", color: "#111" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40, borderBottomWidth: 1, borderColor: "#047900", paddingBottom: 30 },
  companyTitle: { fontSize: 11, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  title: { fontSize: 28, fontWeight: "bold", color: "#047900" },
  label: { color: "#047900", fontSize: 9, marginBottom: 2 },
  value: { fontSize: 11 },
  section: { marginBottom: 24 },
  table: { marginTop: 8 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderColor: "#e5e7eb", paddingVertical: 8, paddingHorizontal: 10 },
  total: { flexDirection: "row", justifyContent: "flex-end", marginTop: 16, color: "#012100" }
});

function InvoicePDF({ invoice, project, client }) {
  return React.createElement(Document, null,
    React.createElement(Page, { size: "A4", style: styles.page },
      React.createElement(View, { style: styles.header },
        React.createElement(View, null,
          React.createElement(Text, { style: styles.title }, "Invoice"),
          React.createElement(Text, { style: styles.companyTitle }, "RaymondtDev Web Solutions"),
          React.createElement(Text, { style: styles.value }, "Stand No.18 Tweefontein G"),
          React.createElement(Text, { style: styles.value }, "KwaMhlanga 1022"),
          React.createElement(Text, { style: styles.value }, "Mpumalanga"),
          React.createElement(Text, { style: styles.value }, "South Africa")
        ),
        React.createElement(View, null,
          React.createElement(Text, { style: styles.label }, "Invoice No."),
          React.createElement(Text, { style: styles.value }, invoice.number),
          React.createElement(Text, { style: [styles.label, { marginTop: 8 }] }, "Date"),
          React.createElement(Text, { style: styles.value }, new Date(invoice.createdAt).toLocaleDateString())
        )
      ),
      React.createElement(View, { style: [styles.section, { flexDirection: "row", gap: 40 }] },
        React.createElement(View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.label }, "Billed To:"),
          React.createElement(Text, { style: styles.value }, client.name),
          React.createElement(Text, { style: styles.value }, client.email),
          React.createElement(Text, { style: styles.value }, client.phone)
        ),
        React.createElement(View, { style: { flex: 1 } },
          React.createElement(Text, { style: styles.label }, "Project"),
          React.createElement(Text, { style: styles.value }, project.title)
        )
      ),
      React.createElement(View, { style: styles.table },
        React.createElement(View, { style: [styles.row, { backgroundColor: "#012100" }] },
          React.createElement(Text, { style: { flex: 3, fontWeight: "bold", color: "white" } }, "Description"),
          React.createElement(Text, { style: { flex: 1, textAlign: "right", fontWeight: "bold", color: "white", borderLeftWidth: 1, borderColor: "gray" } }, "Amount")
        ),
        invoice.lineItems.map((item, i) =>
          React.createElement(View, { key: i, style: styles.row },
            React.createElement(Text, { style: { flex: 3 } }, item.description),
            React.createElement(Text, { style: { flex: 1, textAlign: "right" } }, item.amount.toFixed(2))
          )
        )
      ),
      React.createElement(View, { style: styles.total },
        React.createElement(Text, { style: { fontSize: 14, fontWeight: "bold" } },
          `Total: R${invoice.total.toFixed(2)}`
        )
      )
    )
  );
}

export async function generateInvoicePDF({ invoice, project, client }) {
  const pdfBuffer = await renderToBuffer(React.createElement(InvoicePDF, { invoice, project, client }));
  return pdfBuffer;
}