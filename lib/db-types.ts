// Typed shapes for the Supabase tables. These mirror the SQL migration
// in supabase/migrations/0001_init.sql — keep them in sync when the
// schema changes.

export type StayStyle = "Budget" | "Standard" | "Luxury";
export type NotificationChannel = "email" | "telegram" | "both";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type FavoriteItemType = "city" | "itinerary" | "story";

export interface Profile {
  id: string;
  user_id: string;
  name: string | null;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  telegram_username: string | null;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  item_type: FavoriteItemType;
  item_id: string;
  created_at: string;
}

export interface SavedTrip {
  id: string;
  user_id: string;
  name: string;
  days: number;
  style: StayStyle;
  cities: string[];
  total_budget: number;
  breakdown: Record<string, number>;
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  reference: string;
  tour_data: Record<string, unknown>;
  full_name: string;
  phone: string | null;
  notification_channel: NotificationChannel;
  status: BookingStatus;
  created_at: string;
}

export interface Story {
  id: string;
  user_id: string;
  title: string;
  content: string;
  cover_image: string | null;
  city: string | null;
  likes_count: number;
  created_at: string;
}

export interface StoryLike {
  id: string;
  story_id: string;
  user_id: string;
  created_at: string;
}

export interface StoryComment {
  id: string;
  story_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface AiConversation {
  id: string;
  user_id: string | null;
  messages: { role: "user" | "assistant"; content: string }[];
  created_at: string;
}
