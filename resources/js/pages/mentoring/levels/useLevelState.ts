import { route } from 'ziggy-js';

export async function getCompletion(userId: number, levelId: number) {
  return null
}

export async function getSessionHistory(userId: number, levelId: number) {
  return []
}

export async function startSession(userId: number, levelId: number) {
  // no-op
}

export async function endSession(userId: number, levelId: number, payload: unknown, durationMs: number) {
  try {
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content || '';
    await fetch(route('api.levels.update', { id: levelId }), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      body: JSON.stringify({
        status: 'completed',
        metadata: payload
      })
    });
    return true;
  } catch (error) {
    console.error('Failed to save level progress:', error);
    return false;
  }
}

export async function complete(userId: number, levelId: number, stars: number, xp: number) {
  return endSession(userId, levelId, {}, 0);
}