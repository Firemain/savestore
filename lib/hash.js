const crypto = require('crypto');

// Cette fonction n'est utilisée que pour la création initiale du hash et du salt.
export function hashUserPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${hashedPassword}:${salt}`;
}

// Cette fonction est utilisée pour vérifier le mot de passe lors de la connexion.
export function verifyPassword(storedPassword, suppliedPassword) {
  const [hashedPassword, salt] = storedPassword.split(':');
  const suppliedPasswordHash = crypto.scryptSync(suppliedPassword, salt, 64).toString('hex');
  return hashedPassword === suppliedPasswordHash;
}
