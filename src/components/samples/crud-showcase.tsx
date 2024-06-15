import type { RouterOutputs } from "@/trpc/react";
// import type { RouterInputs } from "@/trpc/react";
import { api } from "@/trpc/server";

import { CreatePost } from "./create-post";

type PostFromAPI = RouterOutputs["post"]["getLatestPosts"];

export async function CrudShowcase() {
  const latestPost: PostFromAPI = await api.post.getLatestPosts();

  return (
    <div className='w-full max-w-xs'>
      {latestPost.length > 0 ? (
        latestPost.map((post) => <p key={post.id}>{post.title}</p>)
      ) : (
        <p>No hay posts</p>
      )}

      <CreatePost />
    </div>
  );
}
