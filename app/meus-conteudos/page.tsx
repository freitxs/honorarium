import { getUserFromCookie } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MeusConteudosPage() {
  const user = await getUserFromCookie();
  if (!user) return (<div className="container py-8"><p>Faça <a href="/auth/login">login</a> para ver seus conteúdos.</p></div>);

  const progress = await prisma.user_progress.findMany({ where: { user_id: user.id }, include: { video: true }, orderBy: { updated_at: "desc" } });
  const favorites = await prisma.user_favorites.findMany({ where: { user_id: user.id }, include: { video: true } });

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Meus Conteúdos</h1>
      <section><h2 className="text-xl font-semibold mb-2">Continuar assistindo</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {progress.map((p) => (<Link key={p.video_id} href={`/video/${p.video.slug}`} className="bg-card rounded-2xl border border-default p-4"><h3 className="font-semibold">{p.video.title}</h3><p className="text-muted text-sm">Última posição: {Math.round(p.last_position_seconds)}s</p></Link>))}
        </div>
      </section>
      <section><h2 className="text-xl font-semibold mb-2">Favoritos</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((f) => (<Link key={f.video_id} href={`/video/${f.video.slug}`} className="bg-card rounded-2xl border border-default p-4"><h3 className="font-semibold">{f.video.title}</h3></Link>))}
        </div>
      </section>
    </div>
  );
}
