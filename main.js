// 太铭科技网站主要JavaScript文件

// 全局变量
let heroSketch;
let precisionChart;
let casesCarousel;

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeroAnimation();
    initScrollAnimations();
    initPrecisionChart();
    initCasesCarousel();
    initMetricCounters();
    initContactButtons();
});

// 移动端菜单
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Hero区域动画
function initHeroAnimation() {
    // 使用p5.js创建动态背景
    heroSketch = new p5(function(p) {
        let particles = [];
        let clockRadius;
        let angle = 0;
        
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('hero-canvas');
            
            clockRadius = Math.min(p.width, p.height) * 0.2;
            
            // 创建粒子
            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(1, 3),
                    speed: p.random(0.5, 2),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // 绘制几何网格背景
            p.stroke(136, 146, 160, 30);
            p.strokeWeight(1);
            p.noFill();
            
            for (let x = 0; x < p.width; x += 50) {
                p.line(x, 0, x, p.height);
            }
            for (let y = 0; y < p.height; y += 50) {
                p.line(0, y, p.width, y);
            }
            
            // 绘制中心时钟机制
            p.push();
            p.translate(p.width / 2, p.height / 2);
            
            // 外圈
            p.stroke(230, 179, 90, 100);
            p.strokeWeight(2);
            p.circle(0, 0, clockRadius * 2);
            
            // 刻度
            for (let i = 0; i < 12; i++) {
                let a = p.map(i, 0, 12, 0, p.TWO_PI);
                let x1 = p.cos(a) * (clockRadius - 10);
                let y1 = p.sin(a) * (clockRadius - 10);
                let x2 = p.cos(a) * (clockRadius - 20);
                let y2 = p.sin(a) * (clockRadius - 20);
                p.line(x1, y1, x2, y2);
            }
            
            // 时针
            p.stroke(230, 179, 90, 200);
            p.strokeWeight(3);
            let hourAngle = angle * 0.5;
            let hourX = p.cos(hourAngle - p.HALF_PI) * (clockRadius * 0.5);
            let hourY = p.sin(hourAngle - p.HALF_PI) * (clockRadius * 0.5);
            p.line(0, 0, hourX, hourY);
            
            // 分针
            p.strokeWeight(2);
            let minuteAngle = angle;
            let minuteX = p.cos(minuteAngle - p.HALF_PI) * (clockRadius * 0.8);
            let minuteY = p.sin(minuteAngle - p.HALF_PI) * (clockRadius * 0.8);
            p.line(0, 0, minuteX, minuteY);
            
            // 中心点
            p.fill(230, 179, 90);
            p.noStroke();
            p.circle(0, 0, 8);
            
            p.pop();
            
            // 绘制流动粒子
            p.noStroke();
            particles.forEach(particle => {
                p.fill(136, 146, 160, particle.opacity * 255);
                p.circle(particle.x, particle.y, particle.size);
                
                // 移动粒子
                particle.y -= particle.speed;
                if (particle.y < 0) {
                    particle.y = p.height;
                    particle.x = p.random(p.width);
                }
            });
            
            // 绘制同步信号波
            p.stroke(230, 179, 90, 150);
            p.strokeWeight(2);
            p.noFill();
            p.beginShape();
            for (let x = 0; x < p.width; x += 5) {
                let y = p.height / 2 + p.sin((x + angle * 50) * 0.01) * 30;
                p.vertex(x, y);
            }
            p.endShape();
            
            angle += 0.01;
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
            clockRadius = Math.min(p.width, p.height) * 0.2;
        };
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.glass-card, .hover-lift');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// 精度对比图表
function initPrecisionChart() {
    const chartContainer = document.getElementById('precision-chart');
    if (!chartContainer) return;
    
    precisionChart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 35, 50, 0.9)',
            borderColor: 'rgba(136, 146, 160, 0.3)',
            textStyle: {
                color: '#e1e8ef'
            }
        },
        legend: {
            data: ['太铭科技', '行业平均', '竞争对手A'],
            textStyle: {
                color: '#8892a0'
            },
            top: 20
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['时钟精度', '保持能力', '温度稳定性', '功耗效率', '可靠性'],
            axisLine: {
                lineStyle: {
                    color: '#8892a0'
                }
            },
            axisLabel: {
                color: '#8892a0'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#8892a0'
                }
            },
            axisLabel: {
                color: '#8892a0'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(136, 146, 160, 0.1)'
                }
            }
        },
        series: [
            {
                name: '太铭科技',
                type: 'line',
                data: [95, 92, 98, 96, 99],
                lineStyle: {
                    color: '#e6b35a',
                    width: 3
                },
                itemStyle: {
                    color: '#e6b35a'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(230, 179, 90, 0.3)'
                        }, {
                            offset: 1, color: 'rgba(230, 179, 90, 0.05)'
                        }]
                    }
                }
            },
            {
                name: '行业平均',
                type: 'line',
                data: [75, 70, 75, 80, 85],
                lineStyle: {
                    color: '#8892a0',
                    width: 2
                },
                itemStyle: {
                    color: '#8892a0'
                }
            },
            {
                name: '竞争对手A',
                type: 'line',
                data: [80, 75, 80, 75, 80],
                lineStyle: {
                    color: '#ef4444',
                    width: 2
                },
                itemStyle: {
                    color: '#ef4444'
                }
            }
        ]
    };
    
    precisionChart.setOption(option);
    
    // 响应式调整
    window.addEventListener('resize', function() {
        if (precisionChart) {
            precisionChart.resize();
        }
    });
}

