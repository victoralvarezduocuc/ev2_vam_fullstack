// Se ejecuta automáticamente la primera vez que arranca el contenedor de MongoDB.
// Crea la base "gourmet" y el usuario que usa la API (ver spring.mongodb.uri en application.properties).
db = db.getSiblingDB('gourmet');
db.createUser({
  user: 'gourmet_user',
  pwd: 'gourmet123',
  roles: [{ role: 'readWrite', db: 'gourmet' }],
});
