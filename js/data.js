// ============================================================
// CargoShare – Sample Data (8 Trains + Users + Bookings)
// ============================================================

const SAMPLE_TRAINS = [
  {
    id: 'train_001',
    trainNumber: '12673',
    trainName: 'Cheran Express',
    source: 'Chennai',
    destination: 'Coimbatore',
    date: '2026-09-01',
    departureTime: '18:30',
    arrivalTime: '23:15',
    totalCapacity: 5000,
    availableCapacity: 2800,
    allowedCargoTypes: ['Textiles', 'Electronics', 'Perishables', 'General Goods'],
    pricePerKg: 5.00,
    status: 'active',
    stops: ['Chennai Central', 'Katpadi', 'Salem', 'Erode', 'Coimbatore']
  },
  {
    id: 'train_002',
    trainNumber: '12674',
    trainName: 'Pearl City Express',
    source: 'Chennai',
    destination: 'Madurai',
    date: '2026-09-01',
    departureTime: '20:00',
    arrivalTime: '04:30',
    totalCapacity: 4000,
    availableCapacity: 3200,
    allowedCargoTypes: ['Textiles', 'Handicrafts', 'General Goods', 'Machinery'],
    pricePerKg: 4.50,
    status: 'active',
    stops: ['Chennai Central', 'Villupuram', 'Trichy', 'Dindigul', 'Madurai']
  },
  {
    id: 'train_003',
    trainNumber: '12675',
    trainName: 'Kovai Express',
    source: 'Chennai',
    destination: 'Coimbatore',
    date: '2026-09-01',
    departureTime: '22:00',
    arrivalTime: '03:45',
    totalCapacity: 6000,
    availableCapacity: 650,
    allowedCargoTypes: ['Textiles', 'General Goods', 'Pharmaceuticals'],
    pricePerKg: 5.50,
    status: 'active',
    stops: ['Chennai Central', 'Katpadi', 'Salem', 'Erode', 'Tiruppur', 'Coimbatore']
  },
  {
    id: 'train_004',
    trainNumber: '12676',
    trainName: 'Lalbagh Express',
    source: 'Bengaluru',
    destination: 'Chennai',
    date: '2026-09-01',
    departureTime: '06:00',
    arrivalTime: '11:30',
    totalCapacity: 5500,
    availableCapacity: 4000,
    allowedCargoTypes: ['Electronics', 'Machinery', 'Textiles', 'General Goods'],
    pricePerKg: 5.20,
    status: 'active',
    stops: ['Bengaluru City', 'Krishnarajapuram', 'Bangarpet', 'Jolarpettai', 'Katpadi', 'Chennai']
  },
  {
    id: 'train_005',
    trainNumber: '16021',
    trainName: 'Kaveri Express',
    source: 'Chennai',
    destination: 'Coimbatore',
    date: '2026-09-01',
    departureTime: '07:15',
    arrivalTime: '13:30',
    totalCapacity: 4500,
    availableCapacity: 0,
    allowedCargoTypes: ['General Goods', 'Textiles'],
    pricePerKg: 4.00,
    status: 'active',
    stops: ['Chennai Egmore', 'Vriddhachalam', 'Salem', 'Erode', 'Coimbatore']
  },
  {
    id: 'train_006',
    trainNumber: '12163',
    trainName: 'Bengaluru Express',
    source: 'Bengaluru',
    destination: 'Chennai',
    date: '2026-09-01',
    departureTime: '23:00',
    arrivalTime: '05:00',
    totalCapacity: 5000,
    availableCapacity: 3500,
    allowedCargoTypes: ['Electronics', 'Pharmaceuticals', 'General Goods', 'Perishables'],
    pricePerKg: 5.00,
    status: 'active',
    stops: ['Bengaluru City', 'Krishnarajapuram', 'Jolarpettai', 'Katpadi', 'Chennai Central']
  },
  {
    id: 'train_007',
    trainNumber: '12707',
    trainName: 'Deccan Express',
    source: 'Hyderabad',
    destination: 'Chennai',
    date: '2026-09-01',
    departureTime: '15:45',
    arrivalTime: '05:15',
    totalCapacity: 6000,
    availableCapacity: 900,
    allowedCargoTypes: ['Pharmaceuticals', 'Electronics', 'General Goods', 'Machinery'],
    pricePerKg: 6.00,
    status: 'active',
    stops: ['Hyderabad Deccan', 'Nalgonda', 'Miryalaguda', 'Guntur', 'Nellore', 'Chennai']
  },
  {
    id: 'train_008',
    trainNumber: '11013',
    trainName: 'Coimbatore Express',
    source: 'Coimbatore',
    destination: 'Bengaluru',
    date: '2026-09-01',
    departureTime: '09:30',
    arrivalTime: '15:45',
    totalCapacity: 4000,
    availableCapacity: 2200,
    allowedCargoTypes: ['Textiles', 'Machinery', 'General Goods', 'Agricultural Products'],
    pricePerKg: 4.80,
    status: 'active',
    stops: ['Coimbatore', 'Tiruppur', 'Salem', 'Dharmapuri', 'Hosur', 'Bengaluru City']
  }
];

