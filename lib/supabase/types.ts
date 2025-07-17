export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      annadaan_bookings: {
        Row: {
          amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          booking_qty: number
          created_at: string
          item_name: string
          receiver: string
          status: Database["public"]["Enums"]["payment_status_enum"]
          year: number
        }
        Insert: {
          amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          booking_qty: number
          created_at?: string
          item_name: string
          receiver: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
          year: number
        }
        Update: {
          amount?: number
          booking_building?: Database["public"]["Enums"]["building_enum"]
          booking_flat?: number
          booking_name?: string
          booking_qty?: number
          created_at?: string
          item_name?: string
          receiver?: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "annadaan_bookings_item_name_fkey"
            columns: ["item_name"]
            isOneToOne: false
            referencedRelation: "annadaan_items"
            referencedColumns: ["item_name"]
          },
        ]
      }
      annadaan_items: {
        Row: {
          amount: number
          item_name: string
          price: number
          quantity: number
        }
        Insert: {
          amount: number
          item_name: string
          price: number
          quantity: number
        }
        Update: {
          amount?: number
          item_name?: string
          price?: number
          quantity?: number
        }
        Relationships: []
      }
      committee_members: {
        Row: {
          committee: Database["public"]["Enums"]["committee_enum"]
          is_active: boolean
          member_id: string
        }
        Insert: {
          committee?: Database["public"]["Enums"]["committee_enum"]
          is_active?: boolean
          member_id: string
        }
        Update: {
          committee?: Database["public"]["Enums"]["committee_enum"]
          is_active?: boolean
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "committee_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_bookings: {
        Row: {
          amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          booking_qty: number
          committee: Database["public"]["Enums"]["committee_enum"]
          created_at: string
          event_slug: string
          id: number
          last_action: string | null
          payment_mode: Database["public"]["Enums"]["payment_type_enum"]
          receiver: string
          status: Database["public"]["Enums"]["payment_status_enum"]
        }
        Insert: {
          amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          booking_qty?: number
          committee?: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          event_slug: string
          id?: number
          last_action?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_type_enum"]
          receiver: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
        }
        Update: {
          amount?: number
          booking_building?: Database["public"]["Enums"]["building_enum"]
          booking_flat?: number
          booking_name?: string
          booking_qty?: number
          committee?: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          event_slug?: string
          id?: number
          last_action?: string | null
          payment_mode?: Database["public"]["Enums"]["payment_type_enum"]
          receiver?: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "event_bookings_event_slug_fkey"
            columns: ["event_slug"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "event_bookings_last_action_fkey"
            columns: ["last_action"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          committee: Database["public"]["Enums"]["committee_enum"]
          created_at: string
          is_active: boolean
          last_action: string | null
          slug: string
          type: string
          year: number
        }
        Insert: {
          committee?: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          is_active?: boolean
          last_action?: string | null
          slug: string
          type: string
          year: number
        }
        Update: {
          committee?: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          is_active?: boolean
          last_action?: string | null
          slug?: string
          type?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_last_action_fkey"
            columns: ["last_action"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          committee: Database["public"]["Enums"]["committee_enum"]
          created_at: string
          date: string
          desc: string
          event_slug: string | null
          id: number
          logged_by: string | null
          paid_by: string | null
        }
        Insert: {
          amount: number
          committee: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          date?: string
          desc: string
          event_slug?: string | null
          id?: number
          logged_by?: string | null
          paid_by?: string | null
        }
        Update: {
          amount?: number
          committee?: Database["public"]["Enums"]["committee_enum"]
          created_at?: string
          date?: string
          desc?: string
          event_slug?: string | null
          id?: number
          logged_by?: string | null
          paid_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_event_slug_fkey"
            columns: ["event_slug"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "payments_logged_by_fkey"
            columns: ["logged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          building: Database["public"]["Enums"]["building_enum"]
          created_at: string
          email: string
          flat: number
          id: string
          is_admin: boolean
          name: string
        }
        Insert: {
          building: Database["public"]["Enums"]["building_enum"]
          created_at?: string
          email: string
          flat: number
          id?: string
          is_admin?: boolean
          name: string
        }
        Update: {
          building?: Database["public"]["Enums"]["building_enum"]
          created_at?: string
          email?: string
          flat?: number
          id?: string
          is_admin?: boolean
          name?: string
        }
        Relationships: []
      }
      temple_bookings: {
        Row: {
          booking_amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          created_at: string
          item_name: string
          receiver: string
          status: Database["public"]["Enums"]["payment_status_enum"]
        }
        Insert: {
          booking_amount: number
          booking_building: Database["public"]["Enums"]["building_enum"]
          booking_flat: number
          booking_name: string
          created_at?: string
          item_name: string
          receiver: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
        }
        Update: {
          booking_amount?: number
          booking_building?: Database["public"]["Enums"]["building_enum"]
          booking_flat?: number
          booking_name?: string
          created_at?: string
          item_name?: string
          receiver?: string
          status?: Database["public"]["Enums"]["payment_status_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "temple_bookings_item_name_fkey"
            columns: ["item_name"]
            isOneToOne: false
            referencedRelation: "temple_requirements"
            referencedColumns: ["item_name"]
          },
        ]
      }
      temple_requirements: {
        Row: {
          amount: number
          item_name: string
          quantity: number | null
        }
        Insert: {
          amount: number
          item_name: string
          quantity?: number | null
        }
        Update: {
          amount?: number
          item_name?: string
          quantity?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_annadaan_booking: {
        Args: {
          itemname: string
          yr: number
          bookname: string
          building: string
          flat: number
          qty: number
          receivr: string
          amt: number
        }
        Returns: boolean
      }
      create_temple_booking: {
        Args: {
          itemname: string
          bookname: string
          building: string
          flat: number
          amt: number
          receivr: string
        }
        Returns: boolean
      }
    }
    Enums: {
      building_enum: "A" | "B" | "C" | "D" | "E" | "F" | "G"
      committee_enum: "cultural" | "temple"
      payment_status_enum: "pending" | "confirmed"
      payment_type_enum: "cash" | "online"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      building_enum: ["A", "B", "C", "D", "E", "F", "G"],
      committee_enum: ["cultural", "temple"],
      payment_status_enum: ["pending", "confirmed"],
      payment_type_enum: ["cash", "online"],
    },
  },
} as const
