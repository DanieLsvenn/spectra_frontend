"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { frameMediaApi } from "@/lib/api/frame-media";
import { framesApi } from "@/lib/api/frames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function FrameMediaPage() {
  const [selectedFrameId, setSelectedFrameId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const queryClient = useQueryClient();

  const { data: frames } = useQuery({
    queryKey: ["frames-for-media"],
    queryFn: () => framesApi.getAll(1, 50),
    select: (res) => res.data.items,
  });

  const { data: media, isLoading } = useQuery({
    queryKey: ["frame-media", selectedFrameId],
    queryFn: () => frameMediaApi.getByFrame(selectedFrameId),
    select: (res) => res.data,
    enabled: !!selectedFrameId,
  });

  const addMutation = useMutation({
    mutationFn: () =>
      frameMediaApi.add({ frameId: selectedFrameId, mediaUrl, mediaType }),
    onSuccess: () => {
      toast.success("Media added!");
      queryClient.invalidateQueries({
        queryKey: ["frame-media", selectedFrameId],
      });
      setDialogOpen(false);
      setMediaUrl("");
    },
    onError: () => toast.error("Failed to add media."),
  });

  const deleteMutation = useMutation({
    mutationFn: frameMediaApi.delete,
    onSuccess: () => {
      toast.success("Media deleted.");
      queryClient.invalidateQueries({
        queryKey: ["frame-media", selectedFrameId],
      });
    },
    onError: () => toast.error("Failed to delete."),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Frame Media</h1>
          <p className="mt-1 text-muted-foreground">
            Manage images for each frame.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-4">
        <div className="flex-1">
          <Label>Select Frame</Label>
          <Select value={selectedFrameId} onValueChange={setSelectedFrameId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a frame" />
            </SelectTrigger>
            <SelectContent>
              {frames?.map((f) => (
                <SelectItem key={f.frameId} value={f.frameId}>
                  {f.frameName} ({f.brand})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedFrameId && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add Media
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Media</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Media URL</Label>
                  <Input
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={mediaType} onValueChange={setMediaType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="thumbnail">Thumbnail</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full"
                  onClick={() => addMutation.mutate()}
                  disabled={addMutation.isPending}
                >
                  Add
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {selectedFrameId && (
        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : media && media.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {media.map((m) => (
                <Card
                  key={m.mediaId}
                  className="group relative overflow-hidden"
                >
                  <div className="aspect-square bg-muted">
                    <Image
                      src={m.mediaUrl}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-2">
                    <p className="text-xs text-muted-foreground capitalize">
                      {m.mediaType}
                    </p>
                  </CardContent>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute right-2 top-2 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => deleteMutation.mutate(m.mediaId)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <ImageIcon className="mx-auto h-12 w-12 opacity-30" />
              <p className="mt-2">No media for this frame.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
