import React from 'react';
import CategoryPage from './CategoryPage';
import { categoryRoutes } from './categoryRoutes';

export default function QuesosCharcuteria(props) {
  return <CategoryPage {...props} config={categoryRoutes['/Quesos-Charcuteria.html']} />;
}
