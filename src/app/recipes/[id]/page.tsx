// app/recipes/[id]/page.tsx
import Image from "next/image";
import { Suspense } from "react";

const API_KEY = process.env.SPOONACULAR_API_KEY;

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  extendedIngredients: { id: number; original: string }[];
  readyInMinutes: number;
  servings: number;
  summary: string;
}

async function fetchRecipeDetails(id: string): Promise<RecipeDetails> {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch recipe details");
  return res.json();
}

function RecipeDetailsContent({ recipe }: { recipe: RecipeDetails }) {
  return (
    <main className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{recipe.title}</h1>

      <Image
        src={recipe.image}
        alt={recipe.title}
        width={600}
        height={400}
        className="rounded-lg mb-4 object-cover w-full h-80"
      />

      <p className="mb-2 text-gray-700">🕒 Preparation time: {recipe.readyInMinutes} minutes</p>
      <p className="mb-4 text-gray-700">🍽 Servings: {recipe.servings}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-disc list-inside mb-6">
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Summary:</h2>
      <div
        className="text-gray-800 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
    </main>
  );
}

export default async function RecipeDetailsPage({ params }: { params: { id: string } }) {
  let recipe: RecipeDetails | null = null;
  let error = null;

  try {
    recipe = await fetchRecipeDetails(params.id);
  } catch (err) {
    error = (err as Error).message;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

  if (!recipe) return null;

  return (
    <Suspense fallback={<p className="text-center text-gray-600">Loading recipe...</p>}>
      <RecipeDetailsContent recipe={recipe} />
    </Suspense>
  );
}
