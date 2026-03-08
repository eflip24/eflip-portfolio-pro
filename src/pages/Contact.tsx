import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SEOHead from "@/components/SEOHead";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormData = z.infer<typeof schema>;

const Contact = () => {
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
    });
    if (error) {
      toast.error("FAILED TO SEND. PLEASE TRY AGAIN.");
      return;
    }
    toast.success("MESSAGE SENT! WE'LL BE IN TOUCH.");
    form.reset();
  };

  return (
    <Layout>
      <SEOHead title="Contact" description="Get in touch with eFlip. Let's create something extraordinary together." />
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-widest text-center mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            GET IN <span className="text-primary">TOUCH</span>
          </motion.h1>
          <p className="text-center text-muted-foreground tracking-wider mb-12 text-sm">
            LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest">NAME</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YOUR NAME"
                          className="bg-secondary border-border text-xs tracking-wider"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest">EMAIL</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="YOUR@EMAIL.COM"
                          className="bg-secondary border-border text-xs tracking-wider"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs tracking-widest">MESSAGE</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="TELL US ABOUT YOUR PROJECT..."
                          rows={6}
                          className="bg-secondary border-border text-xs tracking-wider"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full glow-orange tracking-widest">
                  SEND MESSAGE
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
