import React, { useState } from 'react';
import './App.css';

// 膨大な商品データ (全12商品)
const PRODUCTS = [
  {
    id: 1,
    name: '燕産 特選 プレミアムコシヒカリ',
    category: '白米',
    basePrice: 4800,
    tag: '最高峰・人気No.1',
    rating: 4.9,
    reviews: 248,
    badge: '産地直送',
    desc: '信濃川の雪解け水と寒暖差が育んだ逸品。ツヤ・粘り・甘みの完璧なバランス。',
    detailDesc: '新潟県燕市の厳しい自然環境と匠の技を結集させた最高品質のコシヒカリです。炊き上がりの芳醇な香りと、噛むほどに溢れる強い甘みが特徴です。',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    name: '新潟燕産 大粒銘柄 新之助',
    category: '白米',
    basePrice: 4500,
    tag: '大粒・濃厚なコク',
    rating: 4.8,
    reviews: 182,
    badge: '注目銘柄',
    desc: 'きらめく大粒としっかりとした食感。冷めてもおいしさが持続する期待の極上米。',
    detailDesc: '大粒でしっかりとした噛みごたえが特徴の新潟限定プレミアム米。和食はもちろん、洋食や冷めたお弁当・おにぎりでも本領を発揮します。',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    name: '燕産 特別栽培 減農薬玄米',
    category: '玄米',
    basePrice: 4200,
    tag: '有機減農薬・ヘルシー',
    rating: 4.7,
    reviews: 115,
    badge: '身体に優しい',
    desc: '農薬を極力抑えて丁寧に育てた、プチプチとした食感と芳醇な香ばしさが際立つ玄米。',
    detailDesc: '安心・安全にこだわり、丁寧に育まれた無化学肥料栽培の玄米です。ミネラルと食物繊維が豊富で、毎日の健康維持に最適です。',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 4,
    name: '【毎月届く】燕産プレミアムコシヒカリ 定期便',
    category: '定期便',
    basePrice: 4320,
    tag: '通常価格より10%OFF',
    rating: 5.0,
    reviews: 310,
    badge: 'お得なサブスク',
    desc: '毎月新鮮な精米を自動でお届け！重いお米を運ぶ手間がなくいつでも一番美味しい状態。',
    detailDesc: '毎月決まった日に精米したての最高級お米をお届けする一番人気の定期コースです。いつでも解約・スキップが可能です。',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 5,
    name: '桐箱入り 燕産極上米 贈答ギフトセット',
    category: 'ギフト',
    basePrice: 8800,
    tag: '高級桐箱・のし無料',
    rating: 4.9,
    reviews: 89,
    badge: 'お祝い・お中元',
    desc: '職人が手作りした高級桐箱にお米を美しく詰めた、ご贈答・内祝いに最適な最高級ギフト。',
    detailDesc: '大切な方への贈り物に。厳選されたコシヒカリと新之助を、燕の職人による桐箱に納めました。各種のし・名入れにも完全対応。',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 6,
    name: '燕産 手間いらず 極上無洗米コシヒカリ',
    category: '白米',
    basePrice: 5000,
    tag: '時短・高精米',
    rating: 4.8,
    reviews: 142,
    badge: '節水・便利',
    desc: '水を入れて炊くだけ！お米本来のうまみや栄養分を削ぎ落とさない最新精米技術。',
    detailDesc: 'とぐ手間を一切省いた無洗米。独自の製法で、米ぬかのみをきれいに取り除いているため、美味しくエコに召し上がっていただけます。',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 7,
    name: '燕産 7分づき米（栄養長持ち）',
    category: '玄米',
    basePrice: 4400,
    tag: '白米の食べやすさ',
    rating: 4.6,
    reviews: 73,
    badge: '栄養満点',
    desc: '玄米の栄養と白米の食べやすさを良いとこ取り。胚芽を残して精米した健康志向米。',
    detailDesc: '白米と同じ感覚で炊飯器で簡単に炊けるのが特徴です。胚芽が残っているためビタミン・ミネラルが白米よりも豊富に含まれています。',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 8,
    name: '燕のこだわり 3銘柄食べ比べギフト(2kg×3)',
    category: 'ギフト',
    basePrice: 6500,
    tag: '飲み比べならぬ食べ比べ',
    rating: 4.9,
    reviews: 104,
    badge: 'ギフト人気No.1',
    desc: 'コシヒカリ・新之助・ミルキークイーンの3種類を一度に楽しめる贅沢セット。',
    detailDesc: 'お米それぞれの食感や甘みの違いを毎日の食卓でお楽しみいただけます。化粧箱入りでプレゼントにも大人気です。',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 9,
    name: '燕産 もちもち極上 ミルキークイーン',
    category: '白米',
    basePrice: 4700,
    tag: 'モチモチ感・冷めても美味しい',
    rating: 4.8,
    reviews: 96,
    badge: 'お弁当に最適',
    desc: '冷めても硬くならず、圧倒的なモチモチ感が魅力。お弁当やおにぎりに最も適したお米。',
    detailDesc: 'アミロース含有量が低く、まるで餅米のような粘りとモチモチ感を楽しめます。冷めても美味しさが変わらないのが最大の特徴です。',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 10,
    name: '真空キューブパック 食べ切りサイズ(300g×6)',
    category: 'ギフト',
    basePrice: 3800,
    tag: '長持ち真空・手土産',
    rating: 4.7,
    reviews: 62,
    badge: 'インテリア映え',
    desc: '2合ずつ真空パックされた可愛いキューブ型。精米後も1年間美味しさをキープ。',
    detailDesc: '計量いらずで開けてそのまま炊ける使いやすさ。長期間美味しい状態を保てるため、非常食やおしゃれなプチギフトに最適です。',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 11,
    name: '【業務用・ご家庭用】燕産コシヒカリ 10kgドカンとお得パック',
    category: '白米',
    basePrice: 8500,
    tag: '大容量・お得',
    rating: 4.9,
    reviews: 320,
    badge: 'まとめ買いでお得',
    desc: '食べ盛りのお子様がいるご家庭に！5kg×2袋でお届けするコスパ最強の特大パック。',
    detailDesc: '毎日お米をたくさん食べるご家庭や飲食店様向けの大容量パック。高品質な燕産米をお手頃な価格でお届けします。',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 12,
    name: '【定期便】新之助＆コシヒカリ 隔月お届け便',
    category: '定期便',
    basePrice: 4600,
    tag: '隔月・バリエーション',
    rating: 4.9,
    reviews: 150,
    badge: '飽きない定期便',
    desc: '奇数月はコシヒカリ、偶数月は新之助が届く！2大銘柄を交互に味わう贅沢サブスク。',
    detailDesc: '「色々な銘柄を楽しみたい」というお客様の声から生まれた定期コース。毎回届くのが楽しみになる人気のプランです。',
    image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=1000'
  }
];

