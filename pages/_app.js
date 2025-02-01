import "../styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const getCurrentTab = async () => {
      try {
        let [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        setPageTitle(tab);
        const title = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => document.title,
        });
        console.log(title);
        setPageTitle(title);
        // chrome.scripting.executeScript(
        //   {
        //     target: { tabId: tab.id },
        //     function: () => {
        //       return document.title;
        //     },
        //   },
        //   (results) => {
        //     if (results && results[0]?.result) {
        //       console.log(results[0].result);
        //       setPageTitle(results[0].result);
        //     }
        //   }
        // );
      } catch (error) {
        console.error("Error:", error);
        setPageTitle(`Error getting page title: ${error}`);
      }
    };

    getCurrentTab();
  }, []);

  return (
    <div className="min-w-[400px] min-h-[300px] p-6 bg-white">
      <div className="space-y-4">
        <h1 className="text-xl font-bold border-b pb-2">Current Page Title</h1>
        <p className="text-gray-600 break-words">{pageTitle}</p>
      </div>
    </div>
  );
}
