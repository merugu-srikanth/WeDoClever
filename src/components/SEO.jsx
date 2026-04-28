import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, url, image }) {
  const siteTitle = 'WeDo Clever | Custom Web Development, Mobile App & Digital Marketing Agency';
  const finalTitle = title ? `${title} | WeDo Clever` : siteTitle;
  const finalDescription = description || "WeDo Clever is a premium custom web development, mobile app development (Flutter, React Native), and digital marketing agency. We build scalable React & Next.js websites, Android & iOS apps, and run high-ROI Google Ads & SEO campaigns.";
  const finalUrl = url ? `https://wedocleverit.com${url}` : 'https://wedocleverit.com';
  
  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content="custom web development, web development company, mobile app development, mobile app development company, React development, Next.js development, Flutter app development, React Native app, digital marketing agency, SEO services, Google Ads management, Meta Ads, social media marketing, scalable web solutions, SaaS development, UI UX design, Node.js backend development, e-commerce development, full stack development" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      {image && <meta property="twitter:image" content={image} />}
    </Helmet>
  );
}
