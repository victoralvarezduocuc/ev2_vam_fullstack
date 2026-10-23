import React from 'react';
import CategoryPage from './CategoryPage';
import { categoryRoutes } from './categoryRoutes';

export default function ChocolatesDulces(props) {
  return <CategoryPage {...props} config={categoryRoutes['/Chocolates-Dulces.html']} />;
}
