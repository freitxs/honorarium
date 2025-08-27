
## Extras (Parte 2)
- Animações: scroll-reveal, transições de página, skeletons.
- Toasts via `sonner`.
- Rota `/catalogo/[tema]` para filtrar vídeos por tema.
- Persistência de progresso no player com debounce → salva em `/api/me/progress`.
- Suporte planejado para legendas `.vtt`.
- Testes básicos (`tests/auth.test.ts`).


## Animações e Interações
- **Framer Motion**: transição entre páginas (fade/slide) e **scroll-reveal** (IntersectionObserver + Motion) via `components/Reveal.tsx`.
- **Skeletons** em `/app/loading.tsx`, `/app/catalogo/loading.tsx`, `/app/video/[slug]/loading.tsx`.
- **Toasts** (`components/ui/toast.tsx`) e **Accordion** simples (`components/ui/accordion.tsx`).

## Favoritos e Progresso
- Página de vídeo usa `VideoWithActions` para:
  - salvar **progresso** com debounce em `/api/me/progress`;
  - **favoritar** em `/api/me/favorites` com feedback via toast.

## Rotas adicionais
- `/catalogo/[tema]` com ordenação por **Mais novos** ou **Duração**.

## Legendas
- Se existir um arquivo `.vtt` com o mesmo nome do vídeo (ex.: `fundamentos1.vtt`), configure no player conforme necessidade.