// 客户案例轮播
function initCasesCarousel() {
    const carouselElement = document.getElementById('cases-carousel');
    if (!carouselElement) return;
    
    casesCarousel = new Splide('#cases-carousel', {
        type: 'loop',
        perPage: 2,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        breakpoints: {
            768: {
                perPage: 1,
                gap: '1rem'
            }
        }
    });
    
    casesCarousel.mount();
}

// 数字计数动画
function initMetricCounters() {
    const metrics = [
        { id: 'metric-1', target: 10, suffix: 'ns', prefix: '±' },
        { id: 'metric-2', target: 100, suffix: '%' },
        { id: 'metric-3', target: 10, suffix: '+' },
        { id: 'metric-4', target: 160, suffix: '℃' }
    ];
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = metrics.find(m => m.id === entry.target.id);
                if (metric) {
                    animateCounter(entry.target, metric);
                    observer.unobserve(entry.target);
                }
            }
        });
    });
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (element) {
            observer.observe(element);
        }
    });
}

function animateCounter(element, metric) {
    let current = 0;
    const increment = metric.target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= metric.target) {
            current = metric.target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (metric.id === 'metric-1') {
            displayValue = current.toFixed(0); // 对于纳秒，显示小数
        }
        
        element.textContent = `${metric.prefix || ''}${displayValue}${metric.suffix || ''}`;
    }, 40);
}

// 联系按钮
function initContactButtons() {
    const contactButtons = document.querySelectorAll('button');
    contactButtons.forEach(button => {
        if (button.textContent.includes('联系') || 
            button.textContent.includes('咨询') || 
            button.textContent.includes('申请')) {
            button.addEventListener('click', function() {
                showContactModal();
            });
        }
    });
}

function showContactModal() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4 border border-gray-700">
            <h3 class="text-2xl font-bold mb-4 text-center">联系我们</h3>
            <div class="space-y-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                    </div>
                    <div>
                        <div class="font-medium">技术支持热线</div>
                        <div class="text-gray-400">180-3811-8432</div>
                    </div>
                </div>
                
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div>
                        <div class="font-medium">邮箱咨询</div>
                        <div class="text-gray-400">whh@tifreq.com</div>
                    </div>
                </div>
                
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <div class="font-medium">公司地址</div>
                        <div class="text-gray-400">深圳市宝安区</div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 flex space-x-3">
                <button class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded font-medium transition-colors">
                    电话咨询
                </button>
                <button class="flex-1 border border-gray-600 text-gray-300 hover:bg-gray-800 py-2 px-4 rounded font-medium transition-colors" onclick="closeContactModal()">
                    关闭
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeContactModal();
        }
    });
}

function closeContactModal() {
    const modal = document.querySelector('.fixed.inset-0.bg-black');
    if (modal) {
        modal.remove();
    }
}

// 平滑滚动
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 页面卸载时清理
window.addEventListener('beforeunload', function() {
    if (heroSketch) {
        heroSketch.remove();
    }
    if (precisionChart) {
        precisionChart.dispose();
    }
    if (casesCarousel) {
        casesCarousel.destroy();
    }
});

// 导出函数供其他页面使用
window.TaimingTech = {
    showContactModal,
    closeContactModal,
    smoothScrollTo,
    initMobileMenu
};