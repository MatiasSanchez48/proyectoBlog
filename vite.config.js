import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dotevn from "dotenv";

dotevn.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
