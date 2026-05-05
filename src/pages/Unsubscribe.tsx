import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) { setState("invalid"); return; }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } })
      .then((r) => r.json())
      .then((d) => {
        if (d.valid) setState("valid");
        else if (d.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) { setState("error"); return; }
    if (data?.success || data?.reason === "already_unsubscribed") setState("done");
    else setState("error");
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-md text-center">
          {state === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-xs tracking-widest text-muted-foreground">VALIDATING...</p>
            </div>
          )}
          {state === "valid" && (
            <>
              <h1 className="text-3xl font-bold tracking-widest mb-4">UNSUBSCRIBE</h1>
              <p className="text-sm tracking-wider text-muted-foreground mb-8">
                Click below to confirm you no longer want to receive emails from eFlip.
              </p>
              <Button onClick={confirm} className="tracking-widest">CONFIRM UNSUBSCRIBE</Button>
            </>
          )}
          {state === "submitting" && (
            <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          )}
          {state === "done" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="w-16 h-16 text-primary" />
              <h1 className="text-2xl font-bold tracking-widest">UNSUBSCRIBED</h1>
              <p className="text-sm tracking-wider text-muted-foreground">
                You will no longer receive emails from eFlip.
              </p>
            </div>
          )}
          {state === "already" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="w-16 h-16 text-muted-foreground" />
              <h1 className="text-2xl font-bold tracking-widest">ALREADY UNSUBSCRIBED</h1>
              <p className="text-sm tracking-wider text-muted-foreground">
                This email is already removed from our list.
              </p>
            </div>
          )}
          {(state === "invalid" || state === "error") && (
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="w-16 h-16 text-destructive" />
              <h1 className="text-2xl font-bold tracking-widest">INVALID LINK</h1>
              <p className="text-sm tracking-wider text-muted-foreground">
                This unsubscribe link is invalid or has expired.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Unsubscribe;
