import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("ACCOUNT CREATED! YOU CAN NOW SIGN IN.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        className="w-full max-w-sm p-8 border border-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-2xl font-bold tracking-widest text-center mb-2 text-primary">
          eFLIP
        </h1>
        <p className="text-center text-muted-foreground text-xs tracking-widest mb-8">
          {isSignUp ? "CREATE ACCOUNT" : "ADMIN LOGIN"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary border-border text-xs tracking-wider"
            required
          />
          <Input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary border-border text-xs tracking-wider"
            required
          />
          <Button type="submit" className="w-full tracking-widest glow-orange" disabled={loading}>
            {loading ? "PROCESSING..." : isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-4 text-xs text-muted-foreground tracking-widest hover:text-primary transition-colors text-center"
        >
          {isSignUp ? "ALREADY HAVE AN ACCOUNT? SIGN IN" : "NEED AN ACCOUNT? SIGN UP"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
