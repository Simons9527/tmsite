// 产品页面专用JavaScript文件

// 产品数据
const productsData = {
    'tm22': {
        name: 'TM22',
        category: 'clock-modules',
        type: '紧凑型时钟模块',
        specs: {
            '1PPS锁定精度': '±15ns',
            '保持能力': '30μs/24hrs',
            '尺寸': '20.0×20.0×12.7mm',
            '工作温度': '-40℃~85℃',
            '功耗': '<1W',
            '重量': '<10g'
        },
        features: ['超小尺寸', '高精度同步', '低功耗', '完全兼容SA.45'],
        applications: ['5G基站', '便携设备', '无人机', '物联网'],
        matchScore: 0
    },
    'tm45': {
        name: 'TM45',
        category: 'clock-modules',
        type: '高性能时钟模块',
        specs: {
            '1PPS锁定精度': '±15ns',
            '保持能力': '1.5μs/24hrs',
            '尺寸': '40.6×35.3×12.7mm',
            '工作温度': '-40℃~85℃',
            '功耗': '<2W',
            '重量': '<30g'
        },
        features: ['优异保持能力', '更优短稳和相噪', '支持1PPS+TOD', 'B(DC)参考'],
        applications: ['通信基站', '数据中心', '金融系统', '电力系统'],
        matchScore: 0
    },
    'tm33b': {
        name: 'TM33B',
        category: 'irig-b',
        type: 'IRIG-B(DC)编解码模块',
        specs: {
            '功能': 'BDC↔1PPS+TOD',
            '尺寸': '30×30×3.5mm',
            '工作温度': '-55℃~105℃',
            '功耗': '<0.5W',
            '重量': '<5g',
            '国产化率': '100%'
        },
        features: ['双向转换', '全国产自主可控', '超宽温工作', '极致轻薄'],
        applications: ['军工系统', '电力系统', '航空航天', '测试测量'],
        matchScore: 0
    },
    'tmm4733': {
        name: 'TMM4733',
        category: 'network-sync',
        type: '插针式PTP模块',
        specs: {
            'PTP授时精度': '±10ns',
            'NTP授时精度': '≤1ms',
            '尺寸': '70×46×16.6mm',
            '功耗': '5V/<3.5W',
            '接口': '10/100/1000M自适应',
            '协议': 'IEEE1588v2'
        },
        features: ['超高精度PTP', '多种配置方式', '远程升级', '模块化设计'],
        applications: ['5G基站', '数据中心', '工业控制', '智能交通'],
        matchScore: 0
    },
    'tmm4330': {
        name: 'TMM4330',
        category: 'network-sync',
        type: '表贴式PTP模块',
        specs: {
            'PTP授时精度': '±30ns',
            'NTP授时精度': '≤1ms',
            '尺寸': '43×30×3.5mm',
            '功耗': '<0.5W',
            '接口': '邮票孔封装',
            '协议': 'IEEE1588v2'
        },
        features: ['超薄设计', '超低功耗', 'SMT贴片', '灵活配置'],
        applications: ['嵌入式设备', '物联网', '便携设备', '智能硬件'],
        matchScore: 0
    },
    'tmm2000': {
        name: 'TMM2000',
        category: 'network-sync',
        type: '全国产PTP模块',
        specs: {
            'PTP授时精度': '±50ns',
            'NTP授时精度': '≤1ms',
            '尺寸': '70×70×16mm',
            '功耗': '5V/<4W',
            '接口': '10/100/1000M自适应',
            '国产化率': '100%'
        },
        features: ['全国产自主可控', '高精度授时', 'Web远程配置', '稳定可靠'],
        applications: ['军工系统', '政府项目', '关键基础设施', '国产化替代'],
        matchScore: 0
    }
};

// 选型权重配置
const selectionWeights = {
    '5g': { 'tmm4733': 95, 'tmm4330': 90, 'tm45': 85, 'tm22': 80, 'tmm2000': 75, 'tm33b': 70 },
    'defense': { 'tm33b': 95, 'tmm2000': 90, 'tm45': 85, 'tm22': 80, 'tmm4733': 70, 'tmm4330': 65 },
    'datacenter': { 'tmm4733': 95, 'tmm4330': 90, 'tm45': 88, 'tmm2000': 75, 'tm22': 70, 'tm33b': 65 },
    'power': { 'tm33b': 95, 'tmm4733': 90, 'tm45': 85, 'tmm2000': 80, 'tm22': 75, 'tmm4330': 70 },
    'other': { 'tm45': 90, 'tmm4733': 85, 'tm22': 80, 'tmm4330': 75, 'tm33b': 70, 'tmm2000': 65 }
};

