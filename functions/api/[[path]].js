// Cloudflare Pages Functions - Edge Auth & REST Handler

// Web Crypto SHA-256 Password Hasher
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Pre-hashed passwords using SHA-256
// 'admin123' -> '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'
// 'customerpassword123' -> 'eab628cef02a1d05caa3b728f6e5a71094701501fc851b7a8d6edbf849e32190'
const ACCOUNTS_DB = {
  'admin@gmail.com': {
    hash: '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9',
    user: {
      _id: 'cf_admin_1',
      name: 'AURÉLIA Admin',
      email: 'admin@gmail.com',
      role: 'admin',
      token: 'cf_jwt_token_admin_2026'
    }
  },
  'priya@example.com': {
    hash: 'eab628cef02a1d05caa3b728f6e5a71094701501fc851b7a8d6edbf849e32190',
    user: {
      _id: 'cf_customer_1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      role: 'customer',
      token: 'cf_jwt_token_customer_2026'
    }
  }
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle Authentication Routes (Login)
  if (path.includes('auth/login') || path.endsWith('/login') || path.includes('/login')) {
    try {
      let body = {};
      try {
        body = await context.request.json();
      } catch (e) {}

      const email = body.email ? body.email.trim().toLowerCase() : '';
      const password = body.password || '';

      if (!email || !password) {
        return new Response(JSON.stringify({ message: 'Email and password are required' }), {
          headers: corsHeaders,
          status: 400
        });
      }

      // Compute SHA-256 hash of entered password
      const inputHash = await hashPassword(password);

      const account = ACCOUNTS_DB[email];
      if (account && account.hash === inputHash) {
        return new Response(JSON.stringify(account.user), { headers: corsHeaders, status: 200 });
      }

      // Strictly return 401 Unauthorized for incorrect password or unknown email
      return new Response(JSON.stringify({ message: 'Invalid email or password. Access denied.' }), {
        headers: corsHeaders,
        status: 401
      });
    } catch (err) {
      return new Response(JSON.stringify({ message: 'Authentication error occurred.' }), {
        headers: corsHeaders,
        status: 500
      });
    }
  }

  // Handle Register Route
  if (path.includes('auth/register') || path.endsWith('/register') || path.includes('/register')) {
    try {
      const body = await context.request.json();
      const email = body.email ? body.email.trim().toLowerCase() : '';
      const isAdmin = email.includes('admin');
      
      const newHash = await hashPassword(body.password || 'password123');
      const newUser = {
        _id: `cf_user_${Date.now()}`,
        name: body.name || 'AURÉLIA User',
        email: email || 'user@gmail.com',
        role: isAdmin ? 'admin' : 'customer',
        token: `cf_jwt_token_${Date.now()}`
      };

      ACCOUNTS_DB[email] = { hash: newHash, user: newUser };

      return new Response(JSON.stringify(newUser), { headers: corsHeaders, status: 201 });
    } catch (e) {
      return new Response(JSON.stringify({ message: 'Registration failed.' }), {
        headers: corsHeaders,
        status: 400
      });
    }
  }

  // Handle Orders Routes
  if (path.includes('orders')) {
    return new Response(JSON.stringify([
      {
        _id: 'ORD-882910',
        createdAt: new Date().toISOString(),
        totalAmount: 12500,
        status: 'Delivered',
        shippingAddress: { fullName: 'Priya Sharma', city: 'Mumbai' },
        orderItems: [
          { name: 'AURA Solitaire Ring', price: 12500, quantity: 1, image: '/images/hero.jpg' }
        ]
      }
    ]), { headers: corsHeaders, status: 200 });
  }

  // Handle Admin Analytics
  if (path.includes('admin') || path.includes('analytics')) {
    return new Response(JSON.stringify({
      totalRevenue: 854000,
      totalOrders: 142,
      activeCustomers: 98,
      avgOrderValue: 6014,
      recentOrders: []
    }), { headers: corsHeaders, status: 200 });
  }

  // Health check endpoint fallback
  return new Response(JSON.stringify({
    status: 'ok',
    brand: 'AURÉLIA Fine Jewellery',
    platform: 'Cloudflare Pages Functions Edge Network',
    timestamp: new Date()
  }), {
    headers: corsHeaders
  });
}


