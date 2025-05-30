export interface UserProfile {
  full_name: string | null;
  phone_number: string | null;
  gender: string | null;
  birth_date: string | null;
  bio: string | null;
  profile_picture: string | null;
  nationality: string | null;
  preferred_language: string;
}

export interface User {
  user_id: number;
  email: string;
  is_admin: number;
  is_staff: number;
  profile: UserProfile;
} 