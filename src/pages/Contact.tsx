import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SEOHead from "@/components/SEOHead";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  service_type: z.string().optional(),
  budget_range: z.string().optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "web", label: "WEB DESIGN" },
  { value: "games", label: "GAME DESIGN" },
  { value: "print", label: "PRINT DESIGN" },
  { value: "video", label: "VIDEO PRODUCTION" },
  { value: "other", label: "OTHER" },
];

const budgetOptions = [
  { value: "under-5k", label: "UNDER £5,000" },
  { value: "5k-10k", label: "£5,000 – £10,000" },
  { value: "10k-25k", label: "£10,000 – £25,000" },
  { value: "25k-plus", label: "£25,000+" },
  { value: "not-sure", label: "NOT SURE YET" },
];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      service_type: data.service_type || null,
      budget_range: data.budget_range || null,
    } as any);
    if (error) {
      toast.error("FAILED TO SEND. PLEASE TRY AGAIN.");
      return;
    }
    setSubmitted(true);
    form.reset();
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Us — Get a Free Quote"
        description="Ready to start your next project? Contact eFlip for a free consultation. We specialise in web design, games, print, and video production in Ireland."
        keywords="contact eFlip, free quote, web design quote, design agency contact, Ireland"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact eFlip",
            "description": "Get in touch with eFlip for a free consultation on your next design project.",
            "url": "https://eflip.ie/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "eFlip",
              "url": "https://eflip.ie",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://eflip.ie/contact",
                "availableLanguage": "English"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://eflip.ie/" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://eflip.ie/contact" }
            ]
          }
        ]}
      />
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

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-primary/30 p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold tracking-widest mb-4">MESSAGE SENT!</h2>
                <p className="text-muted-foreground tracking-wider text-sm mb-6">
                  WE TYPICALLY RESPOND WITHIN 24 HOURS. IN THE MEANTIME, FEEL FREE TO EXPLORE OUR WORK.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="tracking-widest text-xs">
                  SEND ANOTHER MESSAGE
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="service_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs tracking-widest">SERVICE TYPE</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-secondary border-border text-xs tracking-wider">
                                  <SelectValue placeholder="SELECT A SERVICE" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {serviceOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value} className="text-xs tracking-wider">
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="budget_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs tracking-widest">BUDGET RANGE</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-secondary border-border text-xs tracking-wider">
                                  <SelectValue placeholder="SELECT BUDGET" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetOptions.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value} className="text-xs tracking-wider">
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
