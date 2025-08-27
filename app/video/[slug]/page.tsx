import { prisma } from "@/lib/prisma";
import VideoWithActions from "@/components/VideoWithActions";
import { getUserFromCookie } from "@/lib/auth";

type Props = { params: { slug: string } };

export default async function VideoPage({ params }: Props) {
  const user = await getUserFromCookie();
  const video = await prisma.videos.findFirst({
    where: { slug: params.slug, published: true },
    include: { materials: true, themes: { include: { theme: true } } },
  });
  if (!video) return <div className="container py-8">Vídeo não encontrado.</div>;

  const allowFull = Boolean(user);

  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-3xl font-bold">{video.title}</h1>

      <VideoWithActions
        videoId={video.id}
        src={video.media_url}
        isHls={video.is_hls}
        previewStart={video.preview_start_seconds ?? 0}
        previewDuration={video.preview_duration_seconds ?? 20}
        allowFull={allowFull}
      />

      <p className="text-muted">{video.description}</p>

      <div>
        <h3 className="font-semibold mb-2">Materiais</h3>
        <ul className="list-disc pl-6">
          {video.materials.map((m) => (
            <li key={m.id}>
              <a href={m.url} target="_blank" rel="noreferrer">
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
