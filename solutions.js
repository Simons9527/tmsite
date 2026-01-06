// 解决方案页面专用JavaScript文件

// 场景配置数据
const scenarioConfigs = {
    '5g': {
        name: '5G通信网络',
        nodes: [
            { id: 'core', name: '核心网', x: 50, y: 20, type: 'core', product: 'TMM4733' },
            { id: 'bbu1', name: 'BBU1', x: 25, y: 50, type: 'bbu', product: 'TMM4733' },
            { id: 'bbu2', name: 'BBU2', x: 75, y: 50, type: 'bbu', product: 'TMM4733' },
            { id: 'rru1', name: 'RRU1', x: 15, y: 80, type: 'rru', product: 'TM22' },
            { id: 'rru2', name: 'RRU2', x: 35, y: 80, type: 'rru', product: 'TM22' },
            { id: 'rru3', name: 'RRU3', x: 65, y: 80, type: 'rru', product: 'TM22' },
            { id: 'rru4', name: 'RRU4', x: 85, y: 80, type: 'rru', product: 'TM22' }
        ],
        connections: [
            { from: 'core', to: 'bbu1' },
            { from: 'core', to: 'bbu2' },
            { from: 'bbu1', to: 'rru1' },
            { from: 'bbu1', to: 'rru2' },
            { from: 'bbu2', to: 'rru3' },
            { from: 'bbu2', to: 'rru4' }
        ],
        metrics: {
            syncPrecision: '±10ns',
            networkDelay: '<1ms',
            availability: '99.99%',
            temperature: '25°C'
        }
    },
    'defense': {
        name: '国防军工系统',
        nodes: [
            { id: 'command', name: '指挥中心', x: 50, y: 15, type: 'command', product: 'TM33B' },
            { id: 'comm1', name: '通信车1', x: 25, y: 45, type: 'vehicle', product: 'TM33B' },
            { id: 'comm2', name: '通信车2', x: 75, y: 45, type: 'vehicle', product: 'TM33B' },
            { id: 'radar1', name: '雷达站1', x: 20, y: 75, type: 'radar', product: 'TM45' },
            { id: 'radar2', name: '雷达站2', x: 80, y: 75, type: 'radar', product: 'TM45' },
            { id: 'weapon', name: '武器系统', x: 50, y: 85, type: 'weapon', product: 'TM22' }
        ],
        connections: [
            { from: 'command', to: 'comm1' },
            { from: 'command', to: 'comm2' },
            { from: 'comm1', to: 'radar1' },
            { from: 'comm2', to: 'radar2' },
            { from: 'radar1', to: 'weapon' },
            { from: 'radar2', to: 'weapon' }
        ],
        metrics: {
            syncPrecision: '±15ns',
            networkDelay: '<500μs',
            availability: '99.999%',
            temperature: '-40°C'
        }
    },
    'datacenter': {
        name: '数据中心同步',
        nodes: [
            { id: 'master', name: '主时钟', x: 50, y: 20, type: 'master', product: 'TM45' },
            { id: 'slave1', name: '从时钟1', x: 25, y: 50, type: 'slave', product: 'TM22' },
            { id: 'slave2', name: '从时钟2', x: 75, y: 50, type: 'slave', product: 'TM22' },
            { id: 'server1', name: '服务器集群1', x: 20, y: 80, type: 'server', product: 'TMM4330' },
            { id: 'server2', name: '服务器集群2', x: 50, y: 80, type: 'server', product: 'TMM4330' },
            { id: 'server3', name: '服务器集群3', x: 80, y: 80, type: 'server', product: 'TMM4330' }
        ],
        connections: [
            { from: 'master', to: 'slave1' },
            { from: 'master', to: 'slave2' },
            { from: 'slave1', to: 'server1' },
            { from: 'slave1', to: 'server2' },
            { from: 'slave2', to: 'server2' },
            { from: 'slave2', to: 'server3' }
        ],
        metrics: {
            syncPrecision: '±15ns',
            networkDelay: '<500μs',
            availability: '99.99%',
            temperature: '22°C'
        }
    },
    'power': {
        name: '智能电网同步',
        nodes: [
            { id: 'control', name: '控制中心', x: 50, y: 15, type: 'control', product: 'TM33B' },
            { id: 'sub1', name: '变电站1', x: 25, y: 45, type: 'substation', product: 'TM33B' },
            { id: 'sub2', name: '变电站2', x: 75, y: 45, type: 'substation', product: 'TM33B' },
            { id: 'sub3', name: '变电站3', x: 50, y: 75, type: 'substation', product: 'TM33B' },
            { id: 'pmu1', name: 'PMU1', x: 15, y: 85, type: 'pmu', product: 'TM22' },
            { id: 'pmu2', name: 'PMU2', x: 85, y: 85, type: 'pmu', product: 'TM22' }
        ],
        connections: [
            { from: 'control', to: 'sub1' },
            { from: 'control', to: 'sub2' },
            { from: 'control', to: 'sub3' },
            { from: 'sub1', to: 'pmu1' },
            { from: 'sub2', to: 'pmu2' },
            { from: 'sub3', to: 'pmu1' },
            { from: 'sub3', to: 'pmu2' }
        ],
        metrics: {
            syncPrecision: '±20ns',
            networkDelay: '<2ms',
            availability: '99.95%',
            temperature: '30°C'
        }
    }
};

