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

// Default consignments — includes all transit fields
const DEFAULT_CONSIGNMENTS = [
  {
    id: 1, awb: "112112", trackingNo: "11727272", date: "2014-07-10",
    origin: "Jaipur", destination: "Jodhpur",
    consignor: "Test Sender", consignorMobile: "",
    consignee: "Test1", consigneeMobile: "9876543210", consigneeAddress: "Jodhpur",
    weight: "1.5", type: "Domestic", paymentMode: "Prepaid", forwarder: "FedEx", branch: "Jodhpur",
    status: "Delivered", statusDate: "2014-07-15",
    deliveredDate: "2014-07-15", deliveredTo: "Test1",
    transitCity: "", transitHub: "", transitArrived: "", transitDeparture: "", transitRemark: ""
  },
  {
    id: 2, awb: "112113", trackingNo: "443244160235", date: "2014-07-11",
    origin: "Jodhpur", destination: "Mumbai",
    consignor: "Ramesh Kumar", consignorMobile: "9876543200",
    consignee: "Suresh Shah", consigneeMobile: "9876543211", consigneeAddress: "Mumbai, Maharashtra",
    weight: "5", type: "Domestic", paymentMode: "To-Pay", forwarder: "Surface", branch: "Jodhpur",
    status: "In Transit", statusDate: "2014-07-12",
    deliveredDate: "", deliveredTo: "",
    transitCity: "Ahmedabad", transitHub: "Ahmedabad Sorting Hub",
    transitArrived: "2014-07-12T10:30", transitDeparture: "2014-07-12T18:00",
    transitRemark: "Parcel received at Ahmedabad hub, dispatched to Mumbai"
  },
  {
    id: 3, awb: "427455", trackingNo: "427455", date: "2014-11-04",
    origin: "Jodhpur", destination: "Jalore",
    consignor: "", consignorMobile: "", consignee: "", consigneeMobile: "", consigneeAddress: "Jalore",
    weight: "", type: "Domestic", paymentMode: "Prepaid", forwarder: "Surface", branch: "Jodhpur",
    status: "Out for Delivery", statusDate: "2014-11-05",
    deliveredDate: "", deliveredTo: "",
    transitCity: "Jalore", transitHub: "",
    transitArrived: "", transitDeparture: "",
    transitRemark: "Parcel out for delivery in Jalore"
  },
  {
    id: 4, awb: "782699", trackingNo: "284924", date: "2014-10-14",
    origin: "Jodhpur", destination: "Jaipur",
    consignor: "", consignorMobile: "", consignee: "", consigneeMobile: "", consigneeAddress: "Jaipur",
    weight: "", type: "Domestic", paymentMode: "Prepaid", forwarder: "Air", branch: "Jodhpur",
    status: "Delivered", statusDate: "2014-10-16",
    deliveredDate: "2014-10-16", deliveredTo: "Receiver",
    transitCity: "", transitHub: "", transitArrived: "", transitDeparture: "", transitRemark: ""
  },
  {
    id: 5, awb: "545678248454", trackingNo: "3534535", date: "2014-10-17",
    origin: "Jodhpur", destination: "USA",
    consignor: "Vijay Kumar", consignorMobile: "9314726460",
    consignee: "John Smith", consigneeMobile: "+15551234567", consigneeAddress: "New York, USA",
    weight: "3.2", type: "International", paymentMode: "Prepaid", forwarder: "FedEx", branch: "Jodhpur",
    status: "Delivered", statusDate: "2014-10-23",
    deliveredDate: "2014-10-23", deliveredTo: "John Smith",
    transitCity: "", transitHub: "", transitArrived: "", transitDeparture: "", transitRemark: ""
  },
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
