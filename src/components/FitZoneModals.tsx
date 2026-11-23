import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  MapPin,
  Phone,
  Sparkles,
  Swords,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BLOG_ARTICLES,
  MODALITIES,
  ModalityItem,
  PLANS,
  TrainerItem,
} from '../data/fitzoneData';
import { ModalType } from './Navbar';
import { ImageWithFallback } from './ImageWithFallback';

interface FitZoneModalsProps {
  activeModal: ModalType;
  selectedModalityId?: string | null;
  selectedTrainer?: TrainerItem | null;
  preselectedPlanName?: string | null;
  onClose: () => void;
  onSwitchToEnroll: (contextLabel?: string) => void;
}

export function FitZoneModals({
  activeModal,
  selectedModalityId,
  selectedTrainer,
  preselectedPlanName,
  onClose,
  onSwitchToEnroll,
}: FitZoneModalsProps) {
  // Form state for 'enroll'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Hipertrofia & Força');
  const [planChoice, setPlanChoice] = useState(preselectedPlanName || 'Performance');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Plans billing toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Classes filter tab
  const [classFilter, setClassFilter] = useState<string>(selectedModalityId || 'all');

  // Blog selected article
  const [selectedArticleId, setSelectedArticleId] = useState<string>(BLOG_ARTICLES[0].id);

  useEffect(() => {
    if (selectedModalityId) {
      setClassFilter(selectedModalityId);
    } else if (activeModal === 'classes') {
      setClassFilter('all');
    }
  }, [selectedModalityId, activeModal]);

  useEffect(() => {
    if (preselectedPlanName) {
      setPlanChoice(preselectedPlanName);
    }
  }, [preselectedPlanName]);

  useEffect(() => {
    if (!activeModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, onClose]);

  const resetAndClose = () => {
    setSubmitted(false);
    setFormErrors({});
    onClose();
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { name?: string; email?: string; phone?: string } = {};

    if (name.trim().length < 2) {
      errors.name = 'Informe seu nome completo.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Digite um e-mail válido.';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      errors.phone = 'Informe um WhatsApp ou telefone com DDD.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };

  const renderModalityIcon = (iconName: ModalityItem['iconName']) => {
    switch (iconName) {
      case 'dumbbell':
        return <Dumbbell className="w-4 h-4 text-[#C6FF00]" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#C6FF00]" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-[#C6FF00]" />;
      case 'swords':
        return <Swords className="w-4 h-4 text-[#C6FF00]" />;
    }
  };

  const filteredModalities =
    classFilter === 'all'
      ? MODALITIES
      : MODALITIES.filter((item) => item.id === classFilter);

  const activeArticle =
    BLOG_ARTICLES.find((a) => a.id === selectedArticleId) || BLOG_ARTICLES[0];

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={resetAndClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121215] border border-[#26262C] p-6 sm:p-8 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={resetAndClose}
              aria-label="Fechar janela"
              className="sticky float-right top-0 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#18181C] border border-[#26262C] text-[#A1A1AA] hover:text-white hover:border-[#C6FF00]/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 1. ENROLL / CONTACT MODAL */}
            {activeModal === 'enroll' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-1">
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-3">
                      — MATRÍCULA & CONTATO
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-balance">
                      Dê o Primeiro Passo na <span className="text-[#C6FF00]">FitZone</span>
                    </h2>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                      Garanta sua matrícula ou agende uma aula experimental gratuita com nossa equipe técnica.
                    </p>
                  </div>

                  <div className="space-y-4 rounded-2xl bg-[#18181C] border border-[#26262C] p-5 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Unidade Central</p>
                        <p className="text-[#A1A1AA] text-xs mt-0.5">
                          Av. Paulista, 1480 — Bela Vista, São Paulo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Horário de Funcionamento</p>
                        <p className="text-[#A1A1AA] text-xs mt-0.5">
                          Seg a Sex: 05h30 às 23h · Sáb e Dom: 08h às 18h
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-white">Atendimento Direto</p>
                        <p className="text-[#A1A1AA] text-xs mt-0.5">(11) 3042-8890 · contato@fitzone.com.br</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7">
                  {submitted ? (
                    <div className="h-full flex flex-col items-center justify-center text-center rounded-2xl bg-[#18181C] border border-[#C6FF00]/40 p-8">
                      <div className="w-14 h-14 rounded-full bg-[#C6FF00]/15 border border-[#C6FF00]/40 flex items-center justify-center text-[#C6FF00] mb-5">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Solicitação Confirmada</h3>
                      <p className="text-sm text-[#A1A1AA] max-w-md mb-6 leading-relaxed">
                        Obrigado, <span className="text-white font-semibold">{name}</span>. Nossa equipe de consultores recebeu seu interesse no plano{' '}
                        <span className="text-[#C6FF00] font-semibold">{planChoice}</span> e entrará em contato pelo WhatsApp em até 15 minutos úteis.
                      </p>
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-6 py-3 transition-colors cursor-pointer"
                      >
                        Voltar para a FitZone
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEnrollSubmit} noValidate className="space-y-4">
                      <div>
                        <label htmlFor="fz-name" className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                          Nome Completo
                        </label>
                        <input
                          id="fz-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex.: Mariana Albuquerque"
                          className="w-full rounded-xl bg-[#18181C] border border-[#26262C] focus:border-[#C6FF00] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                        />
                        {formErrors.name && (
                          <p className="text-xs text-rose-400 mt-1">{formErrors.name}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fz-email" className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                            E-mail
                          </label>
                          <input
                            id="fz-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="voce@email.com"
                            className="w-full rounded-xl bg-[#18181C] border border-[#26262C] focus:border-[#C6FF00] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                          />
                          {formErrors.email && (
                            <p className="text-xs text-rose-400 mt-1">{formErrors.email}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="fz-phone" className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                            WhatsApp / Telefone
                          </label>
                          <input
                            id="fz-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(11) 99999-0000"
                            className="w-full rounded-xl bg-[#18181C] border border-[#26262C] focus:border-[#C6FF00] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors"
                          />
                          {formErrors.phone && (
                            <p className="text-xs text-rose-400 mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fz-goal" className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                            Objetivo Principal
                          </label>
                          <select
                            id="fz-goal"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className="w-full rounded-xl bg-[#18181C] border border-[#26262C] focus:border-[#C6FF00] px-4 py-3 text-sm text-white outline-none transition-colors"
                          >
                            <option value="Hipertrofia & Força">Hipertrofia & Força</option>
                            <option value="Condicionamento & Cardio">Condicionamento & Cardio</option>
                            <option value="Boxe & Combate">Boxe & Combate</option>
                            <option value="Yoga & Mobilidade">Yoga & Mobilidade</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="fz-plan" className="block text-xs font-semibold text-[#A1A1AA] mb-1.5">
                            Plano de Interesse
                          </label>
                          <select
                            id="fz-plan"
                            value={planChoice}
                            onChange={(e) => setPlanChoice(e.target.value)}
                            className="w-full rounded-xl bg-[#18181C] border border-[#26262C] focus:border-[#C6FF00] px-4 py-3 text-sm text-white outline-none transition-colors"
                          >
                            <option value="Essencial">Plano Essencial</option>
                            <option value="Performance">Plano Performance</option>
                            <option value="FitZone Black">Plano FitZone Black</option>
                            <option value="Aula Experimental">Aula Experimental Gratuita</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-6 py-3.5 transition-all duration-200 lime-btn-glow cursor-pointer"
                      >
                        <span>Confirmar Pré-Matrícula</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}

            {/* 2. PLANS MODAL */}
            {activeModal === 'plans' && (
              <div className="pt-1">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pr-10">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2">
                      — PLANOS FLEXÍVEIS
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Escolha o Plano Ideal Para Você
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#18181C] border border-[#26262C] self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        billingCycle === 'monthly'
                          ? 'bg-[#C6FF00] text-[#0A0A0C]'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      Mensal
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        billingCycle === 'annual'
                          ? 'bg-[#C6FF00] text-[#0A0A0C]'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      Anual (20% off)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {PLANS.map((plan) => {
                    const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
                    return (
                      <div
                        key={plan.id}
                        className={`flex flex-col justify-between rounded-2xl p-6 border transition-all ${
                          plan.highlighted
                            ? 'bg-[#18181C] border-[#C6FF00]'
                            : 'bg-[#18181C]/70 border-[#26262C]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                            {plan.highlighted && (
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C6FF00]">
                                Mais Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#A1A1AA] mb-5 leading-relaxed">{plan.tagline}</p>

                          <div className="flex items-baseline gap-1.5 mb-6">
                            <span className="text-sm text-[#A1A1AA]">R$</span>
                            <span className="text-4xl font-extrabold font-mono tabular-nums text-white">
                              {price}
                            </span>
                            <span className="text-xs text-[#A1A1AA]">/mês</span>
                          </div>

                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feat) => (
                              <li key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSwitchToEnroll(plan.name)}
                          className={`w-full inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm px-5 py-3 transition-colors cursor-pointer ${
                            plan.highlighted
                              ? 'bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C]'
                              : 'bg-[#0A0A0C] hover:bg-[#C6FF00] text-white hover:text-[#0A0A0C] border border-[#26262C]'
                          }`}
                        >
                          <span>Selecionar {plan.name}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. CLASSES / MODALITIES MODAL */}
            {activeModal === 'classes' && (
              <div className="pt-1">
                <div className="pr-10 mb-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2">
                    — NOSSAS AULAS & HORÁRIOS
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Grade Completa de Modalidades
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setClassFilter('all')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      classFilter === 'all'
                        ? 'bg-[#C6FF00] text-[#0A0A0C]'
                        : 'bg-[#18181C] text-[#A1A1AA] hover:text-white border border-[#26262C]'
                    }`}
                  >
                    Todas as Aulas
                  </button>
                  {MODALITIES.map((mod) => (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setClassFilter(mod.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        classFilter === mod.id
                          ? 'bg-[#C6FF00] text-[#0A0A0C]'
                          : 'bg-[#18181C] text-[#A1A1AA] hover:text-white border border-[#26262C]'
                      }`}
                    >
                      {mod.title}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredModalities.map((mod) => (
                    <div
                      key={mod.id}
                      className="rounded-2xl bg-[#18181C] border border-[#26262C] overflow-hidden flex flex-col"
                    >
                      <div className="p-5 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-[#0A0A0C] border border-[#26262C] flex items-center justify-center">
                              {renderModalityIcon(mod.iconName)}
                            </span>
                            <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                          </div>
                          <span className="text-xs text-[#A1A1AA]">
                            {mod.duration} · {mod.intensity}
                          </span>
                        </div>

                        <p className="text-sm text-[#A1A1AA] leading-relaxed mb-4">
                          {mod.description}
                        </p>

                        <div className="space-y-1.5 border-t border-[#26262C] pt-3">
                          {mod.schedule.map((slot) => (
                            <div key={slot} className="flex items-center gap-2 text-xs text-zinc-300">
                              <Calendar className="w-3.5 h-3.5 text-[#C6FF00] shrink-0" />
                              <span>{slot}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="px-5 py-3.5 bg-[#0A0A0C]/60 border-t border-[#26262C] flex justify-end">
                        <button
                          type="button"
                          onClick={() => onSwitchToEnroll('Aula Experimental')}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C6FF00] hover:underline cursor-pointer"
                        >
                          <span>Agendar Aula Experimental</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. BLOG MODAL */}
            {activeModal === 'blog' && (
              <div className="pt-1">
                <div className="pr-10 mb-6">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2">
                    — BLOG FITZONE
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Ciência do Treino & Performance
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-3">
                    {BLOG_ARTICLES.map((article) => {
                      const active = article.id === activeArticle.id;
                      return (
                        <button
                          key={article.id}
                          type="button"
                          onClick={() => setSelectedArticleId(article.id)}
                          className={`w-full text-left rounded-2xl p-4 border transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#18181C] border-[#C6FF00]'
                              : 'bg-[#18181C]/50 border-[#26262C] hover:border-zinc-600'
                          }`}
                        >
                          <div className="text-[11px] font-medium text-[#A1A1AA] mb-1">
                            <span className="text-[#C6FF00]">{article.category}</span> · {article.readTime}
                          </div>
                          <h3 className="text-sm font-bold text-white leading-snug">
                            {article.title}
                          </h3>
                        </button>
                      );
                    })}
                  </div>

                  <div className="md:col-span-7 rounded-2xl bg-[#18181C] border border-[#26262C] p-6">
                    <div className="text-xs text-[#A1A1AA] mb-2">
                      <span className="text-[#C6FF00] font-semibold">{activeArticle.category}</span> ·{' '}
                      {activeArticle.date} · {activeArticle.readTime}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4 leading-tight">
                      {activeArticle.title}
                    </h3>
                    <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                      {activeArticle.content.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. ABOUT MODAL */}
            {activeModal === 'about' && (
              <div className="pt-1">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2">
                  — INFRAESTRUTURA & METODOLOGIA
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 pr-10">
                  Por Dentro da Estrutura FitZone
                </h2>
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6 max-w-2xl">
                  Projetada para eliminar filas e elevar a precisão de cada sessão, a FitZone reúne 1.800 m² divididos em zonas especializadas de força olímpica, condicionamento metabólico, ringue de combate e estúdio de recuperação.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="rounded-2xl bg-[#18181C] border border-[#26262C] p-5">
                    <p className="text-xs font-semibold text-[#C6FF00] mb-1">01. Biomecânica</p>
                    <h3 className="text-base font-bold text-white mb-2">Equipamentos Calibrados</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      Plataformas olímpicas, anilhas calibradas e máquinas com curvas de resistência ajustadas.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#18181C] border border-[#26262C] p-5">
                    <p className="text-xs font-semibold text-[#C6FF00] mb-1">02. Periodização</p>
                    <h3 className="text-base font-bold text-white mb-2">Evolução Mensurável</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      Avaliação periódica com acompanhamento real de cargas, composição corporal e resistência.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[#18181C] border border-[#26262C] p-5">
                    <p className="text-xs font-semibold text-[#C6FF00] mb-1">03. Comunidade</p>
                    <h3 className="text-base font-bold text-white mb-2">Ambiente Motivador</h3>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      Turmas reduzidas e treinadores presentes no salão para corrigir postura e ritmo.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSwitchToEnroll('Aula Experimental')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-6 py-3 transition-colors cursor-pointer"
                  >
                    <span>Agendar Visita Guiada</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 6. TRAINER DETAIL MODAL */}
            {activeModal === 'trainer' && selectedTrainer && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-1 items-center">
                <div className="sm:col-span-5">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#18181C] border border-[#26262C]">
                    <ImageWithFallback
                      src={selectedTrainer.image}
                      alt={selectedTrainer.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#C6FF00] uppercase mb-2">
                    — TREINADOR ESPECIALISTA
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                    {selectedTrainer.name}
                  </h2>
                  <p className="text-sm font-semibold text-[#C6FF00] mb-4">
                    {selectedTrainer.role} · {selectedTrainer.experience}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {selectedTrainer.specialty}
                  </p>
                  <p className="text-xs text-[#A1A1AA] mb-6">
                    Certificações: <span className="text-white">{selectedTrainer.certifications}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onSwitchToEnroll('FitZone Black')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C6FF00] hover:bg-[#D2FF1E] text-[#0A0A0C] font-bold text-sm px-6 py-3 transition-colors cursor-pointer"
                  >
                    <span>Treinar com {selectedTrainer.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
