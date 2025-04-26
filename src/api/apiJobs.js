import supabaseClient from "@/components/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company: companies(name, logo_url), saved: saved_jobs(id)");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;
  if (error) {
    console.error("Error fetching Jobs:", error);
    return null;
  }
  return data;
}

export async function saveJobs(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  try {
    if (alreadySaved) {
      // Delete the saved job for this user and job
      const { data, error } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id)
        .eq("user_id", saveData.user_id); // Ensure user owns this saved job

      if (error) throw error;

      return data;
    } else {
      // Insert a new saved job for this user
      const { data, error } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();

      if (error) throw error;

      return data;
    }
  } catch (error) {
    console.error("Error saving job:", error.message);
    return null;
  }
}
