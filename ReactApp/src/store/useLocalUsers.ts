import { create } from "zustand";
import { usersAPI, User } from "../apis/users/users.api";

type State = {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (u: Omit<User, "_id">) => Promise<string>;
  updateUser: (id: string, u: Partial<User>) => Promise<string>;
  removeUser: (id: string) => Promise<string>;
};

export const useLocalUsers = create<State>()((set, get) => ({
  users: [],
  loading: false,
  
  fetchUsers: async () => {
    set({ loading: true });
    try {
      console.log('Fetching users from API...');
      const response = await usersAPI.getAll();
      console.log('API response:', response);
      console.log('Users data:', response.data);
      console.log('Users count:', response.data?.length || 0);
      set({ users: response.data || [], loading: false });
    } catch (error) {
      console.error("Failed to fetch users:", error);
      set({ users: [], loading: false });
    }
  },
  
  addUser: async (u) => {
    try {
      console.log('Adding user to store:', u);
      const response = await usersAPI.create(u);
      console.log('User created in MongoDB:', response.data);
      
      // Add to local state immediately
      if (response.data && response.data.data) {
        set((s) => ({ users: [response.data.data, ...s.users] }));
      }
      
      // Also refresh from server
      setTimeout(() => {
        get().fetchUsers();
      }, 500);
      
      return response.data.message;
    } catch (error) {
      console.error("Failed to add user:", error);
      throw error;
    }
  },
  
  updateUser: async (id, u) => {
    try {
      const response = await usersAPI.update(id, u);
      set((s) => ({
        users: s.users.map((x) => (x._id === id ? response.data.data : x))
      }));
      return response.data.message;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  },
  
  removeUser: async (id) => {
    try {
      const response = await usersAPI.delete(id);
      set((s) => ({ users: s.users.filter((x) => x._id !== id) }));
      return response.data.message;
    } catch (error) {
      console.error("Failed to remove user:", error);
      throw error;
    }
  }
}));
