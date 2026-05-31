import { RouterProvider } from "react-router";

import { AuthProvider } from "@/shared/providers/AuthProvider";
import { ThemePreferenceProvider } from "@/shared/providers/admin/ThemePreferenceProvider";
import { router } from "@/app/router";

function App() {
  return (
    <AuthProvider>
      <ThemePreferenceProvider>
        <RouterProvider router={router} />
      </ThemePreferenceProvider>
    </AuthProvider>
  );
}

export default App;
