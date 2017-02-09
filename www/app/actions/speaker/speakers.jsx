export const FETCH_SPEAKERS = 'FETCH_SPEAKERS'
export const FETCH_SPEAKERS_WITH_IDS = 'FETCH_SPEAKERS_WITH_IDS'

export function fetchSpeakers() {
  return {
    type: FETCH_SPEAKERS
  }
}

export function fetchSpeakersWithIds(ids) {
  return {
    type: FETCH_SPEAKERS_WITH_IDS,
    ids
  }
}
