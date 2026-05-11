require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const Testimonial = require('../models/Testimonial');
const AdminSettings = require('../models/AdminSettings');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Create admin
  await User.deleteMany({ role: 'admin' });
  await User.create({
    name: 'Admin',
    email: process.env.ADMIN_EMAIL || 'admin@newideal.in',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin'
  });
  console.log('Admin user created');

  // Create courses
  await Course.deleteMany({});
  const mensCourse = await Course.create({
    slug: 'mens-stitching-cutting',
    title: "Men's Professional Stitching & Cutting",
    subtitle: 'Master the art of men\'s tailoring from scratch',
    description: 'A comprehensive course covering all aspects of men\'s tailoring including pant, shirt, kurta and pajama cutting with professional stitching techniques.',
    type: 'mens',
    fees: 10000,
    duration: '3 Months',
    skills: ['Pant Cutting', 'Shirt Cutting', 'Kurta Cutting', 'Pajama Cutting', 'Full Stitching', 'Measurement System', 'Fabric Understanding', 'Finishing Techniques'],
    curriculum: [
      { level: 'Beginner', title: 'Foundation Skills', topics: ['Tools & Equipment', 'Measurement Basics', 'Fabric Types', 'Basic Stitching Techniques'] },
      { level: 'Intermediate', title: 'Pattern Making', topics: ['Pant Pattern', 'Shirt Pattern', 'Kurta Pattern', 'Pajama Pattern'] },
      { level: 'Advanced', title: 'Professional Cutting', topics: ['Advanced Cutting Techniques', 'Fitting Adjustments', 'Style Variations', 'Custom Orders'] },
      { level: 'Professional', title: 'Finishing & Business', topics: ['Professional Finishing', 'Quality Control', 'Client Handling', 'Business Setup'] }
    ],
    badge: 'Most Popular'
  });

  const womensCourse = await Course.create({
    slug: 'womens-stitching-cutting',
    title: "Women's Designer Stitching & Cutting",
    subtitle: 'From basics to designer fashion — master women\'s tailoring',
    description: 'A complete women\'s tailoring course covering salwar, anarkali, plazo designs with advanced pattern making and fashion finishing techniques.',
    type: 'womens',
    fees: 10000,
    duration: '3 Months',
    skills: ['Top Stitching', 'Salwar Stitching', 'Anarkali Design', 'Plazo Design', 'Measurement Techniques', 'Pattern Making', 'Fashion Finishing', 'Designer Stitching'],
    curriculum: [
      { level: 'Beginner', title: 'Foundation Skills', topics: ['Body Measurement Techniques', 'Fabric Selection', 'Basic Stitching', 'Tool Mastery'] },
      { level: 'Intermediate', title: 'Core Designs', topics: ['Salwar Patterns', 'Top Patterns', 'Neck & Sleeve Designs', 'Plazo Construction'] },
      { level: 'Advanced', title: 'Designer Patterns', topics: ['Anarkali Construction', 'Designer Necklines', 'Embellishment Techniques', 'Complex Patterns'] },
      { level: 'Professional', title: 'Fashion Finishing', topics: ['Professional Finishing', 'Quality Standards', 'Client Consultation', 'Fashion Business'] }
    ],
    badge: 'Bestseller'
  });
  console.log('Courses created');

  // Create batches
  await Batch.deleteMany({});
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 15);

  await Batch.create([
    {
      course: mensCourse._id,
      batchName: 'Men\'s Batch - June 2026',
      mode: 'both',
      startDate: futureDate,
      timing: '10:00 AM – 12:00 PM',
      days: ['Monday', 'Wednesday', 'Friday'],
      totalSeats: 20,
      seatsLeft: 12,
      instructor: 'Tosif Ahmed Mansuri'
    },
    {
      course: womensCourse._id,
      batchName: 'Women\'s Batch - June 2026',
      mode: 'both',
      startDate: futureDate,
      timing: '2:00 PM – 4:00 PM',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      totalSeats: 20,
      seatsLeft: 8,
      instructor: 'Tosif Ahmed Mansuri'
    }
  ]);
  console.log('Batches created');

  // Testimonials
  await Testimonial.deleteMany({});
  await Testimonial.create([
    { studentName: 'Priya Sharma', course: "Women's Course", review: 'Excellent teaching! I started with zero knowledge and now I stitch designer suits for clients. Tosif sir is amazing.', rating: 5, city: 'Ahmedabad', isApproved: true, isFeatured: true, order: 1 },
    { studentName: 'Mohammed Rafiq', course: "Men's Course", review: 'Best stitching institute in Ahmedabad. Professional training, hands-on practice. I opened my own tailoring shop.', rating: 5, city: 'Ahmedabad', isApproved: true, isFeatured: true, order: 2 },
    { studentName: 'Fatima Begum', course: "Women's Course", review: 'Online classes were very convenient. I learned from home and now I take custom orders. Very grateful!', rating: 5, city: 'Surat', isApproved: true, isFeatured: true, order: 3 },
    { studentName: 'Raju Patel', course: "Men's Course", review: 'The curriculum is very practical. From day one we were cutting actual fabric. No theory overload — pure skills.', rating: 5, city: 'Vadodara', isApproved: true, order: 4 },
    { studentName: 'Sunita Devi', course: "Women's Course", review: 'My daughter and I both joined together. Within 2 months we were stitching Anarkali suits. Highly recommended!', rating: 5, city: 'Rajkot', isApproved: true, order: 5 },
    { studentName: 'Arif Khan', course: "Men's Course", review: '50 years of legacy is visible in the quality of teaching. This institute is a real gem for people who want a career in tailoring.', rating: 5, city: 'Ahmedabad', isApproved: true, order: 6 }
  ]);
  console.log('Testimonials created');

  // Admin settings
  await AdminSettings.deleteMany({});
  await AdminSettings.create([
    { key: 'mens_fees', value: 10000, label: "Men's Course Fees", category: 'fees' },
    { key: 'womens_fees', value: 10000, label: "Women's Course Fees", category: 'fees' },
    { key: 'institute_phone', value: '+91 98765 43210', label: 'Institute Phone', category: 'contact' },
    { key: 'institute_whatsapp', value: '+91 98765 43210', label: 'WhatsApp Number', category: 'contact' },
    { key: 'institute_email', value: 'info@newideal.in', label: 'Institute Email', category: 'contact' },
    { key: 'total_students', value: 5000, label: 'Total Students Trained', category: 'content' },
    { key: 'years_experience', value: 50, label: 'Years of Experience', category: 'content' }
  ]);
  console.log('Admin settings created');

  console.log('\n✅ Seeding complete!');
  console.log('Admin Login: admin@newideal.in / admin123');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
