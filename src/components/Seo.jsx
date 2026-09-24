import { useEffect } from 'react';

const SITE_NAME = 'Noah Khaemba';
const DEFAULT_DESCRIPTION = 'Noah Khaemba is a systems engineer specialising in distributed systems, data infrastructure, and payments.';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function Seo({ title, description = DEFAULT_DESCRIPTION, type = 'website', image, structuredData }) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Systems Engineer`;

    document.title = pageTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta('property', 'og:title', pageTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', url.href);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageTitle);
    upsertMeta('name', 'twitter:description', description);

    if (image) {
      const absoluteImage = new URL(image, url.origin).href;
      upsertMeta('property', 'og:image', absoluteImage);
      upsertMeta('name', 'twitter:image', absoluteImage);
    }

    upsertLink('canonical', url.href);

    const existingSchema = document.head.querySelector('script[data-seo-schema]');
    if (existingSchema) existingSchema.remove();
    if (structuredData) {
      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.dataset.seoSchema = 'true';
      schema.textContent = JSON.stringify(structuredData);
      document.head.appendChild(schema);
    }

    return () => {
      const schema = document.head.querySelector('script[data-seo-schema]');
      if (schema) schema.remove();
    };
  }, [description, image, structuredData, title, type]);

  return null;
}

export { DEFAULT_DESCRIPTION };