import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { GTMInspector } from './components/GTMInspector';

import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderSuccessView } from './views/OrderSuccessView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { CustomerAuthView } from './views/CustomerAuthView';
import { CustomerProfileView } from './views/CustomerProfileView';
import { MyOrdersView } from './views/MyOrdersView';
import { PolicyPageView } from './views/PolicyPageView';
import { AboutView, ContactView } from './views/AboutView';
import { AdminPortal } from './views/admin/AdminPortal';

const AppContent: React.FC = () => {
  const { route } = useApp();

  const renderCurrentView = () => {
    switch (route.view) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return (
          <ShopView
            initialCategorySlug={route.categorySlug}
            initialSearch={route.searchQuery}
          />
        );
      case 'product':
        return <ProductDetailView slug={route.slug || ''} />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order_success':
        return <OrderSuccessView orderNumber={route.orderNumber || ''} />;
      case 'order_track':
        return (
          <OrderTrackingView
            initialOrderNumber={route.initialOrderNumber}
            initialPhone={route.initialPhone}
          />
        );
      case 'auth':
        return <CustomerAuthView initialMode={route.mode} />;
      case 'profile':
        return <CustomerProfileView />;
      case 'my_orders':
        return <MyOrdersView />;
      case 'policy':
        return <PolicyPageView policyType={route.policyType || 'shipping'} />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'admin':
        return <AdminPortal initialSection={route.section} />;
      default:
        return <HomeView />;
    }
  };

  const isAdminView = route.view === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <Header />

      {/* Slide-out Mobile Drawer */}
      <MobileDrawer />

      {/* Main App Body */}
      <main className="flex-1 pb-20 md:pb-8">
        {renderCurrentView()}
      </main>

      {/* Bottom Footer (Storefront Only) */}
      {!isAdminView && <Footer />}

      {/* Mobile Native-style Bottom Navigation Bar */}
      {!isAdminView && <MobileBottomNav />}

      {/* Blueprint A12 GTM dataLayer Inspector Floating Widget */}
      <GTMInspector />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
