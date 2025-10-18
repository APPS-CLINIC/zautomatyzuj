export const dictionary = {
  meta: {
    title: 'ZautomatyzujAI — Automatyzuj z pewnością',
    description:
      'Projektuj odporne automatyzacje AI z modułowymi procesami, przejrzystą kontrolą jakości i nadzorem człowieka.',
  },
  nav: {
    problemSolution: 'Problem',
    bizbeesProduct: 'Bizbees',
    services: 'Usługi',
    caseStudies: 'Przypadki',
    whyUs: 'Dlaczego my',
    quickContact: '⌘K – Szybki kontakt',
  },
  commandPalette: {
    title: 'Szybki kontakt',
    close: 'Zamknij',
    back: 'Wróć',
    shortcut: 'Naciśnij ⌘K aby otworzyć ponownie',
    actions: {
      audit: {
        title: 'Umów audyt',
        description: 'Zarezerwuj bezpłatny audyt procesów biznesowych',
      },
      quote: {
        title: 'Poproś o wycenę',
        description: 'Otrzymaj szczegółową wycenę projektu automatyzacji',
      },
      demo: {
        title: 'Zarezerwuj demo',
        description: 'Zobacz nasze rozwiązania w akcji',
      },
      contact: {
        title: 'Napisz do nas',
        description: 'Skontaktuj się z naszym zespołem',
      },
    },
    form: {
      email: 'Adres email',
      subject: 'Temat',
      message: 'Wiadomość',
      projectDescription: 'Opis projektu',
      budget: 'Budżet',
      timeline: 'Harmonogram',
      preferredDate: 'Preferowany termin',
      demoType: 'Typ demo',
      teamSize: 'Wielkość zespołu',
      selectOption: 'Wybierz opcję',
      cancel: 'Anuluj',
      submit: 'Wyślij',
      submitting: 'Wysyłanie...',
    },
    preFilledPrompts: {
      audit: 'Chciałbym umówić bezpłatny audyt procesów biznesowych w mojej firmie. Proszę o kontakt w celu ustalenia terminu.',
      quote: 'Interesuje mnie wycena projektu automatyzacji dla mojej firmy. Proszę o szczegółową ofertę.',
      demo: 'Chciałbym zobaczyć demo rozwiązania BizBees w akcji. Proszę o kontakt w celu umówienia prezentacji.',
      contact: 'Mam pytania dotyczące automatyzacji procesów biznesowych. Proszę o kontakt.',
    },
  },
  services: {
    title: 'Nasze usługi',
    subtitle: 'Kompleksowe rozwiązania automatyzacji AI',
    items: [
      {
        title: 'Automatyzacja procesów biznesowych',
        description: 'Projektujemy i wdrażamy automatyzacje, które rzeczywiście działają w Twojej organizacji.',
        icon: '⚙️',
      },
      {
        title: 'Projektowanie agentów AI',
        description: 'Tworzymy inteligentne agenty, które podejmują decyzje i wykonują zadania autonomnie.',
        icon: '🤖',
      },
      {
        title: 'Orkiestracja workflow',
        description: 'Łączymy systemy i procesy w spójne, skalowalne rozwiązania.',
        icon: '🔄',
      },
      {
        title: 'Setup zespołów',
        description: 'Szkolimy i wspieramy zespoły w efektywnym wykorzystaniu automatyzacji.',
        icon: '👥',
      },
      {
        title: 'Audyty i szkolenia',
        description: 'Oceniamy istniejące procesy i dostarczamy praktyczne szkolenia.',
        icon: '📊',
      },
    ],
  },
  process: {
    title: 'Nasz proces',
    subtitle: '5 kroków do udanej automatyzacji',
    steps: [
      {
        title: 'Discovery',
        description: 'Odkrywamy i mapujemy istniejące procesy biznesowe.',
        icon: '🔍',
      },
      {
        title: 'Audit',
        description: 'Analizujemy możliwości automatyzacji i oceniamy ryzyko.',
        icon: '📋',
      },
      {
        title: 'PoC',
        description: 'Tworzymy proof of concept, aby przetestować rozwiązanie.',
        icon: '🧪',
      },
      {
        title: 'Rollout',
        description: 'Wdrażamy rozwiązanie w pełnej skali z pełnym wsparciem.',
        icon: '🚀',
      },
      {
        title: 'Enablement',
        description: 'Szkolimy zespół i zapewniamy ciągłe wsparcie.',
        icon: '🎓',
      },
    ],
  },
  cases: {
    title: 'Przypadki sukcesu',
    subtitle: 'Realne rezultaty dla naszych klientów',
    items: [
      {
        title: 'E-commerce Automation',
        description: 'Automatyzacja procesów zamówień i obsługi klienta',
        metrics: {
          efficiency: '+85%',
          timeSaved: '40h/tydzień',
          costReduction: '-60%',
        },
      },
      {
        title: 'HR Process Automation',
        description: 'Automatyzacja rekrutacji i onboardingu pracowników',
        metrics: {
          efficiency: '+70%',
          timeSaved: '25h/tydzień',
          costReduction: '-45%',
        },
      },
      {
        title: 'Financial Reporting',
        description: 'Automatyzacja raportowania finansowego i analizy',
        metrics: {
          efficiency: '+90%',
          timeSaved: '60h/tydzień',
          costReduction: '-75%',
        },
      },
    ],
  },
  stack: {
    title: 'Technologie i wzorce',
    subtitle: 'Nowoczesne narzędzia i sprawdzone metodyki',
    technologies: {
      title: 'Technologie',
      items: [
        { name: 'AI & ML', description: 'OpenAI, Anthropic, LangChain' },
        { name: 'Automation', description: 'Zapier, Make, n8n' },
        { name: 'Cloud', description: 'AWS, Azure, GCP' },
        { name: 'Integration', description: 'APIs, Webhooks, RPA' },
      ],
    },
    patterns: {
      title: 'Wzorce projektowe',
      items: [
        { name: 'Strategy Pattern', description: 'Elastyczne algorytmy decyzyjne' },
        { name: 'Command Pattern', description: 'Enkapsulacja operacji biznesowych' },
        { name: 'Observer Pattern', description: 'Reaktywne systemy powiadomień' },
      ],
    },
    principles: {
      title: 'Zasady architektury',
      items: [
        { name: 'SOLID', description: 'Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion' },
        { name: 'DRY', description: 'Don\'t Repeat Yourself - eliminacja duplikacji kodu' },
        { name: 'KISS', description: 'Keep It Simple, Stupid - prostota i czytelność' },
      ],
    },
  },
  training: {
    title: 'Szkolenia i certyfikacje',
    subtitle: 'Rozwijaj umiejętności swojej organizacji',
    programs: [
      {
        title: 'Podstawy automatyzacji AI',
        description: 'Wprowadzenie do automatyzacji procesów biznesowych',
        duration: '2 dni',
        level: 'Początkujący',
      },
      {
        title: 'Zaawansowane wzorce AI',
        description: 'Zaawansowane techniki projektowania agentów AI',
        duration: '3 dni',
        level: 'Zaawansowany',
      },
      {
        title: 'Architektura systemów',
        description: 'Projektowanie skalowalnych systemów automatyzacji',
        duration: '4 dni',
        level: 'Ekspert',
      },
    ],
  },
  faq: {
    title: 'Najczęściej zadawane pytania',
    subtitle: 'Odpowiedzi na najważniejsze pytania',
    items: [
      {
        question: 'Jak długo trwa wdrożenie automatyzacji?',
        answer: 'Typowe wdrożenie trwa 4-8 tygodni, w zależności od złożoności procesu. Zaczynamy od proof of concept, a następnie stopniowo rozszerzamy rozwiązanie.',
      },
      {
        question: 'Czy automatyzacja zastąpi pracowników?',
        answer: 'Nie, automatyzacja ma na celu wspieranie pracowników, a nie ich zastępowanie. Pozwala im skupić się na bardziej strategicznych zadaniach.',
      },
      {
        question: 'Jakie procesy można zautomatyzować?',
        answer: 'Możemy zautomatyzować większość powtarzalnych procesów biznesowych, od obsługi klienta po raportowanie finansowe. Kluczowe jest zidentyfikowanie odpowiednich procesów.',
      },
      {
        question: 'Czy potrzebuję specjalistycznej wiedzy technicznej?',
        answer: 'Nie, nasze rozwiązania są zaprojektowane tak, aby były łatwe w użyciu. Zapewniamy pełne szkolenie i wsparcie techniczne.',
      },
    ],
  },
  contact: {
    title: 'Skontaktuj się z nami',
    subtitle: 'Gotowi na automatyzację? Porozmawiajmy!',
    form: {
      name: 'Imię i nazwisko',
      email: 'Adres email',
      company: 'Firma',
      message: 'Wiadomość',
      submit: 'Wyślij wiadomość',
      submitting: 'Wysyłanie...',
    },
    info: {
      email: 'contact@zautomatyzujai.com',
      phone: '+48 123 456 789',
      address: 'Warszawa, Polska',
    },
  },
  footer: {
    quickLinks: 'Szybkie linki',
    contact: 'Kontakt',
    company: 'Firma',
    note: '© {{year}} ZautomatyzujAI. Wszelkie prawa zastrzeżone.',
    privacy: 'Polityka prywatności',
    terms: 'Warunki użytkowania',
  },
  problemSolution: {
    title: '<span class="text-gradient">Znasz</span> to uczucie?',
    subtitle: 'Codzienne wyzwania przedsiębiorców, które zabierają czas i energię',
    problems: [
      {
        title: 'Topicie się w e-mailach',
        description: 'Codziennie dziesiątki e-maili czekających na odpowiedź. Zamiast rozwijać biznes, spędzasz godziny na prostej korespondencji.',
      },
      {
        title: 'Chaos w procesach',
        description: 'Każdy pracownik robi to samo na swój sposób. Brak standardów prowadzi do błędów, opóźnień i frustracji.',
      },
      {
        title: 'Ręczna praca zabija wzrost',
        description: 'Powtarzalne zadania pochłaniają 60% czasu zespołu. Brakuje rąk do pracy nad strategią i rozwojem.',
      },
      {
        title: 'Nie wiesz, co się dzieje',
        description: 'Brak przejrzystości w procesach. Nie masz pojęcia, gdzie są wąskie gardła i co naprawdę wymaga poprawy.',
      },
    ],
    solutionTitle: 'Nasze rozwiązanie',
    solutionSubtitle: 'Inteligentne automatyzacje, które działają dla Ciebie 24/7',
    solutions: [
      {
        title: 'Inteligentna komunikacja',
        description: 'AI, które rozumie kontekst, segreguje wiadomości, przygotowuje odpowiedzi i zarządza priorytetami. Ty tylko zatwierdzasz.',
        features: ['Automatyczna kategoryzacja', 'Inteligentne odpowiedzi', 'Zarządzanie priorytetami'],
      },
      {
        title: 'Audyt i optymalizacja',
        description: 'Mapujemy Twoje procesy, identyfikujemy wąskie gardła i projektujemy automatyzacje dopasowane do Twojej firmy.',
        features: ['Analiza procesów', 'Identyfikacja wąskich gardeł', 'Strategia automatyzacji'],
      },
      {
        title: 'Agenci AI na miarę',
        description: 'Tworzymy dedykowane agenty AI, które wykonują zadania autonomicznie - od obsługi klienta po zarządzanie dokumentami.',
        features: ['Dedykowane rozwiązania', 'Autonomiczne działanie', 'Ciągła optymalizacja'],
      },
    ],
  },
  bizbeesProduct: {
    badge: 'Twój cyfrowy rój AI',
    title: 'BizBees',
    subtitle: 'Inteligentny system AI, który przejmuje kontrolę nad Twoimi zadaniami, dokumentami, spotkaniami i planami',
    description: 'Analizuje Twoje maile, kalendarz, notatki, wydatki i zwyczaje, a następnie sam planuje, przypomina, organizuje i reaguje. BizBees to AI-asystent, który potrafi przygotować fakturę, zapisać Cię na spotkanie, przypomnieć o terminie umowy, zaplanować zakup prezentu dla żony, zamówić kwiaty i taksówkę z odpowiednim wyprzedzeniem.',
    philosophy: {
      title: 'Filozofia BizBees',
      subtitle: '„Każda pszczoła wie, co robić. BizBees to rój Twoich cyfrowych pszczół, które pracują za Ciebie."',
      principles: [
        '🟡 BizBees nie tylko reaguje — przewiduje',
        '🟡 Nie tylko organizuje — dba o Ciebie',
        '🟡 Nie tylko automatyzuje — rozumie kontekst'
      ]
    },
    features: [
      {
        title: 'AI Inbox & Mail Assistant',
        description: 'Analizuje Twoje maile, automatycznie klasyfikuje, zapisuje załączniki, tworzy przypomnienia i zadania. Faktura → folder „Faktury"; zaproszenie → wpis do kalendarza.',
        icon: 'mail',
      },
      {
        title: 'Smart Scheduler & Calendar Sync',
        description: 'Integruje kalendarze (Google, Outlook, Apple), rozpoznaje priorytety i automatycznie planuje czas. Wstawia spotkanie w wolnym oknie, przypomina o terminach.',
        icon: 'calendar',
      },
      {
        title: 'Document & Contract Guardian',
        description: 'Organizuje dokumenty, przypomina o terminach wygasania, podpisach i archiwizacji. Umowa kończy się za 7 dni → powiadomienie + propozycja przedłużenia.',
        icon: 'document',
      },
      {
        title: 'Personal Concierge AI',
        description: 'Obsługuje prywatne sprawy, np. zamawia kwiaty, taksówki, bilety czy prezenty. „Zbliża się rocznica ślubu – zamówić kwiaty jak w zeszłym roku?" 💐',
        icon: 'concierge',
      },
      {
        title: 'Meeting Intelligence',
        description: 'Analizuje spotkania (nagrania / transkrypcje), tworzy notatki i przypisuje zadania. Po spotkaniu: „Zadanie: wysłać ofertę do Marka do piątku."',
        icon: 'meeting',
      },
      {
        title: 'Financial Flow & Invoices AI',
        description: 'Przetwarza faktury z maili, księguje je, przypomina o płatnościach. Wykrywa fakturę → zapisuje do folderu firmy → dodaje przypomnienie „płatność do 12.10".',
        icon: 'finance',
      },
    ],
    cta: {
      primary: 'Zacznij żyć. Resztą zajmie się BizBees',
      secondary: 'Zobacz jak działa',
    },
    mockupAlt: 'Interfejs BizBees - Twój cyfrowy rój AI',
    emailPlaceholder: 'Wprowadź swój email',
    emailDisclaimer: 'Otrzymaj dostęp do najnowszych funkcjonalności za darmo na czas testów',
    subscribeButton: 'Zapisz się',
    clickToWatchDemo: 'Kliknij aby obejrzeć demo',
    videoNotSupported: 'Twoja przeglądarka nie obsługuje elementu video.',
    videoDescription: 'Zobacz jak BizBees automatyzuje Twoje codzienne zadania',
    videoTitle: 'Zobacz BizBees w akcji',
    videoSubtitle: 'Poznaj możliwości naszego inteligentnego systemu AI',
  },
  hero: {
    badge: 'Update 2.0 - AI Integration',
    title: 'Zautomatyzuj swoje procesy biznesowe z AI',
    subtitle: 'Projektujemy odporne automatyzacje AI z modułowymi procesami, przejrzystą kontrolą jakości i nadzorem człowieka',
    primaryCta: 'Rozpocznij projekt',
    secondaryCta: 'Zobacz demo',
    features: {
      title: 'Twój cyfrowy rój w akcji',
      items: [
        {
          title: 'Poczta AI',
          description: 'Inteligentne zarządzanie korespondencją biznesową',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
        },
        {
          title: 'AI Asystent',
          description: 'Wirtualny współpracownik dostępny 24/7',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>`
        },
        {
          title: 'Automatyzacja spotkań',
          description: 'Smart scheduling i optymalizacja kalendarza',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
        },
        {
          title: 'Obieg dokumentów',
          description: 'Inteligentna segregacja i archiwizacja plików',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>`
        },
        {
          title: 'Faktury AI',
          description: 'Automatyczne generowanie i śledzenie płatności',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>`
        },
        {
          title: 'Podsumowania spotkań',
          description: 'AI-generated insights z każdego spotkania',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>`
        },
        {
          title: 'Zarządzanie czasem',
          description: 'Inteligentne planowanie pracy i priorytetów',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg>`
        },
        {
          title: 'Work-Life Balance',
          description: 'Harmonijne łączenie życia zawodowego i prywatnego',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9,22 9,12 15,12 15,22"></polyline></svg>`
        }
      ]
    }
  },
  servicesSection: {
    title: 'Jak możemy Ci <span class="text-gradient">pomóc</span>',
    subtitle: 'Od audytu po wdrożenie - kompleksowe wsparcie w automatyzacji Twojego biznesu',
    services: [
      {
        title: 'Audyty AI',
        description: 'Analizujemy Twoje procesy biznesowe, identyfikujemy obszary do automatyzacji i przygotowujemy strategię wdrożenia. Otrzymasz konkretny plan działania z ROI.',
        icon: 'audit',
        features: ['Mapowanie procesów', 'Analiza wąskich gardeł', 'Plan automatyzacji', 'Szacowanie ROI'],
      },
      {
        title: 'Szkolenia i warsztaty',
        description: 'Praktyczne szkolenia dla Twojego zespołu - od podstaw AI po zaawansowane techniki automatyzacji. Uczymy przez działanie, nie teorię.',
        icon: 'training',
        features: ['Podstawy AI i automatyzacji', 'Projektowanie agentów', 'Best practices', 'Certyfikaty'],
      },
      {
        title: 'Agenci AI na miarę',
        description: 'Projektujemy i wdrażamy dedykowane agenty AI dopasowane do specyfiki Twojej firmy. Od obsługi klienta po zaawansowane workflow.',
        icon: 'agents',
        features: ['Dedykowane rozwiązania', 'Pełna integracja', 'Ciągłe wsparcie', 'Optymalizacja'],
      },
    ],
    additionalServices: {
      title: 'Dodatkowe usługi',
      items: [
        'Integracje API',
        'Optymalizacja procesów',
        'Konsulting techniczny',
        'Audyty bezpieczeństwa',
        'Migration support',
        'Wsparcie techniczne 24/7',
      ],
    },
    cta: {
      text: 'Umów bezpłatną konsultację',
      description: 'Porozmawiajmy o Twoich wyzwaniach',
    },
  },
  caseStudies: {
    title: '<span class="text-gradient">Realne</span> rezultaty',
    subtitle: 'Liczby mówią same za siebie',
    metrics: [
      {
        value: '50+',
        label: 'Procesów zautomatyzowanych',
        description: 'Od prostych workflow po złożone systemy',
      },
      {
        value: '4h',
        label: 'Oszczędności dziennie',
        description: 'Średnio na zespół 10-osobowy',
      },
      {
        value: '25+',
        label: 'Audytów przeprowadzonych',
        description: 'Dla firm od startupów po korporacje',
      },
    ],
    testimonials: [
      {
        quote: 'Dzięki automatyzacjom od ZautomatyzujAI zyskaliśmy 15 godzin tygodniowo. To czas, który teraz przeznaczamy na rozwój produktu i rozmowy z klientami.',
        author: 'Michał Kowalski',
        position: 'CEO',
        company: 'TechStart Poland',
        initials: 'MK',
      },
      {
        quote: 'Audyt procesów otworzył nam oczy na to, ile czasu tracimy na powtarzalne zadania. Wdrożenie agentów AI było płynne, a ROI osiągnęliśmy w 3 miesiące.',
        author: 'Anna Nowak',
        position: 'COO',
        company: 'Marketing Pro',
        initials: 'AN',
      },
      {
        quote: 'Współpraca z ZautomatyzujAI to inwestycja, nie koszt. Mamy pełną transparentność procesów i wreszcie rozumiemy, gdzie tracimy czas i pieniądze.',
        author: 'Piotr Wiśniewski',
        position: 'Founder',
        company: 'E-commerce Solutions',
        initials: 'PW',
      },
      {
        quote: 'Szkolenia były praktyczne i od razu zastosowaliśmy wiedzę w praktyce. Teraz nasz zespół samodzielnie projektuje proste automatyzacje.',
        author: 'Katarzyna Zielińska',
        position: 'Head of Operations',
        company: 'Digital Agency',
        initials: 'KZ',
      },
    ],
  },
  whyUs: {
    title: 'Dlaczego <span class="text-gradient">My</span>',
    subtitle: 'Co nas wyróżnia na tle konkurencji',
    description: 'Nie jesteśmy kolejną agencją, która sprzedaje rozwiązania "off-the-shelf". Budujemy partnerstwa długoterminowe, oparte na zaufaniu i realnych rezultatach.',
    features: [
      {
        title: 'Własna technologia',
        description: 'Bizbees.ai to nasza autorska platforma, która ewoluuje razem z potrzebami klientów. Nie jesteśmy ograniczeni przez gotowe rozwiązania.',
        icon: 'technology',
      },
      {
        title: 'Holistyczne podejście',
        description: 'Od audytu, przez wdrożenie, po szkolenia i wsparcie. Jesteśmy z Tobą na każdym etapie transformacji AI.',
        icon: 'holistic',
      },
      {
        title: 'Skalowalność',
        description: 'Modułowa architektura pozwala zacząć od małego i rosnąć bez granic. Bez locka-in, bez rewolucji - tylko ewolucja.',
        icon: 'scalability',
      },
      {
        title: 'Partnerstwo',
        description: 'Nie znikamy po wdrożeniu. Jesteśmy Twoim długoterminowym partnerem technologicznym, który rozwija rozwiązania wraz z Tobą.',
        icon: 'partnership',
      },
    ],
    cta: {
      text: 'Porozmawiajmy o współpracy',
      description: 'Bezpłatna 30-minutowa konsultacja',
    },
  },
  chat: {
    title: 'Szybki kontakt',
    subtitle: 'Zadaj pytanie w czacie poniżej lub wyślij krótką wiadomość — odpowiemy bardzo szybko.',
    welcomeMessage: 'Witaj ponownie! W czym mogę pomóc?',
    quickActions: {
      quote: 'Chcę wycenę projektu',
      audit: 'Audyt procesów / AI',
      integration: 'Integracja z moim systemem',
      training: 'Szkolenia dla zespołu',
    },
    contactDetails: {
      title: 'Dodaj szczegóły kontaktu',
      name: 'Imię i nazwisko',
      email: 'Adres email',
      company: 'Nazwa firmy',
    },
    input: {
      placeholder: 'Napisz wiadomość...',
      clear: 'Wyczyść',
    },
    errors: {
      networkError: 'Przepraszam, wystąpił błąd podczas wysyłania wiadomości.',
      timeoutError: 'Przepraszam, odpowiedź trwa zbyt długo. Spróbuj ponownie lub skontaktuj się z nami bezpośrednio.',
      connectionError: 'Brak połączenia z internetem. Sprawdź połączenie i spróbuj ponownie.',
      captchaIncorrect: 'Nieprawidłowa odpowiedź. Spróbuj ponownie.',
      captchaSuccess: 'Dziękuję! Teraz mogę przetworzyć Twoją wiadomość.',
    },
    captcha: {
      challenge: 'Aby kontynuować, odpowiedz na pytanie:',
    },
    alternativeContact: {
      text: 'Lub skontaktuj się z nami bezpośrednio:',
      email: 'kontakt@zautomatyzuj.ai',
      responseTime: 'Odpowiadamy w ciągu 24 godzin w dni robocze',
    },
  },
} as const;
