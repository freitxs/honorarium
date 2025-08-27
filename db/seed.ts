import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const themeSlugs = [
    { slug: "prospeccao", name: "Prospecção" },
    { slug: "proposta-valor", name: "Proposta de Valor" },
    { slug: "pricing", name: "Pricing" },
    { slug: "onboarding", name: "Onboarding" },
    { slug: "sucesso-cliente", name: "Sucesso do Cliente" },
    { slug: "kpis", name: "KPI Comercial" }
  ];
  for (const t of themeSlugs) {
    await prisma.themes.upsert({ where: { slug: t.slug }, update: {}, create: { slug: t.slug, name: t.name, description: `${t.name} no contexto contábil.` } });
  }
  const videosData = [
    { slug: "fundamentos-honorarium-1", title: "Fundamentos Honorarium 1: Introdução", description: "Introdução ao comercial aplicado à contabilidade.", duration_seconds: 600, level: "Iniciante", thumbnail_url: "/thumbnails/fundamentos1.svg", media_url: "/videos/fundamentos1.mp4", is_hls: false, preview_start_seconds: 0, preview_duration_seconds: 20, materials: [{ type: "link", title: "Leitura complementar", url: "https://example.com" }], themes: ["prospeccao", "proposta-valor"] },
    { slug: "fundamentos-honorarium-2", title: "Fundamentos Honorarium 2: Prospecção", description: "Técnicas de prospecção para contadores.", duration_seconds: 720, level: "Intermediário", thumbnail_url: "/thumbnails/fundamentos2.svg", media_url: "/videos/fundamentos2.mp4", is_hls: false, preview_start_seconds: 0, preview_duration_seconds: 20, materials: [{ type: "pdf", title: "Checklist de Prospecção", url: "/docs/checklist_prospeccao.pdf" }], themes: ["prospeccao"] },
    { slug: "fundamentos-honorarium-3", title: "Fundamentos Honorarium 3: Proposta de Valor", description: "Construa propostas de valor que convertem.", duration_seconds: 840, level: "Intermediário", thumbnail_url: "/thumbnails/fundamentos3.svg", media_url: "/videos/fundamentos3.mp4", is_hls: false, preview_start_seconds: 0, preview_duration_seconds: 20, materials: [{ type: "link", title: "Exemplos de Propostas", url: "https://example.com" }], themes: ["proposta-valor"] },
    { slug: "fundamentos-honorarium-4", title: "Fundamentos Honorarium 4: Pricing", description: "Modelos de precificação aplicados à contabilidade.", duration_seconds: 900, level: "Avançado", thumbnail_url: "/thumbnails/fundamentos4.svg", media_url: "/videos/fundamentos4.mp4", is_hls: false, preview_start_seconds: 0, preview_duration_seconds: 20, materials: [{ type: "pdf", title: "Planilha de Pricing", url: "/docs/planilha_pricing.pdf" }], themes: ["pricing"] },
    { slug: "fundamentos-honorarium-5", title: "Fundamentos Honorarium 5: Onboarding e Sucesso", description: "Onboarding eficiente e sucesso do cliente.", duration_seconds: 780, level: "Intermediário", thumbnail_url: "/thumbnails/fundamentos5.svg", media_url: "/videos/fundamentos5.mp4", is_hls: false, preview_start_seconds: 0, preview_duration_seconds: 20, materials: [{ type: "link", title: "Guia de Onboarding", url: "https://example.com" }], themes: ["onboarding", "sucesso-cliente"] }
  ];
  for (const v of videosData) {
    const created = await prisma.videos.upsert({ where: { slug: v.slug }, update: {}, create: {
      slug: v.slug, title: v.title, description: v.description, duration_seconds: v.duration_seconds, level: v.level, thumbnail_url: v.thumbnail_url, media_url: v.media_url, is_hls: v.is_hls, preview_start_seconds: v.preview_start_seconds, preview_duration_seconds: v.preview_duration_seconds
    }});
    for (const m of v.materials) await prisma.materials.create({ data: { video_id: created.id, type: m.type, title: m.title, url: m.url } });
    for (const slug of v.themes) { const t = await prisma.themes.findUnique({ where: { slug } }); if (t) await prisma.video_themes.create({ data: { video_id: created.id, theme_id: t.id } }); }
  }
  const hash = await bcrypt.hash("demo123", 10);
  await prisma.users.upsert({ where: { email: "demo@honorarium.com" }, update: {}, create: { name: "Usuário Demo", email: "demo@honorarium.com", password_hash: hash } });
  console.log("Seed concluído.");
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
