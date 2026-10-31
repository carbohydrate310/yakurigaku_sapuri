import React, { useState, useEffect } from 'react';
import './App.css';

// ----------------------------------------------------------------------
// 医療・薬剤師向け高度臨床薬理学 講座・演習データベース
// ----------------------------------------------------------------------
const COURSES_DATA = [
  {
    id: 'tdm_cardio',
    category: '循環器・TDM',
    title: '1. ジゴキシン・抗不整脈薬のTDMと高度投与設計',
    duration: '25分',
    level: '臨床専門',
    description: 'ジゴキシンやアミオダロンの血中濃度モニタリング、腎機能障害時の投与設計および相互作用。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      'ジゴキシンの目標有効血中濃度域：0.5〜0.9 ng/mL（心不全）。1.2 ng/mL以上で中毒発現率上昇。',
      'P-糖蛋白阻害薬（アミオダロン、ベラパミル、クラリスロマイシン）併用時のジゴキシン血中濃度上昇とその対策。',
      'eGFR低下患者におけるジゴキシン排泄遅延とTDM採血タイミング（投与前トラフ値、定常状態到達後）。'
    ],
    quiz: [
      {
        id: 'tdm_q1',
        question: '78歳男性（CrCl 30 mL/min）。ジゴキシン0.125mg/日服用中にアミオダロン塩酸塩の追加処方が出た。薬剤師の初期対応として最も適切なものはどれか？',
        options: [
          'ジゴキシンの減量（50%程度）または血中濃度モニタリングの提案を行う',
          'アミオダロンはジゴキシンの代謝を誘導するため、ジゴキシン増量を提案する',
          '相互作用はないため、そのままの処方で経過観察する',
          'ジゴキシンを直ちに中止し、アドレナリンα1刺激薬への変更を提案する'
        ],
        answerIndex: 0,
        explanation: 'アミオダロンはP-糖蛋白を阻害しジゴキシンの腎排泄・組織移行を抑制して血中濃度を著しく上昇させます。投与量を減量（約半量）し、TDMを行う提案が適切です。'
      },
      {
        id: 'tdm_q2',
        question: 'ジゴキシンの血中濃度モニタリング（TDM）において、定常状態におけるトラフ値を測定するための適切な採血タイミングは直近投与後何時間以上か？',
        options: ['投与後1〜2時間', '投与後4時間', '投与後6〜8時間以上', '投与直後（30分以内）'],
        answerIndex: 2,
        explanation: 'ジゴキシンは組織分布相（α相）が長いため、投与後6〜8時間以上（可能であれば次回投与直前）のトラフ採血が必要です。'
      },
      {
        id: 'tdm_q3',
        question: '低カリウム血症が存在する患者にジゴキシンを投与する際、生じるリスクとして適切なものはどれか？',
        options: [
          'ジゴキシンの中毒症状（不整脈等）が増悪する',
          'ジゴキシンの血中濃度が急激に低下し効果が消失する',
          '高カルシウム血症が引き起こされる',
          'ジゴキシンの尿中排泄が著しく促進される'
        ],
        answerIndex: 0,
        explanation: 'K+とジゴキシンは心筋Na+/K+-ATPase受容体で競合するため、低K血症下ではジゴキシンの作用・中毒が著しく増強されます。'
      },
      {
        id: 'tdm_q4',
        question: 'アミオダロン投与患者において、長期投与時に特に注意すべき重篤な副作用と定期検査項目はどれか？',
        options: [
          '間質性肺炎（胸部CT/KL-6）および甲状腺機能障害（TSH/FT4）',
          '急性膵炎（血清アミラーゼ）',
          '再生不良性貧血（網赤血球数）',
          '横紋筋融解症（CK値）のみ'
        ],
        answerIndex: 0,
        explanation: 'アミオダロンはヨウ素を含有しリポフィリックなため、致死的な間質性肺炎や甲状腺機能異常、角膜沈着症などを引き起こします。'
      },
      {
        id: 'tdm_q5',
        question: 'バンコマイシン（VCM）のTDMにおいて、AUC/MIC 400〜600を目標とする際、ガイドラインが推奨する初期投与設計手法はどれか？',
        options: [
          'ベイズ推定を用いた2点採血またはCminに基づくAUC推定',
          '投与終了直後Cmaxのみを用いた簡易計算',
          '固定用量（1回1000mg 1日2回）の無条件投与',
          '尿中排泄率の測定のみによる判断'
        ],
        answerIndex: 0,
        explanation: '最新の抗菌薬TDMガイドラインでは、VCMの有効性と腎毒性回避のため、ベイズ推定ソフト等を活用したAUC/MICガイドラインモニタリングが推称されています。'
      },
      {
        id: 'tdm_q6',
        question: 'テオフィリンの有効血中濃度域（5〜15 μg/mL）を超え、25 μg/mL以上となった場合に発現しやすい初期の中毒症状はどれか？',
        options: [
          '悪心・嘔吐、頻脈・心室性不整脈、けいれん',
          '著明な徐脈と縮瞳',
          '重度の便秘と尿閉',
          '劇症肝炎と黄疸'
        ],
        answerIndex: 0,
        explanation: 'テオフィリン中毒では消化器症状（悪心・嘔吐）、循環器症状（頻脈）、中枢神経症状（けいれん）が生じます。'
      },
      {
        id: 'tdm_q7',
        question: 'シクロスポリン（サンディミュン）のTDMにおいて、微粒子化乳剤（ネオーラル）への変更後に推奨されたモニタリング指標はどれか？',
        options: ['C2（投与2時間後血中濃度）', 'C0（トラフ値）のみ', 'C6（投与6時間後血中濃度）', 'C24（投与24時間後）'],
        answerIndex: 0,
        explanation: 'ネオーラル（シクロスポリン）では吸収速度のばらつきが小さいため、AUCと相関の高いC2（投与2時間後濃度）モニタリングが導入されました。'
      },
      {
        id: 'tdm_q8',
        question: 'フェニトインの薬物動態学的な最大の特徴はどれか？',
        options: [
          'ミカエリス・メンテン型の非線形薬物動態を示し、投与量のわずかな増量で血中濃度が急昇する',
          '全量腎排泄型であり線形プロファイルを示す',
          '蛋白結合率が極めて低く（5%以下）TDMが不要',
          '肝初回通過効果を100%受ける'
        ],
        answerIndex: 0,
        explanation: 'フェニトインは肝代謝酵素（CYP2C9/2C19）の飽和が治療用量付近で生じるため、非線形動態（Michaelis-Menten）を示します。'
      },
      {
        id: 'tdm_q9',
        question: '低アルブミン血症（血清Alb 2.0 g/dL）の患者におけるフェニトイン血中濃度の解釈で適切なものはどれか？',
        options: [
          '総血中濃度は低値に見えても、游離型（遊離体）濃度は十分に高い可能性があるため補正計算を行う',
          '総血中濃度は高値を示し、遊離型濃度はゼロになる',
          'アルブミン値はフェニトインの挙動に一切影響しない',
          '即座にフェニトインの投与量を2倍に増量する'
        ],
        answerIndex: 0,
        explanation: 'フェニトインは蛋白結合率が約90%と高く、低Alb血症では遊離型分率が上昇するため、Winter-Tozer式等による濃度補正が必要です。'
      },
      {
        id: 'tdm_q10',
        question: 'ボリコナゾールのTDMにおいて、副作用（視覚障害・肝機能障害・幻覚）を回避するための推奨トラフ濃度上限値はおおむねどれか？',
        options: ['4.5〜5.0 μg/mL', '0.5 μg/mL', '20 μg/mL', '100 μg/mL'],
        answerIndex: 0,
        explanation: 'ボリコナゾールの有効トラフ濃度は1.0〜2.0 μg/mL以上、副作用回避の観点から4.5〜5.0 μg/mL未満が推奨されます。'
      }
    ]
  },
  {
    id: 'oncology_support',
    category: '抗がん剤・支持療法',
    title: '2. レジメン管理と高度がん支持療法（制吐・FN）',
    duration: '30分',
    level: '高度専門',
    description: '高度催吐性リスク抗がん剤に対する5-HT3阻害薬・NK1受容体拮抗薬・デキサメタゾン・オランザピンの併用化学療法。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      '高度催吐性リスク（シスプラチン等）：4剤併用（NK1受容体拮抗薬 ＋ 5-HT3受容体拮抗薬 ＋ デキサメタゾン ＋ オランザピン）が推奨。',
      '発熱性白血球減少症（FN）：G-CSF製剤（ペグフィルグラスチム）の適正投与タイミング（化学療法終了後24時間以降）。',
      '免疫チェックポイント阻害薬（iCI）によるirAE（免疫関連副作用）の発症時期と早期発見（間質性肺炎、大腸炎、甲状腺機能障害）。'
    ],
    quiz: [
      {
        id: 'onc_q1',
        question: 'シスプラチン（CDDP）を含む高度催吐性リスク化学療法を行う患者に対する急性・遅発性嘔吐予防の標準的制吐療法として最も適切な組み合わせはどれか？',
        options: [
          '5-HT3受容体拮抗薬 ＋ NK1受容体拮抗薬 ＋ デキサメタゾン ＋ オランザピン',
          'メトクロプラミド ＋ ドンペリドン 単独投与',
          'H2ブロッカー ＋ 抗ヒスタミン薬のみ',
          'ロペラミド ＋ アスピリン 併用'
        ],
        answerIndex: 0,
        explanation: '高度催吐性リスクレジメンでは、急性および遅発性の悪心・嘔吐を防止するために制吐剤4剤併用療法が最新ガイドラインで推称されています。'
      },
      {
        id: 'onc_q2',
        question: '持続型G-CSF製剤（ペグフィルグラスチム）の投与時期として適切なものはどれか？',
        options: [
          '化学療法剤投与終了後、少なくとも24時間経過した以降',
          '化学療法剤投与開始の1時間前',
          '化学療法剤（シスプラチン等）と同一シリンジ内で混注投与',
          '白血球数が回復した化学療法開始14日後'
        ],
        answerIndex: 0,
        explanation: '抗がん剤と同日投与を行うと分化増殖中の造血細胞が抗がん剤により障害されるため、化学療法終了後24時間以上の間隔を空けて投与します。'
      },
      {
        id: 'onc_q3',
        question: 'オキサリプラチン投与中の患者から「冷たい水に触れると手足がピリピリ痛む」と相談を受けた。化学療法専門薬剤師の説明として適切なものはどれか？',
        options: [
          '急性末梢神経障害によるものであり、冷感刺激（冷水・冷気）を避けるよう指導する',
          'アナフィラキシーの前兆であるため直ちに抗ヒスタミン薬を服用させる',
          '腎不全による尿毒症症状であるため人工透析を提案する',
          'オキサリプラチンの点滴速度を10倍に速めるよう指示する'
        ],
        answerIndex: 0,
        explanation: 'オキサリプラチン特有の急性神経毒性は低温刺激により誘発・増悪するため、冷たいものに触れない防寒・保温指導が必須です。'
      },
      {
        id: 'onc_q4',
        question: 'ペムブロリズマブ（キイトルーダ）などの免疫チェックポイント阻害薬投与中に発症するirAE（免疫関連副作用）へのファーストライン治療薬はどれか？',
        options: [
          '副腎皮質ステロイド（プレドニゾロン等）の全身投与',
          '広感作ペニシリン系抗菌薬',
          'G-CSF製剤',
          '強心薬（ドブタミン）'
        ],
        answerIndex: 0,
        explanation: 'irAEは過剰な免疫応答に起因するため、中等症〜重症例では副腎皮質ステロイドの全身投与（高用量）が基本的治療となります。'
      },
      {
        id: 'onc_q5',
        question: '5-FU（フルオロウラシル）の分解酵素であるDPD（ジヒドロピリミジンデヒドロゲナーゼ）の欠損患者に5-FU系抗がん剤を投与した場合のリスクはどれか？',
        options: [
          '重篤な骨髄抑制や消化管毒性などの緻死的な毒性増強',
          '5-FUの薬効が完全に無効化する',
          '高血糖発作の頻発',
          '腎結石の大量形成'
        ],
        answerIndex: 0,
        explanation: 'DPD欠損症患者では5-FUの異化代謝が滞り、血中濃度が著しく持続高値となって重篤な骨髄抑制・粘膜障害が発現します。'
      },
      {
        id: 'onc_q6',
        question: 'メトトレキサート大容量療法時における「ロイコボリン救援療法（レスキュ-）」の目的はどれか？',
        options: [
          '正常細胞の活性型葉酸補給による葉酸代謝拮抗毒性（骨髄抑制・消化管障害）の軽減',
          'メトトレキサートの腎排泄を抑制して抗腫瘍効果を高める',
          '尿の酸性化を促進する',
          'アルカリ化を止めて膀胱炎を誘発する'
        ],
        answerIndex: 0,
        explanation: '大容量MTX投与後、ロイコボリン（ホリナート）を投与することで正常細胞の葉酸代謝障害を救援し、深刻な副作用を防止します。'
      },
      {
        id: 'onc_q7',
        question: 'シクロホスファミドやイホスファミド投与時の出血性膀胱炎の原因物質（アクロレイン）を無毒化するために併用される薬剤はどれか？',
        options: ['メスナ（ウロミテキサン）', 'デキサメタゾン', 'アロプリノール', 'レバミピド'],
        answerIndex: 0,
        explanation: '尿中に排泄された代謝物アクロレインが膀胱粘膜を障害するため、スルヒドリル基を有するメスナがアクロレインと結合して無毒化します。'
      },
      {
        id: 'onc_q8',
        question: 'HER2陽性乳がんに対するトラスツズマブ（ハーセプチン）投与において、定期的な観察・検査が必須な臓器障害はどれか？',
        options: ['心機能障害（心不全・LVEF低下）', '肺線維症', '急性腎障害', '重度骨粗鬆症'],
        answerIndex: 0,
        explanation: 'トラスツズマブは心筋細胞のHER2シグナルも抑制するため、心不全やLVEF（左室駆出率）低下の定期評価が必要です。'
      },
      {
        id: 'onc_q9',
        question: '腫瘍崩壊症候群（TLS）の高リスク患者における高尿酸血症予防・治療薬として、尿酸生成抑制だけでなく既存の尿酸を分解する製剤はどれか？',
        options: ['ラスブリカーゼ（遺伝子組み換えラスブリカーゼ）', 'フェブキソスタット', 'アロプリノール', 'ベンズブロマロン'],
        answerIndex: 0,
        explanation: 'ラスブリカーゼはウリカーゼ（尿酸酸化酵素）であり、尿酸を水溶性の高いアラントインへ迅速に分解代謝します。'
      },
      {
        id: 'onc_q10',
        question: 'イリノテカン（CPT-11）の活性代謝物SN-38の解毒代謝酵素UGT1A1の遺伝子多型（*28, *6）の重複ホモ接合体患者で生じる重大な危険性はどれか？',
        options: [
          'SN-38のグルクロン酸抱合遅延による遅発性重篤下痢・骨髄抑制',
          '即時型アナフィラキシーショック',
          '急性角膜潰瘍',
          '著しい高血圧性脳症'
        ],
        answerIndex: 0,
        explanation: 'UGT1A1*28や*6の変異ホモ・複合ヘテロ患者ではSN-38の解毒能力が著しく低下しており、重篤な好中球減少や強度の遅発性下痢が生じます。'
      }
    ]
  },
  {
    id: 'infection_pkpd',
    category: '感染症・PK/PD',
    title: '3. 抗菌薬PK/PD理論と腎機能別投与設計',
    duration: '28分',
    level: '高度専門',
    description: '時間依存性（Cmax/MIC、AUC/MIC）と時間依存性（％T>MIC）に基づく抗菌薬の最適化。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      'β-ラクタム系：時間依存性（%T>MIC）。投与回数の増加や持続点滴が有効性を最大化。',
      'アミノグリコシド系：濃度依存性（Cmax/MIC）。1日1回大量投与により効果最大化と腎毒性回避。',
      'バンコマイシン・ニューキノロン系：AUC/MIC依存性。総投与量依存的プロファイル。'
    ],
    quiz: [
      {
        id: 'inf_q1',
        question: 'カルバペネム系やペニシリン系などのβ-ラクタム系抗菌薬の殺菌効果を最大化するための薬力学的指標（PK/PDパラメータ）はどれか？',
        options: ['%T > MIC（血中濃度がMICを超える時間の割合）', 'Cmax / MIC（最高血中濃度とMICの比）', 'AUC / MIC（血中濃度時間曲線下面積とMICの比）', 'Cminのみ'],
        answerIndex: 0,
        explanation: 'β-ラクタム系は時間依存性抗菌薬であり、血中濃度がMICを上回る時間（%T>MIC）の延長が殺菌効果に直結します。'
      },
      {
        id: 'inf_q2',
        question: 'アミカシンやゲンタマイシンなどのアミノグリコシド系抗菌薬において、「1日1回大量投与法」が推奨される理論的根拠はどれか？',
        options: [
          '濃度依存的な殺菌作用（Cmax/MIC）とPAE（抗菌薬投与後効果）を持ち、トラフ値を下げることで腎毒性を軽減できるため',
          '時間依存性であり、持続静注よりもトラフ値を高く維持するため',
          '胃酸による分解を防止するため',
          '肝代謝能力を飽和させるため'
        ],
        answerIndex: 0,
        explanation: 'アミノグリコシド系は高いCmaxで強固な殺菌力とPAEを発揮し、十分な休薬時間を設けてトラフ値を下げることで腎・内耳毒性を低減できます。'
      },
      {
        id: 'inf_q3',
        question: '重症緑膿菌感染症に対してメロペネムを使用する際、%T>MICを維持するために極めて有効な投与方法はどれか？',
        options: [
          '1回用量を3時間かけて徐々に点滴投与する（延長点滴・持続点滴）',
          '1回用量を5分間で急速静注する',
          '3日に1回のみまとめて投与する',
          '経口投与に変更する'
        ],
        answerIndex: 0,
        explanation: '緑膿菌に対するカルバペネムの%T>MIC確保のため、3〜4時間かけた延長点滴（Extended Infusion）が臨床的に非常に有効です。'
      },
      {
        id: 'inf_q4',
        question: '重度腎機能障害（eGFR 15 mL/min/1.73m2）の患者にセフェピム（CFPM）を標準用量で投与し続けた場合発現する危険な副作用はどれか？',
        options: [
          'セフェピム関連脳症（意識障害、三相波、陣攣性けいれん）',
          '急性膵炎',
          '網膜剥離',
          '血栓性静脈炎'
        ],
        answerIndex: 0,
        explanation: 'セフェピムは腎排泄型抗菌薬であり、腎機能低下時に減量を行わないと中枢神経障害（セフェピム脳症）を引き起こします。'
      },
      {
        id: 'inf_q5',
        question: 'キノロン系抗菌薬（レボフロキサシン等）とアルミニウム・マグネシウム含有制酸剤の併用で生じる相互作用の機序はどれか？',
        options: [
          '消化管内での多価金属イオンとのキレート形成による抗菌薬の吸収著減',
          'CYP3A4の強力な阻害による血中濃度急昇',
          '腎不全発症による排泄遅延',
          '血清アルブミンの置換'
        ],
        answerIndex: 0,
        explanation: 'ニューキノロン系はAl3+、Mg2+、Fe2+等の多価金属イオンと不溶性キレートを形成し、吸収が著しく低下（効力減退）します。'
      },
      {
        id: 'inf_q6',
        question: 'メチシリン耐性黄色ブドウ球菌（MRSA）感染症に対するダプトマイシン（キュビシン）の投与において、モニタリングが必須な検査項目はどれか？',
        options: ['CK（CPK：クレアチニンキナーゼ）値', '血清アミラーゼ', '甲状腺刺激ホルモン', '血中IgE値'],
        answerIndex: 0,
        explanation: 'ダプトマイシンの主な副作用として横紋筋融解症・筋毒性があるため、定期的なCK（CPK）値の測定が必要です。'
      },
      {
        id: 'inf_q7',
        question: '肺炎球菌肺炎に対してリネゾリド（ザイボックス）を14日以上投与する際に留意すべき重篤な血液毒性はどれか？',
        options: ['可逆的な骨髄抑制（特に血小板減少）', '溶血性貧血', '高マグネシウム血症', '急性白血病'],
        answerIndex: 0,
        explanation: 'リネゾリドの長期投与（2週間以上）ではミトコンドリア蛋白合成障害に起因する血小板減少等の骨髄抑制に厳重警戒が必要です。'
      },
      {
        id: 'inf_q8',
        question: '腎機能低下患者において減量（投与量調整）が不要な抗菌薬の組み合わせはどれか？',
        options: ['モキシフロキサシン・セフトリアキソン', 'バンコマイシン・ゲンタマイシン', 'レボフロキサシン・セフェピム', 'メロペネム・タゾバクタム/ピペラシリン'],
        answerIndex: 0,
        explanation: 'セフトリアキソン（CTRX）やモキシフロキサシン（MFX）は主に胆汁・肝代謝経路で排泄されるため、腎機能に応じた用量調整が原則不要です。'
      },
      {
        id: 'inf_q9',
        question: 'コロスチン（コリスチン）の臨床使用における最大の臓器毒性と、それを評価するパラメータはどれか？',
        options: ['急性腎障害（血清クレアチニン・eGFR）', '急性視神経炎', '心筋梗塞', '特発性肺線維症'],
        answerIndex: 0,
        explanation: '多剤耐性アシネトバクター等に用いるコリスチン（Colistin）は極めて高度な腎毒性を有するため、厳密な腎機能モニタリングが不可欠です。'
      },
      {
        id: 'inf_q10',
        question: '抗菌薬適正使用支援チーム（AST）の主たる活動内容として適切なものはどれか？',
        options: [
          '広域抗菌薬の使用届出・許可制の運用と投与量・投与期間の監視・介入',
          '院内製剤の薬価計算のみ',
          '外来処方箋の入力代行',
          '全患者の処方薬の一括代替調剤'
        ],
        answerIndex: 0,
        explanation: 'ASTは耐性菌出現防止と治療成績向上のため、抗MRSA薬やカルバペネム系等の広域抗菌薬の使用適正化指導・フィードバックを行います。'
      }
    ]
  }
];

