import "../styles/globals.css";
import { useEffect, useState } from "react";
import { analyseProduct } from "../utils/geminiService";
import SustainabilityAnalysis from "../components/SustainabilityAnalysis";
import SustainabilityLoading from "../components/SustainabilityLoading";
import ErrorMessage from "../components/ErrorMessage";
import { db } from "../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import SustainableAlternatives from "../components/SustainableAlternatives";
import SustainableAlternativesSkeleton from "../components/SustainableAlternativesSkeleton";

export default function App({ Component, pageProps }) {
  const [analysis, setAnalysis] = useState(null);
  const [sustainableAlternatives, setSustainableAlternatives] = useState([]);
  const [isAlternativesLoading, setIsAlternativesLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getSustainableAlternatives = async (analysisResult) => {
    try {
      console.log("Analysis result received:", analysisResult);

      if (!db) {
        console.error("Firestore database not initialized");
        return [];
      }

      const ecoProductsRef = collection(db, "eco-products");
      const querySnapshot = await getDocs(ecoProductsRef);

      if (querySnapshot.empty) {
        console.log("No documents found in eco-products collection");
        return [];
      }

      // Enhanced matching logic with better substring matching
      const isProductMatch = (product, analysisResult) => {
        const matchesCategory =
          product.product.category?.toLowerCase() ===
          analysisResult?.category?.toLowerCase();

        const productTitle = analysisResult?.title?.toLowerCase() || "";

        const matchesTags = product.tags?.some((tag) => {
          const normalizedTag = tag.toLowerCase();
          // Check if tag is in title OR title contains the tag
          return (
            productTitle.includes(normalizedTag) ||
            normalizedTag.includes(productTitle)
          );
        });

        const isMatch = matchesCategory || matchesTags;

        // Debug logging for matching
        console.log("Match check:", {
          product: product.product.title,
          category: product.product.category,
          tags: product.tags,
          analysisTitle: productTitle,
          matchesCategory,
          matchesTags,
          isMatch,
        });

        return isMatch;
      };

      console.log("Query snapshot:", querySnapshot);
      const alternatives = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          certification: doc.data().certification || [],
          companyHead: doc.data()["company-head"] || {},
          product: doc.data().product || {},
          tags: doc.data().tags || [],
        }))
        .filter((product) => isProductMatch(product, analysisResult));

      console.log("Alternatives found:", alternatives);
      return alternatives;
    } catch (error) {
      console.error("Error in getSustainableAlternatives:", {
        name: error.name,
        message: error.message,
        code: error.code,
        stack: error.stack,
      });

      setError("database");
      return [];
    }
  };

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state

        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!tabs?.[0]) {
          setError("notab");
          return;
        }

        const tab = tabs[0];
        setPageTitle(tab.title || tab.url);

        if (!isSupportedSite(tab.url)) {
          setError("unsupported");
          return;
        }

        const productData = {
          title: tab.title,
          url: tab.url,
        };

        const result = await analyseProduct(productData);
        setAnalysis(result);

        setIsAlternativesLoading(true);
        const alternatives = await getSustainableAlternatives(result);

        if (!error) {
          // Only set alternatives if no error occurred
          setSustainableAlternatives(alternatives);
        }
      } catch (error) {
        console.error("Error in getCurrentTab:", error);
        setError(error.message);
      } finally {
        setLoading(false);
        setIsAlternativesLoading(false);
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
        <>
          <SustainabilityAnalysis analysis={analysis} />
          {isAlternativesLoading ? (
            <SustainableAlternativesSkeleton />
          ) : sustainableAlternatives.length > 0 ? (
            <SustainableAlternatives alternatives={sustainableAlternatives} />
          ) : error === "database" ? (
            <div className="error-message">
              Unable to load sustainable alternatives. Please try again later.
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
