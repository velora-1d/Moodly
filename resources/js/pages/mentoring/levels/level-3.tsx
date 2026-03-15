"use client";

import React, { Suspense, lazy, useState } from "react";
import LevelLayout from "./LevelLayout";
import { usePage } from "@inertiajs/react";
import { getCompletion, endSession } from "./useLevelState";

const CBTGameContainer = lazy(() => import("@/components/cbt-game/CBTGameContainer"));

export default function Level3() {
  const { auth } = usePage<unknown>().props;
  const levelId = 3;
  const [reportedComplete, setReportedComplete] = useState(false);

  async function onComplete(payload: { score: number; health: number }) {
    if (reportedComplete) return;
    const userId = auth?.user?.id;
    if (!userId) return;

    setReportedComplete(true);
    const stars = payload.score >= 90 ? 3 : payload.score >= 60 ? 2 : 1;

    // Call our backend API
    await endSession(userId, levelId, { ...payload, stars }, 0);
  }

  return (
    <LevelLayout title="Level 3 · CBT Game">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground">Memuat permainan…</div>}>
          <CBTGameContainer onComplete={onComplete as unknown} />
        </Suspense>
      </div>
    </LevelLayout>
  );
}
