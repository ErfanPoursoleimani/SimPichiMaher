import { Dict } from '@/types/types';
import axios from 'axios';
import { create } from 'zustand';

interface settingsStore {
    // State
    dict: Dict;
    isRTL: boolean;
    loading: boolean;
    error: string | null;

    // Configuration
    lang: string;

    // Actions
    setLang: (lang: string) => void;
    setDict: (dict: Dict) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;

    // API Actions
    fetchDict: (lang: string) => Promise<void>;
    
    // Utility Actions
    initializeStore: (lang: string) => Promise<void>;
    clearError: () => void;
    reset: () => void;
}

const initialDict: Dict = {
    // your initial dict structure
};

const initialState = {
    dict: initialDict,
    isRTL: false,
    lang: 'en',
    loading: false,
    error: null
};

export const useSettingsStore = create<settingsStore>()((set, get) => ({
    ...initialState,

    setLang: (lang) => {
        set({ lang, isRTL: lang === 'fa' });
        get().fetchDict(lang);
    },
    setDict: (dict) => set({ dict }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),

    
    fetchDict: async (lang) => {
        try {
            set({ loading: true });
            const { data } = await axios.get(`/${lang}/api/dictionary?locale=${lang}`);
            set({ dict: data, loading: false });
        } catch (err) {
            set({ error: err as string, loading: false });
        }
    },

    initializeStore: async (lang) => {
        set({ lang, isRTL: lang === 'fa'});
        
        const promises = [
            get().fetchDict(lang),
        ];

        try {
            await Promise.all(promises);
        } catch (error) {
            console.error('Error initializing store:', error);
            set({ error: 'Failed to initialize store', loading: false });
        }
    },


    clearError: () => set({ error: null }), // Changed from '' to null to match type
    reset: () => {
        set(initialState);
    }
}));