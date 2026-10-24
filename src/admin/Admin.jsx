import React, { useMemo, useState } from 'react';
import { formatPrice } from '../data/products';
import { createVolatileToken, filterProducts, restoreProductPrice, setProductPriceToZero, validateCredentials } from './priceLogic';

// Demostración académica sin backend: cambiar estas variables para el entorno local. No son credenciales seguras.
const DEMO_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const DEMO_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '1234';

export default function Admin({ products, setProducts, onLogout, navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('todos');
  const [notice, setNotice] = useState('');
  const visibleProducts = useMemo(() => filterProducts(products, query, status), [products, query, status]);
  function login(e) {
    e.preventDefault();
    if (!validateCredentials(username, password, DEMO_USER, DEMO_PASSWORD)) { setError('Usuario o contraseña incorrectos.'); return; }
    setToken(createVolatileToken()); setError('');
  }
  function logout() { setToken(null); setPassword(''); setUsername(''); setQuery(''); onLogout?.(); }
  function updatePrice(id, restore) {
    if (!window.confirm(restore ? '¿Restaurar el precio original de este producto?' : '¿Establecer temporalmente este producto en $0?')) return;
    setProducts(current => restore ? restoreProductPrice(current, id) : setProductPriceToZero(current, id));
    setNotice(restore ? 'Precio original restaurado.' : 'Precio establecido en $0 temporalmente.');
  }
  if (!token) return <main className="admin-page container py-5"><div className="login-card card shadow mx-auto"><div className="card-body p-4 p-md-5"><a href="/" onClick={e => { e.preventDefault(); navigate("/"); }} className="small text-decoration-none">← Volver a la tienda</a><p className="admin-eyebrow mt-4 mb-2">GOURMET & CO.</p><h1 className="h2 mb-2">Panel de administración</h1><p className="text-secondary mb-4">Inicia sesión para gestionar los precios.</p><form onSubmit={login}><label htmlFor="admin-user" className="form-label">Usuario o correo</label><input id="admin-user" className="form-control mb-3" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required/><label htmlFor="admin-password" className="form-label">Contraseña</label><input id="admin-password" type="password" className="form-control mb-3" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required/>{error && <div className="alert alert-danger" role="alert">{error}</div>}<button className="btn btn-dark w-100" type="submit">Iniciar sesión</button></form></div></div></main>;
  return <main className="admin-page container-fluid px-3 px-lg-5 py-4"><div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4"><div><p className="admin-eyebrow mb-1">GOURMET & CO. / ADMIN</p><h1 className="h2 mb-1">Gestión de precios</h1></div><div className="d-flex gap-2"><a className="btn btn-outline-dark" href="/" onClick={e => { e.preventDefault(); navigate("/"); }}>Ver tienda</a><button className="btn btn-dark" onClick={logout}>Cerrar sesión</button></div></div>
    <div className="row g-3 mb-4"><div className="col-sm-4"><div className="admin-stat"><span>Productos</span><strong>{products.length}</strong></div></div><div className="col-sm-4"><div className="admin-stat"><span>Precio normal</span><strong>{products.filter(p => p.price !== 0).length}</strong></div></div><div className="col-sm-4"><div className="admin-stat"><span>En $0</span><strong>{products.filter(p => p.price === 0).length}</strong></div></div></div>
    <section className="card admin-table-card"><div className="card-body"><div className="d-flex flex-wrap gap-3 justify-content-between mb-3"><div><h2 className="h5 mb-1">Catálogo original</h2><p className="text-secondary small mb-0">Restaurar devuelve el valor original exacto, incluido $0 si ese era el precio original.</p></div><div className="d-flex flex-wrap gap-2"><input className="form-control" placeholder="Buscar producto…" aria-label="Buscar producto" value={query} onChange={e => setQuery(e.target.value)}/><select className="form-select" aria-label="Filtrar por precio" value={status} onChange={e => setStatus(e.target.value)}><option value="todos">Todos</option><option value="normal">Precio normal</option><option value="gratis">Precio $0</option></select></div></div>{notice && <div className="alert alert-success py-2" role="status">{notice}</div>}<div className="table-responsive"><table className="table align-middle"><thead><tr><th>Producto</th><th>Precio actual</th><th>Precio original</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{visibleProducts.map(p => <tr key={p.id}><td><div className="d-flex align-items-center gap-3"><img src={p.image} alt="" className="admin-product-img"/><div><strong>{p.name}</strong><div className="small text-secondary">{p.category}</div></div></div></td><td className="fw-bold">{formatPrice(p.price)}</td><td>{formatPrice(p.originalPrice)}</td><td><span className={`badge ${p.price === 0 ? 'text-bg-success' : 'text-bg-light border'}`}>{p.price === 0 ? 'A $0' : 'Precio normal'}</span></td><td><div className="d-flex gap-2">{p.price !== 0 && <button className="btn btn-sm btn-outline-danger" onClick={() => updatePrice(p.id, false)}>Poner en $0</button>}{p.price !== p.originalPrice && <button className="btn btn-sm btn-outline-success" onClick={() => updatePrice(p.id, true)}>Restaurar</button>}{p.price === p.originalPrice && p.price === 0 && <span className="small text-secondary">Precio original $0</span>}</div></td></tr>)}</tbody></table></div>{visibleProducts.length === 0 && <p className="text-secondary text-center py-4">No hay productos que coincidan con la búsqueda.</p>}</div></section>
  </main>;
}