// 全局变量
let selectedProducts = [];
let currentTab = 'all';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initProductTabs();
    initProductComparison();
    initMobileMenu();
});

// 初始化产品分类标签
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新标签状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 获取选中的分类
            const tab = this.getAttribute('data-tab');
            currentTab = tab;
            
            // 过滤产品卡片
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (tab === 'all' || category === tab) {
                    card.style.display = 'block';
                    // 添加动画
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuart'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 初始化产品对比功能
function initProductComparison() {
    const checkboxes = document.querySelectorAll('.compare-checkbox');
    const compareBtn = document.getElementById('compare-btn');
    const compareCount = document.getElementById('compare-count');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const productId = this.getAttribute('data-product');
            const productCard = document.querySelector(`[data-product="${productId}"]`);
            
            if (this.checked) {
                // 添加到选中列表
                if (selectedProducts.length < 3) {
                    selectedProducts.push(productId);
                    productCard.classList.add('selected');
                } else {
                    // 最多选择3个
                    this.checked = false;
                    showNotification('最多只能选择3个产品进行对比', 'warning');
                }
            } else {
                // 从选中列表移除
                selectedProducts = selectedProducts.filter(id => id !== productId);
                productCard.classList.remove('selected');
            }
            
            // 更新对比按钮状态
            compareCount.textContent = selectedProducts.length;
            compareBtn.disabled = selectedProducts.length < 2;
        });
    });
    
    // 对比按钮点击事件
    compareBtn.addEventListener('click', function() {
        if (selectedProducts.length >= 2) {
            showComparisonModal();
        }
    });
}

// 智能产品选型算法
function runProductSelector() {
    const formData = {
        scenario: document.getElementById('application-scenario').value,
        precision: document.getElementById('precision-requirement').value,
        temperature: document.getElementById('temperature-range').value,
        size: document.getElementById('size-constraint').value,
        power: document.getElementById('power-requirement').value
    };
    
    // 验证必填项
    if (!formData.scenario || !formData.precision) {
        showNotification('请至少选择应用场景和精度要求', 'warning');
        return;
    }
    
    // 计算匹配度
    const recommendations = calculateProductMatch(formData);
    
    // 显示推荐结果
    displayRecommendations(recommendations, formData);
}

// 计算产品匹配度
function calculateProductMatch(formData) {
    const products = Object.keys(productsData);
    const scores = {};
    
    products.forEach(productId => {
        let score = 0;
        const product = productsData[productId];
        
        // 应用场景匹配 (权重40%)
        if (formData.scenario && selectionWeights[formData.scenario]) {
            const scenarioScore = selectionWeights[formData.scenario][productId] || 50;
            score += scenarioScore * 0.4;
        }
        
        // 精度要求匹配 (权重30%)
        if (formData.precision) {
            const precisionScore = calculatePrecisionMatch(product, formData.precision);
            score += precisionScore * 0.3;
        }
        
        // 温度范围匹配 (权重15%)
        if (formData.temperature) {
            const tempScore = calculateTemperatureMatch(product, formData.temperature);
            score += tempScore * 0.15;
        }
        
        // 尺寸限制匹配 (权重10%)
        if (formData.size) {
            const sizeScore = calculateSizeMatch(product, formData.size);
            score += sizeScore * 0.1;
        }
        
        // 功耗要求匹配 (权重5%)
        if (formData.power) {
            const powerScore = calculatePowerMatch(product, formData.power);
            score += powerScore * 0.05;
        }
        
        scores[productId] = Math.round(score);
    });
    
    // 按分数排序
    return Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3); // 取前3个推荐
}

// 计算精度匹配度
function calculatePrecisionMatch(product, requirement) {
    const productPrecision = product.specs['1PPS锁定精度'] || product.specs['PTP授时精度'] || '';
    
    switch (requirement) {
        case 'ultra-high': // ±10ns
            return productPrecision.includes('10ns') ? 95 : 
                   productPrecision.includes('15ns') ? 85 : 
                   productPrecision.includes('30ns') ? 70 : 50;
        case 'high': // ±30ns
            return productPrecision.includes('30ns') ? 95 : 
                   productPrecision.includes('15ns') ? 90 : 
                   productPrecision.includes('50ns') ? 80 : 60;
        case 'medium': // ±50ns
            return productPrecision.includes('50ns') ? 95 : 
                   productPrecision.includes('30ns') ? 85 : 
                   productPrecision.includes('15ns') ? 75 : 65;
        case 'standard': // ≤1ms
            return product.specs['NTP授时精度'] ? 95 : 80;
        default:
            return 70;
    }
}

