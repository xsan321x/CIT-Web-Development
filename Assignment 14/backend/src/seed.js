const Product = require('./models/Product');

const SEED_PRODUCTS = [
  // Electronics
  { title: 'iPhone 15 Pro Max', price: 1199.99, category: 'Electronics', description: 'Apple flagship with titanium design and A17 Pro chip.', imageUrl: 'https://picsum.photos/seed/iphone15/400/300' },
  { title: 'Samsung 55" 4K Smart TV', price: 799.99, category: 'Electronics', description: 'Crystal clear 4K QLED display with smart features.', imageUrl: 'https://picsum.photos/seed/samsungtv/400/300' },
  { title: 'Sony WH-1000XM5 Headphones', price: 349.99, category: 'Electronics', description: 'Industry-leading noise cancellation and 30hr battery.', imageUrl: 'https://picsum.photos/seed/sonyheadphones/400/300' },
  { title: 'MacBook Air M3', price: 1299.99, category: 'Electronics', description: 'Ultra-thin laptop powered by Apple M3 chip.', imageUrl: 'https://picsum.photos/seed/macbookm3/400/300' },
  { title: 'iPad Pro 12.9"', price: 1099.99, category: 'Electronics', description: 'Professional tablet with Liquid Retina XDR display.', imageUrl: 'https://picsum.photos/seed/ipadpro/400/300' },
  { title: 'Nintendo Switch OLED', price: 349.99, category: 'Electronics', description: 'Vibrant OLED screen gaming console, play anywhere.', imageUrl: 'https://picsum.photos/seed/nintendoswitch/400/300' },
  { title: 'Canon EOS R50 Camera', price: 899.99, category: 'Electronics', description: 'Mirrorless camera with 24.2MP sensor for creators.', imageUrl: 'https://picsum.photos/seed/canonr50/400/300' },
  { title: 'AirPods Pro 2nd Gen', price: 249.99, category: 'Electronics', description: 'Active noise cancellation with Adaptive Transparency.', imageUrl: 'https://picsum.photos/seed/airpodspro2/400/300' },
  { title: 'Dell XPS 15 Laptop', price: 1499.99, category: 'Electronics', description: 'Premium laptop with InfinityEdge display.', imageUrl: 'https://picsum.photos/seed/dellxps15/400/300' },
  { title: 'Bose SoundLink Speaker', price: 149.99, category: 'Electronics', description: 'Portable Bluetooth speaker with deep bass.', imageUrl: 'https://picsum.photos/seed/bosespeaker/400/300' },

  // Clothing
  { title: 'Classic White Oxford Shirt', price: 59.99, category: 'Clothing', description: 'Timeless cotton oxford shirt for any occasion.', imageUrl: 'https://picsum.photos/seed/oxfordshirt/400/300' },
  { title: 'Slim Fit Chinos', price: 49.99, category: 'Clothing', description: 'Versatile stretch chinos in multiple colors.', imageUrl: 'https://picsum.photos/seed/slimchinos/400/300' },
  { title: 'Merino Wool Sweater', price: 89.99, category: 'Clothing', description: 'Soft, lightweight merino wool for all seasons.', imageUrl: 'https://picsum.photos/seed/merinosweater/400/300' },
  { title: 'Leather Biker Jacket', price: 199.99, category: 'Clothing', description: 'Classic genuine leather jacket with modern fit.', imageUrl: 'https://picsum.photos/seed/leatherjacket/400/300' },
  { title: 'Floral Summer Dress', price: 69.99, category: 'Clothing', description: 'Breezy floral print midi dress for warm days.', imageUrl: 'https://picsum.photos/seed/floraldress/400/300' },
  { title: 'Slim Denim Jacket', price: 79.99, category: 'Clothing', description: 'Versatile denim jacket, perfect for layering.', imageUrl: 'https://picsum.photos/seed/denimjacket/400/300' },
  { title: 'Running Windbreaker', price: 89.99, category: 'Clothing', description: 'Lightweight and packable windbreaker for runners.', imageUrl: 'https://picsum.photos/seed/windbreaker/400/300' },
  { title: 'Cashmere Turtleneck', price: 149.99, category: 'Clothing', description: 'Luxuriously soft cashmere for cold days.', imageUrl: 'https://picsum.photos/seed/cashmereturtleneck/400/300' },
  { title: 'Graphic Tee 3-Pack', price: 39.99, category: 'Clothing', description: 'Three stylish graphic tees in one pack.', imageUrl: 'https://picsum.photos/seed/graphictee/400/300' },
  { title: 'Tailored Formal Blazer', price: 129.99, category: 'Clothing', description: 'Sharp blazer for professional and formal events.', imageUrl: 'https://picsum.photos/seed/formalblazer/400/300' },

  // Footwear
  { title: 'Nike Air Max 270', price: 150.00, category: 'Footwear', description: 'Max cushioning in a sleek lifestyle sneaker.', imageUrl: 'https://picsum.photos/seed/nikeairmax/400/300' },
  { title: 'Adidas Ultra Boost 23', price: 180.00, category: 'Footwear', description: 'Responsive Boost midsole for running and beyond.', imageUrl: 'https://picsum.photos/seed/adidasultraboost/400/300' },
  { title: 'Timberland 6" Premium Boots', price: 199.99, category: 'Footwear', description: 'Iconic waterproof boots built for adventure.', imageUrl: 'https://picsum.photos/seed/timberlandboots/400/300' },
  { title: 'Converse Chuck Taylor All Star', price: 75.00, category: 'Footwear', description: 'The classic canvas sneaker, reinvented.', imageUrl: 'https://picsum.photos/seed/conversechuck/400/300' },
  { title: 'Birkenstock Arizona Sandals', price: 130.00, category: 'Footwear', description: 'Contoured footbed sandals for all-day comfort.', imageUrl: 'https://picsum.photos/seed/birkenstock/400/300' },
  { title: 'Vans Old Skool', price: 65.00, category: 'Footwear', description: 'Signature side stripe skate shoes.', imageUrl: 'https://picsum.photos/seed/vansoldskool/400/300' },
  { title: 'New Balance 990v6', price: 185.00, category: 'Footwear', description: 'Made in USA premium running sneaker.', imageUrl: 'https://picsum.photos/seed/newbalance990/400/300' },
  { title: 'Dr. Martens 1460 Boots', price: 170.00, category: 'Footwear', description: 'Iconic 8-eye leather boots with AirWair sole.', imageUrl: 'https://picsum.photos/seed/drmartens1460/400/300' },
  { title: 'Reef Voyage Flip Flops', price: 40.00, category: 'Footwear', description: 'Comfortable anatomical sandals for beach days.', imageUrl: 'https://picsum.photos/seed/reefflipflop/400/300' },
  { title: 'Air Jordan 1 Retro High OG', price: 180.00, category: 'Footwear', description: 'The legendary basketball sneaker in OG colorway.', imageUrl: 'https://picsum.photos/seed/airjordan1/400/300' },

  // Sports & Fitness
  { title: 'Manduka PRO Yoga Mat', price: 120.00, category: 'Sports & Fitness', description: 'Professional-grade non-slip yoga mat, 6mm thick.', imageUrl: 'https://picsum.photos/seed/mandukamat/400/300' },
  { title: 'Bowflex Adjustable Dumbbells', price: 299.99, category: 'Sports & Fitness', description: 'Replace 15 sets of weights with one compact pair.', imageUrl: 'https://picsum.photos/seed/bowflexdumbbells/400/300' },
  { title: 'Resistance Bands Set', price: 25.99, category: 'Sports & Fitness', description: 'Five resistance levels for full-body workouts.', imageUrl: 'https://picsum.photos/seed/resistancebands/400/300' },
  { title: 'Crossrope Speed Jump Rope', price: 15.99, category: 'Sports & Fitness', description: 'Pro-grade speed rope for cardio and HIIT.', imageUrl: 'https://picsum.photos/seed/jumprope/400/300' },
  { title: 'TriggerPoint GRID Foam Roller', price: 30.99, category: 'Sports & Fitness', description: 'Multi-density foam roller for muscle recovery.', imageUrl: 'https://picsum.photos/seed/foamroller/400/300' },
  { title: 'Gym Gloves with Wrist Strap', price: 20.99, category: 'Sports & Fitness', description: 'Wrist support and grip gloves for lifting.', imageUrl: 'https://picsum.photos/seed/gymgloves/400/300' },
  { title: 'BlenderBottle Classic Shaker', price: 14.99, category: 'Sports & Fitness', description: 'Leak-proof 28oz shaker with BlenderBall wire.', imageUrl: 'https://picsum.photos/seed/blenderbottle/400/300' },
  { title: 'Running Phone Armband', price: 19.99, category: 'Sports & Fitness', description: 'Secure and sweat-proof running armband case.', imageUrl: 'https://picsum.photos/seed/runningarmband/400/300' },
  { title: 'Vinyl Kettlebell 20kg', price: 64.99, category: 'Sports & Fitness', description: 'Solid cast iron kettlebell with vinyl coating.', imageUrl: 'https://picsum.photos/seed/kettlebell20/400/300' },
  { title: 'Doorway Pull-Up Bar', price: 45.99, category: 'Sports & Fitness', description: 'Heavy-duty doorway pull-up bar, no screws needed.', imageUrl: 'https://picsum.photos/seed/pullupbar/400/300' },

  // Home & Kitchen
  { title: 'Instant Pot Duo 7-in-1', price: 99.99, category: 'Home & Kitchen', description: 'Pressure cooker, slow cooker, rice cooker and more.', imageUrl: 'https://picsum.photos/seed/instantpot/400/300' },
  { title: 'Dyson V15 Detect Vacuum', price: 699.99, category: 'Home & Kitchen', description: 'Laser dust detection with powerful suction.', imageUrl: 'https://picsum.photos/seed/dysonv15/400/300' },
  { title: 'KitchenAid Artisan Stand Mixer', price: 449.99, category: 'Home & Kitchen', description: '5-quart tilt-head stand mixer with 10 speeds.', imageUrl: 'https://picsum.photos/seed/kitchenaidmixer/400/300' },
  { title: 'Nespresso Vertuo Coffee Maker', price: 199.99, category: 'Home & Kitchen', description: 'Single-serve coffee and espresso machine.', imageUrl: 'https://picsum.photos/seed/nespresso/400/300' },
  { title: 'Le Creuset Dutch Oven', price: 349.99, category: 'Home & Kitchen', description: 'Enameled cast iron Dutch oven in vivid colors.', imageUrl: 'https://picsum.photos/seed/lecreusetoven/400/300' },
  { title: 'iRobot Roomba i7+ Robot Vacuum', price: 599.99, category: 'Home & Kitchen', description: 'Self-emptying robot vacuum with smart mapping.', imageUrl: 'https://picsum.photos/seed/roomba/400/300' },
  { title: 'Vitamix 5200 Blender', price: 349.99, category: 'Home & Kitchen', description: 'Professional-grade blender for smooth results.', imageUrl: 'https://picsum.photos/seed/vitamixblender/400/300' },
  { title: 'Philips Airfryer XXL 7.3L', price: 119.99, category: 'Home & Kitchen', description: 'Extra large air fryer with Fat Removal technology.', imageUrl: 'https://picsum.photos/seed/philipsairfryer/400/300' },
  { title: 'Lodge Cast Iron Skillet Set', price: 79.99, category: 'Home & Kitchen', description: 'Pre-seasoned 3-piece skillet set for any cooktop.', imageUrl: 'https://picsum.photos/seed/castironskillet/400/300' },
  { title: 'Ninja Foodi Smart XL Grill', price: 229.99, category: 'Home & Kitchen', description: '6-in-1 indoor grill with smart cook system.', imageUrl: 'https://picsum.photos/seed/ninjagrill/400/300' },
];

const seedProducts = async () => {
  try {
    // Clear existing products to ensure we have exactly our 50 seed products
    await Product.deleteMany({});
    console.log('Database cleared for fresh seeding...');
    
    console.log('Seeding 50 products into database...');
    await Product.insertMany(SEED_PRODUCTS);
    console.log('✓ 50 products seeded successfully!');
  } catch (error) {
    console.error('Seeding failed:', error.message);
  }
};

module.exports = seedProducts;
