export async function analyseProduct(productData) {
  const prompt = `
    For this product: "${productData.title}"

    Analyze with these COMPULSORY parameters:
    1. carbonFootprint
    2. ecoCertifications

    Then select 5 most relevant additional parameters from this list:
    energyEfficiency, waterUsage, recyclability, toxicMaterials, lifespan, repairability, 
    packagingWaste, transportDistance, biodegradability, resourceEfficiency, chemicalUse, 
    manufacturingEfficiency, renewableContent, workingConditions, VOCEmissions

    Return ONLY a raw JSON object (no markdown formatting, no backticks) with exactly 7 parameters (2 compulsory + 5 selected), each containing:
    1. actual_value: specific numerical measurement with unit
    2. percentage_score: 0-100 score for sustainability calculation

    Example format (follow exactly):
    {
      "parameters": {
        "carbonFootprint": {
          "actual_value": 25.5,
          "unit": "kg CO₂",
          "percentage_score": 85
        },
        "ecoCertifications": {
          "actual_value": 3,
          "unit": "count",
          "percentage_score": 80
        }
      }
    }

    Requirements:
    - Return ONLY the JSON object
    - NO markdown formatting
    - NO backticks
    - NO explanatory text
    - ONLY numerical values
    - Percentage scores MUST be between 0-100
    - Values must be realistic and specific
    - ecoCertifications count as numerical value (number of valid certifications)
  `;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return calculateSustainabilityScore(data);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

function calculateSustainabilityScore(response) {
  try {
    // Extract the text content and clean it
    let content = response.candidates[0].content.parts[0].text;

    // Remove any markdown formatting or backticks if present
    content = content.replace(/```json\n|\n```|`/g, "").trim();

    // Parse the cleaned JSON
    const metrics = JSON.parse(content);

    // Ensure compulsory parameters exist
    if (
      !metrics.parameters.carbonFootprint ||
      !metrics.parameters.ecoCertifications
    ) {
      throw new Error("Missing compulsory parameters");
    }

    let totalScore = 0;
    const parameterCount = Object.keys(metrics.parameters).length;

    // Calculate weighted average
    for (const [param, data] of Object.entries(metrics.parameters)) {
      // Give slightly higher weight to compulsory parameters
      const weight =
        param === "carbonFootprint" || param === "ecoCertifications" ? 1.2 : 1;
      totalScore += data.percentage_score * weight;
    }

    return {
      parameters: metrics.parameters,
      sustainabilityScore: Number(
        (totalScore / (parameterCount + 0.4)).toFixed(2)
      ),
    };
  } catch (error) {
    console.error("Error calculating sustainability score:", error);
    console.error("Raw content:", response.candidates[0].content.parts[0].text);
    throw error;
  }
}
