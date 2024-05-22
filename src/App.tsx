import "./App.css";
import { useState, useEffect } from "react";
import { getEntry } from "./utils/contentful-client";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";
import Component from "./Component";

function App() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const space = searchParams.get("space");
  const previewToken = searchParams.get("previewToken");
  const locale = searchParams.get("locale") || "en-US";
  const environment = searchParams.get("env") || "mark-test";

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (id && space && previewToken) {
        try {
          // Get contentful entry
          const entry = await getEntry(id, {
            space,
            previewToken,
            locale,
            environment,
          });
          console.log({ entry });
          setData(entry);
        } catch (error) {
          console.error(error);
          setData({
            error,
            sys: { contentType: { sys: { id: "NOT_FOUND" } } },
          });
        }
      }
    };
    fetchData();
  }, [id]);

  return (
    <ContentfulLivePreviewProvider
      locale={locale}
      environment={environment}
      targetOrigin="https://t5dnkz.csb.app/"
    >
      <Component {...data} locale={locale} />
    </ContentfulLivePreviewProvider>
  );
}

export default App;
