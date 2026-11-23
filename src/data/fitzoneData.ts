export interface NavItem {
  id: string;
  label: string;
  href: string;
  action?: 'scroll' | 'plans' | 'blog' | 'contact';
}

export interface ModalityItem {
  id: string;
  title: string;
  subtitle: string;
  intensity: string;
  duration: string;
  schedule: string[];
  description: string;
  image: string;
  iconName: 'dumbbell' | 'sparkles' | 'flame' | 'swords';
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  certifications: string;
  image: string;
}

export interface PlanItem {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  highlighted?: boolean;
  features: string[];
}

export interface BlogArticle {
  id: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  content: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  result: string;
  image: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', label: 'Início', href: '#inicio', action: 'scroll' },
  { id: 'sobre', label: 'Sobre', href: '#sobre', action: 'scroll' },
  { id: 'aulas', label: 'Aulas', href: '#aulas', action: 'scroll' },
  { id: 'treinadores', label: 'Treinadores', href: '#treinadores', action: 'scroll' },
  { id: 'planos', label: 'Planos', href: '#planos', action: 'plans' },
  { id: 'blog', label: 'Blog', href: '#blog', action: 'blog' },
  { id: 'contato', label: 'Contato', href: '#contato', action: 'contact' },
];

export const HERO_IMAGE = '/src/assets/images/hero_athlete_dumbbells_1795455290664.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_battle_rope_1795455289136.jpg';

export const MODALITIES: ModalityItem[] = [
  {
    id: 'musculacao',
    title: 'Musculação & Força',
    subtitle: 'Hipertrofia, potência e biomecânica aplicada',
    intensity: 'Alta Intensidade',
    duration: '60 min',
    schedule: ['Seg · Qua · Sex — 07:00, 12:30, 19:00', 'Ter · Qui — 08:30, 18:00, 20:00'],
    description:
      'Área completa com maquinário biomecânico de última geração, racks olímpicos e acompanhamento técnico para ganho sólido de massa magra e força máxima.',
    image: '/src/assets/images/class_musculacao_1795455293771.jpg',
    iconName: 'dumbbell',
  },
  {
    id: 'yoga',
    title: 'Yoga & Bem-Estar',
    subtitle: 'Mobilidade articular, controle respiratório e foco',
    intensity: 'Moderada',
    duration: '50 min',
    schedule: ['Seg · Qua — 08:00, 18:30', 'Sáb — 09:30'],
    description:
      'Sessões desenhadas para recuperar a musculatura, ampliar a flexibilidade e equilibrar o sistema nervoso após treinos intensos de força ou corrida.',
    image: '/src/assets/images/class_yoga_1795455290009.jpg',
    iconName: 'sparkles',
  },
  {
    id: 'cardio',
    title: 'Treino Cardio',
    subtitle: 'Condicionamento metabólico e resistência aeróbica',
    intensity: 'Alta Intensidade',
    duration: '45 min',
    schedule: ['Diariamente — 06:30, 12:00, 17:30, 19:30'],
    description:
      'Circuitos intervalados em esteiras curvas sem motor, bikes de resistência a ar e remos ergométricos para acelerar o gasto calórico e elevar o VO2 máximo.',
    image: '/src/assets/images/class_cardio_1795455291021.jpg',
    iconName: 'flame',
  },
  {
    id: 'boxe',
    title: 'Boxe & Combate',
    subtitle: 'Agilidade, explosão muscular e técnica de golpeio',
    intensity: 'Muito Alta',
    duration: '55 min',
    schedule: ['Ter · Qui — 07:30, 18:30, 20:00', 'Sáb — 11:00'],
    description:
      'Treinamento dinâmico em sacos de couro profissionais com combinações de boxe técnico, trabalho de pés e condicionamento do core.',
    image: '/src/assets/images/class_boxe_1795455291215.jpg',
    iconName: 'swords',
  },
];

export const TRAINERS: TrainerItem[] = [
  {
    id: 'alex',
    name: 'Alex Carter',
    role: 'Coach de Força',
    experience: '9 anos de experiência',
    specialty: 'Periodização de força, levantamento olímpico e recomposição corporal.',
    certifications: 'CREF · CSCS Performance Specialist',
    image: '/src/assets/images/trainer_alex_1795455289994.jpg',
  },
  {
    id: 'mia',
    name: 'Mia Johnson',
    role: 'Instrutora de Yoga',
    experience: '7 anos de experiência',
    specialty: 'Vinyasa flow atlético, mobilidade funcional e recuperação ativa.',
    certifications: 'RYT-500 · Mobility Conditioning',
    image: '/src/assets/images/trainer_mia_1795455291939.jpg',
  },
  {
    id: 'david',
    name: 'David Kim',
    role: 'Especialista em Cardio',
    experience: '8 anos de experiência',
    specialty: 'HIIT metabólico, preparação para corridas e limiar anaeróbico.',
    certifications: 'CREF · Endurance Lab Coach',
    image: '/src/assets/images/trainer_david_1795455291141.jpg',
  },
  {
    id: 'sophia',
    name: 'Sophia Davis',
    role: 'Coach Fitness',
    experience: '6 anos de experiência',
    specialty: 'Treinamento funcional integrado, condicionamento e boxe fitness.',
    certifications: 'CREF · Functional Training Pro',
    image: '/src/assets/images/trainer_sophia_1795455291355.jpg',
  },
];

