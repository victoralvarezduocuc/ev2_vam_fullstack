import React from 'react';
import CategoryPage from './CategoryPage';
import { categoryRoutes } from './categoryRoutes';

export default function VinosLicores(props) {
  return <CategoryPage {...props} config={categoryRoutes['/Vinos-Licores.html']} />;
}