const SAMPLE_BOOKINGS = [
  {
    id: 'booking_001',
    bookingId: 'CS10245',
    userId: 'trader_001',
    trainId: 'train_001',
    trainNumber: '12673',
    trainName: 'Cheran Express',
    source: 'Chennai',
    destination: 'Coimbatore',
    departureTime: '18:30',
    arrivalTime: '23:15',
    cargoName: 'Cotton Textiles',
    cargoType: 'Textiles',
    weight: 300,
    packageCount: 15,
    dimensions: '60x40x30 cm each',
    senderDetails: { name: 'Ravi Kumar', phone: '9876543210', address: '12 Textile Street, Chennai - 600001' },
    receiverDetails: { name: 'Selvam Trading Co.', phone: '9988776655', address: '45 Market Road, Coimbatore - 641001' },
    price: { base: 1500, handling: 200, serviceFee: 100, total: 1800 },
    status: 'confirmed',
    trackingStatus: 'cargo_loaded',
    createdAt: '2026-08-25T10:30:00Z',
    date: '2026-09-01'
  },
  {
    id: 'booking_002',
    bookingId: 'CS10246',
    userId: 'trader_001',
    trainId: 'train_004',
    trainNumber: '12676',
    trainName: 'Lalbagh Express',
    source: 'Bengaluru',
    destination: 'Chennai',
    departureTime: '06:00',
    arrivalTime: '11:30',
    cargoName: 'Electronic Components',
    cargoType: 'Electronics',
    weight: 150,
    packageCount: 8,
    dimensions: '40x30x20 cm each',
    senderDetails: { name: 'Tech Parts Ltd.', phone: '9123456789', address: '78 Electronics Zone, Bengaluru - 560001' },
    receiverDetails: { name: 'Senthil Enterprises', phone: '9876543210', address: '23 Anna Nagar, Chennai - 600040' },
    price: { base: 780, handling: 150, serviceFee: 70, total: 1000 },
    status: 'confirmed',
    trackingStatus: 'booking_confirmed',
    createdAt: '2026-08-26T08:00:00Z',
    date: '2026-09-01'
  },
  {
    id: 'booking_003',
    bookingId: 'CS10240',
    userId: 'trader_001',
    trainId: 'train_002',
    trainNumber: '12674',
    trainName: 'Pearl City Express',
    source: 'Chennai',
    destination: 'Madurai',
    departureTime: '20:00',
    arrivalTime: '04:30',
    cargoName: 'Silk Sarees',
    cargoType: 'Textiles',
    weight: 80,
    packageCount: 5,
    dimensions: '50x30x20 cm each',
    senderDetails: { name: 'Senthil Kumar', phone: '9876543210', address: '12 Textile Street, Chennai' },
    receiverDetails: { name: 'Meenakshi Textiles', phone: '9944556677', address: '7 Madurai Road, Madurai' },
    price: { base: 360, handling: 80, serviceFee: 60, total: 500 },
    status: 'delivered',
    trackingStatus: 'delivered',
    createdAt: '2026-08-10T14:00:00Z',
    date: '2026-08-15'
  }
];

const SAMPLE_NOTIFICATIONS = [
  {
    id: 'notif_001', userId: 'trader_001',
    title: 'Booking Confirmed! 🎉',
    message: 'Your cargo booking CS10245 for Train 12673 (Chennai → Coimbatore) has been confirmed.',
    type: 'booking_confirmed', read: false, createdAt: '2026-08-25T10:31:00Z'
  },
  {
    id: 'notif_002', userId: 'trader_001',
    title: 'Cargo Loaded 📦',
    message: 'Your cargo CS10245 (300 kg Textiles) has been loaded onto Train 12673.',
    type: 'cargo_loaded', read: false, createdAt: '2026-08-26T07:00:00Z'
  },
  {
    id: 'notif_003', userId: 'trader_001',
    title: 'Delivery Completed ✅',
    message: 'Your cargo CS10240 (Silk Sarees) has been delivered to Meenakshi Textiles in Madurai.',
    type: 'delivered', read: true, createdAt: '2026-08-15T09:30:00Z'
  },
  {
    id: 'notif_004', userId: 'trader_001',
    title: 'New Booking Confirmed',
    message: 'Booking CS10246 (Electronic Components, 150 kg) for Train 12676 confirmed.',
    type: 'booking_confirmed', read: true, createdAt: '2026-08-26T08:01:00Z'
  }
];

