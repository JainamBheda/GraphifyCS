// controllers/cnController.js

// ARP Table example
const arpTable = [
  { ip: '192.168.0.1', mac: 'AA:BB:CC:DD:EE:01' },
  { ip: '192.168.0.2', mac: 'AA:BB:CC:DD:EE:02' },
  { ip: '192.168.0.3', mac: 'AA:BB:CC:DD:EE:03' }
];

// Routing Table example
const routingTable = [
  { destination: '192.168.0.0/24', gateway: '192.168.0.1', type: 'Static' },
  { destination: '192.168.1.0/24', gateway: '192.168.0.2', type: 'Dynamic' },
  { destination: '0.0.0.0/0', gateway: '192.168.0.1', type: 'Default' }
];

exports.getARPPage = (req, res) => {
  res.render('cn/arp', {
    title: 'ARP Simulator',
    arpTable
  });
};

exports.getRoutingPage = (req, res) => {
  res.render('cn/routing', {
    title: 'Routing Simulator',
    routingTable
  });
};

exports.getTCPIPPage = (req, res) => {
  res.render('cn/tcpip', {
    title: 'TCP/IP Visualizer'
  });
};