// 节点类型配置
const nodeTypeConfig = {
    'core': { icon: '🏢', color: '#ef4444', description: '核心网节点，负责整个网络的时钟分发' },
    'bbu': { icon: '📡', color: '#f59e0b', description: '基带处理单元，处理基带信号' },
    'rru': { icon: '📶', color: '#10b981', description: '远端射频单元，负责射频信号收发' },
    'command': { icon: '⭐', color: '#8b5cf6', description: '指挥中心，统一协调作战系统' },
    'vehicle': { icon: '🚙', color: '#06b6d4', description: '通信车，机动通信节点' },
    'radar': { icon: '🎯', color: '#ec4899', description: '雷达站，目标探测与跟踪' },
    'weapon': { icon: '⚔️', color: '#dc2626', description: '武器系统，精确打击平台' },
    'master': { icon: '⏰', color: '#f59e0b', description: '主时钟，整个数据中心的时频源' },
    'slave': { icon: '🕐', color: '#10b981', description: '从时钟，同步主时钟信号' },
    'server': { icon: '💻', color: '#3b82f6', description: '服务器集群，处理业务数据' },
    'control': { icon: '🎛️', color: '#8b5cf6', description: '电网控制中心，统一调度' },
    'substation': { icon: '⚡', color: '#f59e0b', description: '变电站，电能转换与分配' },
    'pmu': { icon: '📊', color: '#10b981', description: '同步相量测量单元' }
};

// 全局变量
let currentScenario = '5g';
let topologySketch;
let gaugeCharts = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initScenarioSelector();
    initNetworkTopology();
    initPerformanceDashboard();
    initMobileMenu();
});

// 初始化场景选择器
function initScenarioSelector() {
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    
    scenarioButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮状态
            scenarioButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 获取选中的场景
            const scenario = this.getAttribute('data-scenario');
            currentScenario = scenario;
            
            // 更新网络拓扑
            updateNetworkTopology(scenario);
            
            // 更新性能仪表板
            updatePerformanceDashboard(scenario);
        });
    });
}

