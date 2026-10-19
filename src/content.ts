import { cguEstadoPoliticaCards, cguEstadoPoliticaExplanations, cguEstadoPoliticaSubjects } from './decks/cgu-estado-politica.ts';
import { desenhoTecnicoMecanicoCards, desenhoTecnicoMecanicoExplanations, desenhoTecnicoMecanicoSubjects } from './decks/desenho-tecnico-mecanico.ts';

export type Subject = { id: string; title: string; children?: Subject[] };
export type Explanation = { id: string; title: string; paragraphs: string[]; source: string };
export type Card = { id: string; subjectId: string; question: string; answer: string; explanationId: string; type: 'Certo ou errado' | 'Pergunta e resposta'; tag: string };

export const subjects: Subject[] = [
  ...desenhoTecnicoMecanicoSubjects,
  ...cguEstadoPoliticaSubjects,
  { id: 'constitucional', title: 'Direito Constitucional', children: [
    { id: 'principios', title: 'Princípios fundamentais', children: [
      { id: 'fundamentos', title: 'Fundamentos da República' },
      { id: 'objetivos', title: 'Objetivos fundamentais' },
    ] },
    { id: 'direitos', title: 'Direitos e garantias fundamentais', children: [{ id: 'individuais', title: 'Direitos individuais e coletivos' }] },
  ] },
  { id: 'administrativo', title: 'Direito Administrativo', children: [{ id: 'administracao', title: 'Administração pública', children: [{ id: 'limpe', title: 'Princípios administrativos' }] }] },
  { id: 'portugues', title: 'Língua Portuguesa', children: [{ id: 'gramatica', title: 'Gramática', children: [{ id: 'crase', title: 'Uso da crase' }] }] },
];
export const explanations: Explanation[] = [
  ...desenhoTecnicoMecanicoExplanations,
  ...cguEstadoPoliticaExplanations,
  { id: 'art1', title: 'Os cinco fundamentos da República', paragraphs: [
    'O art. 1º da Constituição Federal estabelece cinco fundamentos da República Federativa do Brasil: soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa e pluralismo político.',
    'Uma forma de lembrar é o mnemônico SO–CI–DI–VA–PLU. Atenção à distinção: fundamentos são as bases do Estado; objetivos fundamentais são as metas que ele busca alcançar (art. 3º).',
  ], source: 'Constituição Federal de 1988 · Art. 1º' },
  { id: 'art3', title: 'Fundamentos não são objetivos', paragraphs: ['O art. 3º define os objetivos fundamentais: construir uma sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; promover o bem de todos, sem preconceitos ou discriminação.', 'Observe os verbos: construir, garantir, erradicar e promover indicam ações e ajudam a reconhecer os objetivos em uma questão.'], source: 'Constituição Federal de 1988 · Art. 3º' },
  { id: 'art5', title: 'Igualdade e liberdade de expressão', paragraphs: ['O art. 5º assegura a igualdade perante a lei e a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.', 'A manifestação do pensamento é livre, mas o anonimato é vedado. A liberdade não elimina a responsabilidade por eventuais danos.'], source: 'Constituição Federal de 1988 · Art. 5º, caput e IV' },
  { id: 'art37', title: 'Os princípios expressos da administração', paragraphs: ['Legalidade, impessoalidade, moralidade, publicidade e eficiência são os princípios expressos no caput do art. 37. O mnemônico LIMPE ajuda a memorizá-los.', 'Eles se aplicam à administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios.'], source: 'Constituição Federal de 1988 · Art. 37' },
  { id: 'crase-regra', title: 'Crase: a fusão de dois “a”', paragraphs: ['A crase pode ocorrer quando a preposição a se encontra com o artigo feminino a. Em “Vou à escola”, o verbo exige a preposição e o substantivo admite o artigo.', 'Um teste útil é substituir o termo feminino por um masculino equivalente: “Vou ao colégio”. O encontro “ao” é um indício de crase na construção feminina.'], source: 'Material demonstrativo · Gramática normativa' },
];
export const cards: Card[] = [
  ...desenhoTecnicoMecanicoCards,
  ...cguEstadoPoliticaCards,
  { id: 'fund-1', subjectId: 'fundamentos', question: 'A soberania é um dos fundamentos da República Federativa do Brasil.', answer: 'Certo. A soberania está prevista no art. 1º, inciso I, da Constituição Federal.', explanationId: 'art1', type: 'Certo ou errado', tag: 'Art. 1º' },
  { id: 'fund-2', subjectId: 'fundamentos', question: 'Quais são os cinco fundamentos da República Federativa do Brasil?', answer: 'Soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa e pluralismo político.', explanationId: 'art1', type: 'Pergunta e resposta', tag: 'Art. 1º' },
  { id: 'fund-3', subjectId: 'fundamentos', question: 'A dignidade da pessoa humana é um objetivo fundamental da República.', answer: 'Errado. É um fundamento (art. 1º, III), e não um objetivo fundamental do art. 3º.', explanationId: 'art1', type: 'Certo ou errado', tag: 'Art. 1º' },
  { id: 'fund-4', subjectId: 'fundamentos', question: 'O pluralismo político é um dos fundamentos da República.', answer: 'Certo. Está expressamente previsto no art. 1º, inciso V.', explanationId: 'art1', type: 'Certo ou errado', tag: 'Art. 1º' },
  { id: 'obj-1', subjectId: 'objetivos', question: 'Erradicar a pobreza e reduzir as desigualdades sociais e regionais é um objetivo fundamental da República.', answer: 'Certo. É um dos objetivos estabelecidos pelo art. 3º, inciso III.', explanationId: 'art3', type: 'Certo ou errado', tag: 'Art. 3º' },
  { id: 'obj-2', subjectId: 'objetivos', question: 'Quais verbos ajudam a memorizar os objetivos fundamentais da República?', answer: 'Construir, garantir, erradicar (e reduzir) e promover.', explanationId: 'art3', type: 'Pergunta e resposta', tag: 'Art. 3º' },
  { id: 'dir-1', subjectId: 'individuais', question: 'É livre a manifestação do pensamento, sendo permitido o anonimato.', answer: 'Errado. A manifestação do pensamento é livre, mas o anonimato é vedado.', explanationId: 'art5', type: 'Certo ou errado', tag: 'Art. 5º' },
  { id: 'dir-2', subjectId: 'individuais', question: 'Quais direitos são mencionados como invioláveis no caput do art. 5º?', answer: 'Vida, liberdade, igualdade, segurança e propriedade.', explanationId: 'art5', type: 'Pergunta e resposta', tag: 'Art. 5º' },
  { id: 'adm-1', subjectId: 'limpe', question: 'Quais são os cinco princípios expressos no caput do art. 37 da Constituição?', answer: 'Legalidade, impessoalidade, moralidade, publicidade e eficiência (LIMPE).', explanationId: 'art37', type: 'Pergunta e resposta', tag: 'Art. 37' },
  { id: 'adm-2', subjectId: 'limpe', question: 'Os princípios do art. 37 se aplicam apenas à administração pública direta.', answer: 'Errado. Aplicam-se à administração direta e indireta de qualquer dos Poderes e entes federativos.', explanationId: 'art37', type: 'Certo ou errado', tag: 'Art. 37' },
  { id: 'pt-1', subjectId: 'crase', question: 'O uso do acento grave está correto em “Vou à escola”.', answer: 'Certo. Há encontro da preposição a com o artigo feminino a.', explanationId: 'crase-regra', type: 'Certo ou errado', tag: 'Crase' },
  { id: 'pt-2', subjectId: 'crase', question: 'Qual substituição pode ajudar a verificar a crase em “Vou à escola”?', answer: 'Trocar “escola” por “colégio”: “Vou ao colégio”. O encontro “ao” ajuda a identificar a preposição e o artigo.', explanationId: 'crase-regra', type: 'Pergunta e resposta', tag: 'Crase' },
];
export function descendantIds(subject: Subject): string[] { return [subject.id, ...(subject.children?.flatMap(descendantIds) ?? [])]; }
export function subjectPath(id: string, nodes = subjects): Subject[] {
  for (const node of nodes) { if (node.id === id) return [node]; const rest = subjectPath(id, node.children ?? []); if (rest.length) return [node, ...rest]; }
  return [];
}

