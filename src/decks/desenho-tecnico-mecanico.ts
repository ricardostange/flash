import type { Card, Explanation, Subject } from '../content.ts';

// Original study material. Keep numeric card IDs and explanation keys stable.
// Projection, drawing conventions and examples state their own assumptions.
const topics = [
  ['fundamentos', '1. Fundamentos, folhas e escalas'],
  ['linhas', '2. Linhas e simbologia'],
  ['projecoes', '3. Projeções ortogonais'],
  ['perspectivas', '4. Perspectivas e vistas especiais'],
  ['cortes', '5. Cortes e seções'],
  ['cotagem', '6. Cotagem funcional'],
  ['ajustes', '7. Tolerâncias dimensionais e ajustes'],
  ['geometria', '8. Tolerâncias geométricas'],
  ['acabamento', '9. Rugosidade e fabricação'],
  ['elementos', '10. Elementos de máquinas e conjuntos'],
] as const;
type Topic = typeof topics[number][0];
const source = (section: string, reference: string) => `conteudos/desenho-tecnico-mecanico/FONTES.md#${section} · ${reference}`;

export const desenhoTecnicoMecanicoSubjects: Subject[] = [
  { id: 'desenho-tecnico-mecanico', title: 'Desenho Técnico Mecânico', children:
    topics.map(([key, title]) => ({ id: `dtm-${key}`, title })),
  },
];

const explanation = (key: string, title: string, paragraphs: string[], reference: string): Explanation => ({
  id: `dtm-exp-${key}`, title, paragraphs, source: reference,
});

