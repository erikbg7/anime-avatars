export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          created_at: string
          dispatched: boolean
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          dispatched?: boolean
          email: string
          id: string
        }
        Update: {
          created_at?: string
          dispatched?: boolean
          email?: string
          id?: string
        }
      }
      diffusions: {
        Row: {
          created_at: string
          customer_id: string
          job_id: string
          status: Database["public"]["Enums"]["diffusion_status"] | null
          style: Database["public"]["Enums"]["diffusion_style"]
          url: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          job_id: string
          status?: Database["public"]["Enums"]["diffusion_status"] | null
          style: Database["public"]["Enums"]["diffusion_style"]
          url?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["diffusion_status"] | null
          style?: Database["public"]["Enums"]["diffusion_style"]
          url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      diffusion_status: "waiting" | "completed" | "failed"
      diffusion_style: "kawaii" | "shonen" | "naruto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
