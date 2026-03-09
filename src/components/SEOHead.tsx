import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SEOHead = ({
  title = "eFlip — Bold Design Agency",
  description = "eFlip is a design agency crafting websites, games, print media, and videos that push creative boundaries.",
  image = "https://eflip.ie/og-image.png",
  url,
  type = "website",
  jsonLd,
}: SEOHeadProps) => {
  const location = useLocation();
  const fullTitle = title === "eFlip — Bold Design Agency" ? title : `${title} | eFlip`;
  const canonicalUrl = url || `https://eflip.ie${location.pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="eFlip" />
      <meta property="og:locale" content="en_IE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
