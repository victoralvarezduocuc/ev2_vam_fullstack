import React from 'react';
import CategoryPage from './CategoryPage';
import { categoryRoutes } from './categoryRoutes';

export default function CafesTe(props) {
  return <CategoryPage {...props} config={categoryRoutes['/Cafes-Te.html']} />;
}
