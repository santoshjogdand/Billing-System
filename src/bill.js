let ProductValues = localStorage.getItem('ProductValues');
let CustomerValues = localStorage.getItem('CustomerValues');
let BillNo = localStorage.getItem('BillNo');
let ProductsData = JSON.parse(ProductValues)
let CustomerData = JSON.parse(CustomerValues)
    console.log("Customer Data: ",CustomerData)
    console.log("Products Data: ",ProductsData)

let srnoele = document.getElementById("SrNumbers")
let ProductNames = document.getElementById("ProductNames")
let hsns = document.getElementById("hsns")
let qtys = document.getElementById("qtys")
let rates = document.getElementById("rates")
let gsts = document.getElementById("gsts")
let amounts = document.getElementById("amounts")
let custName = document.getElementById("name")
let CustAddress = document.getElementById("cAddress")
let CustPhoneNumber= document.getElementById("cMobNo")
let InvoiceNo= document.getElementById("iNo")
let SubTotal= document.getElementById("SubTotal")
let TaxableAmount = document.getElementById("txblAmt") 
let Cgst = document.getElementById("finalCgst") 
let Sgst = document.getElementById("finalSgst") 
let RoundOff = document.getElementById("finalRoundOff")
let FinalGST = document.getElementById("FinalGST")
let FinalBill = document.getElementById("FinalBill")
let FinalGrandTotal = document.getElementById("FinalGrandTotal")
let RateWise = Array.from(document.getElementById("RateWise").children)
let GSTIN = document.getElementById("cGSTIN")
let date = document.getElementById("bDate")
date.textContent = getFormattedDate()


    custName.textContent = CustomerData.first_name+" "+CustomerData.last_name
if (custName.textContent == "undefined undefined") {
        custName.textContent = '';
} 
CustAddress.textContent = CustomerData.address
CustPhoneNumber.textContent = CustomerData.ph_no
CustPhoneNumber.textContent = CustomerData.ph_no
InvoiceNo.textContent = "GT/"+ProductsData[ProductsData.length-1]
SubTotal.textContent = ProductsData[ProductsData.length-2].SubTotal
TaxableAmount.textContent = (Number(ProductsData[ProductsData.length-2].SubTotal)).toFixed(3)
let gst = Number((9/100)*ProductsData[ProductsData.length-2].SubTotal)
console.log(gst)
Cgst.textContent = gst.toFixed(3)
Sgst.textContent = gst.toFixed(3)
let Fgst = Number((Number(gst)+Number(gst)).toFixed(3))
console.log(Fgst)
FinalGST.textContent =  numberToWordsINR(Number(Fgst))
RoundOff.textContent = ProductsData[1].roundOff 
FinalBill.textContent = numberToWordsINR(Number(ProductsData[ProductsData.length-2].GrandTotal))
FinalGrandTotal.textContent =addCommas(Number((ProductsData[ProductsData.length-2].GrandTotal)).toFixed(2))
console.log(FinalGrandTotal.textContent)
RateWise[1].textContent = (Number(ProductsData[ProductsData.length-2].SubTotal)).toFixed(3)
RateWise[2].textContent = gst.toFixed(3)
RateWise[3].textContent = gst.toFixed(3)    
GSTIN.textContent = CustomerData.gstin

srnoele.innerHTML = ''
ProductNames.innerHTML = ''
hsns.innerHTML = ''
qtys.innerHTML = ''
rates.innerHTML = ''
gsts.innerHTML = ''
amounts.innerHTML = ''
let counter = 0
for(let i = 0; i<ProductsData.length - 2; i++){
    if(!(''==ProductsData[i].pname)){
    let spanSr = document.createElement("span")
    let spanProduct = document.createElement("span")
    let spanHsn = document.createElement("span")
    let spanqty = document.createElement("span")
    let spanqrate = document.createElement("span")
    let spangst = document.createElement("span")
    let spanamount = document.createElement("span") 
    spanSr.textContent = ++counter
    spanProduct.textContent = ProductsData[i].pname
    spanHsn.textContent = ProductsData[i].phsn
    spanqty.textContent = ProductsData[i].pqty  
    spanqrate.textContent = ProductsData[i].prate 
    let gst = "18%"
    let amount = (ProductsData[i].prate * ProductsData[i].pqty)
    spangst.textContent = (gst)
    spanamount.textContent = amount.toFixed(2)

    srnoele.appendChild(spanSr)
    ProductNames.appendChild(spanProduct)
    hsns.appendChild(spanHsn)
    qtys.appendChild(spanqty)
    rates.appendChild(spanqrate)
    gsts.appendChild(spangst)
    amounts.appendChild(spanamount)
    }
    else{
        continue;
    }

}
function printMe() {
    window.print();
}
let link = ''

function generatePDF() {
    var element = document.getElementById('tab');
    var opt = {
        margin:       1,
        filename:     `invoice-${"GT/"+ProductsData[2]}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 5 },
        jsPDF:        { unit: 'cm', format: 'a4', orientation: 'portrait' }
    };
    // console.log(opt.filename)
    // link = html2pdf().from(element).set(opt)
    html2pdf().from(element).set(opt).save();
}

function numberToWordsINR(num) {
    const belowTen = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const belowTwenty = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const belowHundred = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    function helper(n) {
        if (n < 10) return belowTen[n];
        if (n < 20) return belowTwenty[n - 10];
        if (n < 100) return belowHundred[Math.floor(n / 10)] + (n % 10 ? ' ' + belowTen[n % 10] : '');
        if (n < 1000) return belowTen[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + helper(n % 100) : '');
        if (n < 100000) return helper(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + helper(n % 1000) : '');
        if (n < 10000000) return helper(Math.floor(n / 100000)) + ' lakh' + (n % 100000 ? ' ' + helper(n % 100000) : '');
        if (n < 1000000000) return helper(Math.floor(n / 10000000)) + ' crore' + (n % 10000000 ? ' ' + helper(n % 10000000) : '');
        return '';
    }

    function convertDecimal(decimal) {
        if (!decimal || decimal === '00') return '';
        return ' and ' + (decimal < 10 ? '0' + decimal : decimal) + '/100';
    }

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    num = Number(num).toFixed(2);

    const parts = num.split('.');
    const rupees = parseInt(parts[0], 10);
    const paise = parts[1] ? parseInt(parts[1].slice(0, 2), 10) : 0;

    const rupeeWord = rupees === 1 ? ' rupee' : ' rupees';
    const paiseWord = paise === 1 ? ' paisa' : ' paise';

    let result = `${helper(rupees)}${rupeeWord}`;

    if (paise > 0) {
        result += ` and ${helper(paise)}${paiseWord}`;
    }
    if(!(num<1)){
     return capitalizeFirstLetter(result + ' only');
    }
    return ''

}

// Example usage
const num = 112.012; // example amount
console.log(numberToWordsINR(3030)); // Output: "One Hundred Twelve Rupees And One Paisa Only"

function addCommas(num) {
    let numStr = num.toString();
    let parts = numStr.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}


function getFormattedDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}