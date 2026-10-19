import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CloudOff,
  FileText,
  Flame,
  Folder,
  GraduationCap,
  Layers,
  LayoutGrid,
  Menu,
  Monitor,
  Moon,
  Play,
  Search,
  Settings2,
  Sun,
  Target,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";
import {
  cards,
  explanations,
  subjects,
  descendantIds,
  subjectPath,
  type Card,
  type Subject,
} from "./content";
import {
  emptyStore,
  localDate,
  nextProgress,
  validateStore,
  type Rating,
  type Store,
} from "./scheduler";
import { useTheme, type ThemePreference } from "./theme";
import "./styles.css";

const STORAGE_KEY = "memoria-progress-v1";
let initialWarning = "";
function load(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed: unknown = JSON.parse(raw);
    if (validateStore(parsed)) return parsed;
    initialWarning =
      "Não foi possível ler seu progresso. Importe um backup para recuperá-lo.";
  } catch {
    initialWarning =
      "O armazenamento local está indisponível. Exporte um backup antes de sair.";
  }
  return emptyStore();
}
const initialStore = load();
const icons = [BookOpen, GraduationCap, FileText];
function App() {
  const { theme, changeTheme, themeWarning } = useTheme();
  const [store, setStore] = useState(initialStore);
  const [warning, setWarning] = useState(initialWarning);
  const [selected, setSelected] = useState("all");
  const [page, setPage] = useState<"library" | "stats">("library");
  const [expanded, setExpanded] = useState<string[]>([
    "constitucional",
    "principios",
  ]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [mobile, setMobile] = useState(false);
  const [modal, setModal] = useState<"settings" | "help" | null>(null);
  const [detail, setDetail] = useState<Card | null>(null);
  const [session, setSession] = useState<{
    queue: string[];
    total: number;
    done: number;
  } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [notice, setNotice] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const answerHeading = useRef<HTMLHeadingElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [smallScreen, setSmallScreen] = useState(
    () => window.matchMedia("(max-width: 760px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => {
      setSmallScreen(media.matches);
      if (!media.matches) setMobile(false);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!mobile || !smallScreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebar.current?.querySelector<HTMLElement>("a, button")?.focus();
    const trap = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMobile(false);
      }
      if (event.key !== "Tab") return;
      const controls = [
        ...(sidebar.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ].filter((el) => el.getClientRects().length);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trap);
      menuButton.current?.focus();
    };
  }, [mobile, smallScreen]);
  useEffect(() => {
    if (!session) return;
    questionHeading.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [session?.queue]);
  useEffect(() => {
    if (revealed) answerHeading.current?.focus({ preventScroll: true });
  }, [revealed]);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      setWarning(
        "Não foi possível salvar neste navegador. Exporte seu progresso nas configurações.",
      );
    }
  }, [store]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  const isDue = (card: Card) =>
    !store.progress[card.id] || store.progress[card.id].due <= now;
  const dueCards = cards.filter(isDue);
  const learned = cards.filter((c) => store.progress[c.id]);
  const todayCount = store.activity[localDate()] ?? 0;
  const path = subjectPath(selected);
  const node = path.at(-1);
  const ids = node ? descendantIds(node) : subjects.flatMap(descendantIds);
  const scoped = cards.filter((c) => ids.includes(c.subjectId));
  const visible = scoped.filter(
    (c) =>
      (filter === "all" ||
        (filter === "due" ? isDue(c) : !store.progress[c.id])) &&
      `${c.question} ${c.answer} ${subjectPath(c.subjectId)
        .map((n) => n.title)
        .join(" ")}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.toLocaleLowerCase("pt-BR")),
  );
  const dueScoped = scoped.filter(isDue);
  const title = node?.title ?? "Todos os assuntos";
  const currentCard = session?.queue[0]
    ? cards.find((c) => c.id === session.queue[0])!
    : null;
  const streak = (() => {
    let count = 0;
    const date = new Date();
    if (!store.activity[localDate(date)]) date.setDate(date.getDate() - 1);
    while (store.activity[localDate(date)]) {
      count++;
      date.setDate(date.getDate() - 1);
    }
    return count;
  })();
  function select(id: string) {
    setSelected(id);
    setPage("library");
    setQuery("");
    setFilter("all");
    setMobile(false);
    setSession(null);
  }
  function start(list: Card[]) {
    if (!list.length) return;
    setSession({ queue: list.map((c) => c.id), total: list.length, done: 0 });
    setRevealed(false);
    setMobile(false);
  }
  function rate(rating: Rating) {
    if (!currentCard || !session || !revealed) return;
    const timestamp = Date.now();
    const key = localDate();
    setStore((s) => ({
      ...s,
      progress: {
        ...s.progress,
        [currentCard.id]: nextProgress(
          s.progress[currentCard.id],
          rating,
          timestamp,
        ),
      },
      activity: { ...s.activity, [key]: (s.activity[key] ?? 0) + 1 },
    }));
    setSession({
      ...session,
      queue: [
        ...session.queue.slice(1),
        ...(rating === "again" ? [currentCard.id] : []),
      ],
      done: session.done + (rating === "again" ? 0 : 1),
    });
    setRevealed(false);
    setNow(timestamp);
  }
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        !session ||
        !currentCard ||
        modal ||
        detail ||
        e.repeat ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        (e.target instanceof HTMLElement &&
          (e.target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)))
      )
        return;
      if (
        e.code === "Space" &&
        e.target instanceof HTMLElement &&
        ["BUTTON", "A"].includes(e.target.tagName)
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        setRevealed(true);
      }
      if (revealed && ["1", "2", "3", "4"].includes(e.key))
        rate(
          (["again", "hard", "good", "easy"] as Rating[])[Number(e.key) - 1],
        );
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
  function exportData() {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(store, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `flash-backup-${localDate()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Backup exportado. Guarde-o em um lugar seguro.");
  }
  async function importData(file?: File) {
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!validateStore(parsed)) throw new Error();
      if (
        window.confirm("Substituir o progresso deste navegador pelo backup?")
      ) {
        setStore(parsed);
        setNotice("Progresso restaurado.");
      }
    } catch {
      setNotice("Arquivo inválido. Escolha um backup do flash.");
    }
    if (fileInput.current) fileInput.current.value = "";
  }
  return (
    <div className={session ? "app studying" : "app"}>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      {mobile && (
        <button
          className="sidebar-shade"
          aria-label="Fechar menu"
          onClick={() => setMobile(false)}
        />
      )}
      <aside
        ref={sidebar}
        id="navigation"
        aria-label="Navegação principal"
        role={smallScreen && mobile ? "dialog" : undefined}
        aria-modal={smallScreen && mobile ? true : undefined}
        inert={!!session || (smallScreen && !mobile)}
        className={`sidebar ${mobile ? "open" : ""}`}
      >
        <button
          className="icon-button close-menu"
          aria-label="Fechar menu"
          onClick={() => setMobile(false)}
        >
          <X size={20} />
        </button>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            select("all");
          }}
        >
          <span className="brand-mark">
            <Layers size={24} />
          </span>
          flash<span className="brand-dot">.</span>
        </a>
        <div className="nav-caption">ESTUDAR</div>
        <button
          className={`nav-item ${page === "library" && selected === "all" && !session ? "active" : ""}`}
          onClick={() => select("all")}
        >
          <LayoutGrid size={18} /> Visão geral
        </button>
        <button
          className={`nav-item ${session ? "active" : ""}`}
          onClick={() => {
            if (dueCards.length) start(dueCards);
            else setNotice("Tudo em dia! Você pode praticar qualquer assunto.");
          }}
        >
          <Layers size={18} /> Revisão do dia
          <span className="nav-count">{dueCards.length}</span>
        </button>
        <button
          className={`nav-item ${page === "stats" && !session ? "active" : ""}`}
          onClick={() => {
            setPage("stats");
            setSession(null);
            setMobile(false);
          }}
        >
          <TrendingUp size={18} /> Meu progresso
        </button>
        <div className="nav-caption subjects-caption">MEUS ASSUNTOS</div>
        <Tree
          nodes={subjects}
          selected={selected}
          expanded={expanded}
          onSelect={select}
          onToggle={(id) =>
            setExpanded((e) =>
              e.includes(id) ? e.filter((value) => value !== id) : [...e, id],
            )
          }
        />
        <div className="sidebar-bottom">
          <div className="local-note">
            <span className="green-dot" /> Seu progresso fica com você.
            <small>Salvo neste navegador, sem conta.</small>
          </div>
          <button
            className="nav-item"
            onClick={() => {
              setMobile(false);
              setModal("settings");
            }}
          >
            <Settings2 size={18} /> Configurações
          </button>
          <button
            className="nav-item"
            onClick={() => {
              setMobile(false);
              setModal("help");
            }}
          >
            <CircleHelp size={18} /> Como funciona
            <ArrowRight size={15} className="push" />
          </button>
        </div>
      </aside>
      <div className="app-shell" inert={smallScreen && mobile}>
        <header className="topbar">
          {session ? (
            <button
              className="text-button exit-study"
              onClick={() => setSession(null)}
            >
              <ArrowLeft size={18} /> Sair do treino
            </button>
          ) : (
            <button
              ref={menuButton}
              className="icon-button mobile-menu"
              aria-label="Abrir menu"
              aria-controls="navigation"
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu size={22} />
            </button>
          )}
          <div className="breadcrumbs">
            <span>Meu espaço</span>
            <ChevronRight size={14} />
            <strong>
              {session
                ? "Sessão de estudo"
                : page === "stats"
                  ? "Meu progresso"
                  : "Visão geral"}
            </strong>
          </div>
          <div className="topbar-right">
            <button
              className="icon-button"
              onClick={() => setModal("settings")}
              aria-label="Configurações e aparência"
            >
              <Settings2 size={20} />
            </button>
          </div>
        </header>
        <main id="main" tabIndex={-1}>
          {warning && (
            <div className="warning" role="alert">
              {warning}
            </div>
          )}
          {session ? (
            <section className="study">
              {currentCard ? (
                <>
                  <div className="study-heading">
                    <span>Revisão</span>
                    <span aria-live="polite">
                      {session.done} de {session.total} concluídos
                    </span>
                  </div>
                  <div
                    className="progress-track"
                    role="progressbar"
                    aria-label="Progresso da sessão"
                    aria-valuemin={0}
                    aria-valuemax={session.total}
                    aria-valuenow={session.done}
                  >
                    <div
                      style={{
                        width: `${(session.done / session.total) * 100}%`,
                      }}
                    />
                  </div>
                  <article className="study-card" key={currentCard.id}>
                    <div className="card-meta">
                      <span className="tag">{currentCard.type}</span>
                      <span>
                        {subjectPath(currentCard.subjectId).at(-1)?.title}
                      </span>
                    </div>
                    <h1 ref={questionHeading} tabIndex={-1}>
                      {currentCard.question}
                    </h1>
                    {revealed ? (
                      <div className="answer" aria-live="polite">
                        <div className="eyebrow">
                          <CheckCheck size={16} /> RESPOSTA
                        </div>
                        <h2 ref={answerHeading} tabIndex={-1}>
                          {currentCard.answer}
                        </h2>
                        <Explanation card={currentCard} />
                      </div>
                    ) : (
                      <p className="recall-hint">
                        Tente lembrar antes de revelar.
                      </p>
                    )}
                  </article>
                  {!revealed && (
                    <div className="study-actions">
                      <button
                        className="primary reveal"
                        onClick={() => setRevealed(true)}
                      >
                        Mostrar resposta
                        <ChevronDown size={17} />
                      </button>
                    </div>
                  )}
                  {revealed && (
                    <div className="study-actions rating-area">
                      <p>Como foi lembrar?</p>
                      <div className="rating-grid">
                        {(["again", "hard", "good", "easy"] as Rating[]).map(
                          (r, i) => {
                            const p = nextProgress(
                              store.progress[currentCard.id],
                              r,
                              now,
                            );
                            return (
                              <button
                                key={r}
                                className={`rating ${r}`}
                                onClick={() => rate(r)}
                              >
                                <strong>
                                  {["De novo", "Difícil", "Bom", "Fácil"][i]}
                                </strong>
                                <span>
                                  {r === "again"
                                    ? "1 min"
                                    : `${p.interval} ${p.interval === 1 ? "dia" : "dias"}`}
                                </span>
                                <kbd>{i + 1}</kbd>
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="completion">
                  <div className="completion-icon">
                    <CheckCheck size={38} />
                  </div>
                  <span className="eyebrow">MAIS UM PASSO DADO</span>
                  <h1 ref={questionHeading} tabIndex={-1}>
                    Sessão concluída!
                  </h1>
                  <p>
                    Você revisou {session.total} cards. Um pouco a cada dia faz
                    a diferença.
                  </p>
                  <button className="primary" onClick={() => setSession(null)}>
                    Voltar aos assuntos
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </section>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <h1>
                    {page === "stats"
                      ? "Meu progresso"
                      : node
                        ? title
                        : "Vamos estudar?"}
                  </h1>
                  <p>
                    {page === "stats"
                      ? "Suas revisões, ao longo do tempo."
                      : "Revise o que está pendente ou escolha um assunto."}
                  </p>
                </div>
              </div>
              {page === "stats" && (
                <div className="stats-grid">
                  <Stat
                    icon={<Layers size={20} />}
                    label="Para revisar"
                    value={dueCards.length}
                    detail="cards esperando por você"
                    color="purple"
                  />
                  <Stat
                    icon={<CheckCheck size={20} />}
                    label="Revisados hoje"
                    value={todayCount}
                    detail={
                      todayCount
                        ? "continue no seu ritmo"
                        : "um bom dia para começar"
                    }
                    color="green"
                  />
                  <Stat
                    icon={<Flame size={20} />}
                    label="Sequência atual"
                    value={`${streak} ${streak === 1 ? "dia" : "dias"}`}
                    detail="consistência vale mais que pressa"
                    color="orange"
                  />
                  <Stat
                    icon={<BookOpen size={20} />}
                    label="Na sua biblioteca"
                    value={cards.length}
                    detail={`${subjects.length} matérias para explorar`}
                    color="blue"
                  />
                </div>
              )}
              {page === "stats" ? (
                <section className="analytics panel">
                  <div className="section-heading">
                    <div>
                      <h2>Seu ritmo de estudo</h2>
                      <p>Revisões nos últimos 7 dias</p>
                    </div>
                    <TrendingUp size={22} />
                  </div>
                  <div className="chart">
                    {Array.from({ length: 7 }, (_, i) => {
                      const d = new Date(now);
                      d.setDate(d.getDate() - 6 + i);
                      const count = store.activity[localDate(d)] ?? 0;
                      const max = Math.max(1, ...Object.values(store.activity));
                      return (
                        <div className="chart-column" key={i}>
                          <strong>{count}</strong>
                          <div className="bar-slot">
                            <div
                              style={{
                                height: `${Math.max(2, (count / max) * 100)}%`,
                              }}
                            />
                          </div>
                          <span>
                            {d.toLocaleDateString("pt-BR", {
                              weekday: "short",
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="analytics-summary">
                    <Target size={22} />
                    <div>
                      <strong>
                        {learned.length} de {cards.length} cards já estudados
                      </strong>
                      <p>
                        O próximo passo é continuar. Seus cards reaparecem
                        quando chega a hora de revisar.
                      </p>
                    </div>
                  </div>
                </section>
              ) : (
                <>
                  <section className="review-banner">
                    <div>
                      <h2>
                        {dueScoped.length
                          ? `${dueScoped.length} cards para revisar`
                          : "Revisões em dia"}
                      </h2>
                      <p>
                        {dueScoped.length ? (
                          <>
                            <Clock3 size={14} /> Cerca de{" "}
                            {Math.max(1, Math.ceil(dueScoped.length * 0.5))} min
                          </>
                        ) : (
                          "Volte amanhã ou pratique novamente."
                        )}
                      </p>
                    </div>
                    <button
                      className="primary"
                      disabled={!scoped.length}
                      onClick={() =>
                        start(dueScoped.length ? dueScoped : scoped)
                      }
                    >
                      <Play size={16} fill="currentColor" />
                      {dueScoped.length
                        ? "Começar revisão"
                        : "Praticar novamente"}
                      <ArrowRight size={17} />
                    </button>
                  </section>
                  <section className="library">
                    {selected === "all" && (
                      <>
                        <div className="section-heading">
                          <div>
                            <h2>
                              Assuntos{" "}
                              <span className="count-badge">
                                {cards.length} cards
                              </span>
                            </h2>
                          </div>
                          <button
                            className="text-button muted"
                            aria-label="Como organizar os assuntos"
                            onClick={() => setModal("help")}
                          >
                            <CircleHelp size={15} />
                            <span>Como organizar</span>
                          </button>
                        </div>
                        <div className="subject-grid">
                          {subjects.map((s, i) => {
                            const list = cards.filter((c) =>
                              descendantIds(s).includes(c.subjectId),
                            );
                            const Icon = icons[i];
                            const studied = list.filter(
                              (c) => store.progress[c.id],
                            ).length;
                            return (
                              <button
                                className={`subject-card ${path[0]?.id === s.id ? "subject-active" : ""}`}
                                key={s.id}
                                onClick={() => select(s.id)}
                              >
                                <div className="subject-card-top">
                                  <span className={`subject-icon color-${i}`}>
                                    <Icon size={21} />
                                  </span>
                                  <ChevronRight size={17} />
                                </div>
                                <h3>{s.title}</h3>
                                <p>
                                  {list.length} cards<span>·</span>
                                  {list.filter(isDue).length} para revisar
                                </p>
                                <div className="progress-track">
                                  <div
                                    style={{
                                      width: `${(studied / list.length) * 100}%`,
                                    }}
                                  />
                                </div>
                                <div className="subject-card-bottom">
                                  <span>
                                    {studied
                                      ? `${studied} cards estudados`
                                      : "Pronto para começar"}
                                  </span>
                                  <span>
                                    {Math.round((studied / list.length) * 100)}%
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                    <section className="card-browser">
                      <div className="browser-top">
                        <div className="browser-title">
                          <h3>{title}</h3>
                          <span className="count-badge">{scoped.length}</span>
                          {selected !== "all" && (
                            <button
                              className="text-button"
                              onClick={() => select("all")}
                            >
                              Ver todos
                            </button>
                          )}
                        </div>
                        <label className="search">
                          <Search size={16} />
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar nos cards..."
                            aria-label="Buscar nos cards"
                          />
                          {query && (
                            <button
                              aria-label="Limpar busca"
                              onClick={() => setQuery("")}
                            >
                              <X size={14} />
                            </button>
                          )}
                        </label>
                      </div>
                      {node?.children && (
                        <div className="subsubjects">
                          {node.children.map((s) => (
                            <button onClick={() => select(s.id)} key={s.id}>
                              <Folder size={14} />
                              {s.title}
                              <ChevronRight size={13} />
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="browser-toolbar">
                        <div className="tabs" aria-label="Filtrar cards">
                          {[
                            ["all", "Todos"],
                            ["due", "Para revisar"],
                            ["new", "Novos"],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              className={
                                filter === value ? "tab active" : "tab"
                              }
                              aria-pressed={filter === value}
                              onClick={() => setFilter(value)}
                            >
                              {label}
                              {value === "due" && (
                                <span>{dueScoped.length}</span>
                              )}
                            </button>
                          ))}
                        </div>
                        <button
                          className="text-button"
                          disabled={!visible.length}
                          onClick={() => start(visible)}
                        >
                          <Play size={13} /> Estudar seleção
                        </button>
                      </div>
                      <div className="table-head">
                        <span>CARD / ASSUNTO</span>
                        <span>TIPO</span>
                        <span>STATUS</span>
                        <span />
                      </div>
                      <div className="card-list">
                        {visible.length ? (
                          visible.map((card) => (
                            <button
                              className="card-row"
                              key={card.id}
                              onClick={() => setDetail(card)}
                            >
                              <span className="row-icon">
                                <Layers size={17} />
                              </span>
                              <span className="row-main">
                                <strong>{card.question}</strong>
                                <span>
                                  {subjectPath(card.subjectId)
                                    .slice(-2)
                                    .map((s) => s.title)
                                    .join(" / ")}
                                </span>
                              </span>
                              <span className="row-type">{card.type}</span>
                              <span
                                className={`status ${!store.progress[card.id] ? "new" : isDue(card) ? "due" : "scheduled"}`}
                              >
                                <span />
                                {!store.progress[card.id]
                                  ? "Novo"
                                  : isDue(card)
                                    ? "Revisar"
                                    : "Em dia"}
                              </span>
                              <ChevronRight size={16} className="row-arrow" />
                            </button>
                          ))
                        ) : (
                          <div className="empty">
                            <Search size={26} />
                            <h3>Nenhum card por aqui</h3>
                            <p>Tente outra busca ou mude o filtro.</p>
                            <button
                              className="text-button"
                              onClick={() => {
                                setQuery("");
                                setFilter("all");
                              }}
                            >
                              Limpar filtros
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="table-footer">
                        <span>
                          {visible.length} de {scoped.length} cards{" "}
                          <span className="demo-label">
                            Conteúdo demonstrativo
                          </span>
                        </span>
                        <span>
                          <Layers size={13} /> Um conteúdo, várias conexões.
                        </span>
                      </div>
                    </section>
                  </section>
                </>
              )}
            </>
          )}
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}
      {(modal || detail) && (
        <Dialog
          title={
            detail
              ? "Explore o card"
              : modal === "settings"
                ? "Configurações"
                : "Conhecimento que se conecta"
          }
          onClose={() => {
            setModal(null);
            setDetail(null);
          }}
        >
          {detail ? (
            <>
              <div className="card-meta">
                <span className="tag">{detail.type}</span>
                <span>{detail.tag}</span>
              </div>
              <h2 className="detail-question">{detail.question}</h2>
              <div className="detail-answer">
                <span className="eyebrow">RESPOSTA</span>
                <p>{detail.answer}</p>
              </div>
              <Explanation card={detail} />
              <button
                className="primary"
                onClick={() => {
                  start([detail]);
                  setDetail(null);
                }}
              >
                <Play size={15} /> Estudar este card
              </button>
            </>
          ) : modal === "settings" ? (
            <>
              <fieldset className="theme-settings">
                <legend>Aparência</legend>
                <div className="theme-options">
                  {(
                    [
                      { value: "light", label: "Claro", Icon: Sun },
                      { value: "dark", label: "Escuro", Icon: Moon },
                      { value: "system", label: "Sistema", Icon: Monitor },
                    ] as const
                  ).map(({ value, label, Icon }) => (
                    <label className="theme-option" key={value}>
                      <input
                        type="radio"
                        name="theme"
                        value={value}
                        checked={theme === value}
                        onChange={() => changeTheme(value as ThemePreference)}
                      />
                      <span>
                        <Icon size={18} />
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="muted">
                  Sistema acompanha a aparência do seu dispositivo.
                </p>
                {themeWarning && (
                  <p role="status" className="warning">
                    {themeWarning}
                  </p>
                )}
              </fieldset>
              <div className="settings-note">
                <CloudOff size={24} />
                <div>
                  <h3>Sem conta. Sem nuvem.</h3>
                  <p>
                    Seu progresso fica neste navegador. Limpar os dados do site
                    ou trocar de dispositivo não leva seu histórico junto. Faça
                    backups regulares.
                  </p>
                </div>
              </div>
              <h3>Backup do progresso</h3>
              <p className="muted">
                Exporte um arquivo e importe em outro dispositivo para continuar
                de onde parou. A importação substitui o progresso atual.
              </p>
              <div className="settings-actions">
                <button className="secondary" onClick={exportData}>
                  <ArrowDownToLine size={17} /> Exportar backup
                </button>
                <button
                  className="secondary"
                  onClick={() => fileInput.current?.click()}
                >
                  <Upload size={17} /> Importar backup
                </button>
              </div>
              <input
                type="file"
                accept="application/json,.json"
                hidden
                ref={fileInput}
                onChange={(e) => void importData(e.target.files?.[0])}
              />
              <div className="danger-zone">
                <h3>Recomeçar do zero</h3>
                <p>
                  Apaga somente seu histórico de revisão. Os cards continuam na
                  biblioteca.
                </p>
                <button
                  className="danger-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Apagar todo o progresso? Esta ação não pode ser desfeita sem um backup.",
                      )
                    ) {
                      setStore(emptyStore());
                      setSession(null);
                      setModal(null);
                      setNotice("Progresso redefinido. Um novo começo!");
                    }
                  }}
                >
                  Redefinir progresso
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="help-intro">
                Um espaço simples para transformar revisão em hábito.
              </p>
              <div className="help-step">
                <span>01</span>
                <div>
                  <h3>Do assunto ao detalhe</h3>
                  <p>
                    Navegue por matérias, temas e subtópicos. Os cards ficam no
                    último nível, mas você pode estudar qualquer ramo inteiro.
                  </p>
                </div>
              </div>
              <div className="help-step">
                <span>02</span>
                <div>
                  <h3>Lembre. Revele. Revise.</h3>
                  <p>
                    Tente responder antes de revelar. Avalie a dificuldade: “De
                    novo” repete o card nesta sessão; as demais opções agendam a
                    próxima revisão.
                  </p>
                </div>
              </div>
              <div className="help-step">
                <span>03</span>
                <div>
                  <h3>Entenda, não apenas memorize</h3>
                  <p>
                    Cada card tem uma resposta e um conteúdo explicativo. Vários
                    cards podem compartilhar a mesma explicação, conectando o
                    conhecimento.
                  </p>
                </div>
              </div>
              <div className="code-note">
                <h3>Conteúdo definido no projeto</h3>
                <p>
                  Edite <code>src/content.ts</code> para adicionar assuntos,
                  cards e explicações. Use <code>subjectId</code> para organizar
                  cada card e <code>explanationId</code> para conectar conteúdos
                  compartilhados.
                </p>
              </div>
              <small className="muted">
                Os exemplos são demonstrativos. O agendamento é uma versão
                simplificada de repetição espaçada, não o algoritmo do Anki.
              </small>
            </>
          )}
        </Dialog>
      )}
    </div>
  );
}
type TreeProps = {
  nodes: Subject[];
  depth?: number;
  selected: string;
  expanded: string[];
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
};
function Tree({
  nodes,
  depth = 0,
  selected,
  expanded,
  onSelect,
  onToggle,
}: TreeProps) {
  return (
    <div className={depth ? "tree-nested" : "tree"}>
      {nodes.map((subject, index) => {
        const open = expanded.includes(subject.id);
        const Icon = depth === 0 ? (icons[index] ?? Folder) : Folder;
        return (
          <React.Fragment key={subject.id}>
            <div
              className={`tree-row ${selected === subject.id ? "selected" : ""}`}
            >
              <button
                className="tree-label"
                onClick={() => onSelect(subject.id)}
                title={subject.title}
                aria-current={selected === subject.id ? "page" : undefined}
              >
                <Icon size={16} />
                <span>{subject.title}</span>
              </button>
              {subject.children && (
                <button
                  className="tree-toggle"
                  aria-label={`${open ? "Recolher" : "Expandir"} ${subject.title}`}
                  aria-expanded={open}
                  onClick={() => onToggle(subject.id)}
                >
                  {open ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </button>
              )}
            </div>
            {subject.children && open && (
              <Tree
                nodes={subject.children}
                depth={depth + 1}
                selected={selected}
                expanded={expanded}
                onSelect={onSelect}
                onToggle={onToggle}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
function Explanation({ card }: { card: Card }) {
  const explanation = explanations.find((e) => e.id === card.explanationId)!;
  const shared = cards.filter((c) => c.explanationId === explanation.id).length;
  return (
    <div className="explanation">
      <div className="eyebrow">
        <BookOpen size={15} /> ENTENDA O PORQUÊ{" "}
        <span className="shared">
          <Layers size={13} /> Compartilhado com {shared} cards
        </span>
      </div>
      <h3>{explanation.title}</h3>
      {explanation.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <small>{explanation.source}</small>
    </div>
  );
}
function Stat({
  icon,
  label,
  value,
  detail,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  detail: string;
  color: string;
}) {
  return (
    <div className="stat">
      <div className="stat-top">
        <span>{label}</span>
        <span className={`stat-icon ${color}`}>{icon}</span>
      </div>
      <strong className="stat-value">{value}</strong>
      <span className="stat-detail">{detail}</span>
    </div>
  );
}
function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const box = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < box.left ||
            e.clientX > box.right ||
            e.clientY < box.top ||
            e.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-button" aria-label="Fechar" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
if ("serviceWorker" in navigator && import.meta.env.PROD)
  window.addEventListener("load", () => {
    void navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .catch(() => {});
  });
