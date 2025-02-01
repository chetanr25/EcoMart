import "../styles/globals.css";
import { useEffect, useState } from "react";
import { analyseProduct } from "../utils/geminiService";
import SustainabilityAnalysis from "../components/SustainabilityAnalysis";
import SustainabilityLoading from "../components/SustainabilityLoading";
import styles from "../components/UnsupportedSite.module.css";

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

  const renderErrorMessage = () => {
    switch (error) {
      case "unsupported":
        return (
          <div className={styles.unsupportedSite}>
            <div className={styles.messageCard}>
              <div className={styles.icon}>🌍</div>
              <h2>Oops! Not a Supported Store</h2>
              <p className={styles.mission}>
                At EcoMart, we're on a mission to make online shopping more
                sustainable. We carefully analyze products from selected
                eco-conscious retailers to help you make environmentally
                responsible choices.
              </p>
              <p>Currently available on:</p>
              <ul>
                {SUPPORTED_SITES.map((site) => (
                  <li key={site}>• {site}</li>
                ))}
              </ul>
              <p className={styles.suggestion}>
                Join us in making the world a greener place, one purchase at a
                time. Visit any of our supported stores to make sustainable
                shopping choices.
              </p>
              <div className={styles.leaf}>🌿</div>
            </div>
          </div>
        );
      case "notab":
        return (
          <div className={styles.unsupportedSite}>
            <div className={styles.messageCard}>
              <div className={styles.icon}>⚠️</div>
              <h2>No Active Tab Found</h2>
              <p>Please open a supported e-commerce site to use EcoMart</p>
            </div>
          </div>
        );
      default:
        return <div className="text-red-500">Error: {error}</div>;
    }
  };

  return (
    <div>
      {loading ? (
        <SustainabilityLoading />
      ) : error ? (
        renderErrorMessage()
      ) : (
        <SustainabilityAnalysis analysis={generatedContent} />
      )}
    </div>
  );
}
