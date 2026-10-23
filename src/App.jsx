import React, { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Admin from './admin/Admin';
import { initialProducts } from './data/products';
import { addToCart } from './admin/priceLogic';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CafesTe from './pages/CafesTe';
import ChocolatesDulces from './pages/ChocolatesDulces';
import QuesosCharcuteria from './pages/QuesosCharcuteria';
import VinosLicores from './pages/VinosLicores';

const pageByPath = {
  '/Cafes-Te.html': CafesTe,
  '/Chocolates-Dulces.html': ChocolatesDulces,
  '/Quesos-Charcuteria.html': QuesosCharcuteria,
  '/Vinos-Licores.html': VinosLicores,
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [products, setProducts] = useState(() => initialProducts.map(product => ({ ...product })));
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('carrito') || '[]').map(product => ({
        ...product,
        id: product.id || product.nombre,
        name: product.name || product.nombre,
        quantity: product.quantity || product.cantidad,
      }));
    } catch {
      return [];
    }
  });

  const navigate = useCallback(nextPath => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('carrito', JSON.stringify(cart.map(product => ({
      nombre: product.name,
      precio: product.price,
      cantidad: product.quantity,
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }))));
  }, [cart]);

  const onAdd = useCallback((product, quantity) => {
    const result = addToCart(cart, product, quantity);
    if (result.error) {
      window.alert(result.error);
      return;
    }
    setCart(result.cart);
    window.alert('¡Producto agregado al carrito con éxito!');
  }, [cart]);

  const sharedPageProps = { products, onAdd, navigate };
  const CategoryComponent = pageByPath[path];

  let page;
  if (path === '/admin') {
    page = <Admin products={products} setProducts={setProducts} navigate={navigate} />;
  } else if (path === '/Carrito.html') {
    page = <Cart cart={cart} setCart={setCart} navigate={navigate} products={products} />;
  } else if (CategoryComponent) {
    page = <CategoryComponent {...sharedPageProps} />;
  } else {
    page = <Home {...sharedPageProps} />;
  }

  return <>
    {path !== '/admin' && <Header navigate={navigate} />}
    {page}
    <footer className="site-footer text-center py-4 mt-5">
      <span>Gourmet & Co. - Víctor Álvarez</span>
    </footer>
  </>;
}
