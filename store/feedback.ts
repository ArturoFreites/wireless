import { create } from 'zustand';

type FeedbackType = 'success' | 'error' | 'warning';

interface FeedbackState {
    message: string | null;
    type: FeedbackType | null;
    setFeedback: (msg: string, type: FeedbackType) => void;
    clearFeedback: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
    message: null,
    type: null,
    setFeedback: (msg, type) => set({ message: msg, type }),
    clearFeedback: () => set({ message: null, type: null }),
}));