// 计算温度匹配度
function calculateTemperatureMatch(product, requirement) {
    const tempSpec = product.specs['工作温度'] || '';
    
    switch (requirement) {
        case 'ultra-wide': // -55℃~105℃
            return tempSpec.includes('-55') ? 95 : 
                   tempSpec.includes('-40') ? 80 : 60;
        case 'wide': // -40℃~85℃
            return tempSpec.includes('-40') ? 95 : 
                   tempSpec.includes('-55') ? 90 : 70;
        case 'standard': // 0℃~70℃
            return tempSpec.includes('0') ? 95 : 
                   tempSpec.includes('-40') ? 85 : 75;
        default:
            return 70;
    }
}

// 计算尺寸匹配度
function calculateSizeMatch(product, requirement) {
    const sizeSpec = product.specs['尺寸'] || '';
    
    switch (requirement) {
        case 'ultra-compact': // ≤20×20mm
            return sizeSpec.includes('20.0×20.0') ? 95 : 40;
        case 'compact': // ≤50×50mm
            return sizeSpec.includes('20.0×20.0') || sizeSpec.includes('30×30') ? 95 : 
                   sizeSpec.includes('40.6×35.3') ? 85 : 60;
        case 'standard': // ≤70×70mm
            return sizeSpec.includes('70') ? 95 : 
                   sizeSpec.includes('40.6×35.3') || sizeSpec.includes('43×30') ? 85 : 70;
        case 'no-limit':
            return 95;
        default:
            return 70;
    }
}

// 计算功耗匹配度
function calculatePowerMatch(product, requirement) {
    const powerSpec = product.specs['功耗'] || '';
    
    switch (requirement) {
        case 'ultra-low': // <0.5W
            return powerSpec.includes('<0.5') || powerSpec.includes('< 0.5') ? 95 : 
                   powerSpec.includes('<1') ? 80 : 50;
        case 'low': // <3.5W
            return powerSpec.includes('<3.5') || powerSpec.includes('< 3.5') ? 95 : 
                   powerSpec.includes('<0.5') ? 90 : 
                   powerSpec.includes('<5') ? 85 : 60;
        case 'standard': // <5W
            return powerSpec.includes('<5') || powerSpec.includes('< 5') ? 95 : 
                   powerSpec.includes('<3.5') ? 85 : 70;
        case 'no-limit':
            return 95;
        default:
            return 70;
    }
}

