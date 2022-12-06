import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://idxazxjswpteubyhchyw.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkeGF6eGpzd3B0ZXVieWhjaHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODUzNzEsImV4cCI6MTk4Mzg2MTM3MX0.S7dU6LMnSvv9sWA980ylnSlLqtj0q4iMvKzFC5Nx1_s"
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos")
                .select("*")
        }
    }
}