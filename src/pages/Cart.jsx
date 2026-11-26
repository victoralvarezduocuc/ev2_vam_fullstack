import React, { useState } from 'react';
import { formatPrice } from '../data/products';

function Cart({ cart, setCart, navigate, products }) {
  const effectiveCart = cart.map(item => { const current = products.find(p => p.id === item.id); return current ? { ...item, price: current.price } : item; });
  const change = (id, quantity) => setCart(old => quantity <= 0 ? old.filter(p => p.id !== id) : old.map(p => p.id === id ? {...p, quantity} : p));
  const total = effectiveCart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const empty = () => { if (window.confirm('¿Vaciar el carrito?')) setCart([]); };
  const [sending, setSending] = useState(false);
  // Envía la venta al backend, que la valida contra el catálogo y la guarda en MongoDB.
  const buy = async () => {
    if (!cart.length) { window.alert('Tu carrito está vacío.'); return; }
    setSending(true);
    try {
      const response = await fetch('/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: effectiveCart.map(p => ({ productId: p.id, quantity: p.quantity, unitPrice: p.price })) }),
      });
      if (!response.ok) {
        let reason = `error ${response.status}`;
        try { reason = (await response.json()).message || reason; } catch { /* respuesta sin JSON */ }
        window.alert(`No se pudo registrar la compra: ${reason}`);
        return;
      }
      const sale = await response.json();
      window.alert(`¡Compra realizada con éxito! N° de venta: ${sale.id}`);
      setCart([]);
    } catch {
      window.alert('No se pudo conectar con el servidor. ¿Está encendido el backend?');
    } finally {
      setSending(false);
    }
  };
  return <main className="container py-5"><h1 className="text-center mb-5">Tu carrito de compras</h1>{!cart.length ? <div className="text-center py-5"><h2 className="h5">Tu carrito está vacío</h2><p className="text-body-secondary">Agrega productos para comenzar tu compra.</p><button className="btn btn-outline-secondary" onClick={() => navigate('/')}>Ver productos</button></div> : <>{effectiveCart.map(p => <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center border-bottom py-3" key={p.id}><div><h2 className="h5 mb-1">{p.name}</h2><small className="text-body-secondary">{formatPrice(p.price)} c/u</small></div><div className="d-flex align-items-center gap-3"><div className="input-group" style={{width:130}}><button className="btn btn-outline-secondary" onClick={() => change(p.id,p.quantity-1)}>−</button><input className="form-control text-center" type="number" min="1" value={p.quantity} aria-label={`Cantidad de ${p.name}`} onChange={e => change(p.id,Number(e.target.value))}/><button className="btn btn-outline-secondary" onClick={() => change(p.id,p.quantity+1)}>+</button></div><strong style={{minWidth:100,textAlign:'right'}}>{formatPrice(p.price*p.quantity)}</strong><button className="btn btn-outline-danger btn-sm" onClick={() => change(p.id,0)} aria-label={`Eliminar ${p.name}`}>×</button></div></div>)}<div className="d-flex justify-content-end mt-4"><div><p className="mb-2">Subtotal: <strong>{formatPrice(total)}</strong></p><p className="mb-3">Total: <strong>{formatPrice(total)}</strong></p><div className="d-flex gap-2"><button className="btn btn-outline-danger" onClick={empty}>Vaciar carrito</button><button className="btn btn-success" onClick={buy} disabled={sending}>{sending ? 'Procesando...' : 'Comprar'}</button></div></div></div></>}</main>;
}
export default Cart;
