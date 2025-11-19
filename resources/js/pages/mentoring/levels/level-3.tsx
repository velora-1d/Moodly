"use client";

import React, { Suspense, lazy } from "react";
import LevelLayout from "./LevelLayout";

const CBTGameContainer = lazy(() => import("@/components/cbt-game/CBTGameContainer"));

export default function Level3() {
  return (
    <LevelLayout title="Level 3 · CBT Game">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Memuat permainan…</div>}>
          <CBTGameContainer />
        </Suspense>
      </div>
    </LevelLayout>
  );
}