import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Generate a 30-day meal plan using OpenAI API
 * @param {string} userGoal - User's fitness goal (e.g., "weight loss", "muscle gain", "maintenance")
 * @param {string} dietType - User's diet type (e.g., "vegan", "keto", "vegetarian", "paleo", "balanced")
 * @returns {Object} - { mealPlanData: Array }
 */
export async function generateMonthlyMealPlan(userGoal, dietType) {
  const prompt = `You are a professional nutritionist and meal planning expert. Generate a comprehensive 30-day meal plan with the following requirements:

**User Profile:**
- Goal: ${userGoal}
- Diet Type: ${dietType}

**Requirements for Each Day (all 30 days):**
1. Breakfast - with specific meal name and ingredients and instructions
2. Lunch - with specific meal name and ingredients and instructions
3. Dinner - with specific meal name and ingredients and instructions
4. Snack 1 - specific snack item and instructions
5. Snack 2 - specific snack item and instructions

**Nutritional Requirements:**
- Include calories for EACH meal (breakfast, lunch, dinner, snack1, snack2)
- Include total daily calories
- Include daily macros: protein (g), fats (g), carbs (g)

**Important Rules:**
- ALL 30 days must have DIFFERENT meals - no repetitive diet
- Meals must be realistic and easy to prepare
- Be SPECIFIC - avoid vague items like "sandwich" - instead use "whole grain turkey avocado sandwich with lettuce and tomato"
- Ensure nutritional values are realistic and balanced for the ${userGoal} goal
- Meals should align with ${dietType} dietary restrictions

**Response Format:**
Return ONLY valid JSON in this exact structure (no markdown, no code blocks, just pure JSON).
IMPORTANT: "instructions" field is MANDATORY for every single meal. Do not omit it.

{
  "days": [
    {
      "day": 1,
      "meals": {
        "breakfast": {
          "name": "Specific meal name",
          "ingredients": "List of ingredients",
          "instructions": "Step 1: Do this. Step 2: Do that.",
          "calories": 400
        },
        "lunch": {
          "name": "Specific meal name",
          "ingredients": "List of ingredients",
          "instructions": "Step 1: Do this. Step 2: Do that.",
          "calories": 550
        },
        "dinner": {
          "name": "Specific meal name",
          "ingredients": "List of ingredients",
          "instructions": "Step 1: Do this. Step 2: Do that.",
          "calories": 600
        },
        "snack1": {
          "name": "Specific snack",
          "instructions": "Just eat it.",
          "calories": 150
        },
        "snack2": {
          "name": "Specific snack",
          "instructions": "Just eat it.",
          "calories": 100
        }
      },
      "totalCalories": 1800,
      "macros": {
        "protein": 120,
        "fats": 60,
        "carbs": 180
      }
    }
    // ... repeat for all 30 days
  ]
}

Generate all 30 days now.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional nutritionist who creates detailed, varied, and realistic meal plans. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8, // Higher temperature for more variety
      max_tokens: 16000, // Enough for 30 days of detailed meal plans
    });

    const responseText = completion.choices[0].message.content.trim();

    // Remove markdown code blocks if present
    let jsonText = responseText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const mealPlanData = JSON.parse(jsonText);

    // Validate the response structure
    if (!mealPlanData.days || !Array.isArray(mealPlanData.days)) {
      throw new Error("Invalid meal plan structure: missing days array");
    }

    if (mealPlanData.days.length !== 30) {
      throw new Error(`Expected 30 days, got ${mealPlanData.days.length}`);
    }

    return {
      mealPlanData: mealPlanData.days,
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    console.warn("Falling back to MOCK meal plan data due to API error.");

    // Return mock data instead of throwing
    const mockDays = generateMockDays(userGoal, dietType);

    return {
      mealPlanData: mockDays,
    };
  }
}

/**
 * Generate 30 days of mock meal plan data
 */
function generateMockDays(userGoal, dietType) {
  const days = [];
  const meals = [
    { name: "Oatmeal with Berries", calories: 350, type: "breakfast" },
    { name: "Avocado Toast with Egg", calories: 400, type: "breakfast" },
    { name: "Greek Yogurt Parfait", calories: 300, type: "breakfast" },
    { name: "Grilled Chicken Salad", calories: 500, type: "lunch" },
    { name: "Quinoa Vegetable Bowl", calories: 450, type: "lunch" },
    { name: "Turkey Wrap", calories: 480, type: "lunch" },
    { name: "Salmon with Asparagus", calories: 600, type: "dinner" },
    { name: "Stir-fry Tofu and Veggies", calories: 550, type: "dinner" },
    { name: "Lean Beef Steak with Potatoes", calories: 650, type: "dinner" },
    { name: "Apple with Almond Butter", calories: 200, type: "snack" },
    { name: "Protein Bar", calories: 180, type: "snack" },
    { name: "Carrot Sticks with Hummus", calories: 150, type: "snack" }
  ];

  for (let i = 1; i <= 30; i++) {
    // Randomly select meals for variety
    const breakfast = meals.filter(m => m.type === 'breakfast')[Math.floor(Math.random() * 3)];
    const lunch = meals.filter(m => m.type === 'lunch')[Math.floor(Math.random() * 3)];
    const dinner = meals.filter(m => m.type === 'dinner')[Math.floor(Math.random() * 3)];
    const snack1 = meals.filter(m => m.type === 'snack')[Math.floor(Math.random() * 3)];
    const snack2 = meals.filter(m => m.type === 'snack')[Math.floor(Math.random() * 3)];

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snack1.calories + snack2.calories;

    days.push({
      day: i,
      meals: {
        breakfast: {
          name: breakfast.name,
          ingredients: "Mock ingredients for " + breakfast.name,
          instructions: "1. Prepare ingredients.\n2. Cook " + breakfast.name + ".\n3. Serve and enjoy!",
          calories: breakfast.calories
        },
        lunch: {
          name: lunch.name,
          ingredients: "Mock ingredients for " + lunch.name,
          instructions: "1. Prepare ingredients.\n2. Cook " + lunch.name + ".\n3. Serve and enjoy!",
          calories: lunch.calories
        },
        dinner: {
          name: dinner.name,
          ingredients: "Mock ingredients for " + dinner.name,
          instructions: "1. Prepare ingredients.\n2. Cook " + dinner.name + ".\n3. Serve and enjoy!",
          calories: dinner.calories
        },
        snack1: {
          name: snack1.name,
          instructions: "1. Prepare snack.\n2. Enjoy!",
          calories: snack1.calories
        },
        snack2: {
          name: snack2.name,
          instructions: "1. Prepare snack.\n2. Enjoy!",
          calories: snack2.calories
        }
      },
      totalCalories: totalCalories,
      macros: {
        protein: Math.floor(totalCalories * 0.3 / 4),
        fats: Math.floor(totalCalories * 0.3 / 9),
        carbs: Math.floor(totalCalories * 0.4 / 4)
      }
    });
  }
  return days;
}



/**
 * Generate a single recipe based on ingredients and diet type
 * @param {string} ingredients - Comma separated ingredients
 * @param {string} dietType - User's diet type
 * @returns {Object} - Recipe object
 */
export async function generateRecipe(ingredients, dietType) {
  const prompt = `You are a professional chef. Create a delicious recipe using these ingredients: ${ingredients}.
  The recipe must be suitable for a ${dietType} diet.
  
  **Requirements:**
  - Use the provided ingredients as the main components. You can assume basic pantry staples (oil, salt, pepper, spices, water) are available but dont use any other ingredients that are not mentioned.
  - Provide a creative and appetizing title.
  - Provide step-by-step cooking instructions.
  - Estimate calories and macros (protein, fats, carbs).
  
  **Response Format:**
  Return ONLY valid JSON in this exact structure:
  {
    "title": "Recipe Title",
    "ingredients": "List of ingredients used (including quantities)",
    "instructions": "Step 1: ...\nStep 2: ...",
    "calories": 500,
    "macros": {
      "protein": 30,
      "fats": 20,
      "carbs": 50
    }
  }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a professional chef who creates delicious recipes. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const responseText = completion.choices[0].message.content.trim();

    // Clean up potential markdown
    let jsonText = responseText;
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const recipeData = JSON.parse(jsonText);
    return recipeData;

  } catch (error) {
    console.error("OpenAI API Error (Recipe):", error);
    // Fallback mock recipe
    return {
      title: "Enter more ingredients",
    };
  }
}
