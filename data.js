// =========================================
// VK EXPRESS — DATA STORE (localStorage)
// =========================================

// Default branches from DB
const DEFAULT_BRANCHES = [
  { id: 1, city: "Jodhpur (HO)", address: "114, Amer Chamber Jalori Gate, Olympic Road, Jodhpur", mobile: "9314726460", phone: "0291-2613165", mail: "info@vkexpress.in", status: 1 },
  { id: 2, city: "Jaipur", address: "4 Adarsh Plaza Khasa Kothi Circle, Jaipur", mobile: "9314081842", phone: "0141-4101842", mail: "jainexpresscourier@yahoo.co.in", status: 1 },
  { id: 3, city: "Ahmedabad", address: "9, Nana Lal Chambers Opp Times Of India, Ashram Road, Ahmedabad", mobile: "8460008386", phone: "079-26581038", mail: "combined_amd@yahoo.com", status: 1 },
  { id: 4, city: "Ajmer", address: "Bangali Gali Kutchary Road, Ajmer", mobile: "01453290488", phone: "01453290488", mail: "info@vkexpress.in", status: 1 },
  { id: 5, city: "Delhi", address: "Delhi Branch, Contact HO for details", mobile: "9314726460", phone: "0291-2613165", mail: "info@vkexpress.in", status: 1 },
  { id: 6, city: "Mumbai", address: "Mumbai Branch, Contact HO for details", mobile: "9314726460", phone: "0291-2613165", mail: "info@vkexpress.in", status: 1 },
];

// Default consignments from SQL data
const DEFAULT_CONSIGNMENTS = [
  { id: 1, awb: "112112", trackingNo: "11727272", date: "2014-07-10", origin: "Jaipur", destination: "Jodhpur", consignor: "Test Sender", consignorMobile: "", consignee: "Test1", consigneeMobile: "9876543210", consigneeAddress: "Jodhpur", weight: "1.5", type: "Domestic", paymentMode: "Prepaid", status: "Delivered", deliveredDate: "2014-07-15", deliveredTo: "Test1", forwarder: "FedEx", branch: "Jodhpur" },
  { id: 2, awb: "112113", trackingNo: "443244160235", date: "2014-07-11", origin: "Jodhpur", destination: "Jaipur", consignor: "dsadfs", consignorMobile: "", consignee: "Test2", consigneeMobile: "9876543211", consigneeAddress: "Jodhpur", weight: "5654", type: "International", paymentMode: "To-Pay", status: "Delivered", deliveredDate: "2014-10-18", deliveredTo: "ram", forwarder: "DHL", branch: "Jodhpur" },
  { id: 3, awb: "782699", trackingNo: "284924", date: "2014-10-14", origin: "Jodhpur", destination: "Jalore", consignor: "", consignorMobile: "", consignee: "", consigneeMobile: "", consigneeAddress: "Jalore", weight: "", type: "Domestic", paymentMode: "Prepaid", status: "Delivered", deliveredDate: "", deliveredTo: "", forwarder: "Surface", branch: "Jodhpur" },
  { id: 4, awb: "427455", trackingNo: "427455", date: "2014-11-04", origin: "Jodhpur", destination: "Jalore", consignor: "", consignorMobile: "", consignee: "", consigneeMobile: "", consigneeAddress: "Jalore", weight: "", type: "Domestic", paymentMode: "Prepaid", status: "In Transit", deliveredDate: "", deliveredTo: "", forwarder: "Surface", branch: "Jodhpur" },
  { id: 5, awb: "427463", trackingNo: "427463", date: "2014-11-03", origin: "Jodhpur", destination: "Sojat City", consignor: "", consignorMobile: "", consignee: "", consigneeMobile: "", consigneeAddress: "Sojat City", weight: "", type: "Domestic", paymentMode: "Prepaid", status: "In Transit", deliveredDate: "", deliveredTo: "", forwarder: "Surface", branch: "Jodhpur" },
  { id: 6, awb: "545678248454", trackingNo: "3534535", date: "2014-10-17", origin: "Jodhpur", destination: "Barmer", consignor: "gfytytr", consignorMobile: "457876", consignee: "qesrerer", consigneeMobile: "75675686876", consigneeAddress: "Barmer", weight: "523353", type: "International", paymentMode: "COD", status: "Delivered", deliveredDate: "2014-10-23", deliveredTo: "xcvccv", forwarder: "UPS", branch: "Ajmer" },
];

// =========================================
// DATA ACCESS FUNCTIONS
// =========================================

function getConsignments() {
  const stored = localStorage.getItem('vkexpress_consignments');
  if (!stored) {
    localStorage.setItem('vkexpress_consignments', JSON.stringify(DEFAULT_CONSIGNMENTS));
    return DEFAULT_CONSIGNMENTS;
  }
  return JSON.parse(stored);
}

function saveConsignments(data) {
  localStorage.setItem('vkexpress_consignments', JSON.stringify(data));
}

function getBranches() {
  const stored = localStorage.getItem('vkexpress_branches');
  if (!stored) {
    localStorage.setItem('vkexpress_branches', JSON.stringify(DEFAULT_BRANCHES));
    return DEFAULT_BRANCHES;
  }
  return JSON.parse(stored);
}

function saveBranches(data) {
  localStorage.setItem('vkexpress_branches', JSON.stringify(data));
}

function getNextId(arr) {
  if (!arr.length) return 1;
  return Math.max(...arr.map(x => x.id)) + 1;
}
