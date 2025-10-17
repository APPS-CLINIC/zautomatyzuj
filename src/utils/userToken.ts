import type { UserTokenData } from '../types/chat';

const TOKEN_KEY = 'zautomatyzuj_user_token';
const TOKEN_DATA_KEY = 'zautomatyzuj_user_data';

/**
 * Generuje unikalny token UUID v4 dla użytkownika
 */
function generateToken(): string {
  return crypto.randomUUID();
}

/**
 * Pobiera token użytkownika z localStorage lub generuje nowy
 */
export function getUserToken(): string {
  let token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    token = generateToken();
    localStorage.setItem(TOKEN_KEY, token);
    
    // Zapisz dane tokenu
    const tokenData: UserTokenData = {
      token,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      isNewUser: true
    };
    localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(tokenData));
  } else {
    // Zaktualizuj datę ostatniego użycia
    const tokenData = getUserTokenData();
    if (tokenData) {
      tokenData.lastUsed = new Date().toISOString();
      localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(tokenData));
    }
  }
  return token;
}

/**
 * Sprawdza czy użytkownik jest nowy (pierwsza wizyta)
 */
export function isNewUser(): boolean {
  const tokenData = localStorage.getItem(TOKEN_DATA_KEY);
  if (!tokenData) return true;
  
  try {
    const data: UserTokenData = JSON.parse(tokenData);
    return data.isNewUser;
  } catch {
    return true;
  }
}

/**
 * Oznacza użytkownika jako powracającego (po pierwszej wiadomości)
 */
export function markUserAsReturning(): void {
  const tokenData = localStorage.getItem(TOKEN_DATA_KEY);
  if (tokenData) {
    try {
      const data: UserTokenData = JSON.parse(tokenData);
      data.isNewUser = false;
      localStorage.setItem(TOKEN_DATA_KEY, JSON.stringify(data));
    } catch {
      // Ignoruj błędy parsowania
    }
  }
}

/**
 * Pobiera pełne dane tokenu użytkownika
 */
export function getUserTokenData(): UserTokenData | null {
  const tokenData = localStorage.getItem(TOKEN_DATA_KEY);
  if (!tokenData) return null;
  
  try {
    return JSON.parse(tokenData);
  } catch {
    return null;
  }
}

/**
 * Resetuje token użytkownika (usuwa z localStorage)
 */
export function resetUserToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_DATA_KEY);
}
