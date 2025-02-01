import "../styles/globals.css";
import { useEffect, useState } from "react";
import { analyseProduct } from "../utils/geminiService";
import SustainabilityAnalysis from "../components/SustainabilityAnalysis";
import SustainabilityLoading from "../components/SustainabilityLoading";
import styles from "../components/UnsupportedSite.module.css";
import ErrorMessage from "../components/ErrorMessage";

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

  const SUPPORTED_SITES = [
    "amazon.com",
    "amazon.in",
    "flipkart.com",
    "myntra.com",
    "ajio.com",
  ];

  const isSupportedSite = (url) => {
    return SUPPORTED_SITES.some((site) => url.includes(site));
  };

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        setLoading(true);
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs && tabs[0]) {
          const tab = tabs[0];
          setPageTitle(tab.title || tab.url);

          if (isSupportedSite(tab.url)) {
            const productData = {
              title: tab.title,
              url: tab.url,
            };
            const result = await analyseProduct(productData);
            setGeneratedContent(result);
          } else {
            setError("unsupported");
          }
        } else {
          setPageTitle("No active tab found");
          setError("notab");
        }
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCurrentTab();
  }, []);

  return (
    <div>
      {loading ? (
        <SustainabilityLoading />
      ) : error ? (
        <ErrorMessage error={error} supportedSites={SUPPORTED_SITES} />
      ) : (
        <SustainabilityAnalysis analysis={generatedContent} />
      )}
    </div>
  );
}
