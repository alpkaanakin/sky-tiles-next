import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://corscsvwglmbbjwihpfn.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvcnNjc3Z3Z2xtYmJqd2locGZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDg3ODMxNCwiZXhwIjoyMDUwNDU0MzE0fQ.uymOXtaAOtU8Fayy74LlrZ_SaA5vzo8YH8nB3K5V_v4"
);
