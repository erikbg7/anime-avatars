#!/bin/sh

echo "Updating Supabase types..."
echo $SUPABASE_PROJECT_ID
npx supabase gen types typescript --project-id $SUPABASE_PROJECT_ID > src/server/supabase.d.ts