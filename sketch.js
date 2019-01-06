var serial; // variable to hold an instance of the serialport library
var digitalWrite = false; // ellipse position
var inputMessage;

function setup() {
  createCanvas(screen.width, screen.height);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
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
  background("#2307AF");
  fill(255);
  if (inputMessage && inputMessage.length > 0) {
    //ellipse(width / 2, height / 2, 20, 20);
    text("Done!", width/2-20, height/2);
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
        digitalWrite = true;
        break;
      default:
        digitalWrite = false;
    }

    // digitalWrite = Boolean(inputMessage);
    // println(sensorValue);
  }
}