// 豊富な口コミデータ
const REVIEWS = [
  { id: 1, name: '佐藤 さくら 様 (東京都)', rating: 5, date: '2026/03/01', text: 'ツヤと香りが他のお米と全く違います！冷めても美味しく、子供たちもお弁当を残さなくなりました。', product: '燕産 特選 プレミアムコシヒカリ' },
  { id: 2, name: '高橋 健一 様 (大阪府)', rating: 5, date: '2026/02/28', text: '新之助を購入。大粒で食べ応えがあり、洋食や丼ものとの相性が抜群です。リピート確定です。', product: '新潟燕産 大粒銘柄 新之助' },
  { id: 3, name: '渡辺 恵子 様 (神奈川県)', rating: 5, date: '2026/02/20', text: '親戚への内祝いとして桐箱ギフトを贈りました。「こんなにきれいでおいしいお米は初めて」と大喜びされました。', product: '桐箱入り 燕産極上米 贈答ギフトセット' },
  { id: 4, name: '中村 達也 様 (愛知県)', rating: 5, date: '2026/02/15', text: '定期便を利用しています。毎月精米したてが自動で届くので買い忘れもなく、何より安い！', product: '【毎月届く】燕産プレミアムコシヒカリ 定期便' },
  { id: 5, name: '小林 美香 様 (福岡県)', rating: 4, date: '2026/02/10', text: '玄米特有のパサつきがなく、プチプチ感が心地よいです。健康のために毎食いただいています。', product: '燕産 特別栽培 減農薬玄米' }
];

