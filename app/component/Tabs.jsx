import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import TikTokDownloader from "../TikTok/TiktokDownload"
import TikTokProfile from "../TikTok/TikTokStalk"
import TikTokSearch from "../TikTok/TikTokSearch"
import InstagramDownload from "../Instagram/InstagramDownload"
import InstagramStalk from "../Instagram/InstagramStalk"
import XDownload from "../X/XDownload"
import YouTubeDownload from "../YouTube/YouTubeDownload"
import YouTubeToMp3 from "../YouTube/YouTubeToMp3"
import YouTubeToMp4 from "../YouTube/YouTubeToMp4"
import YouTubeSearch from "../YouTube/YouTubeSearch"
import FaceBookDownload from "../FaceBook/FaceBookDownload"
import SpotifyDownload from "../Spotify/SpotifyDownload"
import SpotifyPlayListDownloader from "../Spotify/SpotifyPlayListDownloader"
import SpotifyAlbumDownloader from "../Spotify/SpotifyAlbumDownloader"

export function TabsDemo() {
  return (
    <Tabs defaultValue="TikTok" className="w-full">
 <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 grid-rows-2 p-5 gap-9 mb-[4rem]">
  <TabsTrigger value="TikTok" >TikTok</TabsTrigger>
  <TabsTrigger value="Instagram" >Instagram</TabsTrigger>
  <TabsTrigger value="X" >X</TabsTrigger>
  <TabsTrigger value="YouTube" >YouTube</TabsTrigger>
  <TabsTrigger value="FaceBook" >FaceBook</TabsTrigger>
  <TabsTrigger value="Spotify" >Spotify</TabsTrigger>
</TabsList>

      <TabsContent value="TikTok">
        <Card>
          <CardHeader>
            <CardTitle>TikTok Tools:</CardTitle>
            <CardDescription>
            

            <Tabs defaultValue="Tiktok Downloader" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Tiktok Downloader">Tiktok Downloader</TabsTrigger>
        <TabsTrigger value="TikTok Stalk">TikTok Stalk</TabsTrigger>
        <TabsTrigger value="TikTok Search">TikTok Search</TabsTrigger>
      </TabsList>
      <TabsContent value="Tiktok Downloader">
        <Card>
          <CardHeader>
            <CardTitle>Tiktok Downloader</CardTitle>
            <CardDescription>
             Download any tiktok video here.
            </CardDescription>
          </CardHeader>
          <CardContent className="">
           
<TikTokDownloader className="w-full"/>
          </CardContent>
          <CardFooter>
            {/* <Button>Save changes</Button> */}
          </CardFooter>
        </Card>
      </TabsContent>



      <TabsContent value="TikTok Stalk">
        <Card>
          <CardHeader>
            <CardTitle>TikTok Stalk</CardTitle>
            <CardDescription>
             Check any TikToker's Profile by there UserName
            </CardDescription>
          </CardHeader>




          <CardContent className="space-y-2">
           <TikTokProfile />
          </CardContent>
          
          <CardFooter>
            {/* <Button>Save password</Button> */}
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="TikTok Search">
        <Card>
          <CardHeader>
            <CardTitle>TikTok Search</CardTitle>
            <CardDescription>
            Enter your search...
            </CardDescription>
          </CardHeader>

          
          <CardContent className="space-y-2">
           <TikTokSearch />
          </CardContent>
          <CardFooter>
            {/* <Button>Save password</Button> */}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>

            </CardDescription>
          </CardHeader>
          
        </Card>
      </TabsContent>





      <TabsContent value="Instagram">
        <Card>
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
            <CardDescription>
            <Tabs defaultValue="Instagram Downloader" className="w-full">
      <TabsList className="grid w-full">
        <TabsTrigger value="Instagram Downloader">Instagram Downloader</TabsTrigger>
        {/* <TabsTrigger value="Instagram Stalk">Instagram Stalk</TabsTrigger> */}
      </TabsList>
      <TabsContent value="Instagram Downloader">
        <Card>
          <CardHeader>
            <CardTitle>Instagram Downloader</CardTitle>
            <CardDescription>
            Download any Instagram video here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
         <InstagramDownload/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

    </Tabs>
            </CardDescription>
          </CardHeader>

        </Card>
      </TabsContent>




      <TabsContent value="X">
        <Card>
          <CardHeader>
            <CardTitle>X Downloader</CardTitle>
            <CardDescription>
            <Tabs defaultValue="X Downloader" className="w-full">
      <TabsList className="grid w-full">
        <TabsTrigger value="X Downloader" className="w-full">X Downloader</TabsTrigger>
        {/* <TabsTrigger value="Instagram Stalk">Instagram Stalk</TabsTrigger> */}
      </TabsList>
      <TabsContent value="X Downloader">
        <Card>
          <CardHeader>
            <CardTitle className="w-full">X Downloader</CardTitle>
            <CardDescription>
            Download any X video here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <XDownload/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

    </Tabs>
            </CardDescription>
          </CardHeader>
         
        </Card>
      </TabsContent>




      <TabsContent value="YouTube">
        <Card>
          <CardHeader>
            <CardTitle>YouTube</CardTitle>
            <CardDescription>
            <Tabs defaultValue="YouTube Downloader" className="w-full">
      <TabsList className="grid grid-cols-2 grid-rows-3 gap-9 mb-[5rem] p-5">
        <TabsTrigger value="YouTube Downloader">YouTube Downloader</TabsTrigger>
        <TabsTrigger value="Youtube Music Search">Youtube Music Search</TabsTrigger>
        <TabsTrigger value="YouTube Music Album">YouTube Music Album</TabsTrigger>
        <TabsTrigger value="To Mp3">To Mp3</TabsTrigger>
        <TabsTrigger value="To Mp4">To Mp4</TabsTrigger>
        <TabsTrigger value="YouTube Search">YouTube Search</TabsTrigger>
      </TabsList>
      <TabsContent value="YouTube Downloader">
        <Card>
          <CardHeader>
            <CardTitle>YouTube Downloader</CardTitle>
            <CardDescription>
              Download any YouTube video here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            
            <YouTubeDownload/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>


      <TabsContent value="YouTube Music Search">
        <Card>
          <CardHeader>
            <CardTitle>YouTube Music Search</CardTitle>
            <CardDescription>
              Make changes to your YouTube Downloader here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>


      <TabsContent value="YouTube Music Album">
        <Card>
          <CardHeader>
            <CardTitle>YouTube Music Album</CardTitle>
            <CardDescription>
              Make changes to your YouTube Downloader here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>



      <TabsContent value="To Mp3">
        <Card>
          <CardHeader>
            <CardTitle>To Mp3</CardTitle>
            <CardDescription>
              Convert YouTube video to MP3 here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            
            <YouTubeToMp3 />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="To Mp4">
        <Card>
          <CardHeader>
            <CardTitle>To Mp4</CardTitle>
            <CardDescription>
              Convert YouTube video to MP3 here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <YouTubeToMp4 />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>


      <TabsContent value="YouTube Search">
        <Card>
          <CardHeader>
            <CardTitle>YouTube Search</CardTitle>
            <CardDescription>
              Search YouTube videos here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <YouTubeSearch/>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
            </CardDescription>
          </CardHeader>






          
        </Card>
      </TabsContent>


      <TabsContent value="FaceBook">
        <Card>
          <CardHeader>
            <CardTitle>FaceBook Downloader</CardTitle>
            <CardDescription>
            <Tabs defaultValue="FaceBook Downloader" className="w-full">
      <TabsList className="grid w-full">
        <TabsTrigger value="FaceBook Downloader" className="w-full">FaceBook Downloader</TabsTrigger>
        {/* <TabsTrigger value="Instagram Stalk">Instagram Stalk</TabsTrigger> */}
      </TabsList>
      <TabsContent value="FaceBook Downloader">
        <Card>
          <CardHeader>
            <CardTitle className="w-full">FaceBook Downloader</CardTitle>
            <CardDescription>
            Download any FaceBook video here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <FaceBookDownload/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      </Tabs>
            </CardDescription>
          </CardHeader>
         
        </Card>
      </TabsContent>



      <TabsContent value="Spotify">
        <Card>
          <CardHeader>
            <CardTitle>Spotify</CardTitle>
            <CardDescription>
            <Tabs defaultValue="Spotify Downloader" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Spotify Downloader">Spotify Downloader</TabsTrigger>
        <TabsTrigger value="Spotify Search">Spotify Search</TabsTrigger>
      </TabsList>
      <TabsContent value="Spotify Downloader">
      <CardTitle>Spotify Downloader</CardTitle>
      <Tabs defaultValue="Spotify Downloader" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Spotify Downloader">Spotify Downloader</TabsTrigger>
        <TabsTrigger value="Spotify Playlist">Spotify Playlist</TabsTrigger>
        <TabsTrigger value="Spotify Album">Spotify Album</TabsTrigger>
      </TabsList>
      <TabsContent value="Spotify Downloader">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Downloader</CardTitle>
            <CardDescription>
              Change your Spotify Downloader here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SpotifyDownload/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="Spotify Playlist">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Playlist</CardTitle>
            <CardDescription>
              Change your Spotify Playlist here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SpotifyPlayListDownloader/>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>



      <TabsContent value="Spotify Album">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Album</CardTitle>
            <CardDescription>
           Change your Spotify Album here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           
            <SpotifyAlbumDownloader/>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
      </TabsContent>





      <TabsContent value="Spotify Search">
      <Tabs defaultValue="Spotify Search" className="w-full">
      <CardTitle>Spotify Search</CardTitle>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Spotify Search">Spotify Search</TabsTrigger>
        <TabsTrigger value="Spotify Playlist">Spotify Playlist</TabsTrigger>
        <TabsTrigger value="Spotify Album">Spotify Album</TabsTrigger>
      </TabsList>
      <TabsContent value="Spotify Search">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Search</CardTitle>
            <CardDescription>
              Make changes to your Spotify Search here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>



      <TabsContent value="Spotify Playlist">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Playlist</CardTitle>
            <CardDescription>
              Change your TikTok Search here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="Spotify Album">
        <Card>
          <CardHeader>
            <CardTitle>Spotify Album</CardTitle>
            <CardDescription>
              Change your TikTok Search here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
      </TabsContent>
    </Tabs>
            </CardDescription>
          </CardHeader>




          
        </Card>
      </TabsContent>

{/* 

      <TabsContent value="Instagram">
        <Card>
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
 */}



      {/* <TabsContent value="Instagram">
        <Card>
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent> */}


    </Tabs>
  )
}
export default TabsDemo;