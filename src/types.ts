export type Language = string;

export type FloralSource = 'Wildflower' | 'Coffee Blossom' | 'Sunflower' | 'Multiflora';
export type Grade = 'Grade A' | 'Grade B' | 'Grade C';

export interface Harvest {
  id: string;
  batchId: string;
  date: string;
  location: string;
  floralSource: FloralSource;
  quantityKg: number;
  grade: Grade;
}

export type ActiveTab = 'home' | 'harvest' | 'grading' | 'chat' | 'menu' | 'learn' | 'delivery' | 'rewards' | 'teams' | 'contact' | 'buyerChat' | 'profile' | 'batchTracker' | 'priceMonitoring' | 'settings';

export interface AppState {
  language: Language;
  harvests: Harvest[];
  isAuthenticated: boolean;
}
