"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const blogModel_1 = require("../models/blogModel");
dotenv_1.default.config();
const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_CLOUD || ''
    : process.env.MONGO_URI_CLOUD || process.env.MONGO_URI || '';
const blogSeedData = [
    // --- Home Banners ---
    {
        title: 'Fresh, Healthy & Ethically Farmed',
        subtitle: 'From our poultry pens directly to your doorstep — nutritious, sustainably produced table eggs.',
        category: 'Home-Banner',
        content: 'Committed to humane, free-range poultry farming and the highest standards of animal welfare.',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    {
        title: '100% Farm-Fresh Organic Eggs',
        subtitle: 'Packed with natural nutrients and collected daily from healthy hens raised on clean organic feed.',
        category: 'Home-Banner',
        content: 'Grade-A farm-fresh eggs delivered with exceptional freshness and quality in every single batch.',
        picture: '/images/hero2.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Modern Sustainable Poultry Farming',
        subtitle: 'Pioneering climate-controlled housing, bio-security, and eco-friendly agriculture for a healthier tomorrow.',
        category: 'Home-Banner',
        content: 'State-of-the-art facilities ensuring optimal health, hygiene, and sustainable poultry production.',
        picture: '/images/hero3.jpg',
        author: 'Awiza Farm',
    },
    // --- Blog Articles ---
    {
        title: 'The Vital Health Benefits of Farm-Fresh Eggs',
        subtitle: 'The immense nutritional advantages of pasture-raised poultry products.',
        category: 'Blog',
        content: '<p>Farm fresh eggs from pasture-raised hens contain higher levels of Omega-3 fatty acids, vitamin A, and vitamin E. At Awiza Farm, our daily collection ensures your family enjoys peak freshness and wholesome nutrition every single day.</p><p>Unlike commercial eggs that may sit in transit and warehouses for weeks, our direct-to-consumer farm-fresh eggs retain their full vitamin profile, firm yolks, and distinct natural flavor.</p>',
        picture: '/images/hero2.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Sustainable Flock Management & Bio-Security at Awiza Farm',
        subtitle: 'How modern bio-security and ventilation protect poultry health and productivity.',
        category: 'Blog',
        content: '<p>Good ventilation, clean watering systems, and stress-free living spaces are the foundation of healthy poultry farming. Learn about the innovative techniques we use to maintain optimal flock vitality year-round.</p><p>Our dedicated bio-security protocols include strict pen sanitation, automated environmental sensors, and regular veterinary monitoring to prevent disease without relying on unnecessary additives.</p>',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'From Hatchery to Table: Our Hygiene & Quality Assurance',
        subtitle: 'Ensuring hygiene and quality control at every stage of the production chain.',
        category: 'Blog',
        content: '<p>Quality is never an accident. Every egg and poultry product from Awiza undergoes rigorous inspection, candling, and hygienic packaging to deliver uncompromised goodness to households and food businesses.</p><p>We partner with local bakeries, caterers, and families who rely on consistent crate weights, spotless shells, and uncompromised food safety standards.</p>',
        picture: '/images/hero3.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Maximizing Layer Hen Longevity and Egg Production Rates',
        subtitle: 'Key scientific insights into optimal lighting, hydration, and organic feed ratios.',
        category: 'Blog',
        content: '<p>Layer productivity requires careful balance of calcium intake, lighting photoperiods, and hydration. At Awiza Farm, our automated monitoring systems track feed conversion ratios and daily laying yields to ensure the flock thrives sustainably.</p>',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Why Direct Farm-Sourced Eggs Make Better Baking and Cooking',
        subtitle: 'From creamy custards to golden cakes, why fresh egg whites and yolks matter in the kitchen.',
        category: 'Blog',
        content: '<p>Chefs and home cooks know that egg freshness determines meringue volume, emulsion stability in dressings, and vibrant cake crumb color. Awiza Farm supplies culinary professionals with same-day harvested Grade-A eggs.</p>',
        picture: '/images/hero2.jpg',
        author: 'Awiza Farm',
    },
    // --- About ---
    {
        title: 'About Awiza Farm',
        subtitle: 'Dedicated to Sustainable & Quality Poultry Farming',
        category: 'About',
        content: '<p>Awiza Farm is an industry leader in sustainable poultry farming and fresh egg production. Our mission is to provide wholesome, nutritious poultry products with integrity, care, and excellence.</p>',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    // --- Gallery ---
    {
        title: 'Free-range Flocks',
        subtitle: 'Healthy birds foraging outdoors',
        category: 'Gallery',
        content: 'Pasture-raised poultry.',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Fresh Morning Harvest',
        subtitle: 'Golden organic brown eggs',
        category: 'Gallery',
        content: 'Collected daily.',
        picture: '/images/hero2.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Eco-Friendly Farm Land',
        subtitle: 'Scenic sustainable infrastructure',
        category: 'Gallery',
        content: 'Modern solar-powered barns.',
        picture: '/images/hero3.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Quality Care & Feeding',
        subtitle: 'Natural grain nutrition',
        category: 'Gallery',
        content: 'Clean water and organic feed.',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    // --- Instagram ---
    {
        title: 'Daily Farm Routine',
        subtitle: 'Morning egg collection at Awiza Farm',
        category: 'Instagram',
        content: 'Starting the day with fresh harvests! #AwizaFarm #FarmFresh #OrganicEggs',
        picture: '/images/hero2.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Flock Vitality',
        subtitle: 'Happy, healthy hens in our modern pens',
        category: 'Instagram',
        content: 'Clean air, natural light, and top quality nutrition. #PoultryLife #BioSecurity',
        picture: '/images/hero1.jpg',
        author: 'Awiza Farm',
    },
    {
        title: 'Sustainable Farming',
        subtitle: 'Solar-powered facilities and eco practices',
        category: 'Instagram',
        content: 'Farming in harmony with nature. #SustainableAgriculture #Awiza',
        picture: '/images/hero3.jpg',
        author: 'Awiza Farm',
    },
];
function seedBlogs() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!MONGO_URI) {
            console.error('MONGO_URI is not defined in environment variables');
            process.exit(1);
        }
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            console.log('Connected to MongoDB:', mongoose_1.default.connection.name);
            let createdCount = 0;
            let updatedCount = 0;
            for (const item of blogSeedData) {
                // Match by title and category to avoid duplicates
                const existing = yield blogModel_1.Blog.findOne({
                    title: item.title,
                    category: item.category,
                });
                if (existing) {
                    yield blogModel_1.Blog.updateOne({ _id: existing._id }, { $set: item });
                    updatedCount++;
                }
                else {
                    yield blogModel_1.Blog.create(item);
                    createdCount++;
                }
            }
            console.log(`✅ Blog seeding complete for Awiza API!`);
            console.log(`- Created: ${createdCount}`);
            console.log(`- Updated: ${updatedCount}`);
            console.log(`- Total blogs in database: ${yield blogModel_1.Blog.countDocuments()}`);
            yield mongoose_1.default.disconnect();
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Failed to seed blogs:', error);
            process.exit(1);
        }
    });
}
seedBlogs();
