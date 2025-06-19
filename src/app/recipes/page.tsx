import Image from "next/image";
import Link from "next/link";

const API_KEY = process.env.SPOONACULAR_API_KEY;

// export const dynamic = "force-dynamic";
export const revalidate = 60;

interface Recipe {
  id: number;
  title: string;
  image: string;
}

async function fetchRecipes(query: string, cuisine: string, maxReadyTime: string): Promise<Recipe[]> {
  const params = new URLSearchParams();
  if (query) params.append("query", query);
  if (cuisine) params.append("cuisine", cuisine);
  if (!API_KEY) {
    throw new Error("SPOONACULAR_API_KEY is missing. Check your .env.local");
  }
  if (maxReadyTime) params.append("maxReadyTime", maxReadyTime);

  const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}&apiKey=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch recipes");

  const data = await res.json();
  return data.results;
}

export default async function RecipesPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const params = await searchParams; // <- обов'язковий await

  let recipes: Recipe[] = [];
  let error = null;

  try {
    recipes = await fetchRecipes(params.query || "", params.cuisine || "", params.maxReadyTime || "");
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>

      {error && (
        <p className="text-red-600 text-center">Error: {error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.id}`}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all"
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={400}
              height={300}
              className="rounded mb-2 object-cover w-full h-48"
            />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
