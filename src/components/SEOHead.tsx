import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title = "eFlip — Bold Design Agency",
  description = "eFlip is a design agency crafting websites, games, print media, and videos that push creative boundaries.",
  image = "https://eflip.ie/og-image.png",
  url,
  type = "website",
}: SEOHeadProps) => {
  const fullTitle = title === "eFlip — Bold Design Agency" ? title : `${title} | eFlip`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
