export function setProductPriceToZero(products, id) {
  return products.map(p => p.id === id ? { ...p, price: 0 } : p);
}
export function restoreProductPrice(products, id) {
  return products.map(p => p.id === id ? { ...p, price: p.originalPrice } : p);
}
export function filterProducts(products, query, status = 'todos') {
  const normalized = query.trim().toLocaleLowerCase('es');
  return products.filter(p => {
    const matchesName = p.name.toLocaleLowerCase('es').includes(normalized);
    const matchesStatus = status === 'todos' || (status === 'gratis' ? p.price === 0 : p.price !== 0);
    return matchesName && matchesStatus;
  });
}
export function validateCredentials(username, password, configuredUsername, configuredPassword) {
  return Boolean(username && password && username === configuredUsername && password === configuredPassword);
}
export function createVolatileToken() {
  const bytes = new Uint8Array(24);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}
export function addToCart(cart, product, quantity) {
  const qty = Number.parseInt(quantity, 10);
  if (!Number.isInteger(qty) || qty <= 0) return { cart, error: 'Selecciona una cantidad válida mayor a 0.' };
  const existing = cart.find(item => item.id === product.id);
  if (existing) return { cart: cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + qty, price: product.price } : item), error: null };
  return { cart: [...cart, { id: product.id, name: product.name, price: product.price, quantity: qty }], error: null };
}
