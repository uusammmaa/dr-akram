import type { LayoutProps } from "sanity";
import { GuidedTourMount } from "./GuidedTour";

export function StudioLayout(props: LayoutProps) {
  return (
    <>
      <GuidedTourMount />
      {props.renderDefault(props)}
    </>
  );
}
