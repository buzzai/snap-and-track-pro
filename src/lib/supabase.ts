import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          name: string;
          address: string;
          created_at: string;
        };
        Insert: {
          name: string;
          address: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          project_id: string;
          title: string;
          status: "pending" | "in-progress" | "completed";
          due_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          project_id: string;
          title: string;
          status?: "pending" | "in-progress" | "completed";
          due_date?: string | null;
        };
      };
      photos: {
        Row: {
          id: string;
          project_id: string;
          url: string;
          created_at: string;
        };
        Insert: {
          project_id: string;
          url: string;
        };
      };
      activities: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          type: "task_created" | "task_updated" | "photo_added" | "team_joined";
          description: string;
          metadata: Record<string, any>;
          created_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          type: "task_created" | "task_updated" | "photo_added" | "team_joined";
          description: string;
          metadata?: Record<string, any>;
        };
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          project_id: string;
          type: "task_update" | "new_photo" | "team_activity";
          title: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          project_id: string;
          type: "task_update" | "new_photo" | "team_activity";
          title: string;
          message: string;
          read?: boolean;
        };
      };
      team_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          name: string;
          role: string;
          joined_at: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          name: string;
          role: string;
        };
      };
    };
  };
};