// 显示推荐结果
function displayRecommendations(recommendations, formData) {
    const resultsContainer = document.getElementById('recommendation-results');
    
    if (recommendations.length === 0) {
        resultsContainer.innerHTML = `
            <div class="text-center text-gray-400 py-12">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"></path>
                </svg>
                <p>暂未找到完全匹配的产品，请调整需求或联系我们的技术支持</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    recommendations.forEach(([productId, score], index) => {
        const product = productsData[productId];
        const rankClass = index === 0 ? 'border-yellow-400' : 'border-gray-600';
        const rankIcon = index === 0 ? '👑' : index === 1 ? '🥈' : '🥉';
        
        html += `
            <div class="product-card p-6 ${rankClass} border-2 hover-lift">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="text-2xl">${rankIcon}</div>
                        <div>
                            <h3 class="text-xl font-bold">${product.name}</h3>
                            <p class="text-sm text-gray-400">${product.type}</p>
                        </div>
                    </div>
                    <div class="match-score ${score >= 80 ? '' : score >= 60 ? 'medium' : 'low'}">
                        匹配度 ${score}%
                    </div>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4 mb-4">
                    ${Object.entries(product.specs).slice(0, 4).map(([key, value]) => `
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-400">${key}</span>
                            <span class="text-yellow-400">${value}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="mb-4">
                    <div class="text-sm text-gray-400 mb-2">核心特性</div>
                    <div class="flex flex-wrap gap-2">
                        ${product.features.slice(0, 3).map(feature => `
                            <span class="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-xs">${feature}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flex space-x-2">
                    <button class="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded text-sm font-medium transition-colors" onclick="TaimingTech.showContactModal()">
                        立即咨询
                    </button>
                    <button class="px-4 py-2 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded text-sm transition-colors" onclick="viewProductDetails('${productId}')">
                        查看详情
                    </button>
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
    
    // 添加动画
    anime({
        targets: resultsContainer.children,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutQuart'
    });
}

// 显示对比模态框
function showComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    const tableContainer = document.getElementById('comparison-table-container');
    
    // 生成对比表格
    const tableHTML = generateComparisonTable();
    tableContainer.innerHTML = tableHTML;
    
    modal.classList.remove('hidden');
    
    // 添加动画
    anime({
        targets: modal.querySelector('.bg-gray-900'),
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// 生成对比表格
function generateComparisonTable() {
    if (selectedProducts.length < 2) return '<p>请选择至少2个产品进行对比</p>';
    
    const products = selectedProducts.map(id => productsData[id]);
    const allSpecs = new Set();
    
    // 收集所有规格参数
    products.forEach(product => {
        Object.keys(product.specs).forEach(spec => allSpecs.add(spec));
    });
    
    const specs = Array.from(allSpecs);
    
    let html = `
        <div class="comparison-table">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="text-left p-4 font-medium text-gray-300">参数</th>
                        ${products.map(product => `
                            <th class="text-center p-4 font-medium text-yellow-400">
                                ${product.name}<br>
                                <span class="text-sm text-gray-400 font-normal">${product.type}</span>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
    `;
    
    // 添加规格参数行
    specs.forEach(spec => {
        html += `
            <tr>
                <td class="p-4 font-medium text-gray-300">${spec}</td>
                ${products.map(product => {
                    const value = product.specs[spec] || '-';
                    const isBest = isBestValue(spec, value, products);
                    return `
                        <td class="p-4 text-center ${isBest ? 'text-yellow-400 font-bold' : 'text-gray-300'}">
                            ${value}
                        </td>
                    `;
                }).join('')}
            </tr>
        `;
    });
    
    // 添加核心特性行
    html += `
        <tr>
            <td class="p-4 font-medium text-gray-300">核心特性</td>
            ${products.map(product => `
                <td class="p-4 text-center">
                    <div class="flex flex-wrap gap-1 justify-center">
                        ${product.features.slice(0, 3).map(feature => `
                            <span class="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-xs">${feature}</span>
                        `).join('')}
                    </div>
                </td>
            `).join('')}
        </tr>
    `;
    
    // 添加应用场景行
    html += `
        <tr>
            <td class="p-4 font-medium text-gray-300">应用场景</td>
            ${products.map(product => `
                <td class="p-4 text-center">
                    <div class="flex flex-wrap gap-1 justify-center">
                        ${product.applications.slice(0, 2).map(app => `
                            <span class="bg-green-500 bg-opacity-20 text-green-300 px-2 py-1 rounded text-xs">${app}</span>
                        `).join('')}
                    </div>
                </td>
            `).join('')}
        </tr>
    `;
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

// 判断是否为最优值
function isBestValue(spec, value, products) {
    const values = products.map(p => p.specs[spec] || '');
    
    // 对于数值型参数，找出最优值
    if (spec.includes('精度') || spec.includes('功耗')) {
        const numValues = values.map(v => parseFloat(v.replace(/[^\d.]/g, '')) || 0);
        const currentNum = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
        
        if (spec.includes('精度')) {
            // 精度越小越好
            return currentNum === Math.min(...numValues);
        } else if (spec.includes('功耗')) {
            // 功耗越小越好
            return currentNum === Math.min(...numValues);
        }
    }
    
    // 对于特殊标记的值（如100%全国产）
    if (value.includes('100%') || value.includes('全国产')) {
        return true;
    }
    
    return false;
}

// 关闭对比模态框
function closeComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    modal.classList.add('hidden');
}

// 查看产品详情
function viewProductDetails(productId) {
    const product = productsData[productId];
    if (!product) return;
    
    // 这里可以实现产品详情页面的跳转或模态框显示
    showNotification(`${product.name} 详情页面开发中...`, 'info');
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500' :
        type === 'warning' ? 'bg-yellow-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
    
    // 添加动画
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// 初始化移动端菜单
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// 导出函数供全局使用
window.runProductSelector = runProductSelector;
window.showComparisonModal = showComparisonModal;
window.closeComparisonModal = closeComparisonModal;
window.viewProductDetails = viewProductDetails;