// 初始化网络拓扑
function initNetworkTopology() {
    const container = document.getElementById('network-topology');
    if (!container) {
        console.error('Network topology container not found');
        return;
    }
    
    // 立即隐藏加载提示
    const loadingElement = container.querySelector('.text-center.text-gray-400');
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    // 创建p5.js画布
    topologySketch = new p5(function(p) {
        let nodes = [];
        let connections = [];
        let selectedNode = null;
        
        p.setup = function() {
            // 现在网络拓扑图可以使用全部宽度
            const width = container.offsetWidth - 48;
            const height = Math.max(500, window.innerHeight * 0.6);
            const canvas = p.createCanvas(width, height);
            canvas.parent(container);
            
            // 初始化网络拓扑
            updateNetworkTopology(currentScenario);
        };
        
        p.draw = function() {
            p.clear();
            
            // 绘制连接线
            connections.forEach(conn => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                
                if (fromNode && toNode) {
                    p.stroke(230, 179, 90, 150);
                    p.strokeWeight(2);
                    p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
                    
                    // 绘制数据流动效果
                    const t = (p.millis() * 0.001) % 1;
                    const x = p.lerp(fromNode.x, toNode.x, t);
                    const y = p.lerp(fromNode.y, toNode.y, t);
                    
                    p.fill(230, 179, 90);
                    p.noStroke();
                    p.circle(x, y, 6);
                }
            });
            
            // 绘制节点
            nodes.forEach(node => {
                const config = nodeTypeConfig[node.type] || {};
                
                // 节点背景
                if (selectedNode && selectedNode.id === node.id) {
                    p.fill(16, 185, 129); // 选中状态
                } else {
                    p.fill(config.color || '#e6b35a');
                }
                p.noStroke();
                p.circle(node.x, node.y, 60);
                
                // 节点边框
                p.stroke(255, 255, 255, 100);
                p.strokeWeight(2);
                p.noFill();
                p.circle(node.x, node.y, 60);
                
                // 节点图标
                p.fill(255);
                p.noStroke();
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(20);
                p.text(config.icon || '📡', node.x, node.y - 5);
                
                // 节点名称
                p.fill(255);
                p.textSize(10);
                p.text(node.name, node.x, node.y + 40);
            });
        };
        
        p.mousePressed = function() {
            // 检查是否点击了节点
            nodes.forEach(node => {
                const distance = p.dist(p.mouseX, p.mouseY, node.x, node.y);
                if (distance < 30) {
                    selectedNode = node;
                    // 不再显示节点信息，因为面板已删除
                }
            });
        };
        
        p.windowResized = function() {
            const width = container.offsetWidth - 48;
            const height = Math.max(500, window.innerHeight * 0.6);
            p.resizeCanvas(width, height);
        };
        
        // 更新网络拓扑
        function updateNetworkTopology(scenario) {
            const config = scenarioConfigs[scenario];
            if (!config) return;
            
            nodes = config.nodes.map(node => ({
                ...node,
                x: (node.x / 100) * p.width,
                y: (node.y / 100) * p.height
            }));
            
            connections = config.connections;
            selectedNode = null;
            
            // 不再需要清空节点信息面板，因为已删除
        }
        
        // 暴露更新函数
        window.updateNetworkTopology = updateNetworkTopology;
    });
}

// 初始化性能仪表板
function initPerformanceDashboard() {
    initGaugeCharts();
    updatePerformanceDashboard(currentScenario);
}

// 初始化仪表盘图表
function initGaugeCharts() {
    const gaugeIds = ['sync-precision-gauge', 'network-delay-gauge', 'availability-gauge', 'temperature-gauge'];
    
    gaugeIds.forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;
        
        const chart = echarts.init(container);
        gaugeCharts[id] = chart;
        
        // 响应式调整
        window.addEventListener('resize', () => {
            chart.resize();
        });
    });
}

// 更新性能仪表板
function updatePerformanceDashboard(scenario) {
    const config = scenarioConfigs[scenario];
    if (!config) return;
    
    const metrics = config.metrics;
    
    // 更新数值显示
    document.getElementById('sync-precision-value').textContent = metrics.syncPrecision;
    document.getElementById('network-delay-value').textContent = metrics.networkDelay;
    document.getElementById('availability-value').textContent = metrics.availability;
    document.getElementById('temperature-value').textContent = metrics.temperature;
    
    // 更新仪表盘
    updateGaugeChart('sync-precision-gauge', parseFloat(metrics.syncPrecision), 100, 'ns');
    updateGaugeChart('network-delay-gauge', parseFloat(metrics.networkDelay), 10, 'ms');
    updateGaugeChart('availability-gauge', parseFloat(metrics.availability), 100, '%');
    updateGaugeChart('temperature-gauge', parseFloat(metrics.temperature), 100, '°C');
}

