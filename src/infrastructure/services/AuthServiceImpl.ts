import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
  async login(email: string, password: string): Promise<User | null> {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return null; // Si la respuesta no es 200, devolvemos null (login fallido)
      }

      const data = await response.json();
      return {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        token: data.token,
      };
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}