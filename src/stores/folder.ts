/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { api } from "../utils/axios";

export interface FolderType {
  id?: number;
  title: string;
  user_id: number;
}

export interface FolderResponse {
  success: boolean;
  message: string;
  folders?: FolderType;
}

interface FolderStore {
  folders: FolderType[];
  getFoldersByuserId: () => Promise<void>;
  createFolder: (form: FolderType) => Promise<FolderResponse>;
  updateFolder: (formData: FolderType) => Promise<FolderResponse>;
  deleteFolder: (folderId: number) => Promise<FolderResponse>;
  setFolders: (folder: FolderType[]) => void;
}

export const useFolderStore = create<FolderStore>((set, get) => ({
  folders: [],

  getFoldersByuserId: async () => {
    try {
      const res = await api.get("/folder/view");
      set({ folders: res.data.folders || [] });
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
      return { success: false, message: error.response?.data?.message };
    }
  },

  updateFolder: async (formData: FolderType) => {
    try {
      const res = await api.put(`folder/update/${formData.id}`, formData);
      console.log(res.data);
      return { success: true, ...res.data };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message };
    }
  },

  deleteFolder: async (folderId: number) => {
    try {
      const res = await api.delete(`/folder/delete/${folderId}`);
      await get().getFoldersByuserId();
      return { success: true, ...res.data };
    } catch (error: any) {
      console.log(error);
      return { success: false, message: error.response?.data?.message };
    }
  },

  setFolders: (folders) => set({ folders }),
}));
