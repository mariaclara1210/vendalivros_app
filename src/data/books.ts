import { Book, Review } from '../types';

export const HERO_BOOK_ID = 'arquivo-estrelas-perdidas';

export const BOOKS: Book[] = [
  {
    id: HERO_BOOK_ID,
    title: 'O Arquivo das Estrelas Perdidas',
    subtitle: 'Edição Especial de Luxo',
    author: 'Marcus V. Heringer',
    publisher: 'Lumina Edições Raras',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Científica',
    rating: 4.9,
    reviewsCount: 248,
    physicalFormat: 'Capa Dura • Fitilho & Verniz',
    price: 74.90,
    strikePrice: 98.00,
    pixPrice: 71.15,
    discount: '24% OFF',
    badge: 'Livro do Mês • Curadoria Lumina',
    tag: 'Tiragem Limitada',
    stock: 8,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYbEtbcGcQMGZwZ0-I8libVpTAJHSS10DMFIheRqaXoXA8YxVaHU5R9OwCKtEaN55JG2MBWWI-DzgBnIGWD6ljJcRUCRCLM7Xj5gDwEAd9j5pS1-WqQN49khOLI83yh-tS6HjbpejVhHH_hdGM2-5Ow4oirTl82h35LDkUIbTXVAVheWImTEWvpOP-7u-3ORwKbb21nBFygCRchzRa7sMOQjJaozSpJk05p-_UIXoIgVaeuKVrX0E',
    gallery: [
      {
        title: 'Capa Frontal',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-oKVQmCPCIAiKJAz2w-_y5IG3JxpnEWQRVoBoGspiSxNDXHCK8ftvriNgJ6cwOfDKmH8l4o_UW33mh3Kg_FFwP1nExAlSsFcTV3Xih4oiL_gJ3xLQMGIf13--B1CNZXYah9t7homFJ6bi5iA_K_pvVteOiVLUP6Cisj2_U7uzriEsoQXX74Ev0EpPkMKSFxzFyLfy6xRKRm_feRRdb4Ybs11yTpm3KHno_sHImkqnGcbuS5xkLQ0'
      },
      {
        title: 'Contracapa',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRDp28qgGhAC8Tkev_LxNIcPtLO1bk9HvUl3ET80sBUPV_qp5KNcgv8dIpwtDjLJC1kVSnIFfBhFoHKiuaPeOlE9k43TWuKuD1x4bszpLDrXphfvuzRvSE1X50D0MsxDhVwEG7VMd1P6Sb8O6k_yhOYfrmlFNj1dpRAKbNKL9QdR5N6uOx9CJT0fceCfAA-N8UMK_0tWZYl8nkyezuW4wSPPxQlAb4bSkkrDbST8hy7ss8okTh5Lk'
      },
      {
        title: 'Lombada',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-HMwH__mhl1aDIAB5Ihuh5OK93w6mVayQufWFlWaYmdbxuGSt7KMnnvJORqy6ITw7JymP5FbM9Jy-BjGAmmIi2y_di7p5dt-URkHT-J9t7KsvwK7os2eeVGuKHV6Sd0-RIgAifqy15jZFTUT1wA7IFXF8QiFdRrOA1OwDsM4sU3kF8-HAqP8oqknuU0QNlv8fvf48E3I2wNRixn3UTIiDcCRM3Bnd7t6SVg5KaQWLKEqmL6fAaAs'
      },
      {
        title: 'Miolo & Fitilho',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUV8PdQhvp7AtEfulnf3YczYD-qj7LjzM9xGfAPn6hEXftx4r_Th62-n8duu6SiwTRdD9b0a3-N2bzOVINMOa6-nqr-OEc84_JCLNkYLHh5YStPU0LUWeZX4tL8zvDOL4te_D7hsCM3sf8b202Q3smZq77bWC_NqBdwDixcfdlhWNTNW5ISikck-2IEhdJeKbet-6wNsTL30aGt1Za1HhLIDsw8mPB5vogibe3Y1DkDsYTIW1XZ8o'
      }
    ],
    formats: [
      {
        id: 'capa-dura',
        name: 'Capa Dura',
        price: 74.90,
        strikePrice: 98.00,
        pixPrice: 71.15,
        discount: '24% OFF',
        details: 'Fitilho & Verniz',
        stock: 8
      },
      {
        id: 'brochura',
        name: 'Brochura',
        price: 52.90,
        strikePrice: 65.00,
        pixPrice: 50.25,
        discount: '18% OFF',
        details: 'Papel Pólen 80g',
        stock: 25
      },
      {
        id: 'ebook',
        name: 'E-book Kindle',
        price: 29.90,
        strikePrice: 39.90,
        pixPrice: 29.90,
        discount: '25% OFF',
        details: 'ePub / Envio Imediato',
        stock: 999
      }
    ],
    synopsis: 'No limiar do século XXIV, nos confins esquecidos da Estação de Observação Helion-9, repousa um monumental relicário de dados astronômicos chamado simplesmente de O Arquivo. Quando a astrofísica Elena Vance descobre uma frequência de rádio que não deveria existir — proveniente de uma constelação cartografada como morta há milênios —, ela desenterra um mistério que desafia a própria mecânica da relatividade e a preservação da memória humana.',
    quote: '“Nenhuma estrela desaparece verdadeiramente sem antes deixar seu eco gravado no tecido do tempo; nós é que nos esquecemos de como ouvir o silêncio.”',
    quoteAuthor: '— Trecho do Capítulo IV, Pág. 87',
    extendedText: 'Entre perseguições silenciosas pelo vácuo espacial, conspirações diplomáticas interestelares e reflexões profundas sobre solidão, legado e a finitude cósmica, Marcus V. Heringer tece uma tapeçaria magistral de ficção científica especulativa contemporânea. Uma narrativa hipnótica que ressoa a sensibilidade clássica de Arthur C. Clarke e Ursula K. Le Guin, celebrada internacionalmente por sua densidade lírica e rigor científico.',
    specs: {
      originalTitle: 'The Archive of Lost Stars',
      isbn: '978-85-98765-43-2',
      pages: '464 páginas',
      language: 'Português Brasileiro',
      translation: 'Ana Lúcia Ribeiro',
      finish: 'Capa dura com verniz localizado & hot stamping dourado',
      paper: 'Pólen Natural 80 g/m²',
      dimensions: '16,0 x 23,0 x 3,2 cm',
      weight: '680 gramas',
      year: '2024 (1ª Edição Especial)'
    }
  },
  {
    id: 'arquiteto-andromeda',
    title: 'O Arquiteto de Andrômeda',
    author: 'Arthur V. Thorne',
    publisher: 'Aleph Livros',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Científica',
    rating: 4.9,
    reviewsCount: 248,
    physicalFormat: 'Capa Dura • E-book',
    price: 67.40,
    strikePrice: 89.90,
    pixPrice: 64.03,
    discount: '25% OFF',
    badge: 'Bestseller',
    stock: 14,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhFQwE_HirXdB5LFE2CnaeAdxWnRSH2MPwCuGmkFTWT9NY-mJuGc-q0ChfXCVbtVI0P3swBNXPO_2RysBlFk8h_wTv8rXz76OSR1r7Fp1hoEyR6z6nGcrnmLFZQVYdnWzvk_UNzucqzEOWsSXR0mVUSjk3ZuFkuGESaFp5aaDXIcpmva7VNMtYTsmPq08YWyz95CUA0d2vDIZSpwK4EpJN-ODic0Tu2iwaIzkgTZ7domSYg1TIGZI',
    synopsis: 'Nas fendas orbitais de Andrômeda, engenheiros de estruturas estelares enfrentam o colapso iminente de uma esfera de Dyson construída por civilizações esquecidas.',
    specs: {
      originalTitle: 'The Architect of Andromeda',
      isbn: '978-85-7657-332-1',
      pages: '512 páginas',
      language: 'Português Brasileiro',
      translation: 'Carlos Silveira',
      finish: 'Capa Dura com hot stamping',
      paper: 'Pólen Bold 90g',
      dimensions: '16 x 23 cm',
      weight: '620 gramas',
      year: '2023'
    }
  },
  {
    id: 'cronicas-inverno-astral',
    title: 'As Crônicas do Inverno Astral',
    author: 'Helena M. Castilho',
    publisher: 'Companhia das Letras',
    category: 'Ficção & Fantasia',
    subgenre: 'Fantasia Épica',
    rating: 4.8,
    reviewsCount: 189,
    physicalFormat: 'Capa Dura Ed. Especial',
    price: 72.00,
    strikePrice: 96.00,
    pixPrice: 68.40,
    discount: '-25% OFF',
    stock: 19,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzXppp2AxiV9qjkLxWEJq_Lud9wXa4tM2ctLkHGtt10hPmFD85lmViM_cSMxYejcQ6rsjvtfSb9vkp1r6QkztGjpKXX_KuHhB_huB2ORfuSaXFnA1ntaWHSEyI_PE99b8MDCg5AjEPSGZg6cgjfZv6IwrKCUpIqWtp2WSA_51encceD6KDFCS-XGUBuq3xmMteQL9YvEbrHDVh1N9-UrkAEEBaxGxaFosGltsP5xfa13HLWzaIjIM',
    synopsis: 'Um reino envolto por nevascas eternas onde runas glaciais guardam o calor residual da criação primordial.',
    specs: {
      originalTitle: 'Chronicles of the Astral Winter',
      isbn: '978-85-359-2911-4',
      pages: '448 páginas',
      language: 'Português Brasileiro',
      translation: 'Mariana Drummond',
      finish: 'Capa dura almofadada',
      paper: 'Pólen Soft 80g',
      dimensions: '15,5 x 22,5 cm',
      weight: '590 gramas',
      year: '2024'
    }
  },
  {
    id: 'sinapse-de-silicio',
    title: 'Sinapse de Silício',
    author: 'Kenjiro Sato',
    publisher: 'Aleph Livros',
    category: 'Ficção & Fantasia',
    subgenre: 'Cyberpunk & Solaris',
    rating: 4.7,
    reviewsCount: 96,
    physicalFormat: 'Brochura • E-book',
    price: 51.90,
    strikePrice: 64.90,
    pixPrice: 49.30,
    discount: '20% OFF',
    badge: 'Bestseller',
    stock: 32,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL2TXQmQ-rQWl6e5OwBSvA17-g3xLsk8zXIkL42dWMx9vgBjroS8BOA3SzN0oo15_0C4m2Or-Nz-fyrW1IX85Gz9B2mN9i6-Y4zjpjR3WyQ3M1Lble3N2TPtANcPFEeyX6N0ylRM6-hA7ZeQlZVKsyfid6a0ZVd_kxW4XMz7i61KgTJWgJLwfAj2MhhJPIJjtZiWgBGm9cp5tTvV1CfNtu9Ika3XxkIHpGIkMv_BGDLC935Mzc9vY',
    synopsis: 'Na megacidade submersa em hologramas e cabos neurais, memórias humanas são vendidas no mercado negro em cartuchos criptografados.',
    specs: {
      originalTitle: 'Silicon Synapse',
      isbn: '978-85-7657-410-6',
      pages: '384 páginas',
      language: 'Português Brasileiro',
      translation: 'Ricardo Minami',
      finish: 'Brochura com laminação fosca',
      paper: 'Off-white 75g',
      dimensions: '14 x 21 cm',
      weight: '430 gramas',
      year: '2023'
    }
  },
  {
    id: 'pendulo-dos-tempos',
    title: 'O Pêndulo dos Tempos Esquecidos',
    author: 'Clara Mendonça',
    publisher: 'DarkSide Books',
    category: 'Ficção & Fantasia',
    subgenre: 'Distopia & Utopias',
    rating: 5.0,
    reviewsCount: 312,
    physicalFormat: 'Capa Dura • Corte Colorido',
    price: 77.00,
    strikePrice: 110.00,
    pixPrice: 73.15,
    discount: '-30% OFF',
    stock: 7,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0LzaizTU_muLM9MQVfsp7padVopZfpCiv5unMgXb3UdCrrMhPjJ4LmYqlm8CulO5r8h1JbdP1i56veA08HDsnuuB69M4jI0o96GjObbnGYDCBv-BtnPakL1ZEWfhP7tdyiMVKN3kb_zyhX9hgj9PBIN2igFPdvzy_qGwjXUzlODmrjR4OMrbtyKcmL33izYlCmgBw7-VpUlo-4mtADWiFiuD-yBVotaDeimoKqejveQe--rIyCDA',
    synopsis: 'Um relógio monumental de obsidiana dita a respiração de uma sociedade isolada após o grande silenciamento terrestre.',
    specs: {
      originalTitle: 'The Pendulum of Forgotten Times',
      isbn: '978-85-9454-102-3',
      pages: '496 páginas',
      language: 'Português Brasileiro',
      translation: 'Clara Mendonça',
      finish: 'Capa dura com corte pintado em azul meia-noite',
      paper: 'Pólen Natural 80g',
      dimensions: '16 x 23 cm',
      weight: '670 gramas',
      year: '2024'
    }
  },
  {
    id: 'estatico-horizonte-eventos',
    title: 'Estático no Horizonte de Eventos',
    author: 'Marcio A. Rezende',
    publisher: 'Morro Branco',
    category: 'Ficção & Fantasia',
    subgenre: 'Space Opera',
    rating: 4.6,
    reviewsCount: 74,
    physicalFormat: 'Capa Dura • Marcador Fita',
    price: 63.00,
    strikePrice: 84.00,
    pixPrice: 59.85,
    discount: '25% OFF',
    stock: 12,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0rCjKnGAoYIIS4MtlX5DQII46sNmO9ayJ8Mo2i0fIUbsUyLkHRENtdJSDLv_D8xzzAsX-vctqVpZkf_omDA_FBGPSFj3vvlmGSAaRnp2iExitqYDJsDwkJ2JHsZ83m7gj2jOB2MzgbrgWr_B7_nXQnlmlbjQ3SdC2aViAdpYZrYI6s4nIj79H1zVE4y6oXYWRnGFRSq19KBs4zxB4VoNk7aOM-SOW-thHBJLjEeqQnOdgjWrFcX4',
    synopsis: 'A tripulação da fragata Eurídice entra em órbita de um buraco negro supermassivo para recolher ecos da primeira transmissão humana.',
    specs: {
      originalTitle: 'Static at Event Horizon',
      isbn: '978-85-9454-088-0',
      pages: '416 páginas',
      language: 'Português Brasileiro',
      translation: 'Marcio A. Rezende',
      finish: 'Capa dura com fita de cetim',
      paper: 'Pólen Bold 80g',
      dimensions: '15 x 22 cm',
      weight: '540 gramas',
      year: '2023'
    }
  },
  {
    id: 'astrolabio-rei-esquecido',
    title: 'O Astrolábio do Rei Esquecido',
    author: 'Breno S. Valente',
    publisher: 'HarperCollins Brasil',
    category: 'Ficção & Fantasia',
    subgenre: 'Fantasia Épica',
    rating: 4.9,
    reviewsCount: 402,
    physicalFormat: 'Brochura • Ilustrado',
    price: 44.90,
    strikePrice: 58.00,
    pixPrice: 42.65,
    discount: '22% OFF',
    badge: 'Bestseller',
    stock: 45,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnpkqtWu3Cns5iP5yQI78T6HCfaX0cAOMxdiozgeMptJ5QFO7mcEsyX5s6N-xJAqGYo7yO2UPZPMqkV84nC8KrSH7BnIExZH5wWAIBv0oIdzYBnY4fv1Qu0I7m-qRhYGZ3t-rTa_-pIyTTJAuu4wYgg8hOhCNlB0HjDjiRkKCkP6jT-UtL1emV_LKIdnGEIPyThhaSxbh4bKHiS5bE_q2qDJwqd6Z1wzUyQMOTqGYfg2scqq_18NY',
    synopsis: 'Um artefato forjado em cobalto e prata revela segredos alquímicos capazes de reescrever as cartas celestes de um império arruinado.',
    specs: {
      originalTitle: 'The Forgotten King’s Astrolabe',
      isbn: '978-85-06-08991-2',
      pages: '368 páginas',
      language: 'Português Brasileiro',
      translation: 'Luciana Brandão',
      finish: 'Brochura ilustrada com orelhas largas',
      paper: 'Avena 80g',
      dimensions: '16 x 23 cm',
      weight: '480 gramas',
      year: '2022'
    }
  },
  {
    id: 'silencio-mundos-antigos',
    title: 'O Silêncio dos Mundos Antigos',
    author: 'David K. Lindqvist',
    publisher: 'Companhia das Letras',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Filosófica',
    rating: 4.7,
    reviewsCount: 112,
    physicalFormat: 'Capa Dura • Papel Pólen',
    price: 67.90,
    strikePrice: 79.90,
    pixPrice: 64.50,
    discount: '-15% OFF',
    stock: 18,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4TOmckbDUPUNW7DcBnoLIPWRyLxWPBkTeEaP3Flluuv8dzQGqI6jIvkPg0CC3pOkfM8pgZprr1zUKhpo3nb4BBCZwXPD5xfNSCe4CG3EYc5u5XdYsgEkgGHn2IuUxPQU826ieI4tVvCeoUUfEPjGTPPYj8mStaArWgSjSpodlIIlsU3Zx5nrl-DwWoCe6-Ns-zyDoDzKTjF3QJ1LaD7tfA6QtOChhD-YlO-LCEdlFHYL0cGHln3s',
    synopsis: 'Uma esfera negra monolítica flutua imperturbável sobre águas espelhadas, desafiando todas as leis da física e da cosmologia.',
    specs: {
      originalTitle: 'The Void Reflection',
      isbn: '978-85-359-3388-3',
      pages: '320 páginas',
      language: 'Português Brasileiro',
      translation: 'Henrique Paiva',
      finish: 'Capa dura em percalina cinza e azul',
      paper: 'Pólen Natural 80g',
      dimensions: '14 x 21 cm',
      weight: '490 gramas',
      year: '2024'
    }
  },
  {
    id: 'tratado-espelhos-ocultos',
    title: 'Tratado dos Espelhos Ocultos',
    author: 'Laura Fontaine',
    publisher: 'DarkSide Books',
    category: 'Ficção & Fantasia',
    subgenre: 'Fantasia Épica',
    rating: 4.8,
    reviewsCount: 155,
    physicalFormat: 'Capa Dura • Pintura Trilateral',
    price: 78.20,
    strikePrice: 92.00,
    pixPrice: 74.29,
    discount: '15% OFF',
    stock: 15,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZGxZTMSvrKi_GJUo0CCh0kc1uuWniH8ro3M6_DHdksqitXJp0gKatpniCJPETBrhjeqbnLtm0K_JaHZ0eCEcZ78hp9ysH7yRDIFEMCl6_h0SxkVwIwg0Aw3EM3h8xI7z1oGJ022yAr3dm5srsbQoFQT05zpJZRp6J0XoPrWl7e9mCxDO_rQGx_cUJwt3yHqlK_Wglx-R5A3T6GAeyPEDOMrxwskbrV3e7C6sGPbQBdnVC4nXglU',
    synopsis: 'Grimório lendário adornado com pedras safiras e bordas em filigrana dourada, contendo os mistérios dos reflexos multidimensionais.',
    specs: {
      originalTitle: 'Treatise of Hidden Mirrors',
      isbn: '978-85-9454-209-9',
      pages: '528 páginas',
      language: 'Português Brasileiro',
      translation: 'Camila Antunes',
      finish: 'Capa dura em couro sintético com bordas douradas',
      paper: 'Pólen Bold 90g',
      dimensions: '16 x 23 cm',
      weight: '750 gramas',
      year: '2023'
    }
  },
  {
    id: 'limiar-do-vazio',
    title: 'O Limiar do Vazio',
    author: 'Nathalia Duarte',
    publisher: 'Aleph Livros',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Científica',
    rating: 4.9,
    reviewsCount: 278,
    physicalFormat: 'Brochura • E-book',
    price: 43.20,
    strikePrice: 54.00,
    pixPrice: 41.04,
    discount: '20% OFF',
    badge: 'Bestseller',
    stock: 22,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAppcRXbSW01rMh86MpF3sEJQBtV5RQlZPSzg8LlXjUY5sdlnp1ev-0LCfNpObhwP1yDiLiTUktk5N6-rKNRyNk5t-SHICn5T8VqClgCwJXqk53v_mrxgFQWP_dAyWrKzk1BHD3eX1KS54AvT7Az9krf81n6kJWlGfyzF171P077FLCHW9-NpQu0AVneJYqcl5fVd8wPQ_UMwBql7K9tbWBsv-wRRJGhmOA6p7clK_CfZ6Q1aleclk',
    synopsis: 'Um portal geométrico paira silenciosamente sobre uma planície de sal extraterrestre, atraindo cientistas e peregrinos interestelares.',
    specs: {
      originalTitle: 'The Void Threshold',
      isbn: '978-85-7657-550-9',
      pages: '352 páginas',
      language: 'Português Brasileiro',
      translation: 'Nathalia Duarte',
      finish: 'Brochura com verniz localizado',
      paper: 'Pólen Soft 80g',
      dimensions: '14 x 21 cm',
      weight: '410 gramas',
      year: '2024'
    }
  },
  {
    id: 'mecanismos-vidro-cinzas',
    title: 'Mecanismos de Vidro e Cinzas',
    author: 'Gabriel Fontes',
    publisher: 'Morro Branco',
    category: 'Ficção & Fantasia',
    subgenre: 'Distopia & Utopias',
    rating: 4.5,
    reviewsCount: 82,
    physicalFormat: 'Capa Dura • 1ª Edição',
    price: 65.60,
    strikePrice: 82.00,
    pixPrice: 62.32,
    discount: '-20% OFF',
    stock: 9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8YY1AyajLFdY4-BZ7SsiUfWtbAyJZZT2yKOV8L_wq_KxDntHhgLbqnVRnN4KS168x7k6FHWf1Nuqi0HUvZdyq6FuXZOt17iBtGk2wvKpD9geZYj9iLv6lmL70L8sbxNVaMKVK_4XaYjgMd3h1Wjv7mu6gcjJvdlwmIXJRQNUXkal5PVAyMqvrPdP863PKAC1boW-TtkI0LaObXe-uhCNo29KWwk_Vm2AMZJBmHfWFq4i5u6bfwdY',
    synopsis: 'Mecanismo celeste de engrenagens de vidro e bronze que simula a rota de planetas esquecidos em uma era pré-apocalíptica.',
    specs: {
      originalTitle: 'Mechanisms of Glass and Ash',
      isbn: '978-85-9454-150-4',
      pages: '416 páginas',
      language: 'Português Brasileiro',
      translation: 'Gabriel Fontes',
      finish: 'Capa dura com baixo relevo',
      paper: 'Pólen Natural 80g',
      dimensions: '15,5 x 22,5 cm',
      weight: '570 gramas',
      year: '2023'
    }
  },
  {
    id: 'dominios-abismo-azul',
    title: 'Os Domínios do Abismo Azul',
    author: 'Sofia A. Barreto',
    publisher: 'Companhia das Letras',
    category: 'Ficção & Fantasia',
    subgenre: 'Fantasia Épica',
    rating: 4.8,
    reviewsCount: 134,
    physicalFormat: 'Brochura • E-book',
    price: 54.40,
    strikePrice: 68.00,
    pixPrice: 51.68,
    discount: '20% OFF',
    stock: 28,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfhDC2LSMWJm6C6PWiwTAPnqS1WAN7L8x81S3ViuYbEVDucZQ6W1GzMTg7SY6cb71Pfl2DiTV5Zt-kFXlKJMofbEaGEnWehkeWRAbqkGzGIoWQvYvZEpDhjRLjZFDZ9VzTtcqsO2OxL3ZadZrdIl8Xbp0Po9dSr-jZsh9dGDd4Y6W0KAWdgp5poekgW494UN8Kr_g5b6PzCaRbMgEubYsQ1M-V0Kwks8pm-nP7PGOyhANSKfOIOVM',
    synopsis: 'Uma metrópole em cúpulas de vidro nos abismos oceânicos onde a bioluminescência é a única moeda de troca permitida.',
    specs: {
      originalTitle: 'Submerged Legacy: The Blue Abyss',
      isbn: '978-85-359-3401-9',
      pages: '384 páginas',
      language: 'Português Brasileiro',
      translation: 'Sofia A. Barreto',
      finish: 'Brochura com laminação soft touch',
      paper: 'Pólen Bold 80g',
      dimensions: '14 x 21 cm',
      weight: '440 gramas',
      year: '2023'
    }
  },
  {
    id: 'matriz-hiperbolica',
    title: 'Matriz Hiperbólica 0.8',
    author: 'Eduardo T. Ramos',
    publisher: 'Aleph Livros',
    category: 'Ficção & Fantasia',
    subgenre: 'Cyberpunk & Solaris',
    rating: 4.6,
    reviewsCount: 63,
    physicalFormat: 'Capa Dura • Slipcase',
    price: 79.20,
    strikePrice: 88.00,
    pixPrice: 75.24,
    discount: '-10% OFF',
    stock: 11,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyvvvI2xH9XbdSWfGI8Kdh2LU7Ya9RHtZEZ5PvhpIXaKlIjwb8RBYGvKZVLZM8ndyhMDwYLZNyBNXPyt_MG18htFyXAKNhxtwG9MhDv6wpdmJLZQvpppswmF_zp7uPyBpmAle-feZUQ0lgHfQJeiQOIoyZqRnRhyyiqpyFwpF9n847rdivX3-UQjnbYLnx0d1Gfc-eZmbFgFqlc8utHNG1Hgd92ldAQ6C2-9ZSUJ3_ZbrHk4Q5_0c',
    synopsis: 'Um tesserato quântico hiperbólico flutua em gravidade zero emitindo feixes de luz que alteram o passado de quem os observa.',
    specs: {
      originalTitle: 'Hyperbolic Matrix 0.8',
      isbn: '978-85-7657-601-8',
      pages: '440 páginas',
      language: 'Português Brasileiro',
      translation: 'Eduardo T. Ramos',
      finish: 'Capa dura acompanhada de slipcase exclusivo',
      paper: 'Pólen Natural 80g',
      dimensions: '16 x 23 cm',
      weight: '690 gramas',
      year: '2024'
    }
  },
  // Recommendation books
  {
    id: 'cronicas-nebulosa-prateada',
    title: 'Crônicas da Nebulosa Prateada',
    author: 'Julian De Vries',
    publisher: 'Aleph Livros',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Científica',
    rating: 4.7,
    reviewsCount: 125,
    physicalFormat: 'Capa Comum',
    price: 58.90,
    strikePrice: 74.90,
    pixPrice: 55.95,
    badge: 'Sci-Fi Hard',
    stock: 16,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANa1IvOvc9AIKbCcMhZVeuzRWF8qLHuQuWzODaQ2SyFElZBTR6Lsm82UCMkUZbpsITkbh4dK-_AGlY2tX48OuaLmfhkWagq8GvfYREozXm1tRLa84DjgBrtT-7He-hKyrGCSg0bexCxgms8N5QE0iQ9Uy3oxnK2MfMKqwIT-ZsXdA8ShHhMKsDJ9iX7CieD2pFoMqJwINKeRkMajieuZlQrGbmFw4B8rVwFE-o6YnbuxgWdo4jhy4',
    synopsis: 'A exploração de uma nebulosa metálica que absorve emissões de rádio e projeta ecos do futuro.',
    specs: {
      originalTitle: 'Chronicles of the Silver Nebula',
      isbn: '978-85-7657-499-1',
      pages: '390 páginas',
      language: 'Português Brasileiro',
      translation: 'Julian De Vries',
      finish: 'Brochura tradicional',
      paper: 'Pólen 80g',
      dimensions: '15 x 22 cm',
      weight: '460 gramas',
      year: '2023'
    }
  },
  {
    id: 'codice-andromeda',
    title: 'O Códice de Andrômeda',
    author: 'Beatriz Fontes',
    publisher: 'Lumina Edições Raras',
    category: 'Ficção & Fantasia',
    subgenre: 'Space Opera',
    rating: 5.0,
    reviewsCount: 164,
    physicalFormat: 'Capa Dura',
    price: 69.90,
    strikePrice: 89.00,
    pixPrice: 66.40,
    badge: 'Destaque',
    stock: 9,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv6w9FUZugtnO6JvwwwnOGfM54yigtutQoJ58lftgMhHOSZ3ahLxOZDLfPjBLs7gqMDGyUPXeO9rRrkIps2x0ujWNmhdQeNsW8MiquzO4qmg8k5IY7u-lrh9rXmzsjIJSMpexreCz5VkF8G_NyBo1FQIXCnD6T537-lurXLS9NqUJmGMeIW1d4KPvgw5cXwayWkQXA4g4P7RxZxktinuWTr80i332IiMoI4V4HkxN9oY9-SScRVZM',
    synopsis: 'Manuscrito cifrado encontrado em um satélite abandonado nos confins do setor Estelar de Andrômeda.',
    specs: {
      originalTitle: 'The Andromeda Codex',
      isbn: '978-85-98765-50-0',
      pages: '480 páginas',
      language: 'Português Brasileiro',
      translation: 'Beatriz Fontes',
      finish: 'Capa dura serigrafada',
      paper: 'Pólen Natural 80g',
      dimensions: '16 x 23 cm',
      weight: '640 gramas',
      year: '2024'
    }
  },
  {
    id: 'ultima-estacao-polar',
    title: 'A Última Estação Polar',
    author: 'Klaus Von Hauer',
    publisher: 'Companhia das Letras',
    category: 'Ficção & Fantasia',
    subgenre: 'Ficção Filosófica',
    rating: 4.6,
    reviewsCount: 128,
    physicalFormat: 'Brochura',
    price: 49.00,
    strikePrice: 62.00,
    pixPrice: 46.55,
    stock: 21,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0yQkvJZi-EwQIMBx-fc_tR0uVYMINb6ynu158p71bxzWZ07Ma2WagWgAX1TJmvRGpqiVfBSN7UJqevN6Ix14x1kVSVJw4LaFc0tBUtZBnEhIRrTzOdU470yaLlTEJMJm5AkZEbFgnVcz0MfU8DtTqZ0c_Zs44BGvGC8jmmn2Le_fkh8xnl7kVfkxwOTOeoe0VTI3WUbbC20mNexBzN3V36xmpQO5dIKKtF0m8FHMhz94MHXhYqXw',
    synopsis: 'Num planeta remoto coberto de gelo perpétuo, o último pesquisador vivo decide não enviar seu relatório para a Terra.',
    specs: {
      originalTitle: 'The Last Polar Station',
      isbn: '978-85-359-3221-1',
      pages: '310 páginas',
      language: 'Português Brasileiro',
      translation: 'Klaus Von Hauer',
      finish: 'Brochura com sobrecapa',
      paper: 'Off-white 80g',
      dimensions: '14 x 21 cm',
      weight: '390 gramas',
      year: '2023'
    }
  },
  {
    id: 'teoria-luz-infinita',
    title: 'Teoria da Luz Infinita',
    author: 'Helena Siqueira',
    publisher: 'DarkSide Books',
    category: 'Ficção & Fantasia',
    subgenre: 'Astrofísica Literária',
    rating: 4.9,
    reviewsCount: 210,
    physicalFormat: 'Edição de Luxo',
    price: 84.50,
    strikePrice: 105.00,
    pixPrice: 80.27,
    badge: 'Edição Rara',
    stock: 5,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKO0dUQi1vh-JA2FM6EKgpg0qFanCsuyO7f3dqVxQzPOVUMwcnXaTKkx7lmW_XNsEGAME-HEa4xVhpH6ftQGw4FZxyjtzRnF7JeC6jh88PWzbaGotWOPLtLFt11rchMDTVlqtSxsdlWSMjrpqm7sr_KAsPlNSt3QlCNurpcOJx6ICkqRd6jNZDN71u2QD7dHlw9P0nXHJEquLaf3x7HIVLFCBxniFYpypFcbNL8AUZ7i2ke9xNphE',
    synopsis: 'Uma elegia lírica e matemática sobre fótons que cruzaram o universo observável desde o Big Bang até alcançar uma pupila humana.',
    specs: {
      originalTitle: 'Theory of Infinite Light',
      isbn: '978-85-9454-310-2',
      pages: '460 páginas',
      language: 'Português Brasileiro',
      translation: 'Helena Siqueira',
      finish: 'Capa dura em veludo azul com corte dourado',
      paper: 'Pólen Natural 90g',
      dimensions: '16 x 23 cm',
      weight: '710 gramas',
      year: '2024'
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Camila L.',
    initials: 'CL',
    avatarBg: '#0f1e36',
    location: 'Curitiba, PR',
    date: '14 Jan 2025',
    rating: 5,
    title: '“Uma das melhores leituras de sci-fi da década!”',
    text: 'A qualidade física do livro é estonteante. O papel pólen tem uma textura agradável e o fitilho azul faz toda a diferença para quem lê antes de dormir. Sobre a história: devorei as 464 páginas em apenas três noites. O final do capítulo 28 me deixou sem fôlego.',
    formatBought: 'Capa Dura',
    helpfulVotes: 34,
    isVerified: true
  },
  {
    id: 'rev-2',
    author: 'Rodrigo A.',
    initials: 'RA',
    avatarBg: '#0051d5',
    location: 'Belo Horizonte, MG',
    date: '02 Fev 2025',
    rating: 5,
    title: '“Objeto de arte e rigor narrativo”',
    text: 'Sou colecionador de edições especiais e a Lumina acertou em cheio no acabamento com o hot stamping dourado na lombada. O autor consegue equilibrar conceitos complexos de astrofísica com uma humanidade comovente. Já encomendei outros dois para presentear.',
    formatBought: 'Capa Dura',
    helpfulVotes: 19,
    isVerified: true
  },
  {
    id: 'rev-3',
    author: 'Thaís S.',
    initials: 'TS',
    avatarBg: '#e0e3e5',
    location: 'São Paulo, SP',
    date: '28 Jan 2025',
    rating: 4,
    title: '“Excelente ritmo e mapa estelar fabuloso”',
    text: 'As ilustrações em encarte duplo valem cada centavo. A personagem Elena Vance é fascinante e a tradução da Ana Lúcia Ribeiro está impecável. Entrega da Lumina foi feita em 2 dias úteis na caixa com proteção especial.',
    formatBought: 'Brochura',
    helpfulVotes: 12,
    isVerified: true
  }
];

export const SAMPLE_CHAPTER_CONTENT = {
  prologue: {
    title: 'Prólogo: O Farol de Helion',
    content: `A escuridão interestelar não é vazia; ela sussurra em radiações de fundo que o ouvido biológico é incapaz de decifrar. Na Estação de Observação Helion-9, suspensa na borda exterior da nuvem de Oort, o tempo era medido pelo pulsar das estrelas de nêutrons e pelo zumbido grave dos conversores de matéria.

Elena Vance ajustou os receptores de interferometria quântica. Seus olhos seguiam as coordenadas da Constelação da Lira — ou do que restava dela no catálogo unificado de navegação.

— Não há eco esperado nesta frequência, Doutora — alertou a interface de bordo, cuja voz artificial ecoava levemente na cúpula de quartzo.

— Aumente a abertura em quatro microssegundos de arco — respondeu Elena, sem desviar os olhos do gráfico espectral.

Naquele instante, um pulso modulado em sequência fibonacci atravessou os sensores. Não era ruído estelar. Não era reflexo de satélite militar esquecido. Era uma voz, gravada em compressão harmônica arcaica, preservada por quatrocentos anos de vácuo.

"A quem encontrar este registro: as estrelas não morreram. Nós apenas aprendemos a apagá-las."`
  },
  chapter1: {
    title: 'Capítulo I: O Relicário dos Homens Esquecidos',
    content: `Os arquivos da Terceira Diáspora ocupavam seiscentos metros cúbicos de cristais de silício dopados com terras raras. Na penumbra do convés primário, cada cristal brilhava com uma tênue luz índigo quando consultado pelas mãos de Elena.

Para o conselho diretivo de Genebra, Helion-9 era apenas uma estação de redundância fria, um posto avançado de baixa prioridade esquecido pelas rotas comerciais hiperluminais. Mas para Elena, era o único lugar da galáxia conhecida onde o silêncio era puro o suficiente para permitir que a história falasse.

Ao decodificar o segundo pacote do sinal, a assinatura temporal revelou-se impossível: o emissor se encontrava nas imediações do Grande Atrator, um vazio gravitacional onde matéria alguma deveria sobreviver.

Elena passou os dedos pela capa de couro do diário físico de bordo — um hábito antigo herdado de seu avô arquivista. Pegou sua caneta tinteiro e escreveu uma única frase:

"Começou."`
  }
};