export const PLANS: PlanItem[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    tagline: 'Ideal para criar constância na musculação e cardio.',
    monthlyPrice: 149,
    annualPrice: 119,
    features: [
      'Acesso livre à área de Musculação & Força',
      'Equipamentos de cardio de última geração',
      'Avaliação física inicial trimestral',
      'App FitZone com ficha de treino digital',
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    tagline: 'Nosso plano mais escolhido para evolução completa.',
    monthlyPrice: 219,
    annualPrice: 179,
    highlighted: true,
    features: [
      'Acesso ilimitado a todas as modalidades (Yoga, Cardio, Boxe)',
      'Reavaliação física por bioimpedância a cada 45 dias',
      'Periodização personalizada com Coach FitZone',
      '2 convites mensais para treinar com amigos',
    ],
  },
  {
    id: 'black',
    name: 'FitZone Black',
    tagline: 'Acompanhamento individualizado de nível atlético.',
    monthlyPrice: 329,
    annualPrice: 269,
    features: [
      'Tudo do plano Performance incluso',
      '4 sessões mensais de Personal Trainer 1-on-1',
      'Armário privativo, toalha e zona de recuperação',
      'Planejamento nutricional esportivo integrado',
    ],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'hipertrofia-progressiva',
    category: 'Força & Hipertrofia',
    readTime: '4 min de leitura',
    date: 'Novembro 2026',
    title: 'Sobrecarga Progressiva: Como Sair do Platô em 6 Semanas',
    excerpt:
      'Entenda como ajustar volume, tempo sob tensão e intervalos de descanso para continuar ganhando força sem sobrecarregar as articulações.',
    content: [
      'Muitos praticantes confundem intensidade com exaustão aleatória. O progresso sustentável na musculação nasce do registro preciso de cargas, repetições e execução técnica limpa.',
      'Na FitZone, estruturamos ciclos de 6 semanas combinando exercícios multiarticulares principais com trabalho acessório focado em estabilidade escapular e core.',
      'Ao aumentar apenas 2,5% a 5% da carga ou adicionar uma repetição controlada por semana, você gera o estímulo mecânico ideal para adaptação muscular contínua.',
    ],
  },
  {
    id: 'cardio-zona-2',
    category: 'Condicionamento',
    readTime: '5 min de leitura',
    date: 'Novembro 2026',
    title: 'Zona 2 vs. HIIT: A Combinação Exata para Resistência e Definição',
    excerpt:
      'Descubra por que alternar sessões aeróbicas constantes com tiros metabólicos acelera sua recuperação entre séries pesadas.',
    content: [
      'O treino intervalado de alta intensidade (HIIT) eleva o gasto energético pós-exercício e melhora a potência anaeróbica em sessões curtas de 25 a 35 minutos.',
      'Contudo, construir base mitocondrial em Zona 2 cardíaca — onde você consegue manter ritmo firme sem fadiga excessiva — sustenta o desempenho em treinos longos de força e combate.',
      'O equilíbrio semanal ideal une 2 sessões de cardio contínuo moderado a 1 ou 2 blocos intervalados orientados por frequência cardíaca.',
    ],
  },
  {
    id: 'mobilidade-recuperacao',
    category: 'Bem-Estar & Yoga',
    readTime: '3 min de leitura',
    date: 'Outubro 2026',
    title: 'Por Que Mobilidade de Quadril e Tornozelo Define Seu Agachamento',
    excerpt:
      'Pequenos bloqueios articulares limitam a profundidade e a segurança dos levantamentos. Veja 3 ajustes práticos antes da primeira série.',
    content: [
      'Antes de adicionar anilhas à barra, garantir dorsiflexão de tornozelo e rotação interna de quadril libera amplitude real sem compensações na lombar.',
      'Integrar 10 minutos de fluxo ativo de Yoga & Bem-Estar antes do treino principal prepara o sistema neuromuscular e eleva a qualidade de cada repetição.',
    ],
  },
];

export const FEATURED_TESTIMONIAL: TestimonialItem = {
  id: 'sarah',
  name: 'Sarah Mitchell',
  role: 'Aluna',
  quote:
    'Comecei na FitZone buscando mais disposição para a rotina e hoje vivo a melhor fase física da minha vida. Os treinadores ajustam cada detalhe da execução, os equipamentos são impecáveis e a energia das aulas coletivas transforma o treino no melhor momento do meu dia.',
  result: '+38% de força e -11% de gordura corporal em 5 meses',
  image: '/src/assets/images/testimonial_sarah_1795455290464.jpg',
};
