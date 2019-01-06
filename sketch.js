var serial; // variable to hold an instance of the serialport library
var inputMessage;
var shouldShowMessage = false;

function setup() {
  createCanvas(displayWidth, displayHeight);
  serial = new p5.SerialPort("192.168.178.28"); // !!!!!!!!!change ip address here!!!!!!!!!!!!!
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  // serial.list();
  serial.on('close', onClose);
  serial.on('open', onOpen);
  serial.on('error', onError);
  serial.on('connected', onConnected); // list the serial ports
  serial.open("/dev/cu.usbmodem14201", {
    baudrate: 115200
  }); // open a port
}

function draw() {
  background("black");
  fill(255);
  if (shouldShowMessage) {
    textAlign(CENTER, CENTER);
    text("Payment Done!\nEnjoy Your Coffee :) ",50,50);
    textSize(30);
    textFont('Roboto Slab');
  }
}

function onError(err) {
  console.log('err is', err)
}

function onClose() {
  console.log('port close')
}

function onOpen() {
  console.log('port open')
}

function onConnected() {
  console.log('conneted!')
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent(event) {

  inputMessage = serial.readStringUntil('\r\n');

  if (inputMessage.length > 0 && inputMessage.indexOf('[transfer]') >= 0) {
    console.log('inputMessage', inputMessage)
    inputMessage = inputMessage.trim();
    switch (inputMessage) {
      case 'done':
        shouldShowMessage = true;
        break;
      default:
        shouldShowMessage = true;
    }

    // digitalWrite = Boolean(inputMessage);
    // println(sensorValue);
  }
}
