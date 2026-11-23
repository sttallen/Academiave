import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  ClipboardCheck,
  CreditCard,
  Dumbbell,
  Flame,
  HeartHandshake,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Users,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Navbar, ModalType } from './components/Navbar';
import { FitZoneModals } from './components/FitZoneModals';
import { FitZoneLogo, DumbbellCornerArtwork } from './components/Icons';
import { ImageWithFallback } from './components/ImageWithFallback';
import { AnimatedCounter } from './components/AnimatedCounter';
import {
  ABOUT_IMAGE,
  FEATURED_TESTIMONIAL,
  HERO_IMAGE,
  MODALITIES,
  ModalityItem,
  NAV_ITEMS,
  NavItem,
  TRAINERS,
  TrainerItem,
} from './data/fitzoneData';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedModalityId, setSelectedModalityId] = useState<string | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerItem | null>(null);
  const [preselectedPlanName, setPreselectedPlanName] = useState<string | null>(null);
  const [trainerStartIndex, setTrainerStartIndex] = useState<number>(0);

  // Track active section while scrolling
  useEffect(() => {
    const sectionIds = ['inicio', 'sobre', 'aulas', 'treinadores'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectNav = (item: NavItem) => {
    setActiveSection(item.id);
    if (item.action === 'plans') {
      setActiveModal('plans');
      return;
    }
    if (item.action === 'blog') {
      setActiveModal('blog');
      return;
    }
    if (item.action === 'contact') {
      setPreselectedPlanName(null);
      setActiveModal('enroll');
      return;
    }
    const target = document.getElementById(item.id);
    if (target) {
      target.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
    }
  };

  const openEnrollModal = (planName?: string) => {
    setPreselectedPlanName(planName || null);
    setActiveModal('enroll');
  };

  const openClassesModal = (modalityId?: string) => {
    setSelectedModalityId(modalityId || null);
    setActiveModal('classes');
  };

  const openTrainerModal = (trainer: TrainerItem) => {
    setSelectedTrainer(trainer);
    setActiveModal('trainer');
  };

  const handlePrevTrainers = () => {
    setTrainerStartIndex((prev) => (prev - 1 + TRAINERS.length) % TRAINERS.length);
  };

  const handleNextTrainers = () => {
    setTrainerStartIndex((prev) => (prev + 1) % TRAINERS.length);
  };

  const orderedTrainers = TRAINERS.map(
    (_, idx) => TRAINERS[(trainerStartIndex + idx) % TRAINERS.length]
  );

  const revealProps = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, delay, ease: EASE_OUT_EXPO },
        };

  const renderModalityIcon = (iconName: ModalityItem['iconName']) => {
    switch (iconName) {
      case 'dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#C6FF00]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#C6FF00]" />;
      case 'flame':
        return <Flame className="w-5 h-5 text-[#C6FF00]" />;
      case 'swords':
        return <Swords className="w-5 h-5 text-[#C6FF00]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col">
      {/* 1. CABEÇALHO (NAVBAR) */}
      <Navbar
        activeSection={activeSection}
        onSelectNav={handleSelectNav}
        onOpenEnroll={() => openEnrollModal()}
      />

      <main className="flex-1">
        {/* 2. HERO SECTION (DOBRA PRINCIPAL) */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-[#0A0A0C] pt-10 pb-14 lg:pt-16 lg:pb-20"
        >
          {/* Subtle ambient radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 w-[540px] h-[540px] rounded-full bg-[#C6FF00]/6 blur-[140px]"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column */}
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="lg:col-span-6 xl:col-span-6 relative z-10"
              >
                <p className="text-xs sm:text-[13px] font-semibold tracking-[0.22em] text-[#A1A1AA] uppercase mb-5">
                  MAIS FORTE <span className="text-[#C6FF00] mx-1.5">•</span> MAIS SAUDÁVEL{' '}
                  <span className="text-[#C6FF00] mx-1.5">•</span> MAIS FELIZ
                </p>

                <h1 className="text-4xl sm:text-5xl xl:text-[62px] font-extrabold tracking-tight leading-[1.05] text-white text-balance mb-6">
                  Sua Saúde é Nossa{' '}
                  <span className="text-[#C6FF00]">Prioridade</span>
                </h1>

                <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl mb-8">
                  Alcance seus objetivos de força, condicionamento e bem-estar com treinadores especialistas, equipamentos modernos de biomecânica avançada e uma comunidade motivadora que evolui junto com você.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openEnrollModal()}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm sm:text-base px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 lime-btn-glow whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Começar Agora</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal('plans')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#18181C] hover:bg-[#222228] text-white font-semibold text-sm sm:text-base px-7 py-3.5 border border-[#26262C] hover:border-[#C6FF00]/50 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Conhecer Planos</span>
                  </button>
                </div>
              </motion.div>

              {/* Right Column: Athlete + Angular Diagonal Lime Geometry */}
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_EXPO }}
                className="lg:col-span-6 xl:col-span-6 relative flex justify-center lg:justify-end"
              >
                <div className="relative w-full max-w-[490px] aspect-[4/5] sm:aspect-[3/4]">
                  {/* Angular diagonal lime geometric backdrop */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 sm:-inset-3 rounded-2xl bg-[#C6FF00] opacity-90"
                    style={{
                      clipPath: 'polygon(18% 4%, 100% 0%, 100% 88%, 8% 100%)',
                    }}
                  />
                  {/* Secondary dark diagonal offset frame */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-1 rounded-2xl bg-[#121215]"
                    style={{
                      clipPath: 'polygon(14% 2%, 98% 2%, 98% 92%, 4% 98%)',
                    }}
                  />
                  {/* Athlete Photo Container */}
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border border-[#26262C] bg-[#121215] shadow-2xl">
                    <ImageWithFallback
                      src={HERO_IMAGE}
                      alt="Atleta treinando com halteres no estúdio FitZone"
                      className="w-full h-full object-cover object-center"
                      fallbackLabel="Atleta FitZone em Treinamento de Força"
                    />
                    {/* Subtle contrast bottom gradient */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/80 via-transparent to-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. BARRA DE 4 DIFERENCIAIS (DESTAQUES RÁPIDOS) */}
        <section aria-label="Diferenciais FitZone" className="py-4 bg-[#0A0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...revealProps(0.05)}
              className="rounded-2xl bg-[#18181C] border border-[#26262C] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#26262C]"
            >
              {[
                {
                  icon: <Award className="w-6 h-6 text-[#C6FF00]" />,
                  title: 'Treinadores Especialistas',
                  subtitle: 'Orientação profissional',
                },
                {
                  icon: <Dumbbell className="w-6 h-6 text-[#C6FF00]" />,
                  title: 'Equipamentos Modernos',
                  subtitle: 'Treine com o que há de melhor',
                },
                {
                  icon: <Users className="w-6 h-6 text-[#C6FF00]" />,
                  title: 'Comunidade Motivadora',
                  subtitle: 'Evoluam juntos',
                },
                {
                  icon: <CreditCard className="w-6 h-6 text-[#C6FF00]" />,
                  title: 'Planos Flexíveis',
                  subtitle: 'Escolha o ideal para você',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 sm:p-7 flex flex-col items-start gap-3 transition-colors hover:bg-[#1E1E24]/70 first:rounded-t-2xl sm:first:rounded-tr-none sm:first:rounded-l-2xl last:rounded-b-2xl sm:last:rounded-bl-none sm:last:rounded-r-2xl"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#121215] border border-[#26262C] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#A1A1AA] mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. SEÇÃO "NOSSAS AULAS / MODALIDADES" */}
        <section id="aulas" className="py-16 lg:py-24 bg-[#0A0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...revealProps()}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2.5">
                  — NOSSAS AULAS
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
                  Encontre o Treino Perfeito
                </h2>
              </div>

              <button
                type="button"
                onClick={() => openClassesModal()}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#C6FF00] hover:text-[#D2FF1E] transition-colors self-start sm:self-auto whitespace-nowrap shrink-0 cursor-pointer group"
              >
                <span>Ver Todas as Aulas</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MODALITIES.map((modality, idx) => (
                <motion.div
                  key={modality.id}
                  {...revealProps(idx * 0.07)}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                >
                  <button
                    type="button"
                    onClick={() => openClassesModal(modality.id)}
                    className="group relative w-full text-left aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181C] border border-[#26262C] card-lime-hover transition-all duration-200 cursor-pointer block"
                  >
                    <ImageWithFallback
                      src={modality.image}
                      alt={modality.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      fallbackLabel={modality.title}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/35 to-transparent"
                    />

                    {/* Dark bottom bar */}
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-[#18181C]/95 backdrop-blur-md border border-[#26262C] px-4 py-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-[#121215] border border-[#26262C] flex items-center justify-center shrink-0">
                          {renderModalityIcon(modality.iconName)}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white truncate">
                          {modality.title}
                        </span>
                      </div>

                      <span className="w-9 h-9 rounded-full bg-[#121215] border border-[#26262C] group-hover:bg-[#C6FF00] group-hover:border-[#C6FF00] text-white group-hover:text-[#0A0A0C] flex items-center justify-center shrink-0 transition-colors duration-200">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SEÇÃO "SOBRE A FITZONE" */}
        <section id="sobre" className="py-16 lg:py-24 bg-[#121215] border-y border-[#26262C]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column: Battle Rope Athlete + Lime Diagonal */}
              <motion.div
                {...revealProps()}
                className="lg:col-span-4 relative flex justify-center lg:justify-start"
              >
                <div className="relative w-full max-w-[380px] aspect-[3/4]">
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-3 -left-3 w-full h-full rounded-2xl bg-[#C6FF00]"
                    style={{
                      clipPath: 'polygon(0 28%, 85% 100%, 0 100%)',
                    }}
                  />
                  <div className="relative h-full w-full rounded-2xl overflow-hidden border border-[#26262C] bg-[#18181C]">
                    <ImageWithFallback
                      src={ABOUT_IMAGE}
                      alt="Atleta treinando com corda naval na FitZone"
                      className="w-full h-full object-cover object-center"
                      fallbackLabel="Treinamento Funcional com Corda Naval"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/65 via-transparent to-transparent"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Center Column: Institutional Copy */}
              <motion.div {...revealProps(0.08)} className="lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-3">
                  — SOBRE A FITZONE
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.12] text-balance mb-5">
                  Construindo uma Versão Mais Forte e Saudável de Você
                </h2>
                <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-7">
                  Mais do que uma academia, a FitZone é um ecossistema de performance pensado para transformar o treino em um estilo de vida sustentável. Unimos estrutura completa, suporte técnico próximo e metodologia clara para você superar limites com segurança.
                </p>

                <button
                  type="button"
                  onClick={() => setActiveModal('about')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 lime-btn-glow whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Saiba Mais</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </motion.div>

              {/* Right Column: 3 Vertical Pillars */}
              <motion.div {...revealProps(0.14)} className="lg:col-span-4 space-y-4">
                {[
                  {
                    icon: <Building2 className="w-5 h-5 text-[#0A0A0C]" />,
                    title: 'Estrutura de Ponta',
                    desc: 'Equipamentos ergonômicos importados, piso de absorção de impacto e zonas exclusivas de treino.',
                  },
                  {
                    icon: <ClipboardCheck className="w-5 h-5 text-[#0A0A0C]" />,
                    title: 'Planos de Treino Personalizados',
                    desc: 'Periodização individual adaptada ao seu biotipo, disponibilidade semanal e metas reais.',
                  },
                  {
                    icon: <Target className="w-5 h-5 text-[#0A0A0C]" />,
                    title: 'Programas Focados em Resultados',
                    desc: 'Acompanhamento contínuo de cargas e evolução física para transformar esforço em conquista.',
                  },
                ].map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-2xl bg-[#18181C] border border-[#26262C] card-lime-hover p-5 flex items-start gap-4 transition-all duration-200"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#C6FF00] flex items-center justify-center shrink-0 mt-0.5">
                      {pillar.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{pillar.title}</h3>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. BARRA DE MÉTRICAS / NÚMEROS */}
        <section aria-label="Métricas FitZone" className="py-12 bg-[#0A0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...revealProps()}
              className="rounded-2xl bg-[#18181C] border border-[#26262C] px-6 py-8 sm:px-10 sm:py-10 grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  icon: <Users className="w-6 h-6 text-[#C6FF00]" />,
                  target: 10,
                  suffix: 'K+',
                  label: 'Alunos Satisfeitos',
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-[#C6FF00]" />,
                  target: 5,
                  suffix: '+',
                  label: 'Anos de Experiência',
                },
                {
                  icon: <HeartHandshake className="w-6 h-6 text-[#C6FF00]" />,
                  target: 98,
                  suffix: '%',
                  label: 'Satisfação dos Clientes',
                },
                {
                  icon: <Zap className="w-6 h-6 text-[#C6FF00]" />,
                  target: 50,
                  suffix: '+',
                  label: 'Programas de Treino',
                },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#121215] border border-[#26262C] flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 7. SEÇÃO "NOSSOS TREINADORES" */}
        <section id="treinadores" className="py-16 lg:py-24 bg-[#0A0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...revealProps()}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2.5">
                  — NOSSOS TREINADORES
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
                  Conheça Nossos Treinadores Especialistas
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevTrainers}
                  aria-label="Treinador anterior"
                  className="w-11 h-11 rounded-full bg-[#18181C] border border-[#26262C] hover:border-[#C6FF00] text-white hover:text-[#C6FF00] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextTrainers}
                  aria-label="Próximo treinador"
                  className="w-11 h-11 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {orderedTrainers.map((trainer, idx) => (
                <motion.div
                  key={trainer.id}
                  layout={!shouldReduceMotion}
                  {...revealProps(idx * 0.06)}
                  whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                >
                  <button
                    type="button"
                    onClick={() => openTrainerModal(trainer)}
                    className="group w-full text-left rounded-2xl overflow-hidden bg-[#18181C] border border-[#26262C] card-lime-hover transition-all duration-200 cursor-pointer block"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#121215]">
                      <ImageWithFallback
                        src={trainer.image}
                        alt={`${trainer.name} — ${trainer.role}`}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        fallbackLabel={trainer.name}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#18181C] via-transparent to-transparent opacity-80"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#C6FF00] transition-colors">
                          {trainer.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">{trainer.role}</p>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-[#121215] border border-[#26262C] group-hover:bg-[#C6FF00] group-hover:border-[#C6FF00] text-[#A1A1AA] group-hover:text-[#0A0A0C] flex items-center justify-center transition-colors shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. SEÇÃO INFERIOR DUPLA (DEPOIMENTOS + BANNER CTA) */}
        <section className="py-16 lg:py-24 bg-[#121215] border-t border-[#26262C]/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Depoimentos */}
              <motion.div {...revealProps()} className="lg:col-span-6 flex flex-col">
                <div className="mb-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2.5">
                    — DEPOIMENTOS
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    O Que Nossos Alunos Dizem
                  </h2>
                </div>

                <div className="flex-1 rounded-2xl bg-[#18181C] border border-[#26262C] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div
                      aria-hidden="true"
                      className="text-6xl font-extrabold leading-none text-[#C6FF00] select-none mb-3 font-serif"
                    >
                      “
                    </div>
                    <p className="text-base sm:text-lg text-zinc-200 leading-relaxed mb-6">
                      {FEATURED_TESTIMONIAL.quote}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#26262C] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C6FF00]/60 shrink-0 bg-[#121215]">
                        <ImageWithFallback
                          src={FEATURED_TESTIMONIAL.image}
                          alt={FEATURED_TESTIMONIAL.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white">
                          {FEATURED_TESTIMONIAL.name}
                        </p>
                        <p className="text-xs text-[#A1A1AA]">{FEATURED_TESTIMONIAL.role}</p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C6FF00]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{FEATURED_TESTIMONIAL.result}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Banner CTA de Conversão */}
              <motion.div {...revealProps(0.1)} className="lg:col-span-6 flex">
                <div className="relative w-full rounded-2xl bg-[#18181C] border border-[#26262C] overflow-hidden p-7 sm:p-10 flex flex-col justify-between min-h-[360px]">
                  {/* Diagonal Lime Geometric Detail */}
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 bottom-0 w-44 sm:w-56 bg-[#C6FF00]/90"
                    style={{
                      clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0 100%)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-0 bottom-0 w-44 sm:w-56 bg-[#0A0A0C]/85"
                    style={{
                      clipPath: 'polygon(52% 0, 100% 0, 100% 100%, 10% 100%)',
                    }}
                  />

                  {/* Knurled Dumbbell Artwork in Right Corner */}
                  <div className="absolute right-1 bottom-2 sm:right-4 sm:bottom-4 w-44 h-36 sm:w-56 sm:h-48 opacity-95 pointer-events-none">
                    <DumbbellCornerArtwork />
                  </div>

                  <div className="relative z-10 max-w-md">
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-3">
                      — COMECE HOJE
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.1] text-balance mb-4">
                      Pronto para Transformar o Seu Corpo?
                    </h2>
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8">
                      Dê o primeiro passo agora. Garanta sua vaga com avaliação física inicial e treino personalizado pelos nossos especialistas.
                    </p>
                  </div>

                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => openEnrollModal()}
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm sm:text-base px-7 py-3.5 transition-all duration-200 hover:-translate-y-0.5 lime-btn-glow whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Matricule-se Agora</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. RODAPÉ (FOOTER) */}
      <footer className="bg-[#0A0A0C] border-t border-[#26262C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-[#26262C]">
            {/* Left: Logo + Slogan */}
            <div>
              <FitZoneLogo />
              <p className="text-sm font-medium text-[#A1A1AA] mt-2.5">
                Treine. Transforme. Evolua.
              </p>
            </div>

            {/* Center: Quick Links */}
            <nav
              aria-label="Links do rodapé"
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#A1A1AA]"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectNav(item);
                  }}
                  className="hover:text-[#C6FF00] transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right: Minimalist Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Facebook FitZone', icon: <Facebook className="w-4 h-4" /> },
                { label: 'Instagram FitZone', icon: <Instagram className="w-4 h-4" /> },
                { label: 'YouTube FitZone', icon: <Youtube className="w-4 h-4" /> },
                {
                  label: 'X FitZone',
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <button
                  key={social.label}
                  type="button"
                  onClick={() => openEnrollModal()}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#18181C] border border-[#26262C] hover:border-[#C6FF00] text-[#A1A1AA] hover:text-[#C6FF00] flex items-center justify-center transition-colors cursor-pointer"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Copyright + AgênciaScript Credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A1A1AA]">
            <p>© 2026 FitZone. Todos os direitos reservados.</p>
            <div className="flex flex-col sm:items-end gap-0.5">
              <p className="text-zinc-300 font-medium">
                Site criado por{' '}
                <span className="text-[#C6FF00] font-semibold">AgênciaScript</span>
              </p>
              <p className="text-[11px] text-[#A1A1AA]/80">
                Suporte técnico fornecido por especialistas em desenvolvimento web de alta performance.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals Hub */}
      <FitZoneModals
        activeModal={activeModal}
        selectedModalityId={selectedModalityId}
        selectedTrainer={selectedTrainer}
        preselectedPlanName={preselectedPlanName}
        onClose={() => setActiveModal(null)}
        onSwitchToEnroll={(planOrContext) => {
          setPreselectedPlanName(planOrContext || null);
          setActiveModal('enroll');
        }}
      />
    </div>
  );
}