export const desenhoTecnicoMecanicoExplanations: Explanation[] = [
  explanation('documentacao', 'Desenho como especificação e documento controlado', [
    'O desenho técnico comunica geometria, dimensões e requisitos para fabricar, montar e verificar uma peça. A perspectiva sozinha pode ajudar a visualizar, mas não substitui uma especificação completa.',
    'Um croqui pode ser feito à mão livre; deve continuar legível e coerente. Legenda e controle de revisão identificam peça, material, unidade, escala e versão aplicáveis, evitando fabricar com dados desatualizados.',
  ], source('fundamentos', 'IFMG — Desenho Técnico, aula 1; USP — tipos de desenho')),
  explanation('escalas', 'Escala gráfica e dimensão real', [
    'A escala é a razão entre comprimento representado e comprimento real, usando a mesma unidade. Em 1:2 o desenho tem metade do tamanho; em 5:1 ele é cinco vezes maior. O valor da cota informa a dimensão real especificada, não a medida reduzida ou ampliada no papel.',
    'Exemplos elaborados: 80 mm reais em 1:2 ocupam 40 mm; 30 mm desenhados em 5:1 representam 6 mm reais. Um detalhe pode usar escala própria, identificada. O formato A4 mede 210 × 297 mm antes das margens.',
  ], source('escalas', 'IFMG — formatos da série A; relações geométricas e exemplos próprios')),
  explanation('linhas', 'Tipos de linha e hierarquia gráfica', [
    'Na representação convencional, contornos visíveis usam linha contínua larga; arestas ocultas, tracejada estreita; eixos e centros, traço e ponto estreita. Linhas de cota, auxiliares e de chamada são contínuas estreitas.',
    'A linha de centro identifica um eixo ou simetria, não a largura de um furo. Quando representações coincidem, o contorno visível tem precedência sobre a aresta oculta. Diferenciar padrões e espessuras permite interpretar a função de cada linha.',
  ], source('linhas', 'IFMG — aula 1, seção 1.4; convenções de representação')),
  explanation('planocorte', 'Plano de corte e sentido de observação', [
    'O traçado do plano de corte localiza a passagem imaginária pela peça. As setas indicam o sentido de observação da representação resultante, e as letras relacionam o corte à sua identificação, como A–A.',
    'Não confunda a linha indicadora do plano com as hachuras: a primeira localiza a operação imaginária; as hachuras distinguem o material efetivamente interceptado.',
  ], source('cortes', 'USP — cortes; princípios de representação')),
  explanation('projecoes', 'Vistas e correspondência entre dimensões', [
    'Na projeção ortogonal, as projetantes são paralelas entre si e perpendiculares ao plano de projeção. Fixando largura, altura e profundidade da peça, a frontal mostra largura e altura; a superior, largura e profundidade; a lateral, profundidade e altura.',
    'As vistas devem concordar nas dimensões compartilhadas. A frontal é escolhida para caracterizar bem a peça e facilitar a leitura, não simplesmente por ser o lado mais bonito. São usadas tantas vistas quanto necessário para definir a geometria sem ambiguidade.',
  ], source('projecoes', 'ISO 5456-2 — escopo; IFMG — aula 7')),
  explanation('diedros', 'Primeiro e terceiro diedros', [
    'No primeiro diedro, o objeto fica entre observador e plano: a superior é colocada abaixo da frontal, e a lateral direita, à esquerda da frontal. No terceiro diedro, o plano fica entre observador e objeto: a superior fica acima e a lateral direita, à direita.',
    'O nome lateral direita informa de onde a peça é observada, não a posição do desenho na folha. Identifique o método indicado antes de reconstruir a peça. As configurações de um CAD podem variar e não substituem essa identificação.',
  ], source('diedros', 'Autodesk Fusion — Projection angle; ISO 5456-2')),
  explanation('isometria', 'Isometria: eixos, círculos e coeficiente de redução', [
    'Os três eixos projetados isométricos fazem 120° entre si. Na orientação usual, um é vertical e dois fazem 30° com a horizontal. Círculos em planos isométricos aparecem como elipses, e retas paralelas continuam paralelas.',
    'A projeção isométrica ortogonal estrita reduz igualmente as medidas axiais por cerca de 0,816. No desenho isométrico simplificado, usam-se comprimentos sem essa redução nos três eixos. É importante dizer qual construção está sendo considerada.',
  ], source('isometria', 'IFMG — aula 8, seção 8.2.2')),
  explanation('vistas', 'Vistas auxiliares, detalhes e vistas parciais', [
    'Uma face plana inclinada a um plano principal aparece encurtada nessa vista. Uma vista auxiliar com plano paralelo à face permite mostrá-la em verdadeira grandeza, respeitada a escala. As projetantes ficam perpendiculares ao novo plano.',
    'Um detalhe amplia uma região, com identificação e escala próprias. A vista parcial representa somente a parte necessária de uma vista. Essas representações complementam a leitura sem criar uma geometria diferente da peça.',
  ], source('vistas', 'IFMG — projeções; USP — vistas auxiliares e especiais')),
  explanation('cavaleira', 'Perspectiva cavaleira', [
    'Na cavaleira, a face paralela ao plano do desenho preserva sua forma; a profundidade é representada em direção oblíqua. Um coeficiente de redução pode ser aplicado ao eixo de profundidade para melhorar a leitura.',
    'Exemplo próprio: com coeficiente 1/2 e profundidade real de 40 mm, marcam-se 20 mm no eixo de profundidade, antes de eventual escala geral. A cota da profundidade real continua sendo 40 mm.',
  ], source('perspectivas', 'Geometria das projeções paralelas; exemplo próprio')),
  explanation('tiposcorte', 'Corte, seção e tipos de corte', [
    'Uma seção representa a interseção da peça com o plano secante. Uma vista em corte pode mostrar, além dessa interseção, contornos visíveis situados além do plano. O corte total atravessa a peça; o meio corte combina metade externa e metade em corte, usualmente em peças simétricas.',
    'O corte em desvio usa um percurso que passa por elementos não alinhados, como furos em posições diferentes. O corte local revela apenas uma região, limitada por linha de ruptura. Nenhuma dessas operações imaginárias altera a peça fabricada.',
  ], source('cortes', 'USP — cortes total, parcial, composto e meio corte; omissão e seções')),
  explanation('hachuras', 'Material interceptado e omissões convencionais', [
    'Hachuras são linhas contínuas estreitas sobre áreas de material interceptado. O interior vazio de um furo não é hachurado. A inclinação de 45° é usual, mas pode ser alterada para não coincidir com contornos. Peças adjacentes podem ser diferenciadas por direção ou espaçamento.',
    'Uma nervura cortada longitudinalmente costuma ser mostrada sem hachura por convenção, para evitar interpretação de espessura maciça. Em corte transversal, ela pode ser hachurada. A omissão depende da orientação e da convenção, não é uma regra de que nervuras nunca recebem hachuras.',
  ], source('hachuras', 'USP — omissão de corte, seção e interrupção')),
  explanation('cotagem', 'Cotas de tamanho, símbolos e legibilidade', [
    'A cotagem define tamanho e localização dos elementos. O símbolo Ø indica diâmetro; R indica raio. Um arco de R10 pertence a uma circunferência de diâmetro 20 na mesma unidade, mas a cota R10 continua especificando um raio.',
    'Evite repetir a mesma cota como requisito independente e prefira cotar na vista em que o elemento é claro, em vez de recorrer a linhas ocultas. As escolhas devem atender função, fabricação e inspeção; não apenas preencher espaços vazios.',
  ], source('cotagem', 'USP — cotas e símbolos; princípios de dimensionamento')),
  explanation('referencias', 'Cotagem por referência comum e por coordenadas', [
    'Na cotagem em paralelo ou por referência comum, as posições partem de uma mesma origem. Na cotagem em cadeia, uma posição é definida a partir da anterior. A primeira evita somar toda uma sequência de tolerâncias para localizar elementos em relação à origem.',
    'A cotagem por coordenadas indica posições, por exemplo X e Y, em relação às origens e eixos definidos. Sem uma referência clara, números de coordenadas não determinam a localização do elemento.',
  ], source('referencias', 'Autodesk — Types of Dimensions, Baseline e Ordinate')),
  explanation('cadeias', 'Acúmulo de tolerâncias em cadeia', [
    'Em uma cadeia linear, o limite de variação da soma pode ser calculado somando as variações dos trechos no pior caso. A hipótese é permitir que os extremos ocorram simultaneamente, sem aplicar um modelo estatístico.',
    'Exemplo próprio: três trechos independentes de 10 ± 0,1 mm resultam em comprimento total de 30 ± 0,3 mm no pior caso. Cotas por origem comum mudam quais relações dimensionais são diretamente controladas; não eliminam toda variação.',
  ], source('cadeias', 'Autodesk — dimensões em cadeia; cálculo de extremos próprio')),
  explanation('tolerancias', 'Limites, afastamentos e tolerância dimensional', [
    'A dimensão nominal identifica o tamanho de referência; os afastamentos determinam os limites aceitáveis. A tolerância é a diferença entre o limite superior e o inferior, e não o próprio afastamento.',
    'Exemplos próprios: 40 ± 0,05 mm admite 39,95 a 40,05 mm, com tolerância total de 0,10 mm. Já 20 com afastamentos +0,03/0 mm admite 20,00 a 20,03 mm, com tolerância total de 0,03 mm.',
  ], source('tolerancias', 'Miki Pulley — tolerâncias e ajustes; exercícios numéricos próprios')),
  explanation('ajustes', 'Folga, interferência e transição', [
    'Para um par furo–eixo, folga = diâmetro do furo − diâmetro do eixo. A folga mínima usa furo mínimo e eixo máximo; a máxima usa furo máximo e eixo mínimo. Na interferência, o eixo excede o furo, e sua magnitude é eixo − furo.',
    'No ajuste com folga, o furo não é menor que o eixo nos limites especificados. Na interferência, o eixo não é menor que o furo. Na transição, a combinação de dimensões efetivas pode resultar em folga ou interferência. Para casos-limite e designações, consulte a norma e os limites completos.',
  ], source('ajustes', 'Miki Pulley — Common types of fits; cálculos próprios')),
  explanation('codigoiso', 'Como ler H7 e h6', [
    'Na designação ISO de tolerâncias, letras maiúsculas se aplicam a furos e minúsculas a eixos. A letra indica a posição do campo em relação à dimensão nominal; o número indica o grau de tolerância, cujo valor depende da faixa dimensional.',
    'Em H, o afastamento inferior do furo é zero; em h, o superior do eixo é zero. O número 7 não significa 0,007 mm. H7, sem dimensão nominal e sem o eixo correspondente, não fornece por si só todos os limites nem o tipo de ajuste do conjunto.',
  ], source('codigo-iso', 'ISO 286 — sistema de tolerâncias; Miki Pulley — catálogo técnico')),
  explanation('datums', 'Tolerância geométrica, datum e quadro de controle', [
    'A tolerância dimensional limita tamanhos; a geométrica controla características como forma, orientação e posição. Datum é uma referência geometricamente ideal, estabelecida a partir de um elemento real de referência, como uma face ou um furo.',
    'O quadro de controle identifica a característica geométrica, a zona e, quando aplicável, modificadores e referências. O quadro deve ser lido na ordem indicada; não basta reconhecer um símbolo isolado.',
  ], source('datums', 'KEYENCE — What Are Datums?; Feature Control Frame')),
  explanation('forma', 'Planicidade, circularidade e cilindricidade', [
    'Planicidade de uma superfície limita seus pontos entre dois planos paralelos separados pela tolerância. Circularidade controla cada seção circular por dois círculos concêntricos; cilindricidade controla a superfície cilíndrica por dois cilindros coaxiais.',
    'Esses controles de forma não referenciam um datum. Uma tolerância de planicidade 0,05 mm é a largura total da zona, não ±0,05 mm. Superfície plana não significa automaticamente superfície paralela a outra face.',
  ], source('forma', 'KEYENCE — Form Tolerance')),
  explanation('orientacao', 'Orientação em relação a uma referência', [
    'Paralelismo e perpendicularidade orientam a zona tolerada em relação a um datum. Isso os distingue de controles de forma, como a planicidade. Na perpendicularidade de uma face a um plano de referência, a zona pode ser dois planos paralelos orientados a 90° em relação ao datum.',
    'O valor do quadro de perpendicularidade é uma distância que limita a zona, na unidade aplicável, não um desvio angular em graus. A forma da zona depende da característica e dos símbolos indicados.',
  ], source('orientacao', 'KEYENCE — Orientation Tolerance')),
  explanation('posicao', 'Zona cilíndrica de tolerância de posição', [
    'Uma indicação de posição com Ø antes do valor especifica uma zona cilíndrica para o elemento controlado, nas condições indicadas. As dimensões teoricamente exatas e os datums estabelecem sua localização e orientação.',
    'Não se deve converter automaticamente Ø0,2 em ±0,2 em cada coordenada: uma zona cilíndrica e uma caixa de limites por coordenadas têm geometrias diferentes.',
  ], source('posicao', 'KEYENCE — Feature Control Frame e Location Tolerance')),
  explanation('material', 'Condição de máximo material', [
    'Máximo material é o estado em que resta mais material no elemento dimensional dentro dos limites especificados: maior diâmetro de um eixo ou menor diâmetro de um furo.',
    'Essa condição descreve o estado geométrico. A aplicação de modificadores e tolerâncias adicionais depende do sistema normativo e da indicação do projeto; não deve ser presumida só pelo tamanho da peça.',
  ], source('material', 'KEYENCE — Maximum Material Condition')),
  explanation('rugosidade', 'Ra, textura e função da superfície', [
    'Ra expressa a média dos valores absolutos dos desvios do perfil de rugosidade em relação à linha média, nas condições de avaliação. É frequentemente indicado em micrômetros: 1 µm = 0,001 mm. Ra não mede diretamente planicidade e não descreve sozinho todos os picos, vales ou a direção das marcas.',
    'Rugosidade corresponde a componentes de comprimento de onda menor que a ondulação no perfil separado por filtros. Perfis diferentes podem ter o mesmo Ra. A orientação das marcas pode afetar contato e vedação; especifique e avalie o que importa para a função.',
  ], source('rugosidade', 'KEYENCE — Arithmetical Mean Height e Surface Roughness Symbols')),
  explanation('processos', 'Indicações de processo e preparação das superfícies', [
    'Na simbologia convencional de estado de superfície estudada, a barra adicional indica remoção de material requerida; o círculo indica remoção não permitida. Consulte o sistema e a edição indicados no desenho para interpretar a especificação completa.',
    'Sobremetal é material reservado para remoção em etapa posterior, não uma folga de montagem. Remover rebarbas elimina arestas residuais de fabricação, mas não autoriza alterar diâmetros, raios ou superfícies funcionais além do especificado.',
  ], source('processos', 'KEYENCE — símbolos de superfície; fundamentos de fabricação')),
  explanation('roscas', 'Roscas métricas: tamanho, passo e avanço', [
    'Em M10 × 1,5, M identifica a rosca métrica, 10 é o diâmetro nominal em milímetros e 1,5 é o passo axial entre filetes sucessivos do perfil. A designação completa pode incluir tolerância, sentido e outros dados.',
    'O avanço por volta é o passo multiplicado pelo número de entradas. Em uma rosca de duas entradas e passo 1,5 mm, é 3 mm por volta. A representação simplificada usa linhas convencionais para os diâmetros, sem exigir desenhar toda a hélice.',
  ], source('roscas', 'Carr Lane — rosca e passo M10; USP — representação de roscas; cálculo próprio')),
  explanation('furos', 'Furos e alojamentos', [
    'Furo passante atravessa a espessura da peça; furo cego termina em seu interior. Em furo cego, profundidade e diâmetro precisam ser interpretados conforme a chamada, distinguindo quando necessário a parte cilíndrica do fundo da broca.',
    'Escareado é um alargamento cônico; rebaixo cilíndrico tem parede cilíndrica e fundo plano. Eles podem alojar cabeças de parafusos diferentes e não são intercambiáveis sem verificar a geometria especificada.',
  ], source('furos', 'Princípios de representação e geometria; Autodesk — documentação de furos')),
  explanation('conjuntos', 'Conjunto, lista de materiais e detalhamento', [
    'O desenho de conjunto mostra relações de montagem; o de detalhe especifica uma peça para fabricação e inspeção. Balões relacionam itens à lista de peças, que informa identificação e quantidade. Uma vista explodida auxilia a leitura da montagem, sem definir por si todos os ajustes e requisitos.',
    'Componentes normalizados podem ser identificados por designação ou norma, em vez de reproduzir cada detalhe. Ainda é necessário especificar as características requeridas, como tamanho, material, classe ou versão aplicável.',
  ], source('conjuntos', 'USP — tipos de desenho e montagens mecânicas')),
  explanation('chavetas', 'Chaveta e transmissão de torque', [
    'A chaveta estabelece uma ligação entre eixo e cubo para transmitir torque e limitar a rotação relativa, conforme o tipo de montagem. Seus rasgos precisam de geometria e tolerâncias compatíveis.',
    'Ela não garante, sozinha, travamento axial do cubo. Elementos de retenção axial e posicionamento dependem do projeto; não se deve inferi-los apenas da existência da chaveta.',
  ], source('chavetas', 'USP — elementos de união e transmissão')),
];

