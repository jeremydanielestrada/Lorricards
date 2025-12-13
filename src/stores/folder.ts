/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../utils/axios";

export interface FolderType {
  title: string;
  user_id: number;
}

interface FolderResponse {
  success: boolean;
  message: string;
  folder?: FolderType;
}

interface FolderStore {
  folder: FolderType | null;
  getFoldersByuserId: () => Promise<void>;
  createFolder: (form: FolderType) => Promise<FolderResponse>;
  setFolder: (folder: FolderType | null) => void;
}

export const useFolderStore = create<FolderStore>((set) => ({
  folder: null,

  getFoldersByuserId: async () => {
    try {
      const res = await api.get("/folder/view");
      set({ folder: res.data });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  },

  createFolder: async (form: FolderType) => {
    try {
      const res = await api.post("/folder/create", form);
      return { success: true, ...res.data };
    } catch (error: any) {
      console.log(error);
      return { message: error.response?.data?.message };
    }
  },

  setFolder: (folder) => set({ folder: folder }),
}));
