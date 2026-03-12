import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, Edit, Plus, Eye, Search, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface Project {
  id: string;
  client_name: string;
  description: string;
  category: string;
  project_url: string | null;
  image_url: string | null;
  tags: string[] | null;
  published: boolean;
  sort_order: number;
  created_at: string;
}

interface AdminProjectsProps {
  projects: Project[];
  onRefresh: () => void;
}

const AdminProjects = ({ projects, onRefresh }: AdminProjectsProps) => {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("projects").delete().eq("id", deleteId);
    if (error) toast.error(error.message);
    else { toast.success("PROJECT DELETED"); onRefresh(); }
    setDeleteId(null);
  };

  const togglePublished = async (id: string, published: boolean) => {
    const { error } = await supabase.from("projects").update({ published }).eq("id", id);
    if (error) toast.error(error.message);
    else onRefresh();
  };

  const filtered = projects.filter((p) => {
    const q = search.toLowerCase();
    return p.client_name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 tracking-wider text-xs"
          />
        </div>
        <Button className="tracking-widest glow-orange shrink-0" onClick={() => navigate("/admin/project/new")}>
          <Plus size={14} className="mr-2" /> ADD PROJECT
        </Button>
      </div>

      {filtered.length > 0 ? (
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16" />
                <TableHead className="tracking-widest text-xs">CLIENT</TableHead>
                <TableHead className="tracking-widest text-xs">CATEGORY</TableHead>
                <TableHead className="tracking-widest text-xs hidden md:table-cell">TAGS</TableHead>
                <TableHead className="tracking-widest text-xs hidden sm:table-cell">DATE</TableHead>
                <TableHead className="tracking-widest text-xs">LIVE</TableHead>
                <TableHead className="tracking-widest text-xs text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className={!p.published ? "opacity-50" : ""}>
                  <TableCell className="p-2">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.client_name} className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <FolderOpen size={16} className="text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-bold tracking-widest text-sm">
                    {p.client_name.toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="tracking-wider text-xs">
                      {p.category.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.tags?.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] tracking-wider">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs tracking-wider hidden sm:table-cell">
                    {format(new Date(p.created_at), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={p.published}
                      onCheckedChange={(checked) => togglePublished(p.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => window.open(`/portfolio/${(p as any).slug || p.id}`, "_blank")} title="View">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/project/${p.id}`)} title="Edit">
                        <Edit size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p.id)} title="Delete">
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border border-dashed border-border rounded-lg py-20 flex flex-col items-center gap-4">
          <FolderOpen size={40} className="text-muted-foreground" />
          <p className="text-muted-foreground text-xs tracking-widest">
            {search ? "NO PROJECTS MATCH YOUR SEARCH." : "NO PROJECTS YET. ADD YOUR FIRST ONE."}
          </p>
          {!search && (
            <Button className="tracking-widest glow-orange" onClick={() => navigate("/admin/project/new")}>
              <Plus size={14} className="mr-2" /> ADD PROJECT
            </Button>
          )}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="tracking-widest">DELETE PROJECT?</AlertDialogTitle>
            <AlertDialogDescription className="tracking-wider">
              This action cannot be undone. The project and its data will be permanently removed.
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

export default AdminProjects;
