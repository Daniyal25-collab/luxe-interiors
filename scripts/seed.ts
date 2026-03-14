/**
 * Seed script — run once to set up admin account and sample data
 * Usage: npx ts-node --project tsconfig.json scripts/seed.ts
 * Or: node -e "require('./scripts/seed.js')"
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-interiors';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const existingAdmin = await Admin.findOne({ email: 'admin@luxeinteriors.com' });
  if (existingAdmin) {
    console.log('⚠️  Admin already exists. Skipping.');
  } else {
    const hashed = await bcrypt.hash('Admin@Luxe2024!', 12);
    await Admin.create({
      email: 'admin@luxeinteriors.com',
      password: hashed,
      name: 'Priya Sharma',
    });
    console.log('✅ Admin created:');
    console.log('   Email:    admin@luxeinteriors.com');
    console.log('   Password: Admin@Luxe2024!');
    console.log('   ⚠️  Change this password after first login!');
  }

  await mongoose.disconnect();
  console.log('✅ Seed complete');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
