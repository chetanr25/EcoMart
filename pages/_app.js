import "../styles/globals.css";
import { useEffect, useState } from "react";
import { analyseProduct } from "../utils/geminiService";
import SustainabilityAnalysis from "../components/SustainabilityAnalysis";
import SustainabilityLoading from "../components/SustainabilityLoading";

const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mb-4"></div>
      <p className="text-lg text-green-700">Analyzing sustainability...</p>
    </div>
  </div>
);

export default function App({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        setLoading(true);
        // setPageTitle("Macbook Pro");
        // setPageDescription("Macbook Pro");
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs && tabs[0]) {
          const tab = tabs[0];
          setPageTitle(tab.title || tab.url);
          // setPageDescription(
          //   document.querySelector("meta[name='description']")?.content
          // );
          const productData = {
            title: tab.title,
          };
          const result = await analyseProduct(productData);
          // console.log(result);
          setGeneratedContent(result);
          setLoading(false);
        } else {
          setPageTitle("No active tab found");
        }
        //   } catch (error) {
        //     console.error("Error:", error);
        //     setPageTitle(`Error: ${error.message}`);
        //   }
        // };
        // Check if we're in a Chrome extension context
        // if (typeof chrome !== 'undefined' && chrome.tabs) {
        //   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        //   // if (tab) {
        //     setPageTitle(tab[0].title || "Unknown Product");
        //     setPageDescription(tab[0].description || "Unknown Product");
        //     const productData = {
        //       title: tab[0].title,
        //       description: tab[0].description,
        //       url: tab[0].url
        //     };
        //     const result = await analyseProduct(productData);
        //     console.log(result);
        //     setGeneratedContent(result);
        //   // }
        //     // Only analyze if it's an Amazon product page
        //     // if (tab[0].url.includes('amazon.com')) {
        //     //   const productData = {
        //     //     title: tab[0].title,
        //     //     description: tab[0].description,
        //     //     url: tab[0].url
        //     //   };

        //       // const result = await analyseProduct(productData);
        //       // setAnalysis(result);
        //     // }
        //   // }
        // } else {
        //   // Fallback for development/testing
        //   setPageTitle("Development Mode");
        //   const testProduct = {
        //     title: "Test Product",
        //     description: "Test Description"
        //   };
        //   const result = await analyseProduct(testProduct);
        //   setAnalysis(result);
        // }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCurrentTab();
  }, []);

  // const renderAnalysisResults = (analysis) => {
  //   if (!analysis) return null;

  //   return (
  //     <div className="analysis-results">
  //       <h2 className="text-xl font-bold mb-4">Sustainability Analysis</h2>

  //       {/* Overall Score */}
  //       <div className="mb-6">
  //         <h3 className="font-semibold">Overall Sustainability Score</h3>
  //         <div className="text-3xl font-bold text-green-600">
  //           {analysis.sustainabilityScore.score}/100
  //         </div>
  //       </div>

  //       {/* Carbon Footprint */}
  //       <div className="mb-4">
  //         <h3 className="font-semibold">Carbon Footprint</h3>
  //         <p>{analysis.carbonFootprint.value} {analysis.carbonFootprint.unit}</p>
  //         <p className="text-sm text-gray-600">{analysis.carbonFootprint.details}</p>
  //       </div>

  //       {/* Water Usage */}
  //       <div className="mb-4">
  //         <h3 className="font-semibold">Water Usage</h3>
  //         <p>{analysis.waterUsage.value} {analysis.waterUsage.unit}</p>
  //         <p className="text-sm text-gray-600">{analysis.waterUsage.details}</p>
  //       </div>

  //       {/* Add other parameters similarly */}

  //       {/* Improvements */}
  //       <div className="mt-6">
  //         <h3 className="font-semibold">Suggested Improvements</h3>
  //         <ul className="list-disc pl-5">
  //           {analysis.sustainabilityScore.improvements.map((improvement, index) => (
  //             <li key={index} className="text-sm text-gray-600">{improvement}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      {loading ? (
        <SustainabilityLoading />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <SustainabilityAnalysis analysis={generatedContent} />
      )}
    </div>
  );
}
