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

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), application: application(*)")
    .eq("id", job_id)
    .single();
  if (error) {
    console.error("Error Fetching Single Jobs:", error);
    return null;
  }
  return data;
}
export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();
  if (error) {
    console.error("Error Updating Job:", error);
    return null;
  }
  return data;
}
export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();
  if (error) {
    console.error("Error Creating Job:", error);
    return null;
  }
  return data;
}
export async function getSaveJob(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*,job:jobs(*, company: companies(name,logo_url))");
  if (error) {
    console.error("Error Fetching Saved Jobs:", error);
    return null;
  }
  return data;
}
