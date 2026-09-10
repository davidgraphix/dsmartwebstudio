"use client";

import type { Project } from "@/data/projects";
import { DeviceShowcase } from "./DeviceShowcase";
import { useMotionAllowed, useProjectStage } from "./stage";

/**
 * The device composition as it appears at the top of a case study. Same
 * loading and playback rules as the portfolio — the recordings only attach a
 * src once the block is close, and only play while it is on screen.
 */
export function CaseStudyPreview({ project }: { project: Project }) {
  const { ref, near, active } = useProjectStage();
  const motionAllowed = useMotionAllowed();

  return (
    <div ref={ref}>
      <DeviceShowcase
        project={project}
        load={near && motionAllowed === true}
        active={active}
        motionAllowed={motionAllowed}
      />
    </div>
  );
}
