import { useState } from "react";
import { signup } from "../lib/api";
import { saveToken } from "../lib/auth";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSignup() {
    const res = await signup(name, email, password);

    if (res.error) {
      setMsg(res.error);
    } else {
      saveToken(res.token);
      setMsg("Signup successful!");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Create Account</h1>

      <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <Button onClick={handleSignup}>Sign Up</Button>

      {msg && <p className="text-sm mt-2">{msg}</p>}
    </div>
  );
}
