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
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SUPPORTED_SITES = [
    "amazon.com",
    "amazon.in",
    "flipkart.com",
    "myntra.com",
    "ajio.com",
  ];

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        setLoading(true);
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tab) {
          throw new Error("notab");
        }

        if (!isSupportedSite(tab.url)) {
          throw new Error("unsupported");
        }

        const result = await analyseProduct({
          title: tab.title,
          url: tab.url,
        });

        setAnalysis(result);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCurrentTab();
  }, []);

  const isSupportedSite = (url) => SUPPORTED_SITES.some(site => url.includes(site));

  if (loading) return <SustainabilityLoading />;
  if (error) return <ErrorMessage error={error} supportedSites={SUPPORTED_SITES} />;
  if (!analysis) return null;

  return <SustainabilityAnalysis analysis={analysis} />;
}