const SAMPLE_TRADERS = [
  {
    id: 'trader_001',
    name: 'Senthil Kumar',
    companyName: 'SK Exports & Trading Co.',
    email: 'senthil@skexports.com',
    phone: '9876543210',
    businessType: 'Textiles Exporter',
    city: 'Chennai',
    address: '12 Textile Street, T. Nagar, Chennai - 600017',
    role: 'trader',
    status: 'active',
    createdAt: '2026-07-01T00:00:00Z',
    totalBookings: 3,
    activeShipments: 2
  }
];

// ─── Demo Data Manager ────────────────────────────────────────
const DemoData = {
  init() {
    if (!localStorage.getItem('cs_trains'))       localStorage.setItem('cs_trains',       JSON.stringify(SAMPLE_TRAINS));
    if (!localStorage.getItem('cs_bookings'))     localStorage.setItem('cs_bookings',     JSON.stringify(SAMPLE_BOOKINGS));
    if (!localStorage.getItem('cs_notifications'))localStorage.setItem('cs_notifications',JSON.stringify(SAMPLE_NOTIFICATIONS));
    if (!localStorage.getItem('cs_traders'))      localStorage.setItem('cs_traders',      JSON.stringify(SAMPLE_TRADERS));
    // Create demo admin
    if (!localStorage.getItem('cs_admins')) {
      localStorage.setItem('cs_admins', JSON.stringify([
        { id: 'admin_001', name: 'Admin User', email: 'admin@cargoshare.in', password: 'admin123', role: 'admin' }
      ]));
    }
    // Create demo trader account if not exists
    const users = JSON.parse(localStorage.getItem('cs_users') || '[]');
    if (!users.find(u => u.email === 'trader@demo.com')) {
      users.push({
        id: 'trader_001', name: 'Senthil Kumar', email: 'trader@demo.com',
        password: 'trader123', role: 'trader',
        companyName: 'SK Exports & Trading Co.', phone: '9876543210',
        businessType: 'Textiles Exporter', city: 'Chennai',
        address: '12 Textile Street, T. Nagar, Chennai - 600017',
        status: 'active', createdAt: new Date().toISOString()
      });
      localStorage.setItem('cs_users', JSON.stringify(users));
    }
  },

  getTrains()    { return JSON.parse(localStorage.getItem('cs_trains') || '[]'); },
  saveTrains(t)  { localStorage.setItem('cs_trains', JSON.stringify(t)); },

  getBookings()  { return JSON.parse(localStorage.getItem('cs_bookings') || '[]'); },
  saveBookings(b){ localStorage.setItem('cs_bookings', JSON.stringify(b)); },

  getNotifs(uid) {
    const all = JSON.parse(localStorage.getItem('cs_notifications') || '[]');
    return uid ? all.filter(n => n.userId === uid) : all;
  },
  saveNotifs(n)  { localStorage.setItem('cs_notifications', JSON.stringify(n)); },

  getTraders()   { return JSON.parse(localStorage.getItem('cs_traders') || '[]'); },
  saveTraders(t) { localStorage.setItem('cs_traders', JSON.stringify(t)); },

  getUsers()     { return JSON.parse(localStorage.getItem('cs_users') || '[]'); },
  saveUsers(u)   { localStorage.setItem('cs_users', JSON.stringify(u)); },

  findTrain(id)  { return this.getTrains().find(t => t.id === id); },
  findBooking(id){ return this.getBookings().find(b => b.id === id || b.bookingId === id); },

  updateTrainCapacity(trainId, newAvailable) {
    const trains = this.getTrains();
    const idx = trains.findIndex(t => t.id === trainId);
    if (idx !== -1) {
      trains[idx].availableCapacity = newAvailable;
      this.saveTrains(trains);
      // Dispatch event for real-time update simulation
      window.dispatchEvent(new CustomEvent('capacityUpdated', { detail: { trainId, newAvailable } }));
    }
  },

  addBooking(booking) {
    const bookings = this.getBookings();
    bookings.push(booking);
    this.saveBookings(bookings);
    // Deduct capacity
    this.updateTrainCapacity(booking.trainId,
      (this.findTrain(booking.trainId)?.availableCapacity || 0) - booking.weight);
  },

  addNotification(notif) {
    const notifs = JSON.parse(localStorage.getItem('cs_notifications') || '[]');
    notifs.unshift(notif);
    this.saveNotifs(notifs);
  },

  searchTrains(from, to, date, goodsType, weight) {
    return this.getTrains().filter(t => {
      const matchFrom = !from || t.source.toLowerCase().includes(from.toLowerCase());
      const matchTo   = !to   || t.destination.toLowerCase().includes(to.toLowerCase());
      const matchType = !goodsType || t.allowedCargoTypes.some(c =>
        c.toLowerCase().includes(goodsType.toLowerCase()) || goodsType.toLowerCase().includes(c.toLowerCase())
      );
      return matchFrom && matchTo && t.status === 'active';
    });
  }
};

// Init on load
DemoData.init();