// 容量に応じた価格倍率
const WEIGHT_OPTIONS = [
  { label: '2kg', multiplier: 0.5 },
  { label: '5kg', multiplier: 1.0 },
  { label: '10kg', multiplier: 1.85 }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('shop'); // 'shop' | 'story' | 'reviews' | 'cart' | 'faq' | 'guide'
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('すべて');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState('5kg');
  const [selectedMilling, setSelectedMilling] = useState('白米');
  const [giftOption, setGiftOption] = useState('なし');
  const [toasts, setToasts] = useState([]);

  // 注文手続き状態
  const [checkoutStep, setCheckoutStep] = useState('input');
  const [orderInfo, setOrderInfo] = useState({ name: '', address: '', phone: '', card: '', exp: '', cvc: '' });

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  };

  const addToCart = (product, weight = '5kg', milling = '白米', gift = 'なし') => {
    const weightOpt = WEIGHT_OPTIONS.find((w) => w.label === weight) || { multiplier: 1.0 };
    const itemPrice = Math.round(product.basePrice * weightOpt.multiplier);
    const cartItemId = `${product.id}-${weight}-${milling}-${gift}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [
        ...prev,
        {
          ...product,
          cartItemId,
          selectedWeight: weight,
          selectedMilling: milling,
          giftOption: gift,
          price: itemPrice,
          quantity: 1
        }
      ];
    });

    showToast(`🌾 「${product.name} (${weight})」をカートに追加しました`);
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  };

  const handleFinalOrder = (e) => {
    e.preventDefault();
    setCheckoutStep('shipped');
    setCart([]);
  };

  const filteredProducts = filter === 'すべて' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-full-container">
      {/* トースト通知 */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast-item">{toast.message}</div>
        ))}
      </div>

      {/* トップアナウンスバー */}
      <div className="top-announcement">
        🎁 <strong>全品送料無料</strong>キャンペーン実施中！今なら新規会員登録で次回使える500ptプレゼント！
      </div>

      {/* ヘッダー */}
      <header className="global-header">
        <div className="header-brand" onClick={() => setCurrentPage('shop')}>
          <h1>TSUBAME <span>- 燕 -</span></h1>
          <p className="sub-title">越後燕 匠の極上米専門店</p>
        </div>

        <nav className="global-nav">
          <button className={currentPage === 'shop' ? 'active' : ''} onClick={() => setCurrentPage('shop')}>商品一覧</button>
          <button className={currentPage === 'story' ? 'active' : ''} onClick={() => setCurrentPage('story')}>燕のこだわり</button>
          <button className={currentPage === 'reviews' ? 'active' : ''} onClick={() => setCurrentPage('reviews')}>お客様の声</button>
          <button className={currentPage === 'guide' ? 'active' : ''} onClick={() => setCurrentPage('guide')}>ご利用ガイド</button>
          <button className={currentPage === 'faq' ? 'active' : ''} onClick={() => setCurrentPage('faq')}>よくある質問</button>
        </nav>

        <div className="header-right">
          <button className={`cart-button-nav ${currentPage === 'cart' ? 'active-cart' : ''}`} onClick={() => { setCurrentPage('cart'); setCheckoutStep('input'); }}>
            🛒 カート
            {totalCount > 0 && <span className="cart-badge">{totalCount}</span>}
          </button>
        </div>
      </header>

      {/* ─── メインコンテンツ ─── */}

      {/* A. 商品一覧ページ */}
      {currentPage === 'shop' && (
        <main className="page-view fade-in">
          {/* ヒーローエリア */}
          <section className="hero-section-full">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <span className="hero-badge">新潟県燕市 蔵出し産地直送</span>
              <h2>土と水、そして職人の情熱が育む<br />極上のひと粒。</h2>
              <p>信濃川の豊かな恵みと澄んだ空気。注文を受けてから発送当日に精米する至高の味わいをお届けします。</p>
            </div>
          </section>

          {/* 燕の米が選ばれる理由 (特長アイコンエリア) */}
          <section className="features-banner">
            <div className="feature-item">
              <span className="feature-icon">🌾</span>
              <div>
                <h4>当日精米でお届け</h4>
                <p>いつでも新鮮な香り</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <div>
                <h4>全品全国送料無料</h4>
                <p>1点からでも丁寧にお届け</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎁</span>
              <div>
                <h4>のし・ギフト完全対応</h4>
                <p>お祝いや季節の贈り物に</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <div>
                <h4>お得な定期便コース</h4>
                <p>いつでも10%OFF＆解約自由</p>
              </div>
            </div>
          </section>

          {/* フィルター＆商品一覧 */}
          <section className="content-fluid">
            <div className="filter-bar">
              <span className="filter-label">カテゴリー検索:</span>
              {['すべて', '白米', '玄米', '定期便', 'ギフト'].map((cat) => (
                <button key={cat} onClick={() => setFilter(cat)} className={filter === cat ? 'active' : ''}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="product-grid-full">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="card-image-wrapper">
                    <img src={product.image} alt={product.name} />
                    <span className="card-tag">{product.tag}</span>
                    <button className="quick-view-btn" onClick={() => { setSelectedProduct(product); setSelectedWeight('5kg'); setSelectedMilling('白米'); setGiftOption('なし'); }}>
                      🔍 詳細・オプション選択
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="card-meta">
                      <span className="card-category">【{product.category}】</span>
                      <span className="card-rating">★ {product.rating} ({product.reviews}件)</span>
                    </div>
                    <h4>{product.name}</h4>
                    <p className="card-desc">{product.desc}</p>
                    <div className="card-footer">
                      <div className="card-price">
                        ¥{product.basePrice.toLocaleString()} <span className="price-unit">(5kg / 税込)</span>
                      </div>
                      <button className="add-btn" onClick={() => addToCart(product, '5kg', '白米', 'なし')}>
                        カートに入れる
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* B. 燕のこだわり */}
      {currentPage === 'story' && (
        <main className="page-view content-fluid fade-in">
          <div className="page-header-banner">
            <h2>燕のこだわり</h2>
            <p>モノづくりの街・燕が世界に誇る「米作り」の真髄</p>
          </div>
          <div className="story-grid">
            <div className="story-card">
              <div className="story-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800)' }}></div>
              <div className="story-text">
                <h3>01. 越後山脈が育む純粋な雪解け水</h3>
                <p>新潟県燕市を流れる信濃川の清流。春になると雪解け水がミネラルをたっぷりと含んで田んぼを満たします。この質の高い水こそが、米の持つ強い甘みと透明感を生み出します。</p>
              </div>
            </div>
            <div className="story-card reverse">
              <div className="story-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800)' }}></div>
              <div className="story-text">
                <h3>02. 職人気質が生み出す究極の品質管理</h3>
                <p>燕市は金属加工で有名な「職人の街」。米作りにおいてもその職人精神はいかんなく発揮されています。収穫後の乾燥・管理工程において0.1%単位で水分量をコントロールし、常に最高の状態で精米します。</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* C. 口コミページ */}
      {currentPage === 'reviews' && (
        <main className="page-view content-fluid fade-in">
          <div className="page-header-banner">
            <h2>お客様の声・口コミ</h2>
            <p>全国のお客様から寄せられたリアルなレビューをご紹介します</p>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((rev) => (
              <div key={rev.id} className="review-card">
                <div className="review-header">
                  <span className="review-stars">{'★'.repeat(rev.rating)}</span>
                  <span className="review-date">{rev.date}</span>
                </div>
                <h4 className="review-product">{rev.product}</h4>
                <p className="review-text">“{rev.text}”</p>
                <div className="review-author">{rev.name}</div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* D. ご利用ガイド */}
      {currentPage === 'guide' && (
        <main className="page-view content-fluid fade-in">
          <div className="page-header-banner">
            <h2>ご利用ガイド</h2>
            <p>安心・安全なお買い物をお約束します</p>
          </div>
          <div className="guide-grid">
            <div className="guide-box">
              <h3>🚚 送料・配送について</h3>
              <p>全品全国送料無料でお届けします。ご注文確定後、当日精米を行い2営業日以内に発送いたします。</p>
            </div>
            <div className="guide-box">
              <h3>💳 お支払い方法</h3>
              <p>クレジットカード（VISA, MasterCard, JCB, AMEX）、PayPay、後払い決済をご利用いただけます。</p>
            </div>
            <div className="guide-box">
              <h3>🎁 ギフト・のし対応</h3>
              <p>御祝・内祝・御中元・御歳暮など、無料でのし掛け・名入れを承ります。購入画面でお選びください。</p>
            </div>
            <div className="guide-box">
              <h3>🔄 返品・交換について</h3>
              <p>品質管理には万全を期しておりますが、万が一破損や品質に不都合があった場合は、すぐにお取替えいたします。</p>
            </div>
          </div>
        </main>
      )}

      {/* E. FAQ */}
      {currentPage === 'faq' && (
        <main className="page-view content-fluid fade-in">
          <div className="page-header-banner">
            <h2>よくある質問（FAQ）</h2>
            <p>お客様から多く寄せられるご質問を集めました</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h4>Q. 送料はかかりますか？</h4>
              <p>全品全国一律送料無料でお届けしております（※離島含む）。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 精米日はいつになりますか？</h4>
              <p>ご注文をいただいてから発送当日に精米を行うため、一番新鮮な状態でお手元に届きます。</p>
            </div>
            <div className="faq-item">
              <h4>Q. お米の正しい保存方法を教えてください。</h4>
              <p>直射日光や高温多湿を避け、冷蔵庫の野菜室などで密閉容器に入れて保存していただくのが最も長持ちします。</p>
            </div>
            <div className="faq-item">
              <h4>Q. 定期便の解約や変更はできますか？</h4>
              <p>マイページまたはお電話より、いつでもお届けサイクルの変更や解約が可能です。</p>
            </div>
          </div>
        </main>
      )}

      {/* F. カート・注文手続き */}
      {currentPage === 'cart' && (
        <main className="page-view content-fluid fade-in">
          <div className="page-header-banner">
            <h2>ショッピングカート・ご注文</h2>
            <p>ご注文内容をご確認の上、発送先とお支払い情報をご入力ください</p>
          </div>

          {checkoutStep === 'input' ? (
            <div className="cart-page-layout">
              <div className="cart-page-items">
                <h3>ご注文商品 ({cart.length}件)</h3>
                {cart.length === 0 ? (
                  <div className="empty-cart-page">
                    <p>🛒 カートに商品が入っていません。</p>
                    <button className="add-btn" style={{ marginTop: '1rem' }} onClick={() => setCurrentPage('shop')}>商品一覧へ戻る</button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.cartItemId} className="cart-page-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-specs">仕様: {item.selectedWeight} / {item.selectedMilling} / のし:{item.giftOption}</p>
                        <span className="item-unit-price">単価: ¥{item.price.toLocaleString()}</span>
                      </div>
                      <div className="item-qty-controls">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)}>+</button>
                      </div>
                      <div className="item-subtotal">¥{(item.price * item.quantity).toLocaleString()}</div>
                      <button className="item-remove-btn" onClick={() => removeFromCart(item.cartItemId)}>削除</button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-page-summary">
                  <h3>お客様情報＆お支払い</h3>
                  <form onSubmit={handleFinalOrder} className="checkout-form-page">
                    <div className="form-group">
                      <label>お名前 *</label>
                      <input type="text" name="name" placeholder="燕 太郎" required value={orderInfo.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>お届け先住所 *</label>
                      <input type="text" name="address" placeholder="東京都千代田区1-1-1" required value={orderInfo.address} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label>電話番号 *</label>
                      <input type="tel" name="phone" placeholder="090-1234-5678" required value={orderInfo.phone} onChange={handleInputChange} />
                    </div>

                    <hr />

                    <div className="form-group">
                      <label>カード番号 *</label>
                      <input type="text" name="card" placeholder="1234 5678 9012 3456" required value={orderInfo.card} onChange={handleInputChange} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>有効期限 *</label>
                        <input type="text" name="exp" placeholder="MM/YY" required value={orderInfo.exp} onChange={handleInputChange} />
                      </div>
                      <div className="form-group">
                        <label>CVC *</label>
                        <input type="password" name="cvc" placeholder="123" maxLength="4" required value={orderInfo.cvc} onChange={handleInputChange} />
                      </div>
                    </div>

                    <div className="summary-total-box">
                      <span>お支払い合計 (送料込)</span>
                      <strong>¥{totalAmount.toLocaleString()}</strong>
                    </div>

                    <button type="submit" className="final-order-btn-large">
                      注文を確定して決済する
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="shipped-page-container">
              <div className="shipped-card">
                <div className="success-icon-large">🚚</div>
                <h2>ご注文ありがとうございました！</h2>
                <span className="shipped-status-tag">発送準備中</span>
                <p className="shipped-text">
                  新潟県燕市の蔵より、当日精米したての新鮮なお米を発送いたします。<br />
                  お荷物の伝票番号: <strong>#TSB-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </p>
                <button className="add-btn" onClick={() => { setCheckoutStep('input'); setCurrentPage('shop'); }}>
                  トップページへ戻る
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* 詳細モーダル */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <span className="modal-tag">{selectedProduct.tag}</span>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-rating">★ {selectedProduct.rating} （レビュー {selectedProduct.reviews}件）</p>
                <p className="modal-desc">{selectedProduct.detailDesc}</p>

                <div className="option-group">
                  <label className="option-label">容量の選択:</label>
                  <div className="option-buttons">
                    {WEIGHT_OPTIONS.map((opt) => (
                      <button key={opt.label} type="button" className={selectedWeight === opt.label ? 'active' : ''} onClick={() => setSelectedWeight(opt.label)}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">精米度の選択:</label>
                  <div className="option-buttons">
                    {['白米', '7分づき', '玄米'].map((m) => (
                      <button key={m} type="button" className={selectedMilling === m ? 'active' : ''} onClick={() => setSelectedMilling(m)}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">のし・ギフト包装:</label>
                  <div className="option-buttons">
                    {['なし', '御祝', '内祝', '御中元', '御歳暮'].map((g) => (
                      <button key={g} type="button" className={giftOption === g ? 'active' : ''} onClick={() => setGiftOption(g)}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <div className="modal-price">
                    ¥{Math.round(selectedProduct.basePrice * (WEIGHT_OPTIONS.find(w => w.label === selectedWeight)?.multiplier || 1)).toLocaleString()}
                    <span className="modal-price-sub"> (税込)</span>
                  </div>
                  <button className="modal-add-btn" onClick={() => { addToCart(selectedProduct, selectedWeight, selectedMilling, giftOption); setSelectedProduct(null); }}>
                    カートに入れる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* フッター */}
      <footer className="global-footer">
        <p>&copy; 2026 TSUBAME - 燕 - 新潟米専門店. All rights reserved.</p>
      </footer>
    </div>
  );
}