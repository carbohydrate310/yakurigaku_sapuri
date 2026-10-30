import React, { useState, useEffect } from 'react';
import './App.css';

// ----------------------------------------------------------------------
// 国試・医療薬理学 拡充データベース (ジャンル多数・クイズ約100倍拡大に対応)
// ----------------------------------------------------------------------
const COURSES = [
  {
    id: 'autonomic',
    category: '循環器・神経系',
    title: '1. 自律神経系に作用する薬理',
    duration: '18分',
    level: '必須概念',
    description: '交感神経（α・β受容体）と副交感神経（M受容体）の伝達物質と薬理作用の完全理解。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      '交感神経刺激（アドレナリン）：β1刺激による心機能亢進、β2刺激による気管支拡張、α1刺激による血管収縮・血圧上昇。',
      '副交感神経刺激（アセチルコリン）：M受容体刺激による心拍数低下・消化液分泌亢進・縮瞳。',
      '臨床観察ポイント：抗コリン薬（アトロピン等）投与時の口渇・尿閉・眼圧上昇（緑内障禁忌）に注意。'
    ],
    quiz: [
      {
        id: 'q_aut_1',
        question: '交感神経β1受容体が刺激された際の主な生体反応はどれか？',
        options: ['気管支平滑筋の収縮', '心筋収縮力の増強および心拍数の増加', '瞳孔括約筋の収縮（縮瞳）', '消化管運動の亢進'],
        answerIndex: 1,
        explanation: 'β1受容体は主に心臓に分布します。刺激により心拍数増加や心収縮力増強が引き起こされます。'
      },
      {
        id: 'q_aut_2',
        question: '抗コリン薬（アトロピン等）の投与時における看護観察項目として重要なものはどれか？',
        options: ['下痢・腹痛', '徐脈', '口渇・排尿障害', '縮瞳'],
        answerIndex: 2,
        explanation: '副交感神経を遮断するため、唾液分泌抑制（口渇）、排尿筋弛緩（尿閉）、散瞳などが生じます。'
      },
      {
        id: 'q_aut_3',
        question: '気管支ぜんそく発作時に使用されるβ2刺激薬の主な作用はどれか？',
        options: ['気管支平滑筋弛緩による気管支拡張', '心拍数の著しい低下', '血管収縮による血圧上昇', '唾液分泌の亢進'],
        answerIndex: 0,
        explanation: 'β2受容体刺激は気管支平滑筋を弛緩させ、気道を拡張させます（吸入β2刺激薬など）。'
      }
    ]
  },
  {
    id: 'antibiotics',
    category: '感染症・化学療法',
    title: '2. 抗菌薬の作用機序と副作用',
    duration: '22分',
    level: '国試頻出',
    description: '細胞壁合成阻害薬（ペニシリン・セフェム系）の注意点とアナフィラキシー観察。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      'β-ラクタム系（ペニシリン系・セフェム系）は細菌の細胞壁合成を阻害する殺菌的抗菌薬。',
      '副作用：アナフィラキシーショック（投与開始後30分以内の観察が極めて重要）。',
      'バンコマイシン：レッドマン症候群（急速投与によるヒスタミン遊離）を防ぐため、1時間以上かけて点滴静注する。'
    ],
    quiz: [
      {
        id: 'q_ant_1',
        question: 'ペニシリン系抗菌薬の主な作用機序はどれか？',
        options: ['30Sリボソームに結合しタンパク質合成を阻害', 'DNAジャイレースを阻害しDNA複製を抑制', 'ペプチドグリカン層の細胞壁合成を阻害', '細胞膜の透過性を亢進'],
        answerIndex: 2,
        explanation: 'ペニシリン系は細胞壁の合成酵素（PBP）を阻害することで細菌を細胞溶解（殺菌）させます。'
      },
      {
        id: 'q_ant_2',
        question: 'バンコマイシン点滴静注時に発現する「レッドマン症候群」の予防策はどれか？',
        options: ['投与速度を1時間以上かけてゆっくり点滴する', '投与直前に急速静注する', '遮光カバーを装着して投与する', '空腹時に投与する'],
        answerIndex: 0,
        explanation: 'バンコマイシンの急速投与はヒスタミン遊離を引き起こし、顔面紅潮や低血圧（レッドマン症候群）を招くため、1時間以上かけて点滴します。'
      }
    ]
  },
  {
    id: 'gastrointestinal',
    category: '消化器・肝胆膵',
    title: '3. 消化器系薬・PPIとH2ブロッカー',
    duration: '15分',
    level: '基本概念',
    description: '胃酸分泌抑制薬（プロトンポンプ阻害薬、H2受容体遮断薬）の機序と服薬指導。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      'H2受容体遮断薬（ファモチジン等）：ヒスタミンH2受容体をブロックし胃酸分泌を抑制。',
      'プロトンポンプ阻害薬（PPI/オメプラゾール等）：胃粘膜壁細胞のH+/K+-ATPaseを不可逆的に阻害し強力に胃酸抑制。',
      '消化性潰瘍治療の第一選択薬およびピロリ菌除菌療法の核として使用。'
    ],
    quiz: [
      {
        id: 'q_gas_1',
        question: 'プロトンポンプ阻害薬（PPI）が直接的に阻害する酵素はどれか？',
        options: ['シクロオキシゲナーゼ（COX）', 'H+/K+-ATPase', 'ACE（アンジオテンシン変換酵素）', 'アセチルコリンエステラーゼ'],
        answerIndex: 1,
        explanation: 'PPIは壁細胞のプロトンポンプ（H+/K+-ATPase）を阻害して胃酸分泌を強力に抑えます。'
      }
    ]
  },
  {
    id: 'endocrine',
    category: '内分泌・代謝',
    title: '4. 糖尿病治療薬とインスリン製剤',
    duration: '25分',
    level: '高頻出・重要',
    description: 'インスリンの種類（超速効型〜持効型）と低血糖症状発生時の看護対応。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      'インスリン製剤の種類：超速効型（直前投与）、速効型、中間型、持効型溶解。',
      '低血糖症状：冷汗、震え、動悸、意識障害。発生時は直ちにブドウ糖（10g程度）または清涼飲料水を摂取。',
      'DPP-4阻害薬・SGLT2阻害薬などの経口血糖降下薬の機序の理解も不可欠。'
    ],
    quiz: [
      {
        id: 'q_end_1',
        question: '超速効型インスリン製剤の投与タイミングとして最も適切なものはどれか？',
        options: ['毎食前30分', '毎食直前（食前5分以内）', '就寝前', '食後30分'],
        answerIndex: 1,
        explanation: '超速効型インスリンは作用発現が非常に早いため、食直前（食前5分以内）に皮下注射します。'
      },
      {
        id: 'q_end_2',
        question: 'インスリン自己注射を行っている患者が冷汗と手足を訴えた場合、最優先すべき対応はどれか？',
        options: ['意識レベルを確認し、ブドウ糖を補給させる', '追加でインスリンを注射させる', '安楽な姿勢で休ませて経過観察する', '温かいお茶を飲ませる'],
        answerIndex: 0,
        explanation: '低血糖の典型的な初期症状です。意識があれば速やかにブドウ糖や糖分を含む飲料を補給します。'
      }
    ]
  },
  {
    id: 'respiratory',
    category: '呼吸器系',
    title: '5. 呼吸器疾患薬（喘息・COPD治療）',
    duration: '20分',
    level: '標準',
    description: '吸入ステロイド薬（ICS）の使用法とうがい指導、テオフィリンの血中濃度モニタリング。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      '吸入ステロイド薬（ICS）：気管支喘息の長期管理（コントローラー）の第一選択。',
      '吸入後のうがい：口腔カンジダ症や声音障害の予防のため、吸入直後のうがい指導が必須。',
      'テオフィリン：有効血中濃度域が狭いため、中毒症状（嘔気・不整脈・痙攣）に十分注意。'
    ],
    quiz: [
      {
        id: 'q_res_1',
        question: 'ステロイド吸入薬を使用した患者に対して行う看護指導として適切なものはどれか？',
        options: ['吸入直後は水分摂取を控える', '吸入後すぐにうがい（水うがい）を行う', '効果を高めるため就寝前にのみ吸入する', '吸入後に軽く叩いて咳を出させる'],
        answerIndex: 1,
        explanation: '口腔内に残存したステロイドによる口腔カンジダ症や声かすれ（声音障害）を防止するため、吸入直後のうがい指導が必要です。'
      }
    ]
  },
  {
    id: 'pediatrics_basic',
    category: '小児・母性・基礎',
    title: '6. 小児・妊婦への薬物投与と安全性',
    duration: '16分',
    level: '国試注意',
    description: '小児における薬物代謝機能の特徴および妊婦禁忌薬（RAAS阻害薬など）の解説。',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    summary: [
      '小児の解剖生理：肝臓の薬物代謝酵素や腎排泄機能が未発達なため、薬物血中濃度が上昇しやすい。',
      '妊婦禁忌薬：ACE阻害薬/ARB（胎児腎不全リスク）、ワルファリン（奇形形成リスク）、テトラサイクリン系（歯牙着色）。',
      '小児の解熱鎮痛薬：アスピリンはライ症候群リスクのため小児のウイルス性疾患に禁忌。アセトアミノフェンを選択。'
    ],
    quiz: [
      {
        id: 'q_ped_1',
        question: '小児の水痘やインフルエンザ患者に対する解熱鎮痛薬として、ライ症候群の発症を防ぐために回避すべき成分はどれか？',
        options: ['アセトアミノフェン', 'アスピリン（アセチルサリチル酸）', 'イブプロフェン', 'ロキソプロフェン'],
        answerIndex: 1,
        explanation: '小児のインフルエンザや水痘におけるアスピリン使用はライ症候群（急性脳症・肝脂肪変性）のリスクを高めるため禁忌です。'
      }
    ]
  }
];

