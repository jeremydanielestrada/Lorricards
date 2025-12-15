/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../utils/axios";

export interface FlashCard {
  question: string;
  answer: string;
}
export interface FlashCardResponse {
  success: boolean;
  message: string;
  flashcards?: FlashCard;
}

interface FlashCardStore {
  flashCards: FlashCard[];
  getFlashCardByFolderId: (folderId: number) => Promise<void>;
  createFlashCardsFromDocument: (
    folderId: number,
    document: string
  ) => Promise<FlashCardResponse>;
  createFlashCardsByFileUpload: (
    folderId: number,
    file: FormData
  ) => Promise<FlashCardResponse>;
}

export const useFlashCardStore = create<FlashCardStore>((set) => ({
  flashCards: [],

  getFlashCardByFolderId: async (folderId: number) => {
    try {
      const res = await api.get(`/get-flash-cards/${folderId}`);
      set({ flashCards: res.data });
    } catch (error: any) {
      console.log(error);
    }
  },

  createFlashCardsFromDocument: async (folderId: number, document: string) => {
    try {
      const res = await api.post(`/create-flash-card/${folderId}`, document);
      return { success: true, ...res.data };
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  },

  createFlashCardsByFileUpload: async (folderId: number, file: FormData) => {
    try {
      const res = await api.post(`/upload/${folderId}`, file);
      return { success: true, ...res.data };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  },
}));
