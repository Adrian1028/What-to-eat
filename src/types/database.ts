export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          display_name?: string | null;
          avatar_url?: string | null;
        };
      };
      roulette_configs: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          filters: RouletteFilters;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          name: string;
          description?: string | null;
          filters?: RouletteFilters;
        };
        Update: {
          name?: string;
          description?: string | null;
          filters?: RouletteFilters;
        };
      };
      history_logs: {
        Row: {
          id: string;
          user_id: string;
          restaurant_name: string;
          restaurant_place_id: string | null;
          latitude: number;
          longitude: number;
          category: string | null;
          rating: number | null;
          chosen_at: string;
          config_id: string | null;
        };
        Insert: {
          user_id: string;
          restaurant_name: string;
          restaurant_place_id?: string | null;
          latitude: number;
          longitude: number;
          category?: string | null;
          rating?: number | null;
          config_id?: string | null;
        };
        Update: Record<string, never>;
      };
    };
  };
}

export interface RouletteFilters {
  radius_m?: number;
  categories?: string[];
  price_levels?: number[];
  min_rating?: number;
  open_now?: boolean;
}

export interface Restaurant {
  place_id: string;
  name: string;
  rating: number;
  price_level?: number;
  distance_m: number;
  travel_time_min?: number;
  latitude: number;
  longitude: number;
  address: string;
  categories: string[];
  is_open: boolean | null;
  photo_url?: string;
}
