import type { Card, Explanation, Subject } from '../content.ts';

// IDs persist review progress: keep them stable when revising wording.
// These are original study items, not official Cebraspe questions.
const base = 'conteudos/cgu-2026/conhecimentos-basicos/01-estado-e-politica';
const source = (lesson: string, references: string) => `${base}/${lesson} · ${references}`;

export const cguEstadoPoliticaSubjects: Subject[] = [
  { id: 'cgu26', title: 'CGU 2026', children: [
    { id: 'cgu26-basicos', title: 'Conhecimentos básicos', children: [
      { id: 'cgu26-estado-politica', title: 'Estado e política', children: [
        { id: 'cgu26-ep-estado', title: '1. Estado e legitimidade' },
        { id: 'cgu26-ep-democracia', title: '2. Democracia e representação' },
        { id: 'cgu26-ep-federalismo', title: '3. Federalismo e capacidades estatais' },
        { id: 'cgu26-ep-direitos', title: '4. Ordem constitucional e direitos' },
        { id: 'cgu26-ep-valor', title: '5. Valor público e controle' },
        { id: 'cgu26-ep-corrupcao', title: '6. Corrupção como fenômeno político e social' },
        { id: 'cgu26-ep-captura', title: '7. Reprodução da corrupção e captura' },
        { id: 'cgu26-ep-respostas', title: '8. Consequências e respostas à corrupção' },
        { id: 'cgu26-ep-desenvolvimento', title: '9. Estado e desenvolvimento econômico' },
      ] },
    ] },
  ] },
];

