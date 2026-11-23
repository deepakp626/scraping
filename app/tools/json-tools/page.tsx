import type { Metadata } from 'next';
import JsonToolsSchema from './components/JsonToolsSchema';
import JsonToolsSection from './components/JsonToolsSection';
import { jsonTools } from './jsonTools';
import { buildJsonToolsLandingSchema, jsonToolsLandingMetadata } from './seo/landing';

export const metadata: Metadata = jsonToolsLandingMetadata;

function JsonToolsLandingPage() {
  return (
    <>
      <JsonToolsSchema schema={buildJsonToolsLandingSchema(jsonTools)} />
      <JsonToolsSection />
    </>
  );
}

export default JsonToolsLandingPage;