function qa(n: number, topic: Topic, key: string, tag: string, question: string, answer: string): Card {
  return { id: `dtm-${String(n).padStart(3, '0')}`, subjectId: `dtm-${topic}`, question, answer,
    explanationId: `dtm-exp-${key}`, type: 'Pergunta e resposta', tag };
}
function ce(n: number, topic: Topic, key: string, tag: string, question: string, correct: boolean, reason: string): Card {
  return { ...qa(n, topic, key, tag, question, `${correct ? 'Certo' : 'Errado'}. ${reason}`), type: 'Certo ou errado' };
}

export const desenhoTecnicoMecanicoCards: Card[] = [
  // 1–10: Fundamentos, folhas e escalas.
  qa(1, 'fundamentos', 'documentacao', 'Linguagem técnica', 'Qual é a função principal de um desenho técnico mecânico?', 'Comunicar geometria e requisitos necessários à fabricação, montagem e verificação da peça.'),
  qa(2, 'fundamentos', 'documentacao', 'Croqui', 'O que caracteriza um croqui técnico?', 'Representação geralmente feita à mão livre, legível e proporcional, que comunica a geometria e as informações necessárias.'),
  qa(3, 'fundamentos', 'documentacao', 'Legenda', 'Onde procurar identificação da peça, material, escala e revisão de um desenho?', 'Na legenda ou carimbo e nas notas e campos associados do documento.'),
  qa(4, 'fundamentos', 'documentacao', 'Revisão', 'Por que é necessário conferir a revisão do desenho antes de fabricar uma peça?', 'Para usar a versão autorizada dos requisitos e evitar fabricar conforme uma especificação desatualizada.'),
  qa(5, 'fundamentos', 'escalas', 'Escala', 'Como se define a escala de um desenho?', 'Razão entre o comprimento representado e o comprimento real correspondente, na mesma unidade.'),
  qa(6, 'fundamentos', 'escalas', 'Redução', 'Uma dimensão real de 80 mm será desenhada em escala 1:2. Quanto medirá no papel?', '40 mm: 80 ÷ 2.'),
  qa(7, 'fundamentos', 'escalas', 'Ampliação', 'Um segmento mede 30 mm no desenho em escala 5:1. Qual é sua dimensão real?', '6 mm: 30 ÷ 5.'),
  ce(8, 'fundamentos', 'escalas', 'Valor da cota', 'Em escala 1:2, uma dimensão real de 80 mm deve ser cotada como 40.', false, 'A cota informa a dimensão real: 80. A escala altera a representação gráfica.'),
  qa(9, 'fundamentos', 'escalas', 'Formato A4', 'Quais são as dimensões da folha A4, antes das margens?', '210 × 297 mm.'),
  ce(10, 'fundamentos', 'escalas', 'Escala de detalhe', 'Uma vista de detalhe pode usar escala diferente da vista principal, desde que identificada.', true, 'A escala própria permite ampliar a região sem mudar as dimensões reais especificadas.'),

  // 11–20: Linhas e simbologia.
  qa(11, 'linhas', 'linhas', 'Contorno visível', 'Qual tipo de linha representa usualmente contornos e arestas visíveis?', 'Linha contínua larga.'),
  qa(12, 'linhas', 'linhas', 'Aresta oculta', 'Qual tipo de linha representa usualmente uma aresta não visível na vista?', 'Linha tracejada estreita.'),
  qa(13, 'linhas', 'linhas', 'Eixos', 'Qual é a aplicação usual da linha estreita de traço e ponto?', 'Indicar eixos, centros e linhas de simetria.'),
  qa(14, 'linhas', 'linhas', 'Cota e auxiliar', 'O que diferencia linha de cota de linha auxiliar de cota?', 'A de cota indica a extensão medida e recebe terminações e valor; a auxiliar relaciona essa indicação aos elementos da peça.'),
  qa(15, 'linhas', 'hachuras', 'Hachuras', 'Qual é a função das hachuras em uma representação em corte?', 'Distinguir as áreas de material efetivamente interceptadas pelo plano secante.'),
  qa(16, 'linhas', 'planocorte', 'Plano de corte', 'O que indicam as setas nas extremidades do traçado de um plano de corte?', 'O sentido de observação da representação resultante.'),
  qa(17, 'linhas', 'linhas', 'Coincidência', 'Se um contorno visível coincide com uma aresta oculta na mesma projeção, qual prevalece?', 'O contorno visível, representado por linha contínua larga.'),
  ce(18, 'linhas', 'linhas', 'Centro e tamanho', 'A linha de centro de um furo representa o limite de seu diâmetro.', false, 'Ela indica o eixo ou centro; os contornos e a cotagem especificam o diâmetro.'),
  qa(19, 'linhas', 'linhas', 'Linha de chamada', 'Para que serve uma linha de chamada ou líder?', 'Relacionar uma nota, indicação ou identificação ao elemento correspondente do desenho.'),
  ce(20, 'linhas', 'linhas', 'Padrões de linha', 'O padrão e a espessura de uma linha ajudam a identificar sua função no desenho.', true, 'Eles distinguem contornos, eixos, arestas ocultas e indicações auxiliares.'),

  // 21–30: Projeções ortogonais.
  qa(21, 'projecoes', 'projecoes', 'Projeção ortogonal', 'Como as projetantes se orientam em uma projeção ortogonal?', 'São paralelas entre si e perpendiculares ao plano de projeção.'),
  qa(22, 'projecoes', 'projecoes', 'Vista frontal', 'Fixando largura, altura e profundidade da peça, quais dimensões aparecem na vista frontal?', 'Largura e altura.'),
  qa(23, 'projecoes', 'projecoes', 'Vista superior', 'Quais dimensões a vista superior compartilha com a frontal e com a lateral, respectivamente?', 'Largura com a frontal; profundidade com a lateral.'),
  qa(24, 'projecoes', 'projecoes', 'Vista lateral', 'Quais dimensões aparecem na vista lateral da peça?', 'Profundidade e altura.'),
  qa(25, 'projecoes', 'diedros', 'Primeiro diedro', 'No primeiro diedro, onde fica a vista superior em relação à frontal?', 'Abaixo da vista frontal.'),
  qa(26, 'projecoes', 'diedros', 'Lateral no primeiro diedro', 'No primeiro diedro, onde se coloca a vista lateral direita?', 'À esquerda da vista frontal.'),
  qa(27, 'projecoes', 'diedros', 'Terceiro diedro', 'No terceiro diedro, onde ficam a superior e a lateral direita em relação à frontal?', 'A superior fica acima; a lateral direita fica à direita.'),
  ce(28, 'projecoes', 'diedros', 'Nome da vista', 'No primeiro diedro, a vista colocada à direita da frontal é a lateral direita.', false, 'Nessa disposição, ela é a lateral esquerda. O nome indica de onde se observa a peça.'),
  qa(29, 'projecoes', 'projecoes', 'Escolha da frontal', 'Qual critério orienta a escolha da vista frontal?', 'Representar bem a forma e os detalhes característicos, facilitando a leitura e reduzindo ambiguidades.'),
  ce(30, 'projecoes', 'projecoes', 'Concordância', 'Vistas de uma mesma peça devem ser coerentes nas dimensões que compartilham.', true, 'Por exemplo, frontal e lateral compartilham a altura.'),

  // 31–40: Perspectivas e vistas especiais.
  qa(31, 'perspectivas', 'isometria', 'Eixos isométricos', 'Qual é o ângulo entre os três eixos projetados de uma isometria?', '120° entre cada par de eixos.'),
  qa(32, 'perspectivas', 'isometria', 'Orientação usual', 'Na orientação isométrica usual com um eixo vertical, que ângulo os outros dois fazem com a horizontal?', '30°, um para cada lado.'),
  qa(33, 'perspectivas', 'isometria', 'Círculo em isometria', 'Como aparece um círculo contido em um plano isométrico?', 'Como uma elipse.'),
  qa(34, 'perspectivas', 'isometria', 'Redução isométrica', 'O que diferencia projeção isométrica ortogonal estrita de desenho isométrico sem redução?', 'A projeção estrita aplica fator axial próximo de 0,816; o desenho sem redução marca os comprimentos diretamente nos eixos, respeitada a escala.'),
  qa(35, 'perspectivas', 'vistas', 'Vista auxiliar', 'Como mostrar em verdadeira grandeza uma face plana inclinada aos planos principais?', 'Usar vista auxiliar com plano de projeção paralelo à face.'),
  qa(36, 'perspectivas', 'vistas', 'Detalhe ampliado', 'Para que serve uma vista de detalhe?', 'Ampliar uma região para tornar legíveis elementos e requisitos, com identificação e escala próprias.'),
  qa(37, 'perspectivas', 'vistas', 'Vista parcial', 'O que é uma vista parcial?', 'Uma representação limitada à parte da vista necessária para esclarecer os elementos de interesse.'),
  ce(38, 'perspectivas', 'vistas', 'Face inclinada', 'Uma face inclinada ao plano de projeção aparece nessa vista com sua verdadeira forma e todas as medidas sem encurtamento.', false, 'A inclinação produz encurtamento; uma vista auxiliar paralela à face pode revelar a verdadeira grandeza.'),
  qa(39, 'perspectivas', 'cavaleira', 'Cavaleira', 'Na cavaleira com redução de profundidade 1/2 e escala geral 1:1, quanto se marca para uma profundidade real de 40 mm?', '20 mm no eixo de profundidade; a dimensão real cotada continua sendo 40 mm.'),
  ce(40, 'perspectivas', 'isometria', 'Paralelismo', 'Na isometria, arestas paralelas no objeto continuam paralelas na representação.', true, 'A projeção paralela preserva esse paralelismo; não há convergência para pontos de fuga.'),

  // 41–50: Cortes e seções.
  qa(41, 'cortes', 'tiposcorte', 'Corte e seção', 'Qual é a diferença essencial entre seção e vista em corte?', 'A seção representa a interseção com o plano secante; a vista em corte também pode mostrar contornos situados além dele.'),
  qa(42, 'cortes', 'tiposcorte', 'Corte total', 'O que caracteriza um corte total?', 'O plano secante atravessa a peça para revelar sua configuração interna na direção escolhida.'),
  qa(43, 'cortes', 'tiposcorte', 'Meio corte', 'Qual é a utilidade do meio corte em uma peça simétrica?', 'Mostrar metade externa e metade em corte na mesma vista.'),
  qa(44, 'cortes', 'tiposcorte', 'Corte em desvio', 'Quando um corte em desvio é útil?', 'Quando se deseja revelar elementos não alinhados, desviando o percurso do plano de corte para passar por eles.'),
  qa(45, 'cortes', 'tiposcorte', 'Corte local', 'O que caracteriza um corte local ou parcial?', 'A exposição de uma região limitada do interior da peça, delimitada por linha de ruptura.'),
  qa(46, 'cortes', 'hachuras', 'Inclinação das hachuras', 'A inclinação das hachuras precisa ser sempre exatamente 45°?', 'Não. 45° é usual, mas a direção pode mudar para melhorar a distinção e evitar coincidência com contornos.'),
  qa(47, 'cortes', 'hachuras', 'Peças adjacentes', 'Como distinguir peças adjacentes hachuradas em um conjunto?', 'Variando, conforme a convenção aplicável, a direção ou o espaçamento das hachuras entre as peças.'),
  ce(48, 'cortes', 'hachuras', 'Furo em corte', 'O espaço vazio de um furo interceptado deve receber hachuras para indicar o corte.', false, 'Hachuras indicam material interceptado, não o vazio do furo.'),
  qa(49, 'cortes', 'hachuras', 'Nervuras', 'Por que uma nervura cortada longitudinalmente costuma ser mostrada sem hachuras?', 'Por convenção, para evitar que seja interpretada como uma espessura maciça da peça.'),
  ce(50, 'cortes', 'hachuras', 'Orientação do corte', 'Uma nervura pode ser hachurada quando o plano a corta transversalmente.', true, 'A omissão longitudinal não significa que nervuras nunca sejam hachuradas.'),

  // 51–60: Cotagem funcional.
  qa(51, 'cotagem', 'cotagem', 'Informação dimensional', 'Que duas informações básicas a cotagem deve fornecer sobre um elemento?', 'Seu tamanho e sua localização, na medida necessária para definir a peça.'),
  qa(52, 'cotagem', 'cotagem', 'Diâmetro e raio', 'O que significam Ø e R antes de um valor de cota?', 'Ø indica diâmetro; R indica raio.'),
  qa(53, 'cotagem', 'cotagem', 'Raio e diâmetro', 'Uma circunferência tem raio especificado R10 mm. Qual é seu diâmetro?', '20 mm, pois diâmetro = 2 × raio.'),
  qa(54, 'cotagem', 'referencias', 'Origem comum', 'O que caracteriza a cotagem em paralelo ou por referência comum?', 'Várias dimensões partem da mesma origem ou referência, em vez de partir cada uma do elemento anterior.'),
  qa(55, 'cotagem', 'cadeias', 'Pior caso', 'Três comprimentos de 10 ± 0,1 mm estão em cadeia. Qual é o limite da soma no pior caso?', '30 ± 0,3 mm: os extremos vão de 29,7 a 30,3 mm.'),
  qa(56, 'cotagem', 'referencias', 'Coordenadas', 'O que deve estar definido para localizar um furo por coordenadas X e Y?', 'As origens e a orientação dos eixos de referência, além dos valores das coordenadas.'),
  qa(57, 'cotagem', 'cotagem', 'Cota duplicada', 'Por que evitar repetir a mesma dimensão como requisito independente em várias vistas?', 'Para evitar redundâncias, conflitos de atualização e interpretações divergentes do requisito.'),
  ce(58, 'cotagem', 'cotagem', 'Cotas e linhas ocultas', 'A cotagem deve preferir arestas ocultas mesmo quando outra vista mostra claramente o elemento.', false, 'Prefere-se a vista que apresenta o elemento com clareza, reduzindo ambiguidades.'),
  qa(59, 'cotagem', 'cotagem', 'Cota funcional', 'O que torna uma dimensão funcionalmente importante?', 'Sua relação com o funcionamento, a montagem ou a interface da peça, como um diâmetro de encaixe.'),
  ce(60, 'cotagem', 'cotagem', 'Função e inspeção', 'A escolha das cotas deve considerar funcionamento, fabricação e inspeção.', true, 'Cotar é especificar requisitos, e não apenas distribuir números na folha.'),

  // 61–70: Tolerâncias dimensionais e ajustes.
  qa(61, 'ajustes', 'tolerancias', 'Dimensão nominal', 'A dimensão nominal é uma garantia de que toda peça terá exatamente esse valor?', 'Não. Ela é uma referência; os limites permitidos dependem dos afastamentos e tolerâncias aplicáveis.'),
  qa(62, 'ajustes', 'tolerancias', 'Limites bilaterais', 'Quais são os limites de uma dimensão 40 ± 0,05 mm?', 'Mínimo de 39,95 mm e máximo de 40,05 mm.'),
  qa(63, 'ajustes', 'tolerancias', 'Tolerância unilateral', 'Quais são os limites de 20 mm com afastamentos superior +0,03 mm e inferior 0 mm?', 'De 20,00 a 20,03 mm.'),
  qa(64, 'ajustes', 'tolerancias', 'Amplitude', 'Qual é a tolerância total de 40 ± 0,05 mm?', '0,10 mm: 40,05 − 39,95.'),
  qa(65, 'ajustes', 'ajustes', 'Folga calculada', 'Um furo admite 20,00–20,02 mm e um eixo 19,97–19,99 mm. Quais são as folgas mínima e máxima?', 'Mínima: 0,01 mm. Máxima: 0,05 mm.'),
  qa(66, 'ajustes', 'ajustes', 'Interferência calculada', 'Um furo admite 30,00–30,01 mm e um eixo 30,02–30,03 mm. Quais são as interferências mínima e máxima?', 'Mínima: 0,01 mm. Máxima: 0,03 mm, calculadas como eixo menos furo.'),
  qa(67, 'ajustes', 'ajustes', 'Ajuste de transição', 'O que caracteriza um ajuste de transição?', 'Dependendo das dimensões efetivas dentro dos limites, a montagem pode apresentar folga ou interferência.'),
  ce(68, 'ajustes', 'codigoiso', 'Grau IT', 'O número 7 em H7 significa uma tolerância fixa de 0,007 mm para qualquer dimensão.', false, 'Ele identifica o grau; a amplitude depende também da faixa dimensional nominal.'),
  qa(69, 'ajustes', 'codigoiso', 'Sistema ISO', 'Na notação ISO, o que diferencia letras maiúsculas e minúsculas nas classes de tolerância?', 'Maiúsculas identificam furos; minúsculas identificam eixos.'),
  ce(70, 'ajustes', 'codigoiso', 'Par furo–eixo', 'A indicação H7 do furo, isoladamente, é insuficiente para determinar o tipo de ajuste do conjunto.', true, 'É necessário conhecer a classe ou os limites do eixo correspondente.'),

  // 71–80: Tolerâncias geométricas.
  qa(71, 'geometria', 'datums', 'Tamanho e geometria', 'O que distingue tolerância dimensional de tolerância geométrica?', 'A dimensional limita o tamanho; a geométrica controla características como forma, orientação e posição.'),
  qa(72, 'geometria', 'datums', 'Datum', 'Qual é a diferença entre um datum e o elemento real usado para estabelecê-lo?', 'O datum é a referência geometricamente ideal; o elemento real é a característica física da peça que permite estabelecê-la.'),
  qa(73, 'geometria', 'datums', 'Quadro de controle', 'Que informações se procuram em um quadro de tolerância geométrica?', 'Característica controlada, valor e forma da zona e, quando indicados, modificadores e datums na ordem especificada.'),
  qa(74, 'geometria', 'forma', 'Planicidade', 'Uma superfície tem planicidade de 0,05 mm. Como é sua zona de tolerância?', 'Dois planos paralelos separados por 0,05 mm, entre os quais a superfície deve ficar.'),
  qa(75, 'geometria', 'forma', 'Circularidade', 'Que geometria delimita uma zona de tolerância de circularidade?', 'Dois círculos concêntricos no plano da seção considerada.'),
  qa(76, 'geometria', 'forma', 'Cilindricidade', 'Que geometria delimita uma zona de tolerância de cilindricidade?', 'Dois cilindros coaxiais que limitam a superfície cilíndrica controlada.'),
  qa(77, 'geometria', 'orientacao', 'Perpendicularidade', 'No quadro de perpendicularidade, o valor 0,05 indica graus ou uma largura de zona?', 'Uma largura de zona, na unidade de comprimento aplicável; não 0,05 grau.'),
  ce(78, 'geometria', 'forma', 'Forma e referência', 'A planicidade de uma superfície exige um datum para orientar a zona em relação a outra face.', false, 'Planicidade é controle de forma sem datum; paralelismo é que relaciona a orientação a uma referência.'),
  qa(79, 'geometria', 'posicao', 'Posição', 'Em uma indicação de posição de um eixo com Ø antes da tolerância, qual é a forma da zona?', 'Cilíndrica, nas condições especificadas no quadro e nas referências do desenho.'),
  ce(80, 'geometria', 'material', 'Máximo material', 'O máximo material corresponde ao maior diâmetro permitido de um eixo e ao menor de um furo.', true, 'São as condições em que cada elemento deixa mais material na peça.'),

  // 81–90: Rugosidade e fabricação.
  qa(81, 'acabamento', 'rugosidade', 'Ra', 'O que representa o parâmetro Ra de um perfil de rugosidade?', 'A média dos valores absolutos dos desvios do perfil em relação à linha média, nas condições de avaliação.'),
  qa(82, 'acabamento', 'rugosidade', 'Micrômetro', 'Quanto vale 1 µm em milímetros?', '0,001 mm.'),
  qa(83, 'acabamento', 'rugosidade', 'Limites de Ra', 'Duas superfícies com o mesmo Ra precisam ter perfis idênticos?', 'Não. A mesma média pode resultar de distribuições diferentes de picos e vales.'),
  qa(84, 'acabamento', 'rugosidade', 'Rugosidade e ondulação', 'Em termos de comprimento de onda do perfil, como rugosidade e ondulação se distinguem?', 'A rugosidade corresponde a componentes de menor comprimento de onda; a separação depende dos filtros e critérios de avaliação.'),
  qa(85, 'acabamento', 'processos', 'Remoção requerida', 'Na simbologia convencional de estado de superfície, o que indica a barra acrescentada ao símbolo básico?', 'Remoção de material requerida para obter a superfície especificada.'),
  qa(86, 'acabamento', 'processos', 'Remoção proibida', 'Na simbologia convencional de estado de superfície, o que indica um círculo acrescentado ao símbolo básico?', 'Remoção de material não permitida nessa superfície.'),
  qa(87, 'acabamento', 'processos', 'Sobremetal', 'O que é sobremetal de usinagem?', 'Material reservado para ser removido em uma operação posterior até alcançar os requisitos finais.'),
  ce(88, 'acabamento', 'rugosidade', 'Ra e planicidade', 'Especificar Ra baixo garante que uma face também tenha boa planicidade.', false, 'Rugosidade e planicidade controlam características diferentes e exigem avaliação própria.'),
  qa(89, 'acabamento', 'processos', 'Rebarbas', 'Uma nota de remoção de rebarbas autoriza alterar livremente uma aresta funcional?', 'Não. A remoção deve respeitar raios, chanfros, dimensões e demais requisitos aplicáveis.'),
  ce(90, 'acabamento', 'rugosidade', 'Direção das marcas', 'A direção das marcas de fabricação pode importar para a função de uma superfície.', true, 'Ela pode afetar contato e vedação e não é descrita integralmente por Ra.'),

  // 91–100: Elementos de máquinas e conjuntos.
  qa(91, 'elementos', 'roscas', 'Rosca métrica', 'Na indicação M10 × 1,5, o que significam 10 e 1,5?', 'Diâmetro nominal de 10 mm e passo de 1,5 mm.'),
  qa(92, 'elementos', 'roscas', 'Passo e avanço', 'Uma rosca de duas entradas tem passo de 1,5 mm. Qual é o avanço axial por volta?', '3 mm por volta: avanço = número de entradas × passo.'),
  qa(93, 'elementos', 'roscas', 'Representação de rosca', 'Por que uma rosca pode ser representada por linhas convencionais em vez de toda a hélice?', 'Porque a convenção simplificada comunica a rosca, complementada pela designação e pelos requisitos aplicáveis.'),
  qa(94, 'elementos', 'furos', 'Escareado e rebaixo', 'O que distingue um escareado de um rebaixo cilíndrico para cabeça de parafuso?', 'O escareado é cônico; o rebaixo cilíndrico tem paredes cilíndricas e fundo plano.'),
  qa(95, 'elementos', 'furos', 'Furo cego e passante', 'O que diferencia furo cego de passante?', 'O cego termina no interior; o passante atravessa a espessura da peça.'),
  qa(96, 'elementos', 'conjuntos', 'Lista de peças', 'Qual é a relação entre os balões de um desenho de conjunto e sua lista de peças?', 'Os balões identificam os itens correspondentes, cuja lista informa designação e quantidade.'),
  qa(97, 'elementos', 'conjuntos', 'Vista explodida', 'Qual é a principal utilidade de uma vista explodida?', 'Mostrar os componentes separados em posições relacionadas à montagem para facilitar sua compreensão.'),
  ce(98, 'elementos', 'conjuntos', 'Conjunto e fabricação', 'Uma vista de conjunto substitui o detalhamento necessário para fabricar todas as suas peças.', false, 'O conjunto mostra relações de montagem; peças podem exigir desenhos de detalhe com requisitos próprios.'),
  qa(99, 'elementos', 'chavetas', 'Chaveta', 'Qual é a função usual de uma chaveta entre eixo e cubo?', 'Transmitir torque e limitar a rotação relativa, conforme o arranjo de montagem.'),
  ce(100, 'elementos', 'conjuntos', 'Componente normalizado', 'Mesmo um componente normalizado precisa ser identificado suficientemente para selecionar a variante correta.', true, 'Designação, tamanho e demais características requeridas evitam ambiguidades de compra e montagem.'),
];
