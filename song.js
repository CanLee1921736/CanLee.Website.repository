//計算行數設定標籤大小
window.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.lyrics-section');
  
  sections.forEach(section => {
    const lines = parseInt(section.dataset.lines);
    const notes = parseInt(section.dataset.notes);
    
    const unit = 3.3; // 每行歌詞所佔高度單位+外邊距(每句歌詞)
    const noteUnit = 1; // 每行小字高度單位
    const lineHeightRem = 1; // 設定高度單位倍數（vw）

    const heightRem = (lines * unit + notes * noteUnit ) * lineHeightRem ;
    section.style.height = `${heightRem}vw`;
  });
});

//對圖片進行排版
function setImageLayout() {
  const container = document.querySelector('.score-gallery');
  const images = document.querySelectorAll('.score-gallery img');
  
  const screenWidth = window.innerWidth; // 取得目前螢幕寬度
  const baseScreen = 1200;               // 設置裝置寬（1200px）
  const ratio = screenWidth / baseScreen; //算取目前螢幕寬度/設置裝置寬(比)

  const baseRem = 16; // 假設 1rem = 16px（可改成動態計算）
  
  const gapTotal = 4 * baseRem; // 1+1+1+1 rem = 4rem
  const availableWidth = screenWidth - gapTotal - 80;
  const imageWidth = availableWidth / 3; // 每行 3 張圖片
  
  // 設定圖片寬度
  images.forEach(img => {
    img.style.width = imageWidth + 'px';
    img.style.height = 'auto';
  });

  // 可選：設定容器內的 padding 與 gap
  container.style.display = 'grid'; // 使用 grid 來自動排列圖片
  container.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 確保每行 3 張圖片
  container.style.columnGap = '0.5rem';
  container.style.rowGap = '1rem';
  container.style.padding = '0 1rem';
}

// 初始化 + 窗口變動時重新設定
window.addEventListener('DOMContentLoaded', setImageLayout);
window.addEventListener('resize', setImageLayout);

//與圖片下方連結的交互
document.querySelectorAll('.zoom-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // 防止頁面跳轉

    // 取得點擊圖片的src並顯示到彈出視窗
    const imgSrc = link.previousElementSibling.src; // 獲得圖片的src

    const popupImg = document.getElementById('popup-img'); // 彈出視窗中的圖片元素
    popupImg.src = imgSrc; // 設定放大圖片的src

    // 顯示彈出視窗
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'flex';
    // 當點擊 overlay 以外的區域時，關閉彈出視窗
    overlay.addEventListener('click', function(event) {
    // 如果點擊的區域是 overlay（非 popup），則關閉彈出視窗
    if (event.target === overlay) {
      overlay.style.display = 'none';}

    // 關閉彈出視窗的按鈕
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function() {
      overlay.style.display = 'none'}) // 隱藏彈出視窗
    });
  });
});