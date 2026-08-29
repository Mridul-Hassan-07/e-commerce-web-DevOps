import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Theme,
  Product,
  Category,
  CartItem,
  ProductVariant,
  Order,
  User,
  AdminAccount,
  Coupon,
  ShippingSettings,
  SiteSettings,
  FAQ,
  SupportMessage,
  DataLayerEvent,
  ActiveRoute,
  OrderStatus,
  PaymentStatus,
  AreaType
} from '../types';
import {
  initialProducts,
  initialCategories,
  initialOrders,
  initialCoupons,
  initialShippingSettings,
  initialSiteSettings,
  initialUsers,
  initialAdmins,
  initialFAQs,
  initialSupportMessages
} from '../data/initialData';
import { translations, formatPrice } from '../utils/i18n';

interface AppContextType {
  // Navigation
  route: ActiveRoute;
  navigate: (route: ActiveRoute) => void;
  
  // Localization & Theme
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  formatMoney: (amount: number) => string;
  theme: Theme;
  toggleTheme: () => void;
  
  // Catalog Data
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'sales_count' | 'rating' | 'reviews_count'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number, directBuy?: boolean) => void;
  updateCartQuantity: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: {
    name: string;
    phone: string;
    district: string;
    upazila: string;
    address: string;
    area_type: AreaType;
    notes?: string;
    coupon_code?: string;
    discount_amount?: number;
  }) => Order;
  updateOrder: (order: Order) => void;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    note?: string,
    consignmentId?: string,
    paymentStatus?: PaymentStatus
  ) => void;
  
  // Coupons & Settings
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
  shippingSettings: ShippingSettings;
  updateShippingSettings: (settings: ShippingSettings) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: SiteSettings) => void;
  
  // Auth (Customer & Admin)
  currentUser: User | null;
  loginUser: (identifier: string, password?: string) => { success: boolean; message: string };
  signupUser: (userData: {
    name: string;
    phone: string;
    password: string;
    username?: string;
    email?: string;
    district?: string;
    upazila?: string;
    address?: string;
    area_type?: AreaType;
  }) => { success: boolean; message: string };
  logoutUser: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  changeUserPassword: (currentPass: string, newPass: string) => { success: boolean; message: string };
  users: User[];
  toggleBlockUser: (userId: string) => void;
  
  // Admin Accounts
  admins: AdminAccount[];
  currentAdmin: AdminAccount | null;
  isAdminAuthenticated: boolean;
  loginAdmin: (identifier: string, password: string) => boolean;
  logoutAdmin: () => void;
  addAdmin: (adminData: Omit<AdminAccount, 'id' | 'created_at'>) => { success: boolean; message: string };
  updateAdmin: (admin: AdminAccount) => void;
  deleteAdmin: (id: string) => { success: boolean; message: string };
  toggleAdminStatus: (id: string) => void;
  
  // Support & FAQs
  faqs: FAQ[];
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (faq: FAQ) => void;
  deleteFAQ: (id: string) => void;
  supportMessages: SupportMessage[];
  sendSupportMessage: (msg: Omit<SupportMessage, 'id' | 'created_at' | 'status'>) => void;
  replySupportMessage: (id: string, reply: string) => void;
  
  // GTM & dataLayer simulation
  dataLayerLogs: DataLayerEvent[];
  logDataLayerEvent: (event: DataLayerEvent['event'], payload: Record<string, any>) => void;
  clearDataLayerLogs: () => void;
  isGtmInspectorOpen: boolean;
  setIsGtmInspectorOpen: (open: boolean) => void;
  
  // Search & Global quick drawer
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  LANG: 'mehnajmart_lang',
  THEME: 'mehnajmart_theme',
  CART: 'mehnajmart_cart',
  ORDERS: 'mehnajmart_orders',
  PRODUCTS: 'mehnajmart_products_v2',
  CATEGORIES: 'mehnajmart_categories_v2',
  SHIPPING: 'mehnajmart_shipping_settings',
  SITE_SETTINGS: 'mehnajmart_site_settings',
  COUPONS: 'mehnajmart_coupons',
  USER: 'mehnajmart_current_user',
  USERS: 'mehnajmart_users_list',
  ADMINS: 'mehnajmart_admins_list',
  ADMIN_AUTH: 'mehnajmart_admin_auth',
  CURRENT_ADMIN: 'mehnajmart_current_admin',
  FAQS: 'mehnajmart_faqs',
  SUPPORT: 'mehnajmart_support_messages',
  DATALAYER: 'mehnajmart_datalayer_logs'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [route, setRoute] = useState<ActiveRoute>({ view: 'home' });
  
  // Localization & Theme
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.LANG) as Language) || 'en';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme) || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANG, newLang);
  };

  const t = (key: keyof typeof translations.en): string => {
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || String(key);
  };

  const formatMoney = (amount: number): string => {
    return formatPrice(amount, lang);
  };

  // State initialization with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SHIPPING);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialShippingSettings,
          ...parsed,
          free_shipping_threshold: parsed.free_shipping_threshold === 3000 ? 0 : (parsed.free_shipping_threshold || 0)
        };
      } catch (e) {
        return initialShippingSettings;
      }
    }
    return initialShippingSettings;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SITE_SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteSettings,
          ...parsed,
          office_address_en: parsed.office_address_en?.includes('Uttara') ? '' : (parsed.office_address_en || ''),
          office_address_bn: parsed.office_address_bn?.includes('উত্তরা') ? '' : (parsed.office_address_bn || ''),
          facebook_url: 'https://www.facebook.com/share/1X14b7NztN/',
          hotline: '01577686999',
          whatsapp_number: '01577686999',
          support_email: 'mehnajmart@gmail.com'
        };
      } catch (e) {
        return initialSiteSettings;
      }
    }
    return initialSiteSettings;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USERS);
    if (saved) {
      try {
        const parsed: User[] = JSON.parse(saved);
        // Ensure demo users have default passwords and usernames if upgraded
        return parsed.map(u => {
          if (u.phone === '01712345678') {
            return { ...u, username: u.username || 'mahmudul', password: u.password || 'Customer#2026' };
          }
          if (u.phone === '01819876543') {
            return { ...u, username: u.username || 'sadia', password: u.password || 'Customer#2026' };
          }
          return u;
        });
      } catch (e) {
        return initialUsers;
      }
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : null;
  });

  // Admins state with auto-migration to madurjo0099
  const [admins, setAdmins] = useState<AdminAccount[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ADMINS);
    if (saved) {
      try {
        const parsed: AdminAccount[] = JSON.parse(saved);
        // If old admin username exists, migrate to madurjo0099
        if (parsed.some(a => a.username === 'admin')) {
          return initialAdmins;
        }
        return parsed;
      } catch (e) {
        return initialAdmins;
      }
    }
    return initialAdmins;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminAccount | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_ADMIN);
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FAQS);
    return saved ? JSON.parse(saved) : initialFAQs;
  });

  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SUPPORT);
    return saved ? JSON.parse(saved) : initialSupportMessages;
  });

  const [dataLayerLogs, setDataLayerLogs] = useState<DataLayerEvent[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.DATALAYER);
    return saved ? JSON.parse(saved) : [];
  });

  const [isGtmInspectorOpen, setIsGtmInspectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SHIPPING, JSON.stringify(shippingSettings));
  }, [shippingSettings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SITE_SETTINGS, JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMINS, JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    if (currentAdmin) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(currentAdmin));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_ADMIN);
    }
  }, [currentAdmin]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_AUTH, String(isAdminAuthenticated));
  }, [isAdminAuthenticated]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SUPPORT, JSON.stringify(supportMessages));
  }, [supportMessages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.DATALAYER, JSON.stringify(dataLayerLogs));
  }, [dataLayerLogs]);

  // Push event to simulated dataLayer & real window.dataLayer
  const logDataLayerEvent = (event: DataLayerEvent['event'], payload: Record<string, any>) => {
    const newLog: DataLayerEvent = {
      id: `gtm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      event,
      timestamp: new Date().toLocaleTimeString(),
      payload
    };

    setDataLayerLogs(prev => [newLog, ...prev.slice(0, 49)]);

    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event,
        ...payload,
        ecommerce: payload
      });
    }
  };

  const clearDataLayerLogs = () => {
    setDataLayerLogs([]);
  };

  // Navigation router helper
  const navigate = (newRoute: ActiveRoute) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity = 1,
    directBuy = false
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.variantId === variant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          quantity,
          product,
          variant
        }
      ];
    });

    logDataLayerEvent('add_to_cart', {
      currency: 'BDT',
      value: variant.price * quantity,
      items: [
        {
          item_id: variant.sku,
          item_name: product.title_en,
          item_category: categories.find(c => c.id === product.category_id)?.name_en || 'General',
          price: variant.price,
          quantity
        }
      ]
    });

    if (directBuy) {
      navigate({ view: 'checkout' });
    }
  };

  const updateCartQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.variantId === variantId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (variantId: string) => {
    setCart(prev => prev.filter(item => item.variantId !== variantId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.variant.price * item.quantity, 0);

  // Orders Management
  const createOrder = (orderData: {
    name: string;
    phone: string;
    district: string;
    upazila: string;
    address: string;
    area_type: AreaType;
    notes?: string;
    coupon_code?: string;
    discount_amount?: number;
  }): Order => {
    const shippingFee =
      orderData.area_type === 'dhaka'
        ? shippingSettings.dhaka_fee
        : shippingSettings.outside_dhaka_fee;

    const discount = orderData.discount_amount || 0;
    const finalTotal = Math.max(0, cartSubtotal + shippingFee - discount);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MHJ-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      user_id: currentUser?.id,
      name: orderData.name,
      phone: orderData.phone,
      district: orderData.district,
      upazila: orderData.upazila,
      address: orderData.address,
      area_type: orderData.area_type,
      notes: orderData.notes,
      items: cart.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        title_en: item.product.title_en,
        title_bn: item.product.title_bn,
        variant_name_en: item.variant.name_en,
        variant_name_bn: item.variant.name_bn,
        sku: item.variant.sku,
        price: item.variant.price,
        quantity: item.quantity,
        image: item.product.primary_image
      })),
      subtotal: cartSubtotal,
      shipping_fee: shippingFee,
      discount_amount: discount,
      coupon_code: orderData.coupon_code,
      total_amount: finalTotal,
      order_status: 'pending',
      payment_method: 'cod',
      payment_status: 'unpaid',
      courier: 'Steadfast',
      purchase_tracked: true,
      status_timeline: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'Order placed by customer via Cash on Delivery'
        }
      ],
      created_at: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Reduce stock from products
    setProducts(prevProducts =>
      prevProducts.map(prod => {
        const orderItem = cart.find(c => c.productId === prod.id);
        if (!orderItem) return prod;

        return {
          ...prod,
          sales_count: prod.sales_count + orderItem.quantity,
          variants: prod.variants.map(v => {
            if (v.id === orderItem.variantId) {
              return { ...v, stock: Math.max(0, v.stock - orderItem.quantity) };
            }
            return v;
          })
        };
      })
    );

    // Trigger purchase event
    logDataLayerEvent('purchase', {
      transaction_id: orderNumber,
      value: finalTotal,
      tax: 0,
      shipping: shippingFee,
      currency: 'BDT',
      coupon: orderData.coupon_code || '',
      items: newOrder.items.map(item => ({
        item_id: item.sku,
        item_name: item.title_en,
        price: item.price,
        quantity: item.quantity
      }))
    });

    clearCart();
    return newOrder;
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note?: string,
    consignmentId?: string,
    paymentStatus?: PaymentStatus
  ) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;

        const timeline = [
          ...o.status_timeline,
          {
            status,
            timestamp: new Date().toISOString(),
            note: note || `Status updated to ${status}`
          }
        ];

        return {
          ...o,
          order_status: status,
          status_timeline: timeline,
          courier_consignment_id: consignmentId || o.courier_consignment_id,
          payment_status: paymentStatus !== undefined ? paymentStatus : o.payment_status,
          dispatch_date: status === 'shipped' && !o.dispatch_date ? new Date().toISOString() : o.dispatch_date
        };
      })
    );
  };

  // Product CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'created_at' | 'sales_count' | 'rating' | 'reviews_count'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviews_count: 0,
      sales_count: 0,
      created_at: new Date().toISOString()
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProd.id ? updatedProd : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category CRUD
  const addCategory = (catData: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (updatedCat: Category) => {
    setCategories(prev => prev.map(c => (c.id === updatedCat.id ? updatedCat : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Coupons
  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`
    };
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const toggleCoupon = (id: string) => {
    setCoupons(prev => prev.map(c => (c.id === id ? { ...c, is_active: !c.is_active } : c)));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  // Settings
  const updateShippingSettings = (newSettings: ShippingSettings) => {
    setShippingSettings(newSettings);
  };

  const updateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
  };

  // Auth (Customer)
  const loginUser = (
    identifier: string,
    password?: string
  ): { success: boolean; message: string } => {
    const rawClean = (identifier || '').trim();
    if (!rawClean) {
      return { success: false, message: 'Please enter your phone number or username.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your account password.' };
    }

    const cleanLower = rawClean.toLowerCase();
    const cleanDigits = rawClean.replace(/[^0-9]/g, '');

    // Match user by username (exact/case-insensitive), phone digits, or email
    const existing = users.find(u => {
      const uPhoneDigits = u.phone ? u.phone.replace(/[^0-9]/g, '') : '';
      const matchPhone = cleanDigits.length >= 10 && (uPhoneDigits.endsWith(cleanDigits.slice(-10)) || uPhoneDigits === cleanDigits);
      const matchEmail = u.email && u.email.toLowerCase() === cleanLower;
      const matchUsername = u.username && u.username.toLowerCase() === cleanLower;
      return Boolean(matchUsername || matchPhone || matchEmail);
    });

    if (!existing) {
      return {
        success: false,
        message: 'No account found with this username or phone number. Please create an account.'
      };
    }

    if (existing.is_blocked) {
      return {
        success: false,
        message: 'This user account has been disabled. Please contact customer support.'
      };
    }

    // Check password
    if (existing.password && existing.password !== password) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.'
      };
    }

    // If existing legacy user had no password yet, assign the entered password
    if (!existing.password) {
      const withPassword: User = { ...existing, password };
      setUsers(prev => prev.map(u => (u.id === existing.id ? withPassword : u)));
      setCurrentUser(withPassword);
      return { success: true, message: 'Logged in successfully' };
    }

    setCurrentUser(existing);
    return { success: true, message: 'Logged in successfully' };
  };

  const signupUser = (
    userData: {
      name: string;
      phone: string;
      password: string;
      username?: string;
      email?: string;
      district?: string;
      upazila?: string;
      address?: string;
      area_type?: AreaType;
    }
  ): { success: boolean; message: string } => {
    if (!userData.name || !userData.name.trim()) {
      return { success: false, message: 'Please enter your full name.' };
    }

    const cleanPhone = (userData.phone || '').trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      return { success: false, message: 'Please enter a valid 11-digit mobile number.' };
    }

    if (!userData.password || userData.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    // Check duplicate phone
    const existingPhone = users.find(u => {
      const digits = u.phone.replace(/[^0-9]/g, '');
      return digits.length >= 10 && digits.slice(-10) === cleanPhone.slice(-10);
    });
    if (existingPhone) {
      return {
        success: false,
        message: 'An account with this phone number already exists. Please log in.'
      };
    }

    // Check duplicate username
    const cleanUsername = userData.username?.trim().toLowerCase();
    if (cleanUsername) {
      const existingUser = users.find(
        u => u.username && u.username.toLowerCase() === cleanUsername
      );
      if (existingUser) {
        return {
          success: false,
          message: 'Username is already taken. Please choose a different username.'
        };
      }
    }

    // Check duplicate email
    const cleanEmail = userData.email?.trim().toLowerCase();
    if (cleanEmail && cleanEmail.includes('@')) {
      const existingEmail = users.find(
        u => u.email && u.email.toLowerCase() === cleanEmail
      );
      if (existingEmail) {
        return {
          success: false,
          message: 'An account with this email address already exists. Please log in.'
        };
      }
    }

    const generatedUsername = cleanUsername || `user_${cleanPhone.slice(-6)}`;
    const email = cleanEmail || `${cleanPhone}@mehnajmart.local`;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name.trim(),
      username: generatedUsername,
      phone: cleanPhone,
      email: email,
      password: userData.password,
      district: userData.district || 'Dhaka',
      upazila: userData.upazila || '',
      address: userData.address || '',
      area_type: userData.area_type || (userData.district === 'Dhaka' ? 'dhaka' : 'outside_dhaka'),
      created_at: new Date().toISOString(),
      is_blocked: false,
      role: 'customer'
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Account registered successfully!' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const changeUserPassword = (
    currentPass: string,
    newPass: string
  ): { success: boolean; message: string } => {
    if (!currentUser) {
      return { success: false, message: 'You must be logged in to change password.' };
    }
    if (currentUser.password && currentUser.password !== currentPass) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    const updatedUser: User = { ...currentUser, password: newPass };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    return { success: true, message: 'Password updated successfully!' };
  };

  const toggleBlockUser = (userId: string) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u)));
  };

  // Admin Auth & Team Management
  const loginAdmin = (identifier: string, password: string): boolean => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    // Find in admins list
    const found = admins.find(
      a =>
        a.is_active &&
        (a.username.toLowerCase() === cleanId || a.email.toLowerCase() === cleanId) &&
        a.password === cleanPass
    );

    if (found) {
      const updatedAdmin = { ...found, last_login: new Date().toISOString() };
      setCurrentAdmin(updatedAdmin);
      setIsAdminAuthenticated(true);
      setAdmins(prev => prev.map(a => (a.id === found.id ? updatedAdmin : a)));
      return true;
    }

    // Default fallback check for primary admin madurjo0099
    if (
      (cleanId === 'madurjo0099' || cleanId === 'madurjo2013@gmail.com') &&
      cleanPass === 'Madurjo#99Sec!2026'
    ) {
      const superAdmin = admins.find(a => a.username === 'madurjo0099') || initialAdmins[0];
      setCurrentAdmin(superAdmin);
      setIsAdminAuthenticated(true);
      return true;
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setCurrentAdmin(null);
  };

  const addAdmin = (adminData: Omit<AdminAccount, 'id' | 'created_at'>): { success: boolean; message: string } => {
    const cleanUsername = adminData.username.trim().toLowerCase();
    const cleanEmail = adminData.email.trim().toLowerCase();

    // Check duplicate
    const exists = admins.some(
      a => a.username.toLowerCase() === cleanUsername || a.email.toLowerCase() === cleanEmail
    );

    if (exists) {
      return { success: false, message: 'An admin with this username or email already exists.' };
    }

    const newAdmin: AdminAccount = {
      ...adminData,
      id: `adm-${Date.now()}`,
      username: cleanUsername,
      email: cleanEmail,
      created_at: new Date().toISOString()
    };

    setAdmins(prev => [...prev, newAdmin]);
    return { success: true, message: 'New admin account successfully created.' };
  };

  const updateAdmin = (updatedAdmin: AdminAccount) => {
    setAdmins(prev => prev.map(a => (a.id === updatedAdmin.id ? updatedAdmin : a)));
    if (currentAdmin && currentAdmin.id === updatedAdmin.id) {
      setCurrentAdmin(updatedAdmin);
    }
  };

  const deleteAdmin = (id: string): { success: boolean; message: string } => {
    if (admins.length <= 1) {
      return { success: false, message: 'Cannot delete the only admin account. At least one administrator is required.' };
    }
    const target = admins.find(a => a.id === id);
    if (target?.role === 'super_admin') {
      const superAdminCount = admins.filter(a => a.role === 'super_admin').length;
      if (superAdminCount <= 1) {
        return { success: false, message: 'Cannot delete the primary Super Administrator account.' };
      }
    }
    setAdmins(prev => prev.filter(a => a.id !== id));
    if (currentAdmin?.id === id) {
      logoutAdmin();
    }
    return { success: true, message: 'Admin account removed.' };
  };

  const toggleAdminStatus = (id: string) => {
    setAdmins(prev =>
      prev.map(a => {
        if (a.id !== id) return a;
        // Don't disable the last active admin
        const activeCount = prev.filter(adm => adm.is_active).length;
        if (a.is_active && activeCount <= 1) {
          alert('Cannot deactivate the last remaining active admin.');
          return a;
        }
        return { ...a, is_active: !a.is_active };
      })
    );
  };

  // Support & FAQs
  const addFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFaq: FAQ = {
      ...faqData,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const updateFAQ = (updatedFaq: FAQ) => {
    setFaqs(prev => prev.map(f => (f.id === updatedFaq.id ? updatedFaq : f)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  const sendSupportMessage = (msgData: Omit<SupportMessage, 'id' | 'created_at' | 'status'>) => {
    const newMsg: SupportMessage = {
      ...msgData,
      id: `sup-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString()
    };
    setSupportMessages(prev => [newMsg, ...prev]);
  };

  const replySupportMessage = (id: string, reply: string) => {
    setSupportMessages(prev => prev.map(m => (m.id === id ? { ...m, reply, status: 'resolved' } : m)));
  };

  return (
    <AppContext.Provider
      value={{
        route,
        navigate,
        lang,
        setLang,
        t,
        formatMoney,
        theme,
        toggleTheme,
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrder,
        updateOrderStatus,
        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        shippingSettings,
        updateShippingSettings,
        siteSettings,
        updateSiteSettings,
        currentUser,
        loginUser,
        signupUser,
        logoutUser,
        updateUserProfile,
        changeUserPassword,
        users,
        toggleBlockUser,
        admins,
        currentAdmin,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        toggleAdminStatus,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        supportMessages,
        sendSupportMessage,
        replySupportMessage,
        dataLayerLogs,
        logDataLayerEvent,
        clearDataLayerLogs,
        isGtmInspectorOpen,
        setIsGtmInspectorOpen,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
