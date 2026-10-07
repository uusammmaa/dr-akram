import { HelpDeskContent } from "./HelpDeskContent";
import { restartGuidedTour } from "./GuidedTour";

export function HelpDeskPane() {
  return <HelpDeskContent onRestartTour={restartGuidedTour} />;
}