// 更新单个仪表盘
function updateGaugeChart(chartId, value, max, unit) {
    const chart = gaugeCharts[chartId];
    if (!chart) return;
    
    let displayValue = value;
    let displayMax = max;
    let colors = [[0.3, '#10b981'], [0.7, '#f59e0b'], [1, '#ef4444']];
    
    // 根据不同类型的指标调整显示
    if (unit === 'ns') {
        displayValue = Math.abs(value);
        displayMax = 100;
        colors = [[0.3, '#10b981'], [0.6, '#f59e0b'], [1, '#ef4444']];
    } else if (unit === 'ms') {
        displayMax = 10;
        colors = [[0.3, '#10b981'], [0.7, '#f59e0b'], [1, '#ef4444']];
    } else if (unit === '%') {
        displayValue = value;
        displayMax = 100;
        colors = [[0.8, '#ef4444'], [0.95, '#f59e0b'], [1, '#10b981']];
    }
    
    const option = {
        backgroundColor: 'transparent',
        series: [{
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: displayMax,
            splitNumber: 5,
            itemStyle: {
                color: '#e6b35a'
            },
            progress: {
                show: true,
                width: 8
            },
            pointer: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    width: 8,
                    color: colors
                }
            },
            axisTick: {
                distance: -15,
                splitNumber: 2,
                lineStyle: {
                    width: 2,
                    color: '#8892a0'
                }
            },
            splitLine: {
                distance: -20,
                length: 8,
                lineStyle: {
                    width: 3,
                    color: '#8892a0'
                }
            },
            axisLabel: {
                color: '#8892a0',
                distance: -25,
                fontSize: 10
            },
            anchor: {
                show: false
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 14,
                fontWeight: 'bold',
                formatter: `{value}${unit}`,
                color: '#e1e8ef'
            },
            data: [{
                value: displayValue
            }]
        }]
    };
    
    chart.setOption(option);
}

