import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { User, LogOut } from "lucide-react";
import { fetchUserAttributes } from "aws-amplify/auth";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { UploadMemoryDialog } from "./UploadMemoryDialog";
import { list } from "aws-amplify/storage";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { getProperties } from "aws-amplify/storage";
import { Link } from "react-router-dom";

type DashboardProps = {
  updateAuthStatus: (authStatus: boolean) => void;
};

export default function Dashboard({ updateAuthStatus }: DashboardProps) {
  const [avatarText, setAvatarText] = useState("");
  const [username, setUsername] = useState("");
  const [memories, setMemories] = useState<any>([]);
  const [imageTitles, setImageTitles] = useState<{ [path: string]: string }>(
    {}
  );
  const [selectedMemory, setSelectedMemory] = useState<any | null>(null); // State for full-screen display
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      updateAuthStatus(false);
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const getImageProperties = async (pathURL: string) => {
    try {
      const result = await getProperties({ path: pathURL });
      // Check for `customKey` metadata, using optional chaining and default to "Untitled" if unavailable
      const title = result.metadata?.customkey || "Untitled";
      return title;
    } catch (error) {
      console.log("Error fetching image properties:", error);
      return "Untitled";
    }
  };

  const fetchMemories = async () => {
    try {
      const result = await list({
        path: ({ identityId }) => `userAlbums/${identityId}/`,
        options: {
          listAll: true,
        },
      });
      console.log("Memories Found: ", result);
      setMemories(result.items);

      // Fetch titles for each memory
      const titles = await Promise.all(
        result.items.map(async (memory) => {
          const title = await getImageProperties(memory.path);
          return { [memory.path]: title };
        })
      );

      // Combine titles into a single object and set it in state
      setImageTitles(Object.assign({}, ...titles));
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };
  /* 
  const handleUpload = () => {
    setIsUploading(true);
    // Simulating upload process
    setTimeout(() => setIsUploading(false), 2000);
  }; */

  useEffect(() => {
    const fetchAvatarText = async () => {
      try {
        const user = await fetchUserAttributes();
        const initials = user.email ? user.email.slice(0, 2).toUpperCase() : "";
        const displayName = user.preferred_username
          ? user.preferred_username.replace(/^./, (char) => char.toUpperCase())
          : "";
        setUsername(displayName);
        setAvatarText(initials);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      }
    };

    fetchAvatarText();
    fetchMemories();
  }, []);

  const openModal = (memory: any) => {
    setSelectedMemory(memory);
  };

  const closeModal = () => {
    setSelectedMemory(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <span className="text-2xl font-knewave text-blue-500">Keepr</span>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User"
              />
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSignOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main>
        <h1 className="text-3xl font-semibold text-slate-600 mb-6">
          Welcome back, {username}!
        </h1>
        <UploadMemoryDialog fetchMemories={fetchMemories} />
        {memories.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
            No memories yet
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memories.map((memory: any) => (
              <Card
                key={memory.eTag}
                className="overflow-hidden cursor-pointer"
                onClick={() => openModal(memory)}
              >
                <CardContent className="p-0">
                  <StorageImage
                    alt=""
                    path={memory.path}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-600">
                      {imageTitles[memory.path] || "Loading..."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={!!selectedMemory} onOpenChange={closeModal}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="max-w-[90vw] max-h-[70vh] w-full h-full p-0 m-0 border-none bg-transparent text-white">
          {selectedMemory && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                {/*                <Button
                  className="absolute top-0 right-4 z-10 bg-transparent hover:bg-gray-800 text-white"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6" />
                </Button> */}
                <StorageImage
                  alt=""
                  path={selectedMemory.path}
                  className="max-w-full max-h-[calc(100vh-8rem)] object-contain"
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {imageTitles[selectedMemory.path] || "Untitled"}
                  </h3>
                  <p className="text-sm">
                    {new Date(selectedMemory.lastModified).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
