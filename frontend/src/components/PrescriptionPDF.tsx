// components/PrescriptionPDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  Circle,
  Line,
  Image,
} from "@react-pdf/renderer";

// Optional: Use a nice font
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 14,
    color: "#333",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
    borderBottomWidth: 2,
    borderColor: "#944455",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
    color: "#944455",
    marginBottom: 24,
    letterSpacing: 0.65,
  },

  infoSection: {
    backgroundColor: "#ebdde0",
    padding: 20,
    borderRadius: 8,
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoBox: {
    flex: 1,
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 10,
    color: "#944455",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: 0.65,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 10,
    color: "#333",
    fontWeight: 100,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "#cca4ac",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#944455",
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderColor: "#c497a2",
  },

  medSection: {
    marginBottom: 40,
  },
  medItem: {
    backgroundColor: "#ebdde0",
    borderLeftWidth: 4,
    borderLeftColor: "#944455",
    padding: 20,
    marginBottom: 13,
    borderRadius: 6,
  },
  medHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  medNumber: {
    backgroundColor: "#944455",
    color: "white",
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    paddingTop: 7,
    marginRight: 15,
  },
  medName: {
    fontSize: 16,
    fontWeight: 500,
    color: "#944455",
    flex: 1,
  },
  medDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: "#a45e71",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 10,
    fontWeight: 100,
    color: "#333",
  },

  notesSection: {
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "#cca8b4",
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
  },
  notesLabel: {
    fontSize: 13,
    color: "#944455",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  notesContent: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.6,
  },

  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 2,
    borderColor: "#cca4ac",
  },
  signatureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  signatureBox: {
    flex: 1,
    alignItems: "center",
  },
  signatureLine: {
    width: "80%",
    height: 60,
    borderTopWidth: 2,
    borderColor: "#944455",
    marginBottom: 8,
  },
  signatureLabel: {
    fontSize: 12,
    color: "#944455",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

const PrescriptionPDF = ({
  patientName,
  patientId,
  date,
  physician,
  medications,
  additionalInstructions,
}: {
  patientName: string;
  patientId: string;
  date: string;
  physician: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  additionalInstructions: string;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <Image src="/logo/mediumlightlogo.png" style={styles.logo} />
      </View>

      <Text style={styles.title}>Prescription</Text>

      {/* Patient Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Patient Name</Text>
            <Text style={styles.infoValue}>{patientName}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Patient ID</Text>
            <Text style={styles.infoValue}>{patientId}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{date}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Physician</Text>
            <Text style={styles.infoValue}>{physician}</Text>
          </View>
        </View>
      </View>

      {/* Medications */}
      <Text style={styles.sectionTitle}>Prescribed Medications</Text>
      <View style={styles.medSection}>
        {medications.map((med, index) => (
          <View key={index} style={styles.medItem}>
            <View style={styles.medHeader}>
              <Text style={styles.medNumber}>{index + 1}</Text>
              <Text style={styles.medName}>{med.name}</Text>
            </View>
            <View style={styles.medDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Dosage</Text>
                <Text style={styles.detailValue}>{med.dosage}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Frequency</Text>
                <Text style={styles.detailValue}>{med.frequency}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{med.duration}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Additional Instructions */}
      <View style={styles.notesSection}>
        <Text style={styles.notesLabel}>Additional Instructions</Text>
        <Text style={styles.notesContent}>{additionalInstructions}</Text>
      </View>

      {/* Footer with Signature */}
      <View style={styles.footer}>
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Physician Signature</Text>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Date</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrescriptionPDF;
