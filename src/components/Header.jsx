import React from 'react';
import { categories } from '../data/products';
export default function Header({ navigate }) {
  return <header className="site-header d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <img src="/LOGO.png" width="50" height="50" alt="Logo Gourmet & Co." />
    <a href="/" onClick={e => { e.preventDefault(); navigate('/'); }} className="d-flex align-items-center mb-3 mb-md-0 me-auto text-decoration-none"><span className="fs-4">Gourmet & Co.</span></a>
    <ul className="nav nav-pills">{categories.map(item => <li className="nav-item" key={item.href}><a href={item.href} onClick={e => { e.preventDefault(); navigate(item.href); }} className="nav-link">{item.label}{item.label === 'Carrito' ? ' 🛒' : ''}</a></li>)}
    <li className="nav-item"><a href="/admin" className="nav-link admin-nav" onClick={e => { e.preventDefault(); navigate('/admin'); }}>Admin</a></li></ul>
  </header>;
}
