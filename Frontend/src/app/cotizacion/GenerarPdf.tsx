import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontSize: 10,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	headerLeft: {
		width: "50%",
	},
	headerRight: {
		width: "40%",
		alignItems: "flex-end",
	},
	logo: {
		width: 120,
		height: 120,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
	},
	clientInfo: {
		marginBottom: 5,
	},
	row: {
		flexDirection: "row",
		marginBottom: 4,
	},
	label: {
		width: 80,
		fontWeight: "bold",
	},
	value: {
		flex: 1,
	},
	companyInfo: {
		fontSize: 10,
		textAlign: "right",
	},
	termsSection: {
		marginVertical: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	termsBox: {
		width: "30%",
		border: "1px solid black",
		padding: 8,
	},
	termsTitle: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	table: {
		marginVertical: 10,
	},
	tableHeader: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#000",
		paddingBottom: 4,
		fontWeight: "bold",
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		paddingVertical: 4,
	},
	colItem: {
		flex: 4,
	},
	colUnit: {
		flex: 1,
		textAlign: "center",
	},
	colPrice: {
		flex: 1,
		textAlign: "right",
	},
	colTotal: {
		flex: 1,
		textAlign: "right",
	},
	totals: {
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#000",
		alignItems: "flex-end",
	},
	totalRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 4,
	},
	totalLabel: {
		width: 100,
	},
	totalValue: {
		width: 100,
		textAlign: "right",
	},
	notes: {
		marginTop: 20,
		border: "1px solid black",
		padding: 8,
	},
	notesTitle: {
		fontWeight: "bold",
		marginBottom: 4,
	},
	noteItem: {
		marginBottom: 2,
	},
	footer: {
		marginTop: 20,
		fontSize: 8,
		fontStyle: "italic",
	},
});

interface ManoObraItem {
	nombreMaterial: string;
	areaTrabajarM2: number;
	rendimientoMaterialM2: number;
	costoMaterialUnitario: number;
	manoObraPorM2: number;
  }

interface QuotationPDFProps {
	quotationName: string;
	clientName: string;
	clientPhone: string;
	clientEmail: string;
	clientAddress: string;
	date: string;
	items: {
		description: string;
		units: number;
		unitPrice: number;
	}[];
	manoObras: ManoObraItem[];
	notes?: string;
	offerValidity: number;
	advancePayment: number;
	remainingPayment: number;
	workTime: number;
}