// 显示节点信息
function showNodeInfo(node) {
    const panel = document.getElementById('node-info-panel');
    const config = nodeTypeConfig[node.type] || {};
    
    panel.innerHTML = `
        <h3 class="text-lg font-bold mb-4">节点信息</h3>
        <div class="space-y-4">
            <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style="background: ${config.color}">
                    ${config.icon}
                </div>
                <div>
                    <h4 class="font-bold">${node.name}</h4>
                    <p class="text-sm text-gray-400">${config.description}</p>
                </div>
            </div>
            
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="text-gray-400">类型</span>
                    <span class="text-yellow-400">${node.type.toUpperCase()}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">推荐产品</span>
                    <span class="text-yellow-400">${node.product}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">同步精度</span>
                    <span class="text-green-400">±10ns</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-400">状态</span>
                    <span class="text-green-400">● 在线</span>
                </div>
            </div>
            
            <div class="pt-4 border-t border-gray-700">
                <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-2 px-4 rounded text-sm font-medium transition-colors" onclick="TaimingTech.showContactModal()">
                    咨询产品详情
                </button>
            </div>
        </div>
    `;
    
    // 添加动画
    anime({
        targets: panel,
        scale: [0.95, 1],
        opacity: [0.8, 1],
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// 清空节点信息面板
function clearNodeInfoPanel() {
    const panel = document.getElementById('node-info-panel');
    panel.innerHTML = `
        <h3 class="text-lg font-bold mb-4">节点信息</h3>
        <div class="text-center text-gray-400 py-8">
            <svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>点击网络节点查看详细信息</p>
        </div>
    `;
}

// 显示案例研究
function showCaseStudy(type) {
    const caseStudies = {
        '5g': {
            title: '5G基站同步项目案例',
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-bold">项目背景</h4>
                    <p class="text-gray-300">某省级运营商需要为全省5000+ 5G基站提供高精度时间同步，要求同步精度达到±10ns，确保5G网络时隙精确对齐。</p>
                    
                    <h4 class="text-lg font-bold">解决方案</h4>
                    <p class="text-gray-300">采用太铭科技TMM4733插针式PTP模块，支持IEEE1588v2协议，提供±10ns授时精度，通过GPS/北斗卫星作为时间基准源。</p>
                    
                    <h4 class="text-lg font-bold">应用效果</h4>
                    <ul class="text-gray-300 space-y-1">
                        <li>• 同步精度提升80%，从±50ns提升至±10ns</li>
                        <li>• 网络时隙利用率提高15%</li>
                        <li>• 用户体验显著改善，投诉率下降60%</li>
                        <li>• 系统可用性达到99.99%</li>
                    </ul>
                    
                    <h4 class="text-lg font-bold">客户评价</h4>
                    <p class="text-yellow-400 italic">"太铭科技的PTP网络同步模块帮助我们实现了全省5G基站的高精度时间同步，完全满足5G网络时隙对齐要求。"</p>
                </div>
            `
        },
        'defense': {
            title: '军工时频系统案例',
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-bold">项目背景</h4>
                    <p class="text-gray-300">某军工研究所需要为野外作战系统提供高可靠性的时间同步，要求在-40℃~85℃极端环境下稳定工作，并实现100%国产化。</p>
                    
                    <h4 class="text-lg font-bold">解决方案</h4>
                    <p class="text-gray-300">采用太铭科技TM33B全国产编解码模块，从芯片到软件完全自主研发，支持-55℃~105℃超宽温工作范围。</p>
                    
                    <h4 class="text-lg font-bold">应用效果</h4>
                    <ul class="text-gray-300 space-y-1">
                        <li>• 实现100%自主可控，通过军工级认证</li>
                        <li>• 在-45℃~90℃环境下稳定运行</li>
                        <li>• 通过GJB认证，满足战时需求</li>
                        <li>• 系统可靠性达到99.999%</li>
                    </ul>
                    
                    <h4 class="text-lg font-bold">客户评价</h4>
                    <p class="text-yellow-400 italic">"太铭科技的全国产时钟模块在极端环境条件下表现优异，完全满足我们的野外作战系统需求。"</p>
                </div>
            `
        },
        'datacenter': {
            title: '数据中心同步案例',
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-bold">项目背景</h4>
                    <p class="text-gray-300">某大型互联网公司需要为分布式数据库系统提供微秒级时间同步，确保数千台服务器的数据一致性。</p>
                    
                    <h4 class="text-lg font-bold">解决方案</h4>
                    <p class="text-gray-300">采用太铭科技TM45高性能时钟模块，1.5μs/24hrs优异保持能力，配合TMM4330表贴式PTP模块实现网络同步。</p>
                    
                    <h4 class="text-lg font-bold">应用效果</h4>
                    <ul class="text-gray-300 space-y-1">
                        <li>• 数据一致性提升95%</li>
                        <li>• 分布式事务处理效率提高40%</li>
                        <li>• 系统故障率下降70%</li>
                        <li>• 运维成本降低50%</li>
                    </ul>
                    
                    <h4 class="text-lg font-bold">客户评价</h4>
                    <p class="text-yellow-400 italic">"太铭科技的时频解决方案帮助我们实现了分布式系统的完美同步，大幅提升了数据处理效率。"</p>
                </div>
            `
        },
        'power': {
            title: '智能电网同步案例',
            content: `
                <div class="space-y-4">
                    <h4 class="text-lg font-bold">项目背景</h4>
                    <p class="text-gray-300">国家电网某省公司需要为200+变电站提供时间同步，实现广域保护控制系统的精确协调。</p>
                    
                    <h4 class="text-lg font-bold">解决方案</h4>
                    <p class="text-gray-300">采用太铭科技TM33B编解码模块，实现IRIG-B信号与1PPS+TOD的灵活双向转换，简化系统集成。</p>
                    
                    <h4 class="text-lg font-bold">应用效果</h4>
                    <ul class="text-gray-300 space-y-1">
                        <li>• 故障定位精度提升至±100米</li>
                        <li>• 电网稳定性提高30%</li>
                        <li>• 故障响应时间缩短50%</li>
                        <li>• 系统可用性达到99.95%</li>
                    </ul>
                    
                    <h4 class="text-lg font-bold">客户评价</h4>
                    <p class="text-yellow-400 italic">"太铭科技的IRIG-B编解码模块帮助我们实现了变电站之间的时间统一，为广域保护控制提供了可靠的时间基准。"</p>
                </div>
            `
        }
    };
    
    const study = caseStudies[type];
    if (!study) return;
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gray-900 rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-700">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold">${study.title}</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="space-y-6">
                ${study.content}
            </div>
            
            <div class="mt-8 flex justify-center space-x-4">
                <button class="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors" onclick="TaimingTech.showContactModal()">
                    咨询解决方案
                </button>
                <button class="border border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2 rounded-lg font-medium transition-colors" onclick="this.closest('.fixed').remove()">
                    关闭
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加动画
    anime({
        targets: modal.querySelector('.bg-gray-900'),
        scale: [0.9, 1],
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
window.showCaseStudy = showCaseStudy;