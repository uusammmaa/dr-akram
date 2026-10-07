import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { HelpCircleIcon } from "@sanity/icons";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { HelpDeskTool } from "./sanity/components/GuidedTour";
import { StudioLayout } from "./sanity/components/StudioLayout";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "dr-akram",
  title: "Prof. Dr. Mian Muhammad Akram",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      layout: StudioLayout,
    },
  },
  tools: (prev) => [
    ...prev,
    {
      name: "help",
      title: "Help",
      icon: HelpCircleIcon,
      component: HelpDeskTool,
    },
  ],
});