export default function App() {
  // 画面遷移状態: 'list' (トップ講座一覧) | 'detail' (講義・演習詳細) | 'dashboard' | 'timer'
  const [currentView, setCurrentView] = useState('list');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedCourse, setSelectedCourse] = useState(COURSES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // 演習問題表示状態（最初は隠す）
  const [showQuizSection, setShowQuizSection] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  // 学習記録・タイマー
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyLogs, setStudyLogs] = useState([
    { id: 1, date: '本日', subject: '循環器・TDM高度投与設計', timeMinutes: 40 },
    { id: 2, date: '昨日', subject: '抗がん剤催吐リスク管理', timeMinutes: 50 }
  ]);

  // タイマーカウント
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // 講座選択時のページ移動ハンドラ
  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setShowQuizSection(false);
    setQuizAnswers({});
    setShowExplanations({});
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // フィルタリング
  const categories = ['すべて', ...Array.from(new Set(COURSES_DATA.map((c) => c.category)))];
  const filteredCourses = COURSES_DATA.filter((course) => {
    const matchesCat = selectedCategory === 'すべて' || course.category === selectedCategory;
    const matchesSearch =
      course.title.includes(searchQuery) ||
      course.description.includes(searchQuery) ||
      course.category.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleAnswerSelect = (questionId, optionIndex) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleSaveTimerLog = () => {
    if (timerSeconds < 5) return;
    const mins = Math.max(1, Math.round(timerSeconds / 60));
    const newLog = {
      id: Date.now(),
      date: '本日',
      subject: selectedCourse.title,
      timeMinutes: mins
    };
    setStudyLogs([newLog, ...studyLogs]);
    setTimerSeconds(0);
    setIsTimerRunning(false);
  };

  const formatTime = (totalSec) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="app-container">
      {/* 1. アプリケーションヘッダー */}
      <header className="app-header">
        <div className="header-brand" onClick={() => setCurrentView('list')}>
          <div className="brand-logo">Pharma</div>
          <div className="brand-titles">
            <span className="main-title">PharmaPulse</span>
            <span className="sub-title">高度臨床薬学サプリ</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="streak-tag">🔥 連続 7日</div>
          <div className="log-time-tag">⏱ 本日: {studyLogs.reduce((a, b) => a + b.timeMinutes, 0)}分</div>
        </div>
      </header>

      {/* 2. メインビューポート */}
      <main className="app-body">
        {/* ---------------------------------------------------------------------- */}
        {/* VIEW 1: トップページ（ジャンル検索・講座一覧） */}
        {/* ---------------------------------------------------------------------- */}
        {currentView === 'list' && (
          <div className="page-view animate-fade-in">
            {/* 検索バー */}
            <div className="search-section">
              <input
                type="text"
                className="search-input"
                placeholder="疾患名・薬剤名・受容体・PK/PDキーワードで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* ジャンル選択（スタサプ風水平スクロール） */}
            <div className="genre-section">
              <h3 className="section-heading">📌 ジャンル・専門領域を選択</h3>
              <div className="genre-chips-scroll">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`genre-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 講座一覧カードグリッド */}
            <div className="course-list-section">
              <div className="section-header-flex">
                <h3>受講可能プログラム</h3>
                <span className="count-badge">{filteredCourses.length} 講座</span>
              </div>

              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="course-card-interactive"
                    onClick={() => handleSelectCourse(course)}
                  >
                    <div className="card-top-tags">
                      <span className="badge-cat">{course.category}</span>
                      <span className="badge-lvl">{course.level}</span>
                    </div>
                    <h4>{course.title}</h4>
                    <p className="course-desc">{course.description}</p>
                    <div className="card-bottom-info">
                      <span>🎥 解説動画 {course.duration}</span>
                      <span>✍️ 高度演習 {course.quiz.length}問</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* VIEW 2: 講義詳細・学習ページ（新ページ遷移） */}
        {/* ---------------------------------------------------------------------- */}
        {currentView === 'detail' && (
          <div className="page-view animate-slide-up">
            {/* 戻るボタンナビゲーション */}
            <button className="back-nav-btn" onClick={() => setCurrentView('list')}>
              ← 講座一覧へ戻る
            </button>

            <div className="detail-header">
              <span className="detail-category">{selectedCourse.category}</span>
              <h2>{selectedCourse.title}</h2>
            </div>

            {/* 上部：解説動画プレイヤー */}
            <div className="video-card-container">
              <div className="video-wrapper">
                <iframe
                  src={selectedCourse.videoUrl}
                  title={selectedCourse.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* 要点テキスト */}
            <div className="summary-section-card">
              <h3>📋 臨床要点・最新ガイドライン解説</h3>
              <ul className="summary-bullets">
                {selectedCourse.summary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 演習問題展開エリア（最初は見えない設定） */}
            <div className="quiz-trigger-section">
              {!showQuizSection ? (
                <button
                  className="btn-start-quiz"
                  onClick={() => setShowQuizSection(true)}
                >
                  ✍️ 臨床高度演習問題（全10問）に挑戦する
                </button>
              ) : (
                <div className="quiz-full-container animate-fade-in">
                  <div className="quiz-header-bar">
                    <h3>✍️ 高度臨床実務・専門演習（全10問）</h3>
                    <p>現役病院薬剤師・専門薬剤師レベルの即時判定クイズ</p>
                  </div>

                  <div className="quiz-items-list">
                    {selectedCourse.quiz.map((q, idx) => {
                      const selectedOpt = quizAnswers[q.id];
                      const isAnswered = showExplanations[q.id];
                      const isCorrect = selectedOpt === q.answerIndex;

                      return (
                        <div key={q.id} className="quiz-block">
                          <p className="quiz-q-title">
                            <span className="q-badge">問 {idx + 1}</span> {q.question}
                          </p>

                          <div className="options-stack">
                            {q.options.map((optText, optIdx) => {
                              let btnStyle = '';
                              if (isAnswered) {
                                if (optIdx === q.answerIndex) btnStyle = 'opt-correct';
                                else if (optIdx === selectedOpt) btnStyle = 'opt-wrong';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  className={`option-btn ${btnStyle} ${selectedOpt === optIdx ? 'selected' : ''}`}
                                  onClick={() => handleAnswerSelect(q.id, optIdx)}
                                  disabled={isAnswered}
                                >
                                  <span className="opt-num">{optIdx + 1}</span>
                                  <span className="opt-label">{optText}</span>
                                </button>
                              );
                            })}
                          </div>

                          {/* 判別・解説 */}
                          {isAnswered && (
                            <div className={`explanation-box ${isCorrect ? 'box-pass' : 'box-fail'}`}>
                              <div className="exp-title">
                                {isCorrect ? '⭕ 正解（Excellence）' : '❌ 不正解（要復習）'}
                              </div>
                              <p className="exp-desc">{q.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* VIEW 3: 学習アナリティクス */}
        {/* ---------------------------------------------------------------------- */}
        {currentView === 'dashboard' && (
          <div className="page-view animate-fade-in">
            <h2>📈 学習アナリティクス</h2>
            <div className="metrics-row">
              <div className="metric-box">
                <span className="m-label">今週の学習時間</span>
                <span className="m-val">12.5 <small>時間</small></span>
              </div>
              <div className="metric-box">
                <span className="m-label">演習平均正答率</span>
                <span className="m-val">84.0 <small>%</small></span>
              </div>
            </div>

            <div className="chart-card">
              <h3>週間学習履歴（分）</h3>
              <div className="bar-chart">
                {[60, 90, 45, 120, 80, 150, 90].map((m, i) => (
                  <div key={i} className="bar-col">
                    <div className="bar-fill" style={{ height: `${(m / 150) * 100}%` }}></div>
                    <span className="bar-day">{['月','火','水','木','金','土','日'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* VIEW 4: ポモドーロタイマー */}
        {/* ---------------------------------------------------------------------- */}
        {currentView === 'timer' && (
          <div className="page-view animate-fade-in timer-center">
            <div className="timer-box">
              <span className="t-sub">臨床集中タイマー</span>
              <h2>{selectedCourse.title}</h2>
              <div className="t-time">{formatTime(timerSeconds)}</div>
              <div className="t-btn-group">
                {!isTimerRunning ? (
                  <button className="btn-main" onClick={() => setIsTimerRunning(true)}>計測開始</button>
                ) : (
                  <button className="btn-sub" onClick={() => setIsTimerRunning(false)}>一時停止</button>
                )}
                <button className="btn-accent" onClick={handleSaveTimerLog} disabled={timerSeconds < 5}>
                  記録を保存
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. モバイル最適化・ボトム固定ナビゲーション */}
      <nav className="mobile-bottom-nav">
        <button
          className={`nav-btn ${currentView === 'list' || currentView === 'detail' ? 'active' : ''}`}
          onClick={() => setCurrentView('list')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>講座・演習</span>
        </button>

        <button
          className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
          <span>分析</span>
        </button>

        <button
          className={`nav-btn ${currentView === 'timer' ? 'active' : ''}`}
          onClick={() => setCurrentView('timer')}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 16 14" />
          </svg>
          <span>タイマー</span>
        </button>
      </nav>
    </div>
  );
}