import type { SupabaseClient } from '@supabase/supabase-js';
export async function removeUnusedMedia(client: SupabaseClient, ids: string[]) {
  for (const id of new Set(ids.filter(Boolean))) {
    // Foreign keys prevent removing an asset still used by any other content.
    const { data, error } = await client.from('media_assets').delete().eq('id', id).select('path').maybeSingle();
    if (!error && data) await client.storage.from('media').remove([data.path]);
  }
}
