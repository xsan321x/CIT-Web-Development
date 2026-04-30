export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Footwear',
  'Sports & Fitness',
  'Home & Kitchen',
  'Books',
  'Beauty & Health',
  'Toys & Games',
  'Accessories',
  'Food & Beverages',
  'Custom'
];

// Returns a consistent image URL for a product title
export const getProductImage = (title, category) => {
  const seeds = {
    'Electronics': 'tech',
    'Clothing': 'fashion',
    'Footwear': 'shoes',
    'Sports & Fitness': 'fitness',
    'Home & Kitchen': 'kitchen',
    'Books': 'books',
    'Beauty & Health': 'beauty',
    'Toys & Games': 'toys',
    'Accessories': 'accessories',
    'Food & Beverages': 'food',
  };
  const seed = seeds[category] || 'product';
  const hash = (title || 'default').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}${hash % 100}/400/300`;
};

export const SEED_PRODUCTS = [
  // Electronics
  { title: 'iPhone 15 Pro Max', price: 1199.99, category: 'Electronics', description: 'Apple flagship with titanium design and A17 Pro chip.' },
  { title: 'Samsung 55" 4K Smart TV', price: 799.99, category: 'Electronics', description: 'Crystal clear 4K QLED display with smart features.' },
  { title: 'Sony WH-1000XM5 Headphones', price: 349.99, category: 'Electronics', description: 'Industry-leading noise cancellation and 30hr battery.' },
  { title: 'MacBook Air M3', price: 1299.99, category: 'Electronics', description: 'Ultra-thin laptop powered by Apple M3 chip.' },
  { title: 'iPad Pro 12.9"', price: 1099.99, category: 'Electronics', description: 'Professional tablet with Liquid Retina XDR display.' },
  { title: 'Nintendo Switch OLED', price: 349.99, category: 'Electronics', description: 'Vibrant OLED screen gaming console, play anywhere.' },
  { title: 'Canon EOS R50 Camera', price: 899.99, category: 'Electronics', description: 'Mirrorless camera with 24.2MP sensor for creators.' },
  { title: 'AirPods Pro 2nd Gen', price: 249.99, category: 'Electronics', description: 'Active noise cancellation with Adaptive Transparency.' },
  { title: 'Dell XPS 15 Laptop', price: 1499.99, category: 'Electronics', description: 'Premium laptop with InfinityEdge display.' },
  { title: 'Bose SoundLink Speaker', price: 149.99, category: 'Electronics', description: 'Portable Bluetooth speaker with deep bass.' },

  // Clothing
  { title: 'Classic White Oxford Shirt', price: 59.99, category: 'Clothing', description: 'Timeless cotton oxford shirt for any occasion.' },
  { title: 'Slim Fit Chinos', price: 49.99, category: 'Clothing', description: 'Versatile stretch chinos in multiple colors.' },
  { title: 'Merino Wool Sweater', price: 89.99, category: 'Clothing', description: 'Soft, lightweight merino wool for all seasons.' },
  { title: 'Leather Biker Jacket', price: 199.99, category: 'Clothing', description: 'Classic genuine leather jacket with modern fit.' },
  { title: 'Floral Summer Dress', price: 69.99, category: 'Clothing', description: 'Breezy floral print midi dress for warm days.' },
  { title: 'Slim Denim Jacket', price: 79.99, category: 'Clothing', description: 'Versatile denim jacket, perfect for layering.' },
  { title: 'Running Windbreaker', price: 89.99, category: 'Clothing', description: 'Lightweight and packable windbreaker for runners.' },
  { title: 'Cashmere Turtleneck', price: 149.99, category: 'Clothing', description: 'Luxuriously soft cashmere for cold days.' },
  { title: 'Graphic Tee 3-Pack', price: 39.99, category: 'Clothing', description: 'Three stylish graphic tees in one pack.' },
  { title: 'Tailored Formal Blazer', price: 129.99, category: 'Clothing', description: 'Sharp blazer for professional and formal events.' },

  // Footwear
  { title: 'Nike Air Max 270', price: 150.00, category: 'Footwear', description: 'Max cushioning in a sleek lifestyle sneaker.' },
  { title: 'Adidas Ultra Boost 23', price: 180.00, category: 'Footwear', description: 'Responsive Boost midsole for running and beyond.' },
  { title: 'Timberland 6" Premium Boots', price: 199.99, category: 'Footwear', description: 'Iconic waterproof boots built for adventure.' },
  { title: 'Converse Chuck Taylor All Star', price: 75.00, category: 'Footwear', description: 'The classic canvas sneaker, reinvented.' },
  { title: 'Birkenstock Arizona Sandals', price: 130.00, category: 'Footwear', description: 'Contoured footbed sandals for all-day comfort.' },
  { title: 'Vans Old Skool', price: 65.00, category: 'Footwear', description: 'Signature side stripe skate shoes.' },
  { title: 'New Balance 990v6', price: 185.00, category: 'Footwear', description: 'Made in USA premium running sneaker.' },
  { title: 'Dr. Martens 1460 Boots', price: 170.00, category: 'Footwear', description: 'Iconic 8-eye leather boots with AirWair sole.' },
  { title: 'Reef Voyage Flip Flops', price: 40.00, category: 'Footwear', description: 'Comfortable anatomical sandals for beach days.' },
  { title: 'Air Jordan 1 Retro High OG', price: 180.00, category: 'Footwear', description: 'The legendary basketball sneaker in OG colorway.' },

  // Sports & Fitness
  { title: 'Manduka PRO Yoga Mat', price: 120.00, category: 'Sports & Fitness', description: 'Professional-grade non-slip yoga mat, 6mm thick.' },
  { title: 'Bowflex Adjustable Dumbbells', price: 299.99, category: 'Sports & Fitness', description: 'Replace 15 sets of weights with one compact pair.' },
  { title: 'Resistance Bands Set (5 Levels)', price: 25.99, category: 'Sports & Fitness', description: 'Five resistance levels for full-body workouts.' },
  { title: 'Crossrope Speed Jump Rope', price: 15.99, category: 'Sports & Fitness', description: 'Pro-grade speed rope for cardio and HIIT.' },
  { title: 'TriggerPoint GRID Foam Roller', price: 30.99, category: 'Sports & Fitness', description: 'Multi-density foam roller for muscle recovery.' },
  { title: 'Contraband Pink Label Gym Gloves', price: 20.99, category: 'Sports & Fitness', description: 'Wrist support and grip gloves for lifting.' },
  { title: 'BlenderBottle Classic Shaker', price: 14.99, category: 'Sports & Fitness', description: 'Leak-proof 28oz shaker with BlenderBall wire.' },
  { title: 'Tribe Running Phone Armband', price: 19.99, category: 'Sports & Fitness', description: 'Secure and sweat-proof running armband case.' },
  { title: 'Yes4All Vinyl Kettlebell 20kg', price: 64.99, category: 'Sports & Fitness', description: 'Solid cast iron kettlebell with vinyl coating.' },
  { title: 'Ultimate Body Press Pull-Up Bar', price: 45.99, category: 'Sports & Fitness', description: 'Heavy-duty doorway pull-up bar, no screws.' },

  // Home & Kitchen
  { title: 'Instant Pot Duo 7-in-1', price: 99.99, category: 'Home & Kitchen', description: 'Pressure cooker, slow cooker, rice cooker and more.' },
  { title: 'Dyson V15 Detect Vacuum', price: 699.99, category: 'Home & Kitchen', description: 'Laser dust detection with powerful suction.' },
  { title: 'KitchenAid Artisan Stand Mixer', price: 449.99, category: 'Home & Kitchen', description: '5-quart tilt-head stand mixer with 10 speeds.' },
  { title: 'Nespresso Vertuo Next Coffee Maker', price: 199.99, category: 'Home & Kitchen', description: 'Single-serve coffee and espresso machine.' },
  { title: 'Le Creuset Signature Dutch Oven', price: 349.99, category: 'Home & Kitchen', description: 'Enameled cast iron Dutch oven in vivid colors.' },
  { title: 'iRobot Roomba i7+ Robot Vacuum', price: 599.99, category: 'Home & Kitchen', description: 'Self-emptying robot vacuum with smart mapping.' },
  { title: 'Vitamix 5200 Blender', price: 349.99, category: 'Home & Kitchen', description: 'Professional-grade blender for smooth results.' },
  { title: 'Philips Airfryer XXL 7.3L', price: 119.99, category: 'Home & Kitchen', description: 'Extra large air fryer with Fat Removal technology.' },
  { title: 'Lodge Cast Iron Skillet Set', price: 79.99, category: 'Home & Kitchen', description: 'Pre-seasoned 3-piece skillet set for any cooktop.' },
  { title: 'Ninja Foodi Smart XL Grill', price: 229.99, category: 'Home & Kitchen', description: '6-in-1 indoor grill with smart cook system.' },
];
