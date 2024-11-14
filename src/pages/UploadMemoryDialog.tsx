import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { uploadData } from "aws-amplify/storage";
import { useToast } from "@/hooks/use-toast";

export function UploadMemoryDialog({
  fetchMemories,
}: {
  fetchMemories: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [memoryTitle, setMemoryTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    // Implement the actual upload logic here
    toast({
      title: "Uploading...",
      description: "Your memory is being uploaded.",
      duration: 2000,
    });

    try {
      const result = await uploadData({
        path: ({ identityId }) =>
          `userAlbums/${identityId}/${selectedFile?.name}`,
        // Alternatively, path: ({identityId}) => `album/${identityId}/1.jpg`
        data: selectedFile,
        options: {
          metadata: {
            customKey: memoryTitle,
          },
        },
      }).result;
      console.log("Succeeded: ", result);
      toast({
        title: "Success",
        description: "Memory uploaded successfully!",
        duration: 3000,
        className: "bg-green-500 text-white",
      });
      fetchMemories();
    } catch (error) {
      console.log("Error : ", error);
      toast({
        title: "Error",
        description: "Failed to upload memory. Please try again.",
        duration: 3000,
        className: "bg-red-500 text-white",
      });
    }
    setIsOpen(false);
    setMemoryTitle("");
    setSelectedFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 mb-8 transition-colors duration-300">
          <Upload className="mr-2 h-4 w-4" /> Upload New Memory
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Upload New Memory
          </DialogTitle>
          {/*           <Button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="memory-title">Memory Title</Label>
            <Input
              id="memory-title"
              value={memoryTitle}
              onChange={(e) => setMemoryTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 overflow-hidden"
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-[200px] max-w-full object-contain"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
        <Button
          onClick={handleUpload}
          className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300"
        >
          Upload Memory
        </Button>
      </DialogContent>
    </Dialog>
  );
}
