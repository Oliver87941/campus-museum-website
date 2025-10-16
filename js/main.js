// 展厅导航功能
function initHallNavigation(currentHall) {
    const hallNav = document.createElement('div');
    hallNav.className = 'hall-navigation';
    hallNav.innerHTML = `
        <div class="container hall-nav-container">
            <a href="museum-content.html" class="hall-nav-btn ${currentHall === 'museum' ? 'current' : ''}">
                <i class="fas fa-landmark"></i> 第一展厅·岁月留痕
            </a>
            <a href="people-gallery.html" class="hall-nav-btn ${currentHall === 'people' ? 'current' : ''}">
                <i class="fas fa-users"></i> 第二展厅·人物长廊
            </a>
            <a href="audio-video-archive.html" class="hall-nav-btn ${currentHall === 'archive' ? 'current' : ''}">
                <i class="fas fa-photo-video"></i> 第三展厅·声影档案馆
            </a>
            <a href="index.html" class="hall-nav-btn">
                <i class="fas fa-home"></i> 返回首页
            </a>
        </div>
    `;
    
    // 插入到页面头部之后
    const header = document.querySelector('.page-header');
    if (header) {
        header.parentNode.insertBefore(hallNav, header.nextSibling);
    }
}

// 图片错误处理
function handleImageError(img) {
    img.onerror = null;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veeUqOaWh+acrDwvdGV4dD48L3N2Zz4=';
    img.alt = '图片加载失败';
    img.style.backgroundColor = '#f0f0f0';
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 卡片动画
function initCardAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有卡片元素
    const cards = document.querySelectorAll('.photo-card, .audio-card, .video-card, .figure-card, .person-card, .timeline-item, .panorama-card, .detail-card, .symbiosis-card, .award-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}

// 图片查看器
function initImageViewer() {
    const imageViewer = document.getElementById('imageViewer');
    if (!imageViewer) return;
    
    const fullscreenImage = document.getElementById('fullscreenImage');
    const closeImageViewer = document.getElementById('closeImageViewer');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const resetZoomBtn = document.getElementById('resetZoomBtn');
    const imageViewerTitle = document.getElementById('imageViewerTitle');
    const imageViewerCaption = document.getElementById('imageViewerCaption');
    
    let currentScale = 1;
    const scaleStep = 0.2;
    const maxScale = 3;
    const minScale = 0.5;
    
    // 为所有图片添加点击事件
    document.querySelectorAll('.photo-img img, .person-img img, .timeline-img img, .detail-img img, .symbiosis-img img, .award-img img, .panorama-img img').forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src;
            const imgAlt = this.alt;
            
            fullscreenImage.src = imgSrc;
            imageViewerTitle.textContent = '图片查看';
            imageViewerCaption.textContent = imgAlt;
            
            currentScale = 1;
            fullscreenImage.style.transform = `scale(${currentScale})`;
            imageViewer.classList.add('active');
        });
    });
    
    // 缩放功能
    function zoomIn() {
        if (currentScale < maxScale) {
            currentScale += scaleStep;
            fullscreenImage.style.transform = `scale(${currentScale})`;
        }
    }
    
    function zoomOut() {
        if (currentScale > minScale) {
            currentScale -= scaleStep;
            fullscreenImage.style.transform = `scale(${currentScale})`;
        }
    }
    
    function resetZoom() {
        currentScale = 1;
        fullscreenImage.style.transform = `scale(${currentScale})`;
    }
    
    // 事件监听
    if (zoomInBtn) zoomInBtn.addEventListener('click', zoomIn);
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', zoomOut);
    if (resetZoomBtn) resetZoomBtn.addEventListener('click', resetZoom);
    
    closeImageViewer.addEventListener('click', function() {
        imageViewer.classList.remove('active');
        resetZoom();
    });
    
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            imageViewer.classList.remove('active');
            resetZoom();
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (imageViewer.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    imageViewer.classList.remove('active');
                    resetZoom();
                    break;
                case '+':
                case '=':
                    zoomIn();
                    e.preventDefault();
                    break;
                case '-':
                    zoomOut();
                    e.preventDefault();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        }
    });
}

