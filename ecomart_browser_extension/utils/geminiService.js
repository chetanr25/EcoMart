const PARAMETER_WEIGHTS = {
  carbonFootprint: 0.1,
  ecoCertifications: 0.15,
  energyEfficiency: 0.15,
  recyclability: 0.15,
  waterUsage: 0.1,
  biodegradability: 0.1,
  toxicMaterials: 0.1,
};

export async function analyseProduct(productData) {
  const prompt = `
Analyze the environmental impact of this product: "${productData.title}".

**COMPULSORY PARAMETERS:**
1. **carbonFootprint** (kg CO₂)
2. **ecoCertifications** (count)

**SELECT 5 MOST RELEVANT PARAMETERS** (from this list based on the product type):
- energyEfficiency (%)  
- waterUsage (liters)  
- recyclability (%)  
- toxicMaterials (%)  
- lifespan (years)  
- repairability (%)  
- packagingWaste (grams)  
- transportDistance (km)  
- biodegradability (%)  
- resourceEfficiency (%)  
- chemicalUse (mg/kg)  
- manufacturingEfficiency (%)  
- renewableContent (%)  
- workingConditions (score/100)  
- VOCEmissions (g/m³)  

**Return Output as RAW JSON ONLY** (no markdown, no backticks, no explanations).  
Each parameter must have:  
- "actual_value": specific numerical measurement with unit  
- "percentage_score": 0-100 score for sustainability  

Example Output:  
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
    },
    "energyEfficiency": {
      "actual_value": 85,
      "unit": "%",
      "percentage_score": 90
    }
  }
}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
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
    let content = response.candidates[0].content.parts[0].text;
    content = content.replace(/```json\n|\n```|`/g, "").trim();
    const metrics = JSON.parse(content);

    if (
      !metrics.parameters.carbonFootprint ||
      !metrics.parameters.ecoCertifications
    ) {
      throw new Error("Missing compulsory parameters");
    }

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(metrics.parameters).forEach(([param, data]) => {
      const weight = PARAMETER_WEIGHTS[param] || 0.1;
      totalScore += data.percentage_score * weight;
      totalWeight += weight;
    });

    const finalScore = Number((totalScore / totalWeight).toFixed(2));

    return {
      parameters: metrics.parameters,
      sustainabilityScore: finalScore,
      weightedBreakdown: Object.entries(metrics.parameters).map(
        ([param, data]) => ({
          parameter: param,
          rawScore: data.percentage_score,
          weight: PARAMETER_WEIGHTS[param] || 0.1,
          weightedScore: (
            data.percentage_score * (PARAMETER_WEIGHTS[param] || 0.1)
          ).toFixed(2),
          actualValue: data.actual_value,
          unit: data.unit,
        })
      ),
    };
  } catch (error) {
    console.error("Error calculating sustainability score:", error);
    console.error(
      "Raw response:",
      response.candidates[0].content.parts[0].text
    );
    throw error;
  }
}
