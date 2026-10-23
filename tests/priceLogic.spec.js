import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import ProductCard from '../src/components/ProductCard';
import { initialProducts, formatPrice } from '../src/data/products';
import { addToCart, createVolatileToken, filterProducts, restoreProductPrice, setProductPriceToZero, validateCredentials } from '../src/admin/priceLogic';

const base = () => initialProducts.map(p => ({ ...p }));

describe('Catálogo Gourmet & Co.', () => {
  it('mantiene los seis productos originales en el catálogo React', () => {
    expect(initialProducts.length).toBe(6);
    expect(initialProducts.map(p => p.name)).toContain('Té de Matcha');
    expect(initialProducts.map(p => p.name)).toContain('Queso Marzolino');
  });
  it('conserva el nombre, categoría, imagen y descripción en cada producto', () => {
    initialProducts.forEach(p => { expect(p.name.length).toBeGreaterThan(0); expect(p.category.length).toBeGreaterThan(0); expect(p.image.startsWith('https://')).toBeTrue(); expect(p.description.length).toBeGreaterThan(30); });
  });
  it('formatea precios con la configuración chilena', () => {
    expect(formatPrice(14990)).toBe('$14.990');
    expect(formatPrice(0)).toBe('$0');
  });
  it('filtra por nombre sin distinguir mayúsculas', () => {
    expect(filterProducts(base(), 'matcha').map(p => p.name)).toEqual(['Té de Matcha']);
    expect(filterProducts(base(), 'CHOCOLATE').length).toBe(1);
  });
  it('filtra productos cuyo precio actual es cero', () => {
    const result = filterProducts(base(), '', 'gratis');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Queso Marzolino');
  });
  it('cambia únicamente el producto seleccionado a cero', () => {
    const changed = setProductPriceToZero(base(), 'QC1');
    expect(changed.find(p => p.id === 'QC1').price).toBe(0);
    expect(changed.find(p => p.id === 'CT1').price).toBe(14990);
  });
  it('conserva el precio original al poner el precio actual en cero', () => {
    const changed = setProductPriceToZero(base(), 'QC1');
    expect(changed.find(p => p.id === 'QC1').originalPrice).toBe(54990);
  });
  it('restaura exactamente el precio original', () => {
    const changed = setProductPriceToZero(base(), 'QC3');
    const restored = restoreProductPrice(changed, 'QC3');
    expect(restored.find(p => p.id === 'QC3').price).toBe(69990);
  });
  it('restaura cero cuando el precio original del producto era cero', () => {
    const changed = setProductPriceToZero(base(), 'QC2');
    expect(restoreProductPrice(changed, 'QC2').find(p => p.id === 'QC2').price).toBe(0);
  });
  it('valida credenciales correctas y rechaza credenciales incorrectas', () => {
    expect(validateCredentials('admin', 'clave', 'admin', 'clave')).toBeTrue();
    expect(validateCredentials('admin', 'mala', 'admin', 'clave')).toBeFalse();
    expect(validateCredentials('', 'clave', 'admin', 'clave')).toBeFalse();
  });
  it('genera un token de sesión aleatorio no vacío', () => {
    const token = createVolatileToken();
    expect(token.length).toBe(48);
    expect(createVolatileToken()).not.toBe(token);
  });
  it('agrega productos al carrito y suma cantidades cuando ya existe', () => {
    const product = base().find(p => p.id === 'CT1');
    const first = addToCart([], product, 2);
    const second = addToCart(first.cart, product, 3);
    expect(second.cart.length).toBe(1);
    expect(second.cart[0].quantity).toBe(5);
    expect(second.cart[0].price).toBe(14990);
  });
  it('rechaza cantidades inválidas para el carrito', () => {
    const result = addToCart([], base()[0], 0);
    expect(result.error).toContain('cantidad válida');
    expect(result.cart.length).toBe(0);
  });
  it('renderiza el nombre, el precio y la cantidad recibidos por props', () => {
    const host = document.createElement('div'); document.body.appendChild(host);
    const root = createRoot(host);
    const product = base()[0];
    act(() => root.render(React.createElement(ProductCard, { product, onAdd: () => {} })));
    const imageButton = host.querySelector('button[aria-label="Ver detalles de Charqui"]');
    expect(imageButton).not.toBeNull();
    act(() => imageButton.click());
    expect(host.textContent).toContain('Charqui');
    expect(host.textContent).toContain('$54.990');
    expect(host.querySelector('input[type="number"]').value).toBe('1');
    act(() => root.unmount()); host.remove();
  });
});