export const QuotationPDF = ({
	quotationName,
	clientName,
	clientPhone,
	clientEmail,
	clientAddress,
	date,
	items,
	notes,
	manoObras,
	offerValidity,
	advancePayment,
	remainingPayment,
	workTime,
}: QuotationPDFProps) => {
	const subtotal = items.reduce(
		(acc, item) => acc + (item.units * item.unitPrice),
		0
	  );

	  const totalManoObra = manoObras.reduce(
		(acc, obra) => acc + (obra.areaTrabajarM2 * obra.manoObraPorM2),
		0
	  );

	// Hardcodeado por ahora, hay que pasar estas variables
	// por la otra vista primero!

	const IVA = 0.19;
	const valorIva = subtotal * IVA;

	const totalIVAInc = (subtotal + valorIva) + totalManoObra;
	// const validez = 10;
	// const plazo = 10;
	const adelantado = advancePayment;
	const contraEntrega = remainingPayment;
	const validez = offerValidity;
	const tiempoEntrega = workTime;

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Header */}
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Text style={styles.title}>Cotización: {quotationName}</Text>
						<View style={styles.clientInfo}>
							<View style={styles.row}>
								<Text style={styles.label}>Fecha:</Text>
								<Text style={styles.value}>{date}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Cliente:</Text>
								<Text style={styles.value}>{clientName}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Teléfono:</Text>
								<Text style={styles.value}>{clientPhone}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Mail:</Text>
								<Text style={styles.value}>{clientEmail}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Dirección:</Text>
								<Text style={styles.value}>{clientAddress}</Text>
							</View>
						</View>
					</View>
					<View style={styles.headerRight}>
						<Image
							src="https://static.wixstatic.com/media/fc8ab8_3cdbc345ea3e4bd2b72deb60087251c2~mv2.jpg/v1/fill/w_207,h_190,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Logo%20Casa%20Experto.jpg"
							style={styles.logo}
						/>
						<View style={styles.companyInfo}>
							<Text>Gil & Rodriguez Ltda.</Text>
							<Text>Merced 838 A, Of. 117</Text>
							<Text>Santiago, Chile</Text>
							<Text>RUT 76.531.936-6</Text>
							<Text>Operaciones: 9 89010239</Text>
							<Text>Comercial: 9 58813084</Text>
						</View>
					</View>
				</View>

				{/* Terms Section */}
				<View style={styles.termsSection}>
					<View style={styles.termsBox}>
						<Text style={styles.termsTitle}>Validez Oferta</Text>
						<Text>{validez} días</Text>
					</View>
					<View style={styles.termsBox}>
						<Text style={styles.termsTitle}>Cond. Pago</Text>
						<Text>{adelantado}% ADELANTADO</Text>
						<Text>{contraEntrega}% CONTRA ENTREGA</Text>
					</View>
					<View style={styles.termsBox}>
						<Text style={styles.termsTitle}>Plazo Entrega</Text>
						<Text>{tiempoEntrega}</Text>
					</View>
				</View>

				{/* Table */}
				<View style={styles.table}>
					<View style={styles.tableHeader}>
						<Text style={styles.colItem}>Descripción</Text>
						<Text style={styles.colUnit}>Unid - sup mt2</Text>
						<Text style={styles.colPrice}>Precio Unit.</Text>
						<Text style={styles.colTotal}>Precio Total</Text>
					</View>
					{items.map((item, index) => (
						<View key={index} style={styles.tableRow}>
							<Text style={styles.colItem}>{item.description}</Text>
							<Text style={styles.colUnit}>{item.units}</Text>
							<Text style={styles.colPrice}>
								$ {item.unitPrice.toLocaleString()}
							</Text>
							<Text style={styles.colTotal}>
								$ {(item.units * item.unitPrice).toLocaleString()}
							</Text>
						</View>
					))}
				</View>


				{/* Tabla de Mano de Obra */}
				<View style={styles.table}>
				<View style={styles.tableHeader}>
					<Text style={styles.colItem}>Mano de Obra</Text>
					<Text style={styles.colUnit}>Área (m²)</Text>
					<Text style={styles.colUnit}>Rendimiento (m²/u)</Text>
					<Text style={styles.colPrice}>Costo Unitario</Text>
					<Text style={styles.colTotal}>Costo Total</Text>
				</View>
				{manoObras.map((obra, index) => (
					<View key={index} style={styles.tableRow}>
						<Text style={styles.colItem}>{obra.nombreMaterial}</Text>
						<Text style={styles.colUnit}>{obra.areaTrabajarM2}</Text>
						<Text style={styles.colUnit}>{obra.rendimientoMaterialM2}</Text>
						<Text style={styles.colPrice}>
						$ {obra.manoObraPorM2.toLocaleString()}
						</Text>
						<Text style={styles.colTotal}>
						$ {(obra.areaTrabajarM2 * obra.manoObraPorM2).toLocaleString()}
						</Text>
					</View>
					))}
				</View>


				<View style={styles.totals}>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>Subtotal</Text>
						<Text style={styles.totalValue}>$ {subtotal.toLocaleString()}</Text>
					</View>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>IVA (19%)</Text>
						<Text style={styles.totalValue}>$ {valorIva.toLocaleString()}</Text>
					</View>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>TOTAL Mano de Obra</Text>
						<Text style={styles.totalValue}>$ {totalManoObra.toLocaleString()}</Text>
					</View>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>TOTAL IVA Inc.</Text>
						<Text style={styles.totalValue}>$ {totalIVAInc.toLocaleString()}</Text>
					</View>
					</View>

				{/* Notes */}
				{/* Hardcodeado por ahora, lo que hay que hacer es recibir este texto
                por la otra vista primero!  */}
				{notes && (
					<View style={styles.notes}>
						<Text style={styles.notesTitle}>NOTAS:</Text>
						<Text>{notes}</Text>
					</View>
)}

				{/* Footer */}
				<Text style={styles.footer}>
					Por medio de la presente cotización, y en caso de aceptación por parte
					del cliente, la empresa Gil & Rodriguez Ltda., para todos los efectos
					Casa Experto, se compromete a llevar a cabo los trabajos de acuerdo a
					lo detallado en el presente documento, en el tiempo especificado y
					condiciones mencionadas. De la misma forma se compromete el cliente
					aquí individualizado, al pago correspondiente y en las fechas
					especificadas, esto es, {adelantado}% de abono para reservar fecha,
					compra de materiales, contratación de personal y agendar trabajos (no
					reembolsables en caso de el cliente decida no realizar los trabajos o
					bien decida unilateralmente no continuar los trabajos una vez
					comenzados), y {contraEntrega} al término de éstos una vez entregada
					la propiedad.
				</Text>
			</Page>
		</Document>
	);
};
