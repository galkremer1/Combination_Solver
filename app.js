/// <reference path="xlsx.d.ts" />
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
function getNamesList(worksheet) {
    var names = [];
    var counter = 0;
    var addressCounter = 2;
    var address_of_cell = 'A' + addressCounter;
    var desired_cell = worksheet[address_of_cell];
    names.push({ name: desired_cell.v, offers: 0 });
    while (desired_cell !== undefined) {
        if (names[counter].name !== desired_cell.v) {
            names.push({ name: desired_cell.v, offers: 1 });
            counter++;
        }
        else {
            names[counter].offers++;
        }
        addressCounter++;
        address_of_cell = 'A' + addressCounter;
        desired_cell = worksheet[address_of_cell];
    }
    console.log(names);
    return names;
}
function getCombinationsArray(worksheet, namesList) {
    var possible = ['B', 'C', 'D', 'E', 'F'];
    var combination = [];
    var combinations = [];
    var addressCounter = 2;
    var Counter = 0;
    var address_of_cell = possible[Counter] + addressCounter;
    var desired_cell = worksheet[address_of_cell];
    for (var i = 0; i < namesList.length; i++) {
        for (var j = 0; j < namesList[i].offers; j++) {
            for (var k = 0; k < possible.length; k++) {
                var address_of_cell = possible[k] + addressCounter;
                combination.push(worksheet[address_of_cell].v);
            }
            addressCounter++;
            combinations.push(combination);
            combination = [];
        }
        namesList[i].combinations = combinations;
        console.log(combinations);
        combinations = [];
    }
}
function handleXls() {
    /* set up XMLHttpRequest */
    var url = "data/simple.xls";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function (e) {
        var arraybuffer = oReq.response;
        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
            arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        /* Call XLSX */
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        // var address_of_cell = 'A2';
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        var namesList = getNamesList(worksheet);
        getCombinationsArray(worksheet, namesList);
        /* Find desired cell */
        //  var desired_cell = worksheet[address_of_cell];
        /* Get the value */
        // desired_value = desired_cell.v;
    };
    oReq.send();
}
var desired_value;
handleXls();
//# sourceMappingURL=app.js.map