// 筛选功能
function initFilterButtons(buttonClass, cardClass, dataAttribute) {
    document.querySelectorAll(buttonClass).forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            document.querySelectorAll(buttonClass).forEach(b => {
                b.classList.remove('active');
            });
            
            // 为当前按钮添加active类
            this.classList.add('active');
            
            // 获取选中的值
            const selectedValue = this.getAttribute(dataAttribute);
            
            // 筛选卡片
            document.querySelectorAll(cardClass).forEach(card => {
                if (selectedValue === 'all' || card.getAttribute(dataAttribute) === selectedValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 背景音乐控制功能 - 修复版本
function initBackgroundMusic() {
    console.log('🎵 初始化背景音乐...');
    
    // 检查是否已存在音乐控制元素，避免重复创建
    if (document.getElementById('musicControl')) {
        console.log('🎵 音乐控制已存在，跳过初始化');
        return;
    }
    
    try {
        // 创建音频元素
        const bgMusic = document.createElement('audio');
        bgMusic.id = 'backgroundMusic';
        bgMusic.loop = true;
        bgMusic.volume = 0.3;
        bgMusic.preload = 'auto';
        
        // 添加音频源
        const source = document.createElement('source');
        source.src = 'audio/background-music.mp3';
        source.type = 'audio/mpeg';
        bgMusic.appendChild(source);
        
        // 添加到body
        document.body.appendChild(bgMusic);
        console.log('🎵 音频元素创建成功');

        // 创建音乐控制按钮
        const musicControl = document.createElement('div');
        musicControl.id = 'musicControl';
        musicControl.className = 'music-control';
        musicControl.innerHTML = `
            <button id="toggleMusic" class="music-btn">
                <i class="fas fa-volume-up"></i>
                <i class="fas fa-volume-mute" style="display: none;"></i>
            </button>
            <div class="music-tooltip">点击播放背景音乐</div>
        `;
        document.body.appendChild(musicControl);
        console.log('🎵 音乐控制按钮创建成功');

        // 从本地存储获取音乐状态
        let musicEnabled = localStorage.getItem('backgroundMusic') !== 'false';
        console.log('🎵 初始音乐状态:', musicEnabled ? '启用' : '禁用');

        // 更新按钮状态
        function updateButtonState() {
            const btn = document.getElementById('toggleMusic');
            const volumeUp = btn.querySelector('.fa-volume-up');
            const volumeMute = btn.querySelector('.fa-volume-mute');
            
            if (!bgMusic.paused && musicEnabled) {
                volumeUp.style.display = 'inline';
                volumeMute.style.display = 'none';
                musicControl.classList.add('playing');
            } else {
                volumeUp.style.display = 'none';
                volumeMute.style.display = 'inline';
                musicControl.classList.remove('playing');
            }
        }

        // 音频事件监听
        bgMusic.addEventListener('loadeddata', function() {
            console.log('🎵 音频文件加载完成');
            updateButtonState();
        });

        bgMusic.addEventListener('error', function(e) {
            console.error('🎵 音频加载失败:', e);
            console.error('🎵 文件路径:', source.src);
            musicControl.style.display = 'none';
        });

        bgMusic.addEventListener('play', function() {
            console.log('🎵 音乐开始播放');
            musicEnabled = true;
            localStorage.setItem('backgroundMusic', 'true');
            updateButtonState();
        });

        bgMusic.addEventListener('pause', function() {
            console.log('🎵 音乐暂停');
            updateButtonState();
        });

        // 音乐切换功能
        document.getElementById('toggleMusic').addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🎵 点击音乐按钮');
            
            if (bgMusic.paused) {
                console.log('🎵 尝试播放音乐...');
                bgMusic.play().then(() => {
                    console.log('🎵 音乐播放成功');
                }).catch(error => {
                    console.error('🎵 播放失败:', error);
                    // 显示提示
                    alert('请点击页面任意位置后，再点击音乐按钮播放');
                });
            } else {
                bgMusic.pause();
                musicEnabled = false;
                localStorage.setItem('backgroundMusic', 'false');
                console.log('🎵 音乐已暂停');
            }
        });

        // 页面点击时尝试自动播放（如果用户之前启用了音乐）
        const tryAutoPlay = function() {
            if (musicEnabled && bgMusic.paused) {
                console.log('🎵 用户交互，尝试自动播放...');
                bgMusic.play().then(() => {
                    console.log('🎵 自动播放成功');
                }).catch(error => {
                    console.log('🎵 自动播放被阻止，需要用户手动点击');
                });
            }
            // 移除事件监听，避免重复
            document.removeEventListener('click', tryAutoPlay);
            document.removeEventListener('keydown', tryAutoPlay);
            document.removeEventListener('scroll', tryAutoPlay);
        };

        // 添加用户交互监听
        document.addEventListener('click', tryAutoPlay);
        document.addEventListener('keydown', tryAutoPlay);
        document.addEventListener('scroll', tryAutoPlay);

        // 初始状态更新
        updateButtonState();
        
        console.log('🎵 背景音乐初始化完成');

    } catch (error) {
        console.error('🎵 背景音乐初始化失败:', error);
    }
}

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initCardAnimations();
    initImageViewer();
    initBackgroundMusic(); // 添加背景音乐初始化
    
    // 图片错误处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
    
    // 初始化筛选功能
    initFilterButtons('.decade-btn', '.photo-card', 'data-year');
    initFilterButtons('.timeline-btn', '.figure-card', 'data-era');
    initFilterButtons('.symbiosis-btn', '.symbiosis-card', 'data-area');
});

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHallNavigation,
        handleImageError,
        initSmoothScroll,
        initCardAnimations,
        initImageViewer,
        initFilterButtons
    };
}

