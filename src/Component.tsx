import { useContentfulLiveUpdates } from "@contentful/live-preview/dist/react";

export default function Component({ locale = "en_US", ...props }) {
  const liveProps = useContentfulLiveUpdates(props, { locale });

  return (
    <div>
      <h1>Landing Page Background Color</h1>
      <p>{liveProps?.fields?.backgroundColor}</p>

      <h2>Nested Entry Title</h2>
      <p>
        {liveProps?.fields?.sections?.[0].fields?.cards?.[0]?.fields?.headline}
      </p>
    </div>
  );
}
