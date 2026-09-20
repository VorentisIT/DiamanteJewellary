import React from 'react';
import AnnouncementBar from '../components/common/AnnouncementBar';
import Navbar from '../components/common/Navbar';
import HeroSection from '../components/home/HeroSection';
import PhilosophySection from '../components/home/PhilosophySection';
import CategoryGrid from '../components/home/CategoryGrid';
import NewArrivals from '../components/home/NewArrivals';
import CollectionEditorial from '../components/home/CollectionEditorial';
import StorySection from '../components/home/StorySection';
import JewelleryFinder from '../components/home/JewelleryFinder';
import ServicePromises from '../components/home/ServicePromises';
import CustomerStories from '../components/home/CustomerStories';
import InstagramSection from '../components/home/InstagramSection';
import NewsletterSection from '../components/home/NewsletterSection';
import Footer from '../components/common/Footer';
import QuickViewModal from '../components/common/QuickViewModal';
import CartDrawer from '../components/cart/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans flex flex-col justify-between">
      <AnnouncementBar />
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <PhilosophySection />
        <CategoryGrid />
        <NewArrivals />
        <CollectionEditorial />
        <StorySection />
        <JewelleryFinder />
        <ServicePromises />
        <CustomerStories />
        <InstagramSection />
        <NewsletterSection />
      </main>

      <Footer />
      <QuickViewModal />
      <CartDrawer />
    </div>
  );
}
