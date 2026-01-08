import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    canonical,
    noindex,
    ogTitle,
    ogDescription,
    ogType = 'website',
    ogLocale = 'de_DE'
}) => {
    const siteTitle = 'Prozentrechner.de';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical Link */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={ogTitle || fullTitle} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={ogTitle || fullTitle} />
            <meta name="twitter:description" content={ogDescription || description} />
        </Helmet>
    );
};

export default SEO;
