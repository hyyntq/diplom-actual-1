// actions/search-action.ts
"use server";

import { z } from "zod";
import { searchService } from "@/services/search-service";
import { SearchState } from "@/lib/interface";

const schema = z.object({
  query: z.string().min(1),
});

export async function searchAction(
  prevState: SearchState,
  formData: FormData
): Promise<SearchState> {
  

  const validated = schema.safeParse({ 
    query: formData.get("query")
  });

  if (!validated.success) {
    return {
      ...prevState,
      ZodError: validated.error.flatten().fieldErrors,
      results: [],
    };
  }

  const results = await searchService(validated.data.query);
  return {
    ZodError: null,
    results,
  };
}