export const cguEstadoPoliticaExplanations: Explanation[] = [
  { id: 'cgu26-ep-exp-estado', title: 'Estado, governo e administração', paragraphs: [
    'Estado é a organização político-jurídica da coletividade em um território. Governo exerce a direção política em determinado período. Administração reúne estruturas, agentes e atividades que concretizam a atuação estatal.',
    'A troca de governo não extingue o Estado. A administração também existe no Legislativo e no Judiciário: ela não se limita ao Executivo.',
  ], source: source('01-estado-e-legitimidade/README.md', 'Aula 1; Enap — Estado em Weber; CF, arts. 1º–3º e 37') },
  { id: 'cgu26-ep-exp-legitimidade', title: 'Poder, autoridade, legalidade e legitimidade', paragraphs: [
    'Poder é a capacidade de influenciar condutas e decisões. Autoridade envolve o reconhecimento da aptidão para dirigir. Legitimidade diz respeito às razões pelas quais o exercício do poder é considerado justificável.',
    'Legalidade avalia conformidade com o ordenamento; legitimidade examina a justificação e o reconhecimento do poder. Popularidade não concede competência jurídica nem sana uma ilegalidade.',
    'Na tradição weberiana, a legitimidade pode apoiar-se em costumes, atributos pessoais de liderança ou regras e competências: tipos tradicional, carismático e legal-racional. São modelos analíticos que podem coexistir na realidade.',
  ], source: source('01-estado-e-legitimidade/README.md', 'Aula 1; F03 — Enap, Estado em Weber') },
  { id: 'cgu26-ep-exp-interesse', title: 'Pluralismo e conflitos distributivos', paragraphs: [
    'Uma sociedade plural reúne interesses e valores diferentes. O interesse público precisa ser justificado por critérios públicos e direitos; não coincide automaticamente com a preferência do governante ou da maioria momentânea.',
    'Conflito distributivo envolve quem recebe benefícios, quem suporta custos e em que momento. Uma melhora na média pode coexistir com prejuízo a certos grupos, sem que essa diferença, isoladamente, demonstre corrupção.',
  ], source: source('01-estado-e-legitimidade/README.md', 'Aula 1 — síntese e exemplo distributivo') },
  { id: 'cgu26-ep-exp-participacao', title: 'Representação e participação', paragraphs: [
    'Na representação, eleitos tomam decisões em nome dos cidadãos. Participação inclui mecanismos pelos quais a sociedade influencia agendas, decisões e fiscalização, inclusive entre eleições.',
    'Consultas, audiências e conselhos podem complementar a representação. Sua força decisória depende das competências e regras aplicáveis; a existência de uma consulta não torna seu resultado automaticamente vinculante.',
  ], source: source('02-democracia-e-representacao/README.md', 'Aula 2; F06 — Democracia participativa na Constituição brasileira') },
  { id: 'cgu26-ep-exp-accountability', title: 'Accountability e formas de controle democrático', paragraphs: [
    'Accountability envolve informar e justificar a atuação, com possibilidade de fiscalização e consequências institucionais. Transparência é importante, mas publicar dados sem condições de compreensão e contestação não esgota a responsabilização.',
    'A dimensão vertical eleitoral relaciona cidadãos e representantes. A horizontal envolve controles entre instituições estatais. O controle social envolve acompanhamento e pressão da sociedade, que podem provocar a atuação das autoridades competentes.',
  ], source: source('02-democracia-e-representacao/README.md', 'Aula 2; F07 — TCU, Referencial de Governança') },
  { id: 'cgu26-ep-exp-governabilidade', title: 'Governabilidade, execução e controles recíprocos', paragraphs: [
    'Governabilidade diz respeito às condições políticas para sustentar decisões, como apoio, negociação e relações institucionais. Capacidade administrativa diz respeito às condições para executá-las.',
    'Aprovar uma política não garante pessoal, dados ou coordenação para implementá-la. A independência dos Poderes também não exclui os controles recíprocos previstos na Constituição; cada atuação precisa respeitar sua competência.',
  ], source: source('02-democracia-e-representacao/README.md', 'Aula 2; F04 e F07; CF, art. 2º') },
  { id: 'cgu26-ep-exp-federalismo', title: 'Autonomia federativa e coordenação', paragraphs: [
    'União, estados, Distrito Federal e municípios são entes autônomos, dentro da Constituição. A soberania pertence à República Federativa do Brasil. União não é sinônimo da Federação inteira.',
    'Coordenação compatibiliza decisões e reduz lacunas e sobreposições. Cooperação envolve atuação conjunta. Padrões, financiamento e pactuação podem coordenar políticas sem estabelecer uma hierarquia administrativa geral entre entes autônomos.',
  ], source: source('03-federalismo-e-capacidades/README.md', 'Aula 3; CF, art. 18; F17 — Arretche, coordenação e autonomia') },
  { id: 'cgu26-ep-exp-capacidades', title: 'Capacidades estatais e implementação', paragraphs: [
    'Capacidades estatais são condições para formular, executar e sustentar ações públicas. Recursos financeiros precisam articular-se com pessoas, organização, informação, processos e coordenação.',
    'Capacidades técnico-administrativas e político-relacionais se complementam. A burocracia interpreta regras e toma decisões na implementação; sua atuação pode influenciar o acesso efetivo aos serviços e direitos.',
  ], source: source('03-federalismo-e-capacidades/README.md', 'Aula 3; F04 — Gomide e Pires; F05 — Burocracia e democracia') },
  { id: 'cgu26-ep-exp-discricionariedade', title: 'Discricionariedade e arbitrariedade', paragraphs: [
    'Discricionariedade é o espaço de escolha permitido ao agente pelo ordenamento. A escolha permanece vinculada a competência, finalidade, motivação e demais limites jurídicos.',
    'Arbitrariedade é atuação sem esses limites e justificativas. O fato de a regra não determinar uma única solução não retira a possibilidade de controle.',
  ], source: source('03-federalismo-e-capacidades/README.md', 'Aula 3 — burocracia e discricionariedade') },
  { id: 'cgu26-ep-exp-constituicao', title: 'Fundamentos, objetivos e direitos fundamentais', paragraphs: [
    'Fundamentos da República são bases constitucionais do Estado, como cidadania e dignidade da pessoa humana. Objetivos fundamentais orientam transformações, como reduzir desigualdades. As listas dos arts. 1º e 3º não se confundem.',
    'Os direitos sociais integram os direitos fundamentais. A classificação em direitos individuais, sociais e políticos organiza o estudo sem transformar os direitos sociais em categoria externa aos fundamentais.',
  ], source: source('04-ordem-constitucional-e-direitos/README.md', 'Aula 4; CF, arts. 1º, 3º, 5º e 6º e Título II') },
  { id: 'cgu26-ep-exp-igualdade', title: 'Igualdade formal e material', paragraphs: [
    'Igualdade formal exige tratamento jurídico sem privilégios arbitrários. A perspectiva material considera diferenças relevantes para que as pessoas tenham acesso efetivo a direitos e serviços.',
    'Exigir exclusivamente um aplicativo pode tratar todos de modo uniforme e excluir usuários sem conexão. Diferenciações precisam ter relação justificável com o objetivo e respeitar o direito; nem toda diferença de tratamento é discriminação indevida.',
  ], source: source('04-ordem-constitucional-e-direitos/README.md', 'Aula 4 — igualdade e tratamento diferenciado; CF, art. 5º') },
  { id: 'cgu26-ep-exp-processo', title: 'Suspeita, prova e devido processo', paragraphs: [
    'Devido processo, contraditório, defesa e imparcialidade protegem contra decisões arbitrárias. Um sinal de risco não é conclusão sobre culpa ou responsabilidade.',
    'A medida cabível depende dos fatos, da competência e do procedimento aplicável. A urgência pode exigir providências previstas em lei, mas não autoriza substituir fundamento e garantias por convicção pessoal.',
  ], source: source('04-ordem-constitucional-e-direitos/README.md', 'Aula 4; CF, art. 5º, LIV e LV') },
  { id: 'cgu26-ep-exp-principios', title: 'Princípios administrativos expressos', paragraphs: [
    'O caput do art. 37 explicita legalidade, impessoalidade, moralidade, publicidade e eficiência. Aplicam-se à administração direta e indireta de todos os Poderes e entes federativos.',
    'O mnemônico LIMPE não esgota os princípios do direito administrativo. Eficiência deve ser buscada com respeito aos demais princípios e às garantias dos administrados.',
  ], source: source('04-ordem-constitucional-e-direitos/leitura-constitucional.md', 'CF, art. 37, caput') },
  { id: 'cgu26-ep-exp-consequencias', title: 'Consequências práticas e continuidade dos serviços', paragraphs: [
    'Os arts. 20–22 da LINDB exigem considerar consequências práticas e as condições reais de atuação. A decisão de invalidar um ato ou contrato deve explicitar consequências jurídicas e administrativas.',
    'Um contrato suspeito que sustenta serviço essencial exige analisar a medida cabível, alternativas e impactos sobre os usuários. Isso não imuniza responsáveis nem mantém automaticamente o contrato; exige fundamentação concreta dentro da lei.',
  ], source: source('08-consequencias-e-respostas/README.md', 'Aulas 4 e 8; F16 — LINDB, arts. 20–22') },
  { id: 'cgu26-ep-exp-valor', title: 'Valor público, entregas e efeitos', paragraphs: [
    'Valor público envolve benefícios relevantes para a sociedade e atendimento efetivo de necessidades de interesse público. Contar tarefas concluídas não é suficiente para demonstrá-lo.',
    'Uma entrega é o produto imediato de uma atividade, como um atendimento realizado. O resultado social é a mudança relevante para os destinatários. Encerrar pedidos rapidamente pode melhorar um painel e ampliar o retrabalho dos usuários.',
  ], source: source('05-valor-publico-e-controle/README.md', 'Aula 5; F08 — Decreto nº 9.203/2017, art. 2º') },
  { id: 'cgu26-ep-exp-desempenho', title: 'Eficiência, eficácia, efetividade e equidade', paragraphs: [
    'Eficiência relaciona recursos e entregas adequadas. Eficácia examina o alcance das metas. Efetividade verifica efeitos sobre o problema público. Equidade analisa a distribuição justificável de barreiras e benefícios.',
    'Atingir uma meta de atendimentos não demonstra, por si só, que os usuários tiveram seus problemas resolvidos. Os indicadores precisam corresponder ao resultado que se pretende avaliar.',
  ], source: source('05-valor-publico-e-controle/README.md', 'Aula 5 — critérios de avaliação; F07 — TCU') },
  { id: 'cgu26-ep-exp-controles', title: 'Controles e proporcionalidade', paragraphs: [
    'A Constituição prevê sistemas internos de controle e controle externo exercido pelo Congresso Nacional com auxílio do TCU. A fiscalização social os complementa sem receber automaticamente competências de julgamento estatal.',
    'Acrescentar verificações tem custos e pode atrasar serviços ou criar barreiras. A qualidade de um controle depende de sua contribuição para reduzir riscos e produzir resultados, não apenas da quantidade de aprovações exigidas.',
  ], source: source('05-valor-publico-e-controle/README.md', 'CF, arts. 70–74; F07 e F20 — TCU, governança e controles') },
  { id: 'cgu26-ep-exp-corrupcao', title: 'Corrupção e falha de gestão', paragraphs: [
    'Em sentido analítico amplo, corrupção é o uso abusivo de poder confiado para produzir benefício particular. Esse benefício pode alcançar terceiros e não se limita a dinheiro entregue ao decisor.',
    'Uma falha de gestão pode gerar atraso ou prejuízo sem apropriação privada. Resultado ruim não é prova automática de corrupção; identificar responsabilidades exige fatos e aplicação do regime jurídico pertinente.',
  ], source: source('06-corrupcao/README.md', 'Aula 6; F10 — UNODC, definições de corrupção') },
  { id: 'cgu26-ep-exp-conflito', title: 'Conflito de interesses antes do dano', paragraphs: [
    'Conflito de interesses envolve confronto entre interesses públicos e privados capaz de comprometer o interesse coletivo ou influenciar indevidamente a função pública.',
    'Pelo art. 4º, § 2º, da Lei nº 12.813/2013, sua ocorrência independe de lesão ao patrimônio público ou recebimento de vantagem. Por isso, a prevenção não deve aguardar que o favorecimento ou o prejuízo se consumem.',
  ], source: source('06-corrupcao/distincoes.md', 'F09 — Lei nº 12.813/2013, arts. 3º e 4º, § 2º') },
  { id: 'cgu26-ep-exp-favorecimento', title: 'Clientelismo, patronagem e nepotismo', paragraphs: [
    'Clientelismo relaciona benefícios particularizados a apoio ou lealdade política. Uma política com critérios gerais não se torna clientelista apenas por gerar apoio eleitoral.',
    'Na acepção analítica adotada no módulo, patronagem envolve nomeações discricionárias por confiança, lealdade ou afinidade, sem provar automaticamente ilegalidade ou corrupção. A literatura também utiliza definições mais restritivas.',
    'Nepotismo tem no vínculo familiar um elemento do favorecimento, nas hipóteses juridicamente vedadas. Não é sinônimo de clientelismo, e o enquadramento exige os requisitos do caso.',
  ], source: source('06-corrupcao/distincoes.md', 'Aula 6; F19 — Lopez, Palotti e Gomide; F21 — STF, SV 13') },
  { id: 'cgu26-ep-exp-agencia', title: 'Principal-agente e assimetria de informação', paragraphs: [
    'O principal delega uma atividade ao agente, mas não consegue observar integralmente sua conduta. Interesses divergentes e assimetria de informação podem abrir espaço para desvios.',
    'Registros verificáveis, capacidade técnica de supervisão e revisão independente ajudam a reduzir esse problema. A concentração de informação indica uma vulnerabilidade, não prova que o agente seja corrupto.',
  ], source: source('07-reproducao-e-captura/modelos-explicativos.md', 'F11 — UNODC, teorias da corrupção') },
  { id: 'cgu26-ep-exp-coletiva', title: 'Ação coletiva, normas sociais e redes', paragraphs: [
    'A abordagem da ação coletiva destaca expectativas sobre o comportamento dos outros. Uma pessoa pode rejeitar a corrupção e ainda temer perdas se acreditar que será a única a recusar um esquema.',
    'Redes podem distribuir direcionamento, ocultação e proteção entre integrantes. A retirada de uma pessoa não necessariamente elimina as condições que sustentam a prática. Isso não autoriza atribuir culpa coletiva sem apuração individualizada.',
    'Respostas coerentes combinam proteção de relatos, mudança de incentivos, coordenação e controle confiável; apenas repetir a proibição formal pode não alterar as expectativas.',
  ], source: source('07-reproducao-e-captura/modelos-explicativos.md', 'F11 — UNODC; F14 — OCDE, integridade e ação coletiva') },
  { id: 'cgu26-ep-exp-captura', title: 'Captura e representação legítima de interesses', paragraphs: [
    'Captura de políticas é o desvio persistente ou reiterado de decisões públicas para interesses específicos. Pode atingir agendas, regras, critérios e fiscalização, inclusive mediante mecanismos formalmente legais.',
    'Representar interesses é parte do pluralismo. Contribuições privadas devem ser avaliadas quanto a transparência, contestabilidade, fundamento e relação com a finalidade pública. Uma audiência com uma empresa não prova captura por si só.',
  ], source: source('07-reproducao-e-captura/README.md', 'F13 — OCDE, Preventing Policy Capture; F15 — Participation') },
  { id: 'cgu26-ep-exp-respostas', title: 'Prevenir, detectar, responsabilizar e reparar', paragraphs: [
    'Prevenção reduz condições favoráveis ao desvio; detecção identifica sinais e fatos; responsabilização atribui consequências conforme o direito; reparação busca recompor perdas e efeitos.',
    'Essas funções podem ocorrer em paralelo. Recuperar valores não resolve automaticamente todas as responsabilidades, e aplicar uma sanção não garante que o serviço prejudicado tenha sido restabelecido.',
  ], source: source('08-consequencias-e-respostas/README.md', 'Aula 8 — quadro didático das funções de resposta') },
  { id: 'cgu26-ep-exp-deteccao', title: 'O indicador depende também da capacidade de detectar', paragraphs: [
    'O número de denúncias depende tanto da ocorrência de problemas quanto da possibilidade e disposição de relatá-los. Maior confiança no canal pode ampliar os registros sem aumento da corrupção.',
    'Menos denúncias podem refletir melhoria, mas também subnotificação ou retaliação. É preciso comparar cobertura, gravidade, qualidade e condições de produção dos dados. Essa é uma cautela metodológica, não uma conclusão causal sobre qualquer caso.',
  ], source: source('08-consequencias-e-respostas/README.md', 'Aula 8 — avaliação das respostas e inferência sobre indicadores') },
  { id: 'cgu26-ep-exp-danos', title: 'Consequências institucionais e sociais da corrupção', paragraphs: [
    'Além de perdas financeiras, corrupção pode afetar direitos, qualidade dos serviços, competição, distribuição de recursos e confiança nas instituições.',
    'É necessário identificar e verificar os canais do dano no caso concreto. O valor apropriado não mede necessariamente todos os efeitos, mas tampouco autoriza inventar uma estimativa de prejuízo indireto.',
  ], source: source('08-consequencias-e-respostas/README.md', 'F12 — UNODC, Effects of Corruption') },
  { id: 'cgu26-ep-exp-instrumentos', title: 'Combinações entre Estado e mercado', paragraphs: [
    'Planejamento, regulação, financiamento e produção ou prestação direta são instrumentos diferentes. Planejar pode coordenar investimentos privados; financiar não significa executar o projeto; regular não significa produzir.',
    'Estado e mercado coexistem em arranjos institucionais. A escolha deve partir do problema, do mecanismo esperado, dos custos e das capacidades necessárias, respeitando o regime constitucional.',
  ], source: source('09-estado-e-desenvolvimento/README.md', 'Aula 9; CF, arts. 170 e 173–175') },
  { id: 'cgu26-ep-exp-estatais', title: 'Estatais, finalidade pública e desempenho', paragraphs: [
    'A justificativa da propriedade estatal deve indicar finalidade e objetivos, como infraestrutura, financiamento ou prestação de serviços. Precisa ser avaliada e revisada, com transparência sobre obrigações e custos.',
    'Lucro, isoladamente, não demonstra cumprimento da missão pública. Prejuízo também não comprova benefício social suficiente. A análise deve combinar resultados, distribuição, competição e sustentabilidade fiscal e socioambiental.',
  ], source: source('09-estado-e-desenvolvimento/README.md', 'F18 — OCDE, justificativas da propriedade estatal; comparação de alternativas') },
  { id: 'cgu26-ep-exp-alternativas', title: 'Diagnóstico, adicionalidade e comparação', paragraphs: [
    'Uma política de desenvolvimento deve ligar o instrumento à restrição diagnosticada: falta de infraestrutura, renda, coordenação ou financiamento exigem respostas potencialmente diferentes.',
    'Na avaliação de incentivos, adicionalidade é a mudança de comportamento ou resultado provocada pelo apoio em comparação ao que ocorreria sem ele. Financiar algo que aconteceria do mesmo modo pode consumir recursos sem produzir o efeito adicional pretendido.',
    'A comparação precisa examinar custos, capacidade de execução, riscos de captura, distribuição de benefícios, sustentabilidade e critérios de revisão.',
  ], source: source('09-estado-e-desenvolvimento/comparacao-de-alternativas.md', 'Aula 9 — matriz e caso comparativo didático') },
];

