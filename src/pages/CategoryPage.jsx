import React from 'react';
import ProductCard from '../components/ProductCard';

function CategoryPage({ config, products, onAdd }) {
  const list = products.filter(p => p.category === config.category);
  return <section className={`album py-5 bg-body-tertiary ${config.bg}`}><h1 className="fw-light col-lg-6 col-md-8 mx-auto row py-lg-5 text-center category-title">{config.title}</h1><div className="container"><div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">{list.map(p => <ProductCard key={p.id} product={p} onAdd={onAdd}/>)}</div></div></section>;
}
export default CategoryPage;
