import React, { useState } from 'react';
import { formatPrice } from '../data/products';
export default function ProductCard({ product, onAdd }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(['QC1'].includes(product.id) ? 1 : 0);
  const [message, setMessage] = useState('');
  function add() {
    if (Number(quantity) <= 0) { setMessage('Selecciona una cantidad válida mayor a 0.'); return; }
    onAdd(product, quantity); setMessage(''); setOpen(false);
  }
  return <div className="col"><article className="card shadow-sm h-100 original-product-card">
    <button className="product-image-button" onClick={() => setOpen(true)} aria-label={`Ver detalles de ${product.name}`}><img src={product.image} alt={product.name} className="card-img-top" loading="lazy" /></button>
  </article>
  {open && <div className="product-modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby={`title-${product.id}`}><div className="modal-header"><h2 id={`title-${product.id}`} className="modal-title fs-4">{product.name}</h2><button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setOpen(false)} /></div><div className="modal-body text-center"><img src={product.image} className="img-fluid modal-product-image" alt={product.name}/><p className="mt-3">{product.description}</p><p className="mt-3 fs-4 fw-bold">{product.id === 'QC2' && product.price === 0 ? 'GRATIS! SOLO POR HOY!' : formatPrice(product.price)}</p><div className="mt-3 text-center mb-3"><label htmlFor={`cantidad-${product.id}`} className="form-label">Cantidad</label><input id={`cantidad-${product.id}`} type="number" className="form-control w-auto mx-auto" style={{width:80}} value={quantity} min="0" max={product.id === 'QC2' ? 1 : undefined} onChange={e => setQuantity(e.target.value)}/></div>{message && <p className="text-danger" role="alert">{message}</p>}<button type="button" className="btn btn-sm btn-outline-secondary" onClick={add}>Agregar al carrito</button></div></section></div>}</div>;
}
