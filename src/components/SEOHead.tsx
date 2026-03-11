import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEOHead = ({
  title = "eFlip — Creative Design Agency in Ireland | Web, Games, Print & Video",
  description = "eFlip is an Irish design agency specialising in web design, game development, print media, and video production. Bold creative solutions that elevate your brand.",
  image = "https://eflip.ie/og-image.png",
  url,
  type = "website",
  noindex = false,
  keywords,
  jsonLd,
}: SEOHeadProps) => {
  const location = useLocation();
  const fullTitle = title === "eFlip — Creative Design Agency in Ireland | Web, Games, Print & Video" ? title : `${title} | eFlip`;
  const canonicalUrl = url || `https://eflip.ie${location.pathname}`;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="eFlip" />
      <meta property="og:locale" content="en_IE" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@eflip" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
