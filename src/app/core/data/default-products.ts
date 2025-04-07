import { Product } from '../models/product.model';

export const defaultProducts: Product[] = [
  { 
    id: 1, 
    name: 'Premium Headphones', 
    category: 'Audio', 
    price: 149.99, 
    stock: 25, 
    imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.UhmfxQdpMsf_W5b_5x4DNAHaHa&w=474&h=474&c=7',
    color: 'Black',
    description: 'High-quality over-ear headphones with noise cancellation.',
    brand: 'SoundMaster'
  },
  { 
    id: 2, 
    name: 'Wireless Mouse', 
    category: 'Accessories', 
    price: 29.99, 
    stock: 50, 
    imageUrl: 'https://images.unsplash.com/photo-1618424181143-15e9d3bd2c8b?w=600',
    color: 'White',
    brand: 'TechGear'
  },
  { 
    id: 3, 
    name: 'Mechanical Keyboard', 
    category: 'Accessories', 
    price: 89.99, 
    stock: 30, 
    imageUrl: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=600',
    description: 'RGB backlit mechanical keyboard with tactile switches.',
    brand: 'KeyPro'
  },
  { 
    id: 4, 
    name: 'Gaming Monitor', 
    category: 'Monitors', 
    price: 299.99, 
    stock: 15, 
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7f1a6c8a1c59?w=600',
    color: 'Black',
    brand: 'ViewSonic'
  },
  { 
    id: 5, 
    name: 'Laptop Stand', 
    category: 'Accessories', 
    price: 24.99, 
    stock: 40, 
    imageUrl: 'https://images.unsplash.com/photo-1612817157615-b0c9c3714d3d?w=600',
    color: 'Silver',
    description: 'Adjustable aluminum laptop stand for ergonomic use.'
  },
  { 
    id: 6, 
    name: 'Bluetooth Speaker', 
    category: 'Audio', 
    price: 79.99, 
    stock: 20, 
    imageUrl: 'https://images.unsplash.com/photo-1587574293340-ec32352a16c9?w=600',
    color: 'Blue',
    brand: 'SoundWave'
  },
  { 
    id: 7, 
    name: 'USB-C Hub', 
    category: 'Accessories', 
    price: 39.99, 
    stock: 35, 
    imageUrl: 'https://images.unsplash.com/photo-1638389133398-5d5e4b82c1ef?w=600',
    description: 'Multi-port USB-C hub with HDMI and USB 3.0.'
  },
  { 
    id: 8, 
    name: 'Webcam', 
    category: 'Accessories', 
    price: 59.99, 
    stock: 18, 
    imageUrl: 'https://images.unsplash.com/photo-1617289500055-abea1ec4c27d?w=600',
    color: 'Black',
    brand: 'VisionTech'
  },
  { 
    id: 9, 
    name: 'External SSD', 
    category: 'Storage', 
    price: 119.99, 
    stock: 12, 
    imageUrl: 'https://images.unsplash.com/photo-1612531386530-9b33d9b43a9e?w=600',
    description: '1TB portable SSD with fast read/write speeds.',
    brand: 'StoreFast'
  },
  { 
    id: 10, 
    name: 'Smartphone Case', 
    category: 'Accessories', 
    price: 19.99, 
    stock: 60, 
    imageUrl: 'https://images.unsplash.com/photo-1607706189992-eae578626c3b?w=600',
    color: 'Clear'
  },
  { 
    id: 11, 
    name: 'Smart Googles', 
    category: 'Wearables', 
    price: 179.99, 
    stock: 8, 
    imageUrl: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600',
    description: 'Smart goggles with augmented reality features.',
    brand: 'TechVision'
  },
  { 
    id: 12, 
    name: 'Autonomous Toy', 
    category: 'Toys', 
    price: 232.99, 
    stock: 5, 
    imageUrl: 'https://images.unsplash.com/photo-1592417817039-2c69eaa43df6?w=600',
    color: 'Red',
    brand: 'PlayBot'
  },
  { 
    id: 13, 
    name: 'Wireless Charger', 
    category: 'Accessories', 
    price: 34.99, 
    stock: 45, 
    imageUrl: 'https://images.unsplash.com/photo-1591290619618-904f6dd935e3?w=600',
    color: 'Black',
    description: 'Fast wireless charging pad compatible with all Qi devices.',
    brand: 'ChargePro'
  },
  { 
    id: 14, 
    name: 'Noise Cancelling Earbuds', 
    category: 'Audio', 
    price: 99.99, 
    stock: 22, 
    imageUrl: 'https://images.unsplash.com/photo-1600267165780-596b6c41fa5b?w=600',
    color: 'White',
    brand: 'SilentBeat',
    description: 'Compact earbuds with active noise cancelling technology.'
  },
  { 
    id: 15, 
    name: 'Smartwatch', 
    category: 'Wearables', 
    price: 199.99, 
    stock: 10, 
    imageUrl: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600',
    color: 'Silver',
    description: 'Fitness tracking smartwatch with heart rate monitor.',
    brand: 'WristTech'
  },
  { 
    id: 16, 
    name: 'Graphic Tablet', 
    category: 'Accessories', 
    price: 149.99, 
    stock: 14, 
    imageUrl: 'https://images.unsplash.com/photo-1612817157615-b0c9c3714d3d?w=600',
    description: 'Digital drawing tablet with pressure-sensitive pen.',
    brand: 'DrawMaster'
  },
  { 
    id: 17, 
    name: 'Smart LED Light Strip', 
    category: 'Home', 
    price: 44.99, 
    stock: 33, 
    imageUrl: 'https://images.unsplash.com/photo-1632827437035-81117b4a9d93?w=600',
    color: 'RGB',
    brand: 'BrightGlow'
  },
  { 
    id: 18, 
    name: 'Drone with Camera', 
    category: 'Toys', 
    price: 259.99, 
    stock: 7, 
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    description: 'HD camera drone with GPS and auto return.',
    brand: 'SkyEye'
  },
  { 
    id: 19, 
    name: 'Portable Projector', 
    category: 'Electronics', 
    price: 189.99, 
    stock: 9, 
    imageUrl: 'https://images.unsplash.com/photo-1619024466160-c6cfbdfd45e1?w=600',
    color: 'White',
    brand: 'CineBeam'
  },
  { 
    id: 20, 
    name: 'VR Headset', 
    category: 'Wearables', 
    price: 349.99, 
    stock: 6, 
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b82b5f4?w=600',
    description: 'Virtual reality headset with immersive experience.',
    brand: 'VirtualZone'
  },
  { 
    id: 21, 
    name: 'Smart Thermostat', 
    category: 'Home', 
    price: 129.99, 
    stock: 11, 
    imageUrl: 'https://images.unsplash.com/photo-1608889175119-cc55b7473e27?w=600',
    brand: 'EcoTemp',
    color: 'Black',
    description: 'Energy-saving smart thermostat with remote access.'
  },
  { 
    id: 22, 
    name: 'Portable Power Bank', 
    category: 'Accessories', 
    price: 39.99, 
    stock: 55, 
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-a990b92c5f04?w=600',
    color: 'Blue',
    brand: 'PowerGo'
  },
];
