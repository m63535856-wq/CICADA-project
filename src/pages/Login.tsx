import { useState } from "react";
import { login } from "../lib/api";
import { saveToken } from "../lib/auth";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin() {
    const res = await login(email, password);

    if (res.error) {
      setMsg(res.error);
    } else {
      saveToken(res.token);
      setMsg("Login successful!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <Button onClick={handleLogin}>Login</Button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
}
