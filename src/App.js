import React, { useState } from 'react';

// Mock Data for Sports Wear
const PRODUCTS = [
  { id: 1, name: "Pro-Runner Z1", price: 120, category: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
  { id: 2, name: "Compression Tech Tee", price: 45, category: "Apparel", img: "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f" },
  { id: 3, name: "Elite Basketball Shorts", price: 35, category: "Apparel", img: "https://images.unsplash.com/photo-1515444744559-7be63e1600de" },
  { id: 4, name: "Ultra-Grip Yoga Mat", price: 60, category: "Accessories", img: "https://images.unsplash.com/photo-1518611012118-29a8d63a4018" },
  { id: 5, name: "Hydro-Flask 32oz", price: 40, category: "Accessories", img: "https://images.unsplash.com/photo-1602143307185-8c150fa9567a" },
  { id: 6, name: "Carbon Fiber Racket", price: 210, category: "Equipment", img: "https://images.unsplash.com/photo-1617083281297-af330b568710" },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredProducts = filter === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 5%', background: '#000', color: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <h2>TITAN SPORTS</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => setFilter("All")} style={navBtnStyle}>Shop All</button>
          <button onClick={() => setIsCartOpen(true)} style={cartBtnStyle}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={heroStyle}>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>PUSH YOUR LIMITS</h1>
        <p>Premium performance gear for the modern athlete.</p>
      </header>

      {/* Category Filter */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '2rem' }}>
        {["All", "Shoes", "Apparel", "Accessories", "Equipment"].map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            style={{ ...filterBtnStyle, background: filter === cat ? '#ff4757' : '#fff' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main style={gridStyle}>
        {filteredProducts.map(product => (
          <div key={product.id} style={cardStyle}>
            <img src={product.img} alt={product.name} style={imgStyle} />
            <div style={{ padding: '15px' }}>
              <h3>{product.name}</h3>
              <p style={{ color: '#666' }}>{product.category}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</span>
                <button onClick={() => addToCart(product)} style={addBtnStyle}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div style={sidebarStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          </div>
          <hr />
          {cart.length === 0 ? <p>Your cart is empty.</p> : (
            <>
              {cart.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <hr />
              <h3>Total: ${total}</h3>
              <button style={checkoutBtnStyle}>Checkout Now</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const heroStyle = {
  height: '40vh',
  background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1350&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '30px',
  padding: '0 5% 5% 5%'
};

const cardStyle = {
  background: '#fff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s'
};

const imgStyle = { width: '100%', height: '200px', objectFit: 'cover' };

const navBtnStyle = { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem' };

const cartBtnStyle = { background: '#ff4757', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' };

const filterBtnStyle = { padding: '8px 20px', border: '1px solid #ddd', borderRadius: '20px', cursor: 'pointer' };

const addBtnStyle = { background: '#000', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' };

const sidebarStyle = {
  position: 'fixed', right: 0, top: 0, width: '350px', height: '100vh',
  background: '#fff', boxShadow: '-5px 0 15px rgba(0,0,0,0.2)', padding: '2rem', zIndex: 200
};

const checkoutBtnStyle = { width: '100%', padding: '15px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px', marginTop: '20px', cursor: 'pointer', fontSize: '1.1rem' };

export default App;