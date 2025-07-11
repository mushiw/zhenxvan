// 全局变量
let currentServiceLevel = '';
let userLocation = null;

// 服务配置数据
const serviceConfig = {
    low: {
        title: '基础服务',
        areas: ['余杭区', '西湖区', '拱墅区', '临平区', '上城区', '钱塘区', '滨江区', '萧山区', '临安区', '富阳区'],
        details: {
            studio: '专业工作室服务，提供优质体验。服务时间灵活，环境舒适。',
            delivery: '上门服务，专业团队，安全可靠。需要提前预约确认。'
        }
    },
    medium: {
        title: '标准服务',
        areas: ['余杭区', '西湖区', '上城区', '萧山区', '临平区'],
        details: {
            studio: '高端工作室服务，专业技师团队。服务时长60-100分钟，环境优雅。',
            delivery: '精品上门服务，专业团队保障。服务时长60-100分钟，品质保证。'
        }
    },
    high: {
        title: '高级服务',
        areas: [],
        details: {
            description: '尊享VIP服务体验，专业团队一对一服务。',
            features: [
                '专业技师团队',
                '一对一专属服务',
                '高品质服务环境',
                '灵活预约时间',
                '安全保障体系'
            ]
        }
    }
};

// 区域坐标数据（杭州各区的大致坐标）
const areaCoordinates = {
    '余杭区': { lat: 30.2741, lng: 120.1551 },
    '西湖区': { lat: 30.2599, lng: 120.1303 },
    '拱墅区': { lat: 30.3191, lng: 120.1419 },
    '临平区': { lat: 30.4218, lng: 120.2974 },
    '上城区': { lat: 30.2429, lng: 120.1694 },
    '钱塘区': { lat: 30.3191, lng: 120.3833 },
    '滨江区': { lat: 30.2084, lng: 120.2119 },
    '萧山区': { lat: 30.1833, lng: 120.2647 },
    '临安区': { lat: 30.2333, lng: 119.7167 },
    '富阳区': { lat: 30.0489, lng: 119.9603 }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
async function initializeApp() {
    // 检测微信浏览器
    if (isWeChatBrowser()) {
        showWeChatMask();
        return;
    }

    // 检测地理位置
    await checkLocation();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 添加触感反馈
    addHapticFeedback();
}

// 检测是否为微信浏览器
function isWeChatBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes('micromessenger');
}

// 显示微信浏览器提示
function showWeChatMask() {
    const wechatMask = document.getElementById('wechat-mask');
    wechatMask.style.display = 'flex';
}

// 检测用户地理位置
async function checkLocation() {
    try {
        // 使用免费的IP地理位置API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        userLocation = {
            country: data.country_name,
            region: data.region,
            city: data.city,
            ip: data.ip
        };
        
        // 检查是否为浙江地区
        if (data.region !== 'Zhejiang' && data.country_name === 'China') {
            showLocationRestrict();
            return false;
        }
        
        return true;
    } catch (error) {
        console.log('无法获取地理位置信息，继续访问');
        return true;
    }
}

// 显示地理位置限制
function showLocationRestrict() {
    const locationRestrict = document.getElementById('location-restrict');
    locationRestrict.style.display = 'flex';
}

// 绑定事件监听器
function bindEventListeners() {
    // 服务卡片点击事件
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', handleServiceCardClick);
    });
    
    // 模态框关闭事件
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // 点击模态框背景关闭
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// 处理服务卡片点击
function handleServiceCardClick(e) {
    const card = e.currentTarget;
    const level = card.dataset.level;
    currentServiceLevel = level;
    
    // 添加点击动画效果
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 150);
    
    if (level === 'high') {
        // 高级服务直接跳转
        window.open('http://baidu.com', '_blank');
    } else {
        // 显示区域选择
        showAreaModal(level);
    }
}

// 显示区域选择模态框
function showAreaModal(level) {
    const modal = document.getElementById('area-modal');
    const modalTitle = document.getElementById('modal-title');
    const areaGrid = document.getElementById('area-grid');
    
    const config = serviceConfig[level];
    modalTitle.textContent = `${config.title} - 选择区域`;
    
    // 清空并重新生成区域网格
    areaGrid.innerHTML = '';
    
    config.areas.forEach(area => {
        const areaItem = document.createElement('div');
        areaItem.className = 'area-item';
        areaItem.textContent = area;
        areaItem.addEventListener('click', () => handleAreaClick(area));
        areaGrid.appendChild(areaItem);
    });
    
    // 添加服务详情按钮
    const detailBtn = document.createElement('div');
    detailBtn.className = 'area-item';
    detailBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    detailBtn.style.color = 'white';
    detailBtn.style.border = 'none';
    detailBtn.innerHTML = '<i class="fas fa-info-circle"></i> 服务详情';
    detailBtn.addEventListener('click', () => showServiceDetails(level));
    areaGrid.appendChild(detailBtn);
    
    modal.style.display = 'flex';
}

// 处理区域点击
function handleAreaClick(area) {
    // 移除所有选中状态
    const allAreaItems = document.querySelectorAll('.area-item');
    allAreaItems.forEach(item => {
        item.classList.remove('selected');
    });
    
    // 添加选中状态到当前点击的区域
    const clickedItem = event.target;
    clickedItem.classList.add('selected');
    
    // 显示选中提示
    showAreaSelectedMessage(area);
    
    // 添加触感反馈
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// 显示区域选中提示
function showAreaSelectedMessage(area) {
    // 创建提示元素
    const message = document.createElement('div');
    message.className = 'area-selected-message';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>已选择：${area}</span>
    `;
    
    // 添加到页面
    document.body.appendChild(message);
    
    // 显示动画
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

// 显示服务详情
function showServiceDetails(level) {
    const modal = document.getElementById('detail-modal');
    const serviceDetails = document.getElementById('service-details');
    
    const config = serviceConfig[level];
    let detailsHTML = '';
    
    if (level === 'high') {
        detailsHTML = `
            <h3>${config.title}</h3>
            <p>${config.details.description}</p>
            <h4>服务特色：</h4>
            <ul>
                ${config.details.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    } else {
        detailsHTML = `
            <h3>${config.title}</h3>
            <h4>工作室服务：</h4>
            <p>${config.details.studio}</p>
            <h4>上门服务：</h4>
            <p>${config.details.delivery}</p>
        `;
    }
    
    serviceDetails.innerHTML = detailsHTML;
    modal.style.display = 'flex';
}

// 关闭模态框
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// 添加触感反馈
function addHapticFeedback() {
    // 为所有可点击元素添加触感反馈
    const clickableElements = document.querySelectorAll('.service-card, .area-item, .close-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            // 在支持的设备上触发触感反馈
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(e) {
    console.error('未处理的Promise拒绝:', e.reason);
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时的处理
        console.log('页面已隐藏');
    } else {
        // 页面显示时的处理
        console.log('页面已显示');
    }
});

// 网络状态监听
window.addEventListener('online', function() {
    console.log('网络已连接');
});

window.addEventListener('offline', function() {
    console.log('网络已断开');
});

// 导出函数供外部使用（如果需要）
window.AppUtils = {
    checkLocation,
    showAreaModal,
    showServiceDetails,
    closeModal
}; 