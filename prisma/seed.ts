import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Clothing", slug: "clothing" },
  { name: "Home & Garden", slug: "home-garden" },
  { name: "Sports", slug: "sports" },
  { name: "Books", slug: "books" },
  { name: "Toys", slug: "toys" },
  { name: "Beauty", slug: "beauty" },
  { name: "Food", slug: "food" },
];

const productNames = [
  "Wireless Headphones", "Smart Watch", "Laptop Stand", "USB-C Hub", "Mechanical Keyboard",
  "Gaming Mouse", "Monitor Light Bar", "Webcam HD", "Microphone USB", "Desk Mat",
  "Cotton T-Shirt", "Denim Jeans", "Hoodie", "Sneakers", "Baseball Cap",
  "Sunglasses", "Leather Belt", "Winter Jacket", "Running Shoes", "Backpack",
  "Coffee Maker", "Air Purifier", "LED Desk Lamp", "Plant Pot Set", "Throw Pillow",
  "Yoga Mat", "Resistance Bands", "Water Bottle", "Running Belt", "Foam Roller",
  "Novel Bestseller", "Cookbook", "Self-Help Guide", "Science Fiction", "History Book",
  "Building Blocks", "Board Game", "Puzzle 1000pc", "Action Figure", "Art Set",
  "Face Moisturizer", "Sunscreen SPF50", "Lip Balm Set", "Hair Serum", "Face Mask",
  "Organic Coffee", "Protein Bars", "Green Tea", "Dried Fruits", "Honey Jar",
  "Bluetooth Speaker", "Phone Case", "Screen Protector", "Car Charger", "Power Bank",
  "Desk Organizer", "Notebook Set", "Pen Set", "Sticky Notes", "Wall Calendar",
];

const firstNames = ["James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Charlotte", "Alexander", "Amelia", "Daniel", "Harper", "Michael", "Evelyn"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

async function main() {
  console.log("🌱 Seeding database...");

  // Clean
  await prisma.activityLog.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.storeSettings.deleteMany();
  await prisma.user.deleteMany();

  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@shopadmin.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  // Categories
  const createdCategories = [];
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories.push(created);
  }
  console.log(`✓ ${createdCategories.length} categories`);

  // Products
  for (let i = 0; i < 50; i++) {
    const category = createdCategories[Math.floor(Math.random() * createdCategories.length)];
    const price = parseFloat((Math.random() * 200 + 9.99).toFixed(2));
    await prisma.product.create({
      data: {
        name: productNames[i],
        description: `High quality ${productNames[i].toLowerCase()}. Perfect for everyday use.`,
        price,
        salePrice: Math.random() > 0.7 ? parseFloat((price * 0.8).toFixed(2)) : null,
        stock: Math.floor(Math.random() * 100),
        sku: `SKU-${String(i + 1).padStart(4, "0")}`,
        categoryId: category.id,
        isActive: Math.random() > 0.1,
        tags: [category.slug, "featured"],
      },
    });
  }
  console.log("✓ 50 products");

  // Customers
  const customers = [];
  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[i];
    const lastName = lastNames[i];
    const customer = await prisma.customer.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `+1${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][Math.floor(Math.random() * 5)],
        state: ["NY", "CA", "IL", "TX", "AZ"][Math.floor(Math.random() * 5)],
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        country: "US",
      },
    });
    customers.push(customer);
  }
  console.log("✓ 20 customers");

  // Orders
  const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
  const products = await prisma.product.findMany();

  for (let i = 0; i < 100; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const numItems = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    let subtotal = 0;

    for (let j = 0; j < numItems; j++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = product.salePrice || product.price;
      subtotal += price * quantity;
      orderItems.push({
        productId: product.id,
        quantity,
        price,
      });
    }

    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    await prisma.order.create({
      data: {
        customerId: customer.id,
        status: status as never,
        subtotal,
        tax,
        shippingCost: shipping,
        total,
        invoiceNumber: `INV-${String(i + 1).padStart(5, "0")}`,
        paymentMethod: ["stripe", "paypal"][Math.floor(Math.random() * 2)],
        paymentStatus: status === "CANCELLED" ? "refunded" : "paid",
        items: { create: orderItems },
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log("✓ 100 orders");

  // Settings
  await prisma.storeSettings.create({
    data: {
      storeName: "ShopAdmin Demo Store",
      storeEmail: "hello@shopadmin.com",
      storePhone: "+1 (555) 123-4567",
      storeAddress: "123 Commerce St, New York, NY 10001",
      currency: "USD",
      taxRate: 8,
      shippingBase: 9.99,
      freeShippingMin: 100,
    },
  });

  console.log("✅ Seed complete!");
  console.log("Login: admin@shopadmin.com / admin123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