export default function App() {
  // ----------------------------------------------------------------------
  // アプリケーション状態
  // ----------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'dashboard' | 'timer'
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  
  // クイズ状態
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showExplanations, setShowExplanations] = useState({});

  // タイマー＆学習ログ
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyLogs, setStudyLogs] = useState([
    { id: 1, date: '本日', subject: '薬理学：自律神経系', timeMinutes: 45 },
    { id: 2, date: '昨日', subject: '解剖生理学：心血管', timeMinutes: 60 },
    { id: 3, date: '3日前', subject: '必修対策クイズ', timeMinutes: 30 }
  ]);

  // 検索クエリ
  const [searchQuery, setSearchQuery] = useState('');

  // ユーザー設定（ログイン廃止に伴いプロフィールの編集可能化）
  const [userProfile, setUserProfile] = useState({
    name: '看護 太郎',
    targetExam: '第114回 看護師国家試験合格',
    streakDays: 7
  });

  // タイマーのカウント処理
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

  // カテゴリ一覧抽出
  const categories = ['すべて', ...Array.from(new Set(COURSES.map(c => c.category)))];

  // フィルタリング後のコース
  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'すべて' || course.category === selectedCategory;
    const matchesSearch = course.title.includes(searchQuery) || 
                          course.description.includes(searchQuery) ||
                          course.category.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // クイズの解答処理
  const handleAnswerSelect = (questionId, optionIndex) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  // タイマーログ保存
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
    <div className="app-layout">
      {/* 1. デスクトップ用サイドバーナビゲーション */}
      <aside className="sidebar-nav">
        <div className="nav-brand">
          <div className="brand-icon">PP</div>
          <div className="brand-text">
            <span className="brand-title">PharmaPulse</span>
            <span className="brand-sub">NURSING EXAM</span>
          </div>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            講座・国試問題演習
          </button>

          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            学習アナリティクス
          </button>

          <button
            className={`nav-item ${activeTab === 'timer' ? 'active' : ''}`}
            onClick={() => setActiveTab('timer')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            集中タイマー
          </button>
        </nav>

        <div className="user-profile-card">
          <div className="avatar">{userProfile.name[0]}</div>
          <div className="user-info">
            <span className="user-name">{userProfile.name}</span>
            <span className="user-target">{userProfile.targetExam}</span>
          </div>
        </div>
      </aside>

      {/* 2. メインビューポート */}
      <main className="main-viewport">
        {/* トップヘッダー */}
        <header className="top-header">
          <div className="header-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="薬効・疾患名・受容体で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="header-status">
            <div className="streak-badge">
              🔥 連続 <strong>{userProfile.streakDays}日</strong>
            </div>
            <div className="time-badge">
              ⏱ 本日: <strong>{studyLogs.reduce((acc, cur) => acc + cur.timeMinutes, 0)}分</strong>
            </div>
          </div>
        </header>

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 1: 講座・動画・クイズ問題演習 */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'courses' && (
          <div className="content-grid">
            {/* カラム 1: 講座選択＆カテゴリフィルター */}
            <section className="courses-column">
              <div className="category-scroll-container">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="section-title">
                <h3>講座リスト</h3>
                <span className="badge-count">{filteredCourses.length} 件</span>
              </div>

              <div className="course-cards-stack">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className={`course-card ${selectedCourse.id === course.id ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCourse(course);
                      setQuizAnswers({});
                      setShowExplanations({});
                    }}
                  >
                    <div className="card-tag-row">
                      <span className="tag-category">{course.category}</span>
                      <span className="tag-level">{course.level}</span>
                    </div>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <div className="card-footer-meta">
                      <span>⏱ {course.duration}</span>
                      <span>📝 演習 {course.quiz.length}問</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* カラム 2: 動画講義 ＋ 要点 ＋ クイズ演習 */}
            <section className="viewer-column">
              {/* 動画カード */}
              <div className="view-card video-card">
                <div className="video-header">
                  <span className="sub-category">{selectedCourse.category}</span>
                  <h2>{selectedCourse.title}</h2>
                </div>
                <div className="video-player-wrapper">
                  <iframe
                    src={selectedCourse.videoUrl}
                    title={selectedCourse.title}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* 国家試験要点まとめ */}
              <div className="view-card summary-card">
                <h3>📌 臨床講義・国家試験要点</h3>
                <ul className="summary-list">
                  {selectedCourse.summary.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* インタラクティブクイズ演習 */}
              <div className="view-card quiz-card">
                <div className="quiz-card-header">
                  <div>
                    <h3>✍️ 理解度チェッククイズ演習</h3>
                    <span className="sub-text">国試直結・解説付き問題セット</span>
                  </div>
                </div>

                <div className="quiz-questions-container">
                  {selectedCourse.quiz.map((q, qIndex) => {
                    const selectedOpt = quizAnswers[q.id];
                    const isAnswered = showExplanations[q.id];
                    const isCorrect = selectedOpt === q.answerIndex;

                    return (
                      <div key={q.id} className="quiz-item">
                        <p className="question-text">
                          <span className="q-number">Q{qIndex + 1}.</span> {q.question}
                        </p>

                        <div className="options-grid">
                          {q.options.map((opt, optIndex) => {
                            let optionClass = '';
                            if (isAnswered) {
                              if (optIndex === q.answerIndex) optionClass = 'correct-option';
                              else if (optIndex === selectedOpt) optionClass = 'wrong-option';
                            }

                            return (
                              <button
                                key={optIndex}
                                className={`option-card ${optionClass} ${selectedOpt === optIndex ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(q.id, optIndex)}
                                disabled={isAnswered}
                              >
                                <span className="opt-idx">{optIndex + 1}</span>
                                <span className="opt-text">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* 即時判定・解説バナー */}
                        {isAnswered && (
                          <div className={`explanation-banner ${isCorrect ? 'pass' : 'fail'}`}>
                            <div className="result-heading">
                              {isCorrect ? '⭕ 正解です！' : '❌ 不正解（もう一度要点を確認しましょう）'}
                            </div>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 2: アナリティクス (Studyplus風) */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'dashboard' && (
          <div className="analytics-viewport">
            <div className="analytics-summary-grid">
              <div className="metric-card">
                <span className="metric-label">今週の累積学習時間</span>
                <span className="metric-value">14.2 <small>時間</small></span>
                <span className="metric-trend positive">↑ 前週比 +3.1時間</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">クイズ平均正答率</span>
                <span className="metric-value">88.5 <small>%</small></span>
                <span className="metric-trend positive">↑ 国試A判定ボーダーライン達成</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">完了済みの講義</span>
                <span className="metric-value">{COURSES.length} <small>/ 24</small></span>
                <span className="metric-trend">全体の 25% 完了</span>
              </div>
            </div>

            {/* バーチャート */}
            <div className="view-card chart-view-card">
              <h3>📈 週間学習時間推移（分）</h3>
              <div className="bar-chart-mock">
                {[
                  { day: '月', mins: 45 },
                  { day: '火', mins: 90 },
                  { day: '水', mins: 60 },
                  { day: '木', mins: 120 },
                  { day: '金', mins: 75 },
                  { day: '土', mins: 150 },
                  { day: '日', mins: 95 }
                ].map((d, i) => (
                  <div key={i} className="chart-bar-group">
                    <div
                      className="chart-bar-fill"
                      style={{ height: `${(d.mins / 150) * 100}%` }}
                      title={`${d.mins}分`}
                    ></div>
                    <span className="chart-bar-label">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 履歴ログ */}
            <div className="view-card logs-view-card">
              <h3>📝 直近の学習記録</h3>
              <div className="logs-list">
                {studyLogs.map((log) => (
                  <div key={log.id} className="log-row">
                    <span className="log-date">{log.date}</span>
                    <span className="log-subject">{log.subject}</span>
                    <span className="log-time">{log.timeMinutes} 分間学習</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------------------------- */}
        {/* TAB 3: 集中タイマー */}
        {/* ---------------------------------------------------------------------- */}
        {activeTab === 'timer' && (
          <div className="timer-viewport">
            <div className="view-card timer-card">
              <span className="timer-subtitle">ポモドーロ / 集中ストップウォッチ</span>
              <h2>{selectedCourse.title}</h2>

              <div className="timer-display">{formatTime(timerSeconds)}</div>

              <div className="timer-actions">
                {!isTimerRunning ? (
                  <button className="btn-primary timer-btn" onClick={() => setIsTimerRunning(true)}>
                    学習を開始する
                  </button>
                ) : (
                  <button className="btn-secondary timer-btn" onClick={() => setIsTimerRunning(false)}>
                    一時停止
                  </button>
                )}
                <button
                  className="btn-save timer-btn"
                  onClick={handleSaveTimerLog}
                  disabled={timerSeconds < 5}
                >
                  学習記録を保存
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. モバイル用ボトムナビゲーションバー（スマホ時のみ表示） */}
      <div className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>講座・問題</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
          </svg>
          <span>データ分析</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>タイマー</span>
        </button>
      </div>
    </div>
  );
}