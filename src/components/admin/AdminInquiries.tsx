import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen, Archive, Inbox } from "lucide-react";
import { format } from "date-fns";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-primary text-primary-foreground",
  read: "bg-secondary text-secondary-foreground",
  archived: "bg-muted text-muted-foreground",
};

const AdminInquiries = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setSubmissions((data as Submission[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id: string, status: "read" | "archived") => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);
    if (error) toast.error(error.message);
    else fetch();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", deleteId);
    if (error) toast.error(error.message);
    else { toast.success("INQUIRY DELETED"); fetch(); }
    setDeleteId(null);
  };

  if (loading) {
    return <p className="text-center text-muted-foreground tracking-wider text-sm py-12">LOADING...</p>;
  }

  if (submissions.length === 0) {
    return (
      <div className="border border-dashed border-border rounded-lg py-20 flex flex-col items-center gap-4">
        <Inbox size={40} className="text-muted-foreground" />
        <p className="text-muted-foreground text-xs tracking-widest">NO INQUIRIES YET.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="tracking-widest text-xs">NAME</TableHead>
              <TableHead className="tracking-widest text-xs">EMAIL</TableHead>
              <TableHead className="tracking-widest text-xs hidden md:table-cell">MESSAGE</TableHead>
              <TableHead className="tracking-widest text-xs">STATUS</TableHead>
              <TableHead className="tracking-widest text-xs hidden sm:table-cell">DATE</TableHead>
              <TableHead className="tracking-widest text-xs text-right">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((s) => (
              <TableRow key={s.id} className={s.status === "archived" ? "opacity-50" : ""}>
                <TableCell className="font-bold tracking-widest text-sm">{s.name.toUpperCase()}</TableCell>
                <TableCell className="text-xs tracking-wider">{s.email}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground text-xs tracking-wider max-w-[200px] truncate">
                  {s.message}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusColors[s.status]} text-[10px] tracking-widest`}>
                    {s.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs tracking-wider hidden sm:table-cell">
                  {format(new Date(s.created_at), "dd MMM yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {s.status === "new" && (
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(s.id, "read")} title="Mark as read">
                        <MailOpen size={14} />
                      </Button>
                    )}
                    {s.status !== "archived" && (
                      <Button variant="ghost" size="icon" onClick={() => updateStatus(s.id, "archived")} title="Archive">
                        <Archive size={14} />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(s.id)} title="Delete">
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="tracking-widest">DELETE INQUIRY?</AlertDialogTitle>
            <AlertDialogDescription className="tracking-wider">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="tracking-widest text-xs">CANCEL</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground tracking-widest text-xs">
              DELETE
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminInquiries;
