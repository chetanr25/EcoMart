import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        const tabs = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tabs && tabs[0]) {
          const tab = tabs[0];
          setPageTitle(tab.title || tab.url);
          setPageDescription(
            document.querySelector("meta[name='description']")?.content
          );
        } else {
          setPageTitle("No active tab found");
        }
      } catch (error) {
        console.error("Error:", error);
        setPageTitle(`Error: ${error.message}`);
      }
    };

    getCurrentTab();
  }, []);

  return (
    <div className="">
      <div className="">
        <h1 className="">Title: {pageTitle}</h1>
        <br />
        <p className="">Description: {pageDescription}</p>
      </div>
    </div>
  );
}