export const cguEstadoPoliticaCards: Card[] = [
  { id: 'cgu26-ep-001', subjectId: 'cgu26-ep-estado', question: 'Qual é a diferença entre Estado, governo e administração pública?', answer: 'Estado é a organização político-jurídica; governo exerce a direção política em um período; administração concretiza a atuação estatal.', explanationId: 'cgu26-ep-exp-estado', type: 'Pergunta e resposta', tag: 'Estado, governo e administração' },
  { id: 'cgu26-ep-002', subjectId: 'cgu26-ep-estado', question: 'O que distingue autoridade de mera capacidade de impor uma conduta?', answer: 'A autoridade envolve o reconhecimento da aptidão para dirigir; a mera imposição demonstra poder, mas não necessariamente esse reconhecimento.', explanationId: 'cgu26-ep-exp-legitimidade', type: 'Pergunta e resposta', tag: 'Poder e autoridade' },
  { id: 'cgu26-ep-003', subjectId: 'cgu26-ep-estado', question: 'A aprovação popular de uma decisão é suficiente para torná-la juridicamente válida.', answer: 'Errado. Popularidade não substitui competência nem afasta limites legais e constitucionais.', explanationId: 'cgu26-ep-exp-legitimidade', type: 'Certo ou errado', tag: 'Legalidade e legitimidade' },
  { id: 'cgu26-ep-004', subjectId: 'cgu26-ep-estado', question: 'Quais são os três tipos de legitimidade da dominação na tradição weberiana?', answer: 'Tradicional, carismática e legal-racional: apoiadas, respectivamente, em costumes, atributos pessoais do líder e regras institucionalizadas.', explanationId: 'cgu26-ep-exp-legitimidade', type: 'Pergunta e resposta', tag: 'Weber' },
  { id: 'cgu26-ep-005', subjectId: 'cgu26-ep-estado', question: 'Por que o interesse público não se confunde automaticamente com a preferência da maioria?', answer: 'Porque a decisão também precisa respeitar direitos e competências e ser justificada por critérios públicos em uma sociedade plural.', explanationId: 'cgu26-ep-exp-interesse', type: 'Pergunta e resposta', tag: 'Interesse público e pluralismo' },
  { id: 'cgu26-ep-006', subjectId: 'cgu26-ep-estado', question: 'Uma política pode melhorar o resultado médio e, ao mesmo tempo, prejudicar determinados grupos.', answer: 'Certo. A média não revela toda a distribuição de benefícios e custos.', explanationId: 'cgu26-ep-exp-interesse', type: 'Certo ou errado', tag: 'Conflitos distributivos' },

  { id: 'cgu26-ep-007', subjectId: 'cgu26-ep-democracia', question: 'Como a participação social pode complementar a representação política?', answer: 'Permitindo influenciar agendas, decisões e fiscalização também entre eleições, por mecanismos como consultas, audiências e conselhos.', explanationId: 'cgu26-ep-exp-participacao', type: 'Pergunta e resposta', tag: 'Representação e participação' },
  { id: 'cgu26-ep-008', subjectId: 'cgu26-ep-democracia', question: 'O resultado de uma consulta pública vincula a administração pelo simples fato de expressar a opinião dos participantes.', answer: 'Errado. Seu efeito depende das regras e competências aplicáveis; participação não produz vinculação automática.', explanationId: 'cgu26-ep-exp-participacao', type: 'Certo ou errado', tag: 'Participação e competência' },
  { id: 'cgu26-ep-009', subjectId: 'cgu26-ep-democracia', question: 'Por que publicar um relatório, por si só, não esgota a accountability?', answer: 'Porque também são necessárias condições de justificar, fiscalizar e contestar a atuação, com possíveis consequências institucionais.', explanationId: 'cgu26-ep-exp-accountability', type: 'Pergunta e resposta', tag: 'Accountability' },
  { id: 'cgu26-ep-010', subjectId: 'cgu26-ep-democracia', question: 'O que diferencia accountability vertical eleitoral de horizontal?', answer: 'A vertical eleitoral relaciona cidadãos e representantes nas eleições; a horizontal envolve controles entre instituições estatais.', explanationId: 'cgu26-ep-exp-accountability', type: 'Pergunta e resposta', tag: 'Controle democrático' },
  { id: 'cgu26-ep-011', subjectId: 'cgu26-ep-democracia', question: 'Um governo aprova uma política, mas não tem equipe nem dados para executá-la. Que distinção o caso ilustra?', answer: 'Condições políticas de aprovação e capacidade administrativa de execução são diferentes; obter apoio não garante implementar.', explanationId: 'cgu26-ep-exp-governabilidade', type: 'Pergunta e resposta', tag: 'Governabilidade' },
  { id: 'cgu26-ep-012', subjectId: 'cgu26-ep-democracia', question: 'A independência dos Poderes é compatível com controles recíprocos previstos na Constituição.', answer: 'Certo. Independência não significa ausência de controle; cada instituição deve respeitar suas competências.', explanationId: 'cgu26-ep-exp-governabilidade', type: 'Certo ou errado', tag: 'Separação dos Poderes' },

  { id: 'cgu26-ep-013', subjectId: 'cgu26-ep-federalismo', question: 'Qual é a diferença entre autonomia federativa e soberania?', answer: 'Autonomia é o espaço próprio de organização e decisão dos entes dentro da Constituição; soberania pertence à República Federativa do Brasil.', explanationId: 'cgu26-ep-exp-federalismo', type: 'Pergunta e resposta', tag: 'Autonomia e soberania' },
  { id: 'cgu26-ep-014', subjectId: 'cgu26-ep-federalismo', question: 'Por receber recursos da União para uma política, o município passa a integrar sua hierarquia administrativa.', answer: 'Errado. A transferência pode estabelecer condições e coordenação, mas não elimina a autonomia nem cria hierarquia administrativa geral.', explanationId: 'cgu26-ep-exp-federalismo', type: 'Certo ou errado', tag: 'Coordenação federativa' },
  { id: 'cgu26-ep-015', subjectId: 'cgu26-ep-federalismo', question: 'Qual é a finalidade da coordenação em políticas que envolvem vários entes federativos?', answer: 'Compatibilizar decisões, responsabilidades e incentivos para reduzir lacunas e sobreposições na atuação conjunta.', explanationId: 'cgu26-ep-exp-federalismo', type: 'Pergunta e resposta', tag: 'Cooperação e coordenação' },
  { id: 'cgu26-ep-016', subjectId: 'cgu26-ep-federalismo', question: 'Por que aumentar o orçamento não garante, sozinho, maior capacidade estatal?', answer: 'Porque executar e sustentar políticas também exige pessoas, organização, informação, processos e articulação entre atores.', explanationId: 'cgu26-ep-exp-capacidades', type: 'Pergunta e resposta', tag: 'Capacidades estatais' },
  { id: 'cgu26-ep-017', subjectId: 'cgu26-ep-federalismo', question: 'O que distingue discricionariedade administrativa de arbitrariedade?', answer: 'Discricionariedade é escolha permitida e limitada pelo direito; arbitrariedade desrespeita limites e justificativas exigíveis.', explanationId: 'cgu26-ep-exp-discricionariedade', type: 'Pergunta e resposta', tag: 'Discricionariedade' },
  { id: 'cgu26-ep-018', subjectId: 'cgu26-ep-federalismo', question: 'As escolhas da burocracia na implementação podem influenciar o acesso efetivo a direitos.', answer: 'Certo. Interpretar regras e organizar atendimentos afeta como a política chega aos destinatários.', explanationId: 'cgu26-ep-exp-capacidades', type: 'Certo ou errado', tag: 'Burocracia e implementação' },

  { id: 'cgu26-ep-019', subjectId: 'cgu26-ep-direitos', question: 'Qual é a diferença entre fundamentos da República e objetivos fundamentais?', answer: 'Fundamentos são bases do Estado, como dignidade humana; objetivos orientam transformações, como reduzir desigualdades.', explanationId: 'cgu26-ep-exp-constituicao', type: 'Pergunta e resposta', tag: 'Fundamentos e objetivos' },
  { id: 'cgu26-ep-020', subjectId: 'cgu26-ep-direitos', question: 'Os direitos sociais integram o conjunto dos direitos fundamentais.', answer: 'Certo. A Constituição os organiza no Título II, dedicado aos direitos e garantias fundamentais.', explanationId: 'cgu26-ep-exp-constituicao', type: 'Certo ou errado', tag: 'Direitos sociais' },
  { id: 'cgu26-ep-021', subjectId: 'cgu26-ep-direitos', question: 'Exigir o mesmo aplicativo de todos pode criar exclusão. Que distinção ajuda a analisar isso?', answer: 'Igualdade formal e material: uma exigência uniforme pode ignorar barreiras relevantes ao acesso efetivo.', explanationId: 'cgu26-ep-exp-igualdade', type: 'Pergunta e resposta', tag: 'Igualdade material' },
  { id: 'cgu26-ep-022', subjectId: 'cgu26-ep-direitos', question: 'Por que um alerta automatizado de irregularidade não equivale a uma conclusão sobre responsabilidade?', answer: 'Porque é um sinal a verificar; a atribuição de responsabilidade exige fatos, fundamento e o procedimento cabível.', explanationId: 'cgu26-ep-exp-processo', type: 'Pergunta e resposta', tag: 'Devido processo' },
  { id: 'cgu26-ep-023', subjectId: 'cgu26-ep-direitos', question: 'Quais princípios estão expressos no caput do art. 37 da Constituição?', answer: 'Legalidade, impessoalidade, moralidade, publicidade e eficiência — LIMPE.', explanationId: 'cgu26-ep-exp-principios', type: 'Pergunta e resposta', tag: 'Princípios administrativos' },
  { id: 'cgu26-ep-024', subjectId: 'cgu26-ep-direitos', question: 'Segundo a LINDB, invocar um valor jurídico abstrato dispensa a análise das consequências práticas da decisão.', answer: 'Errado. O art. 20 exige considerar consequências práticas; a motivação deve demonstrar necessidade e adequação da medida.', explanationId: 'cgu26-ep-exp-consequencias', type: 'Certo ou errado', tag: 'LINDB e motivação' },

  { id: 'cgu26-ep-025', subjectId: 'cgu26-ep-valor', question: 'Por que contar tarefas concluídas não basta para demonstrar valor público?', answer: 'Porque valor público depende de benefícios relevantes e atendimento efetivo de necessidades sociais, não só de volume de atividade.', explanationId: 'cgu26-ep-exp-valor', type: 'Pergunta e resposta', tag: 'Valor público' },
  { id: 'cgu26-ep-026', subjectId: 'cgu26-ep-valor', question: 'Qual é a diferença entre entrega e resultado social de uma política?', answer: 'Entrega é o produto imediato da atividade; resultado social é a mudança relevante para os destinatários.', explanationId: 'cgu26-ep-exp-valor', type: 'Pergunta e resposta', tag: 'Entregas e resultados' },
  { id: 'cgu26-ep-027', subjectId: 'cgu26-ep-valor', question: 'Cumprir a meta de quantidade de atendimentos demonstra, por si só, a efetividade do serviço.', answer: 'Errado. Demonstra alcance da meta, mas a efetividade exige verificar os efeitos sobre o problema dos usuários.', explanationId: 'cgu26-ep-exp-desempenho', type: 'Certo ou errado', tag: 'Eficácia e efetividade' },
  { id: 'cgu26-ep-028', subjectId: 'cgu26-ep-valor', question: 'Quem exerce o controle externo federal previsto nos arts. 70 e 71 da Constituição?', answer: 'O Congresso Nacional, com o auxílio do Tribunal de Contas da União.', explanationId: 'cgu26-ep-exp-controles', type: 'Pergunta e resposta', tag: 'Controle externo' },
  { id: 'cgu26-ep-029', subjectId: 'cgu26-ep-valor', question: 'Um controle pode reduzir determinado risco e ainda precisar de revisão por criar custos e barreiras desproporcionais.', answer: 'Certo. Sua avaliação deve considerar tanto a proteção produzida quanto seus efeitos sobre recursos, acesso e resultados.', explanationId: 'cgu26-ep-exp-controles', type: 'Certo ou errado', tag: 'Proporcionalidade dos controles' },

  { id: 'cgu26-ep-030', subjectId: 'cgu26-ep-corrupcao', question: 'Qual é o núcleo da definição analítica ampla de corrupção usada no módulo?', answer: 'Uso abusivo de poder confiado para produzir benefício particular, inclusive para terceiros.', explanationId: 'cgu26-ep-exp-corrupcao', type: 'Pergunta e resposta', tag: 'Conceito de corrupção' },
  { id: 'cgu26-ep-031', subjectId: 'cgu26-ep-corrupcao', question: 'O atraso de um contrato comprova que houve corrupção em sua execução.', answer: 'Errado. O atraso pode ter outras causas; é preciso verificar fatos, eventual desvio e responsabilidades.', explanationId: 'cgu26-ep-exp-corrupcao', type: 'Certo ou errado', tag: 'Falha de gestão' },
  { id: 'cgu26-ep-032', subjectId: 'cgu26-ep-corrupcao', question: 'O conflito de interesses da Lei nº 12.813/2013 depende de dano patrimonial ou recebimento de vantagem?', answer: 'Não. Sua ocorrência independe de dano ao patrimônio público e de vantagem ou ganho para o agente ou terceiro.', explanationId: 'cgu26-ep-exp-conflito', type: 'Pergunta e resposta', tag: 'Conflito de interesses' },
  { id: 'cgu26-ep-033', subjectId: 'cgu26-ep-corrupcao', question: 'O que distingue clientelismo de uma política programática que também gera apoio eleitoral?', answer: 'No clientelismo, benefícios particularizados se articulam à lealdade ou apoio; gerar votos não torna clientelista uma política com critérios gerais.', explanationId: 'cgu26-ep-exp-favorecimento', type: 'Pergunta e resposta', tag: 'Clientelismo' },
  { id: 'cgu26-ep-034', subjectId: 'cgu26-ep-corrupcao', question: 'Na acepção analítica adotada na aula, identificar patronagem não basta para concluir que uma nomeação é corrupta.', answer: 'Certo. Essa acepção inclui nomeações discricionárias por confiança; a legalidade e o eventual desvio precisam de análise própria.', explanationId: 'cgu26-ep-exp-favorecimento', type: 'Certo ou errado', tag: 'Patronagem' },
  { id: 'cgu26-ep-035', subjectId: 'cgu26-ep-corrupcao', question: 'Nepotismo e clientelismo são conceitos equivalentes, pois ambos exigem vínculo familiar.', answer: 'Errado. Vínculo familiar caracteriza o favorecimento nepotista; clientelismo se refere à relação entre benefícios particularizados e apoio político.', explanationId: 'cgu26-ep-exp-favorecimento', type: 'Certo ou errado', tag: 'Nepotismo e clientelismo' },

  { id: 'cgu26-ep-036', subjectId: 'cgu26-ep-captura', question: 'Qual problema o modelo principal-agente destaca ao explicar possíveis desvios?', answer: 'A delegação com interesses divergentes e informação desigual, que dificulta ao principal verificar a conduta do agente.', explanationId: 'cgu26-ep-exp-agencia', type: 'Pergunta e resposta', tag: 'Principal-agente' },
  { id: 'cgu26-ep-037', subjectId: 'cgu26-ep-captura', question: 'Por que alguém que rejeita a corrupção pode participar de um esquema, segundo a abordagem da ação coletiva?', answer: 'Porque espera que os demais participem e teme perdas se agir sozinho; expectativas e coordenação sustentam o problema.', explanationId: 'cgu26-ep-exp-coletiva', type: 'Pergunta e resposta', tag: 'Ação coletiva' },
  { id: 'cgu26-ep-038', subjectId: 'cgu26-ep-captura', question: 'Uma rede de favorecimento pode persistir após a saída de um integrante se mantiver seus mecanismos de proteção e ocultação.', answer: 'Certo. Retirar uma pessoa não necessariamente elimina os incentivos e relações que reproduzem a prática.', explanationId: 'cgu26-ep-exp-coletiva', type: 'Certo ou errado', tag: 'Redes e reprodução' },
  { id: 'cgu26-ep-039', subjectId: 'cgu26-ep-captura', question: 'O que caracteriza a captura de políticas públicas?', answer: 'O desvio persistente ou reiterado de decisões públicas em favor de interesses específicos, afetando agendas, regras, critérios ou fiscalização.', explanationId: 'cgu26-ep-exp-captura', type: 'Pergunta e resposta', tag: 'Captura de políticas' },
  { id: 'cgu26-ep-040', subjectId: 'cgu26-ep-captura', question: 'Receber contribuições técnicas de uma associação empresarial basta para caracterizar captura da decisão pública.', answer: 'Errado. A representação de interesses pode ser legítima; é preciso avaliar transparência, contestabilidade, fundamentos e eventual favorecimento sistemático.', explanationId: 'cgu26-ep-exp-captura', type: 'Certo ou errado', tag: 'Representação de interesses' },
  { id: 'cgu26-ep-041', subjectId: 'cgu26-ep-captura', question: 'A concentração de conhecimento técnico no executor pode dificultar a supervisão sem, por si só, provar corrupção.', answer: 'Certo. Ela pode criar assimetria de informação; a vulnerabilidade exige verificação, não presunção de culpa.', explanationId: 'cgu26-ep-exp-agencia', type: 'Certo ou errado', tag: 'Assimetria de informação' },

  { id: 'cgu26-ep-042', subjectId: 'cgu26-ep-respostas', question: 'Que funções distinguem prevenção, detecção, responsabilização e reparação?', answer: 'Reduzir oportunidades; identificar sinais e fatos; atribuir consequências conforme o direito; recompor perdas e efeitos, respectivamente.', explanationId: 'cgu26-ep-exp-respostas', type: 'Pergunta e resposta', tag: 'Respostas à corrupção' },
  { id: 'cgu26-ep-043', subjectId: 'cgu26-ep-respostas', question: 'O aumento de denúncias pode refletir maior confiança no canal, sem aumento da ocorrência de corrupção.', answer: 'Certo. Registros dependem também da disposição e da capacidade de relatar; o indicador exige interpretação contextual.', explanationId: 'cgu26-ep-exp-deteccao', type: 'Certo ou errado', tag: 'Detecção e indicadores' },
  { id: 'cgu26-ep-044', subjectId: 'cgu26-ep-respostas', question: 'Além da perda financeira, quais danos a corrupção pode causar?', answer: 'Prejuízos a direitos, qualidade dos serviços, competição, distribuição de recursos e confiança institucional.', explanationId: 'cgu26-ep-exp-danos', type: 'Pergunta e resposta', tag: 'Consequências da corrupção' },
  { id: 'cgu26-ep-045', subjectId: 'cgu26-ep-respostas', question: 'A suspeita de corrupção em contrato de serviço essencial torna dispensável examinar os impactos da medida de controle sobre os usuários.', answer: 'Errado. É preciso fundamentar a medida cabível e considerar consequências e continuidade, sem afastar a apuração e a aplicação da lei.', explanationId: 'cgu26-ep-exp-consequencias', type: 'Certo ou errado', tag: 'Controle e continuidade' },

  { id: 'cgu26-ep-046', subjectId: 'cgu26-ep-desenvolvimento', question: 'Qual é a diferença entre regular, financiar e produzir ou prestar diretamente?', answer: 'Regular estabelece regras e incentivos; financiar viabiliza recursos; produzir ou prestar diretamente executa a atividade.', explanationId: 'cgu26-ep-exp-instrumentos', type: 'Pergunta e resposta', tag: 'Instrumentos de atuação estatal' },
  { id: 'cgu26-ep-047', subjectId: 'cgu26-ep-desenvolvimento', question: 'Planejamento estatal e atuação de empresas privadas são arranjos mutuamente excludentes.', answer: 'Errado. O planejamento pode coordenar investimentos privados e coexistir com mercado, regulação e financiamento.', explanationId: 'cgu26-ep-exp-instrumentos', type: 'Certo ou errado', tag: 'Estado e mercado' },
  { id: 'cgu26-ep-048', subjectId: 'cgu26-ep-desenvolvimento', question: 'O que deve ser explicitado e revisto ao justificar a propriedade de uma empresa estatal?', answer: 'Sua finalidade, objetivos públicos, obrigações, custos e resultados esperados, comparados às alternativas disponíveis.', explanationId: 'cgu26-ep-exp-estatais', type: 'Pergunta e resposta', tag: 'Empresas estatais' },
  { id: 'cgu26-ep-049', subjectId: 'cgu26-ep-desenvolvimento', question: 'Na avaliação de um subsídio, o que significa adicionalidade?', answer: 'A mudança de comportamento ou resultado provocada pelo apoio em comparação ao que ocorreria sem ele.', explanationId: 'cgu26-ep-exp-alternativas', type: 'Pergunta e resposta', tag: 'Avaliação de incentivos' },
  { id: 'cgu26-ep-050', subjectId: 'cgu26-ep-desenvolvimento', question: 'O lucro de uma estatal, isoladamente, não comprova o cumprimento de sua missão pública.', answer: 'Certo. Também é necessário avaliar objetivos, qualidade, acesso, distribuição de benefícios e sustentabilidade.', explanationId: 'cgu26-ep-exp-estatais', type: 'Certo ou errado', tag: 'Finalidade pública e desempenho' },
];
