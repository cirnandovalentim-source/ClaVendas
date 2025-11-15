// Fix: Add declaration for window.app to satisfy TypeScript compiler.
declare global {
    interface Window {
        app: any;
        jspdf: any;
    }
}

const NATIVE_LOGO_SVG = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, sans-serif">
    <style>
      .text { font-family: Poppins, sans-serif; font-weight: bold; font-size: 58px; fill: white; text-anchor: middle; }
    </style>
    <defs>
      <path id="textCircleTop" d="M106,106 a212,212 0 0 1 300,0" fill="none"/>
      <path id="textCircleBottom" d="M406,406 a212,212 0 0 1 -300,0" fill="none"/>
    </defs>
    <path d="M256,6 A250,250 0 0 0 256,506 L256,436 A180,180 0 0 1 256,76Z" fill="#4D4D4D"/>
    <path d="M256,6 A250,250 0 0 1 256,506 L256,436 A180,180 0 0 0 256,76Z" fill="#F37A20"/>
    <text class="text" letter-spacing="4">
      <textPath href="#textCircleTop" startOffset="50%">- VENDAS</textPath>
    </text>
    <text class="text" letter-spacing="12">
      <textPath href="#textCircleBottom" startOffset="50%">CLA</textPath>
    </text>
    <path d="M256,116 A140,140 0 0 0 256,396 L256,366 A110,110 0 0 1 256,146Z" fill="#4D4D4D"/>
    <path d="M256,116 A140,140 0 0 1 256,396 L256,366 A110,110 0 0 0 256,146Z" fill="#F37A20"/>
    <g stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, 15)">
      <path d="m 378.8,266.9 c -15.1,-4.3 -40.5,8.1 -40.5,8.1 l -46.3,-35.1 18.2,-27.8 c 3.2,-4.8 2.3,-11.1 -2.3,-14.7 l -31.1,-23.3 c -4.1,-3 -9.5,-3.8 -14.1,-1.8 l -34.7,14.6 c -3.6,1.5 -6.5,4.4 -8,8.1 l -21,48.5 c -2,4.7 -0.6,10.1 3.3,13.2 l 43.4,34.7 c 0,0 21.9,-6.2 38.8,-15.1" fill="#F37A20"/>
      <path d="m 133.2,245.1 c 15.1,4.3 40.5,-8.1 40.5,-8.1 l 46.3,35.1 -18.2,27.8 c -3.2,4.8 -2.3,11.1 2.3,14.7 l 31.1,23.3 c 4.1,3 9.5,3.8 14.1,1.8 l 34.7,-14.6 c 3.6,-1.5 6.5,4.4 8,-8.1 l 21,-48.5 c 2,-4.7 0.6,-10.1 -3.3,-13.2 l -43.4,-34.7 c 0,0 -21.9,6.2 -38.8,15.1" fill="#4D4D4D"/>
    </g>
</svg>`;

// State and Mock Data
let clients = [];
let products = [];
let sales = [];
let installments = [];
let payments = [];
let expenses = [];
let sellers = [];
let advances = [];

const expenseCategories = ['Transporte', 'Alimentação', 'Material de Escritório', 'Outros'];

const THEMES = [
    {
        id: 'default',
        name: 'Padrão',
        colors: {
            accent: '#2F80ED',
            background: '#FFF5EE',
            surface: '#FFFFFF',
            'surface-secondary': '#F8F9FA',
            shadow: 'rgba(47, 128, 237, 0.1)',
            'text-primary': '#121212',
            'text-secondary': '#828282',
            'border': '#E0E0E0'
        }
    },
    {
        id: 'journey',
        name: 'Jornada',
        colors: {
            accent: '#ED5A5A',
            background: '#F7F8FC',
            surface: '#FFFFFF',
            'surface-secondary': '#F0F2F5',
            shadow: 'rgba(0, 0, 0, 0.05)',
            'text-primary': '#333333',
            'text-secondary': '#555555',
            'border': '#DDDDDD'
        }
    },
    {
        id: 'ocean',
        name: 'Oceano',
        colors: {
            accent: '#1E90FF',
            background: '#F0F8FF',
            surface: '#FFFFFF',
            'surface-secondary': '#E6F2FF',
            shadow: 'rgba(30, 144, 255, 0.15)',
            'text-primary': '#001f3f',
            'text-secondary': '#0074D9',
            'border': '#B0E0E6'
        }
    },
    {
        id: 'forest',
        name: 'Floresta',
        colors: {
            accent: '#2E8B57',
            background: '#F5FFF5',
            surface: '#FFFFFF',
            'surface-secondary': '#EDF7ED',
            shadow: 'rgba(46, 139, 87, 0.15)',
            'text-primary': '#013220',
            'text-secondary': '#228B22',
            'border': '#90EE90'
        }
    },
    {
        id: 'sunset',
        name: 'Pôr do Sol',
        colors: {
            accent: '#FF6347',
            background: '#FFF0F5',
            surface: '#FFFFFF',
            'surface-secondary': '#FFF5F8',
            shadow: 'rgba(255, 99, 71, 0.15)',
            'text-primary': '#4D0F05',
            'text-secondary': '#D2691E',
            'border': '#FFDAB9'
        }
    },
    {
        id: 'graphite',
        name: 'Grafite',
        colors: {
            accent: '#808080',
            background: '#F5F5F5',
            surface: '#FFFFFF',
            'surface-secondary': '#EEEEEE',
            shadow: 'rgba(128, 128, 128, 0.15)',
            'text-primary': '#2F4F4F',
            'text-secondary': '#708090',
            'border': '#D3D3D3'
        }
    },
    {
        id: 'lavender',
        name: 'Lavanda',
        colors: {
            accent: '#9370DB',
            background: '#F8F5FF',
            surface: '#FFFFFF',
            'surface-secondary': '#F0E6FF',
            shadow: 'rgba(147, 112, 219, 0.15)',
            'text-primary': '#483D8B',
            'text-secondary': '#6A5ACD',
            'border': '#D8BFD8'
        }
    },
    {
        id: 'terracotta',
        name: 'Terracota',
        colors: {
            accent: '#CD5C5C',
            background: '#FFFAF0',
            surface: '#FFFFFF',
            'surface-secondary': '#FFF5E1',
            shadow: 'rgba(205, 92, 92, 0.15)',
            'text-primary': '#8B0000',
            'text-secondary': '#A52A2A',
            'border': '#FBC4AB'
        }
    },
    {
        id: 'golden',
        name: 'Dourado',
        colors: {
            accent: '#FFD700',
            background: '#FFFFF0',
            surface: '#FFFFFF',
            'surface-secondary': '#FFFACD',
            shadow: 'rgba(255, 215, 0, 0.2)',
            'text-primary': '#4d4600',
            'text-secondary': '#808000',
            'border': '#EEE8AA'
        }
    },
    {
        id: 'chocolate',
        name: 'Chocolate',
        colors: {
            accent: '#A0522D',
            background: '#FDF5E6',
            surface: '#FFFFFF',
            'surface-secondary': '#FAEBD7',
            shadow: 'rgba(160, 82, 45, 0.15)',
            'text-primary': '#4A2C2A',
            'text-secondary': '#8B4513',
            'border': '#D2B48C'
        }
    },
    {
        id: 'mint',
        name: 'Hortelã',
        colors: {
            accent: '#3EB489',
            background: '#F0FFF0',
            surface: '#FFFFFF',
            'surface-secondary': '#E0EEE0',
            shadow: 'rgba(62, 180, 137, 0.15)',
            'text-primary': '#004225',
            'text-secondary': '#2E8B57',
            'border': '#98FB98'
        }
    },
    {
        id: 'royal',
        name: 'Azul Real',
        colors: {
            accent: '#4169E1',
            background: '#F0F8FF',
            surface: '#FFFFFF',
            'surface-secondary': '#E6E6FA',
            shadow: 'rgba(65, 105, 225, 0.15)',
            'text-primary': '#000080',
            'text-secondary': '#4682B4',
            'border': '#B0C4DE'
        }
    }
];

let settings = {
    themeId: 'default',
    headerTitle: 'CLA Vendas',
    welcomeName: 'Simplificando Rotinas',
    darkMode: false, 
    logoUrl: '/logo.svg',
    appDescription: 'Simplificando Rotinas',
    bannerImageUrl: null,
    splashImageUrl: null,
    splashLogoUrl: null,
    autoBackupFrequency: 'daily',
};

// State Management
let state = {
    currentView: 'splash',
    selectedClientId: null,
    selectedProductId: null,
    selectedSellerId: null,
    selectedInstallmentId: null,
    reportPeriod: 'day',
    reportStartDate: new Date().toISOString().split('T')[0],
    reportEndDate: new Date().toISOString().split('T')[0],
    reportType: 'sales',
    sellerDetailsPeriod: 'day',
    sellerDetailsStartDate: new Date().toISOString().split('T')[0],
    sellerDetailsEndDate: new Date().toISOString().split('T')[0],
    expenseReportPeriod: 'day',
    clientListSearchTerm: '',
    productListSearchTerm: '',
    sellerListSearchTerm: '',
    advancedSearch: {
        clients: {
            isOpen: false,
            name: '',
            cpf: '',
            neighborhood: '',
            sortBy: 'name',
            sortOrder: 'asc'
        },
        products: {
            isOpen: false,
            name: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'name',
            sortOrder: 'asc'
        }
    },
    currentSale: {
        clientId: null,
        sellerId: null,
        products: [],
        installments: 1,
        total: 0,
        clientSearchTerm: '',
        sellerSearchTerm: '',
        productSearchTerm: '',
        paymentMethod: 'parcelado',
        installmentMode: 'count', // 'count' or 'value'
        installmentValueInput: '',
    },
    calculator: {
        totalValue: '',
        installments: 1,
    },
    confirmationDialog: null,
    importDialog: null,
    clientFormPhoto: null,
    productFormPhoto: null,
    sellerFormPhoto: null,
    notifications: [],
    showNotificationsView: false,
    // Fix: Type dialog states as any to allow for dynamic properties.
    photoSourceDialog: null as any,
    rescheduleDialog: null as any,
    adjustInstallmentDialog: null as any,
    editSalePriceDialog: null as any,
    addAdvanceDialog: null as any,
    receiptDialog: null as any,
    dailyClientsDate: new Date().toISOString().split('T')[0],
    clientListFilter: 'all',
    clientDetailsTab: 'installments',
    sellerDetailsTab: 'sales',
    isMenuOpen: false,
    // Fix: Type formData and formErrors as any to handle dynamic form fields.
    formData: {} as any,
    formErrors: {} as any,
    isSubmitting: false,
    isBalanceVisible: true,
    isSharing: false,
    installPromptEvent: null,
    showInstallBanner: false,
    isIos: false,
};

// --- Data Persistence and Backup ---
const APP_DATA_KEY = 'sgcLitosAppData_v2';
const BACKUP_DATA_KEY = 'sgcLitosAutoBackup_v2';
const CHANGE_COUNT_KEY = 'sgcLitosChangeCount_v2';

function saveLocalBackup(triggerType = 'manual') {
    const backupData = {
        timestamp: new Date().toISOString(),
        trigger: triggerType,
        data: { clients, products, sales, installments, payments, expenses, sellers, advances }
    };
    localStorage.setItem(BACKUP_DATA_KEY, JSON.stringify(backupData));
    if (triggerType !== 'manual') {
        console.log(`Automatic backup performed. Triggered by: ${triggerType}`);
    }
    if (state.currentView === 'dataManagement') {
        render();
    }
}

function handleAutoBackup() {
    if (settings.autoBackupFrequency === 'off') return;

    if (settings.autoBackupFrequency === 'daily') {
        const backupData = JSON.parse(localStorage.getItem(BACKUP_DATA_KEY) || '{}');
        const lastBackupDate = backupData.timestamp ? new Date(backupData.timestamp).toISOString().split('T')[0] : null;
        const todayStr = new Date().toISOString().split('T')[0];
        if (lastBackupDate !== todayStr) {
            saveLocalBackup('daily');
        }
    }

    if (settings.autoBackupFrequency === 'on_change') {
        let changeCount = parseInt(localStorage.getItem(CHANGE_COUNT_KEY) || '0');
        changeCount++;
        localStorage.setItem(CHANGE_COUNT_KEY, changeCount.toString());

        if (changeCount >= 25) {
            saveLocalBackup('on_change');
            localStorage.setItem(CHANGE_COUNT_KEY, '0');
        }
    }
}

function saveAllData() {
    const appData = { clients, products, sales, installments, payments, expenses, sellers, advances };
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(appData));
    handleAutoBackup();
}

function loadAllData() {
    const savedData = localStorage.getItem(APP_DATA_KEY);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            clients = data.clients || [];
            products = data.products || [];
            sales = data.sales || [];
            installments = data.installments || [];
            payments = data.payments || [];
            expenses = data.expenses || [];
            sellers = data.sellers || [];
            advances = data.advances || [];
        } catch (e) {
            console.error("Failed to load app data:", e);
        }
    }
}

function handleManualBackup() {
    saveLocalBackup('manual');
    alert('Backup manual criado com sucesso!');
}

function restoreFromLocalBackup() {
    const backupJson = localStorage.getItem(BACKUP_DATA_KEY);
    if (!backupJson) {
        alert('Nenhum backup local encontrado.');
        return;
    }
    
    showConfirmation('Tem certeza que deseja restaurar os dados do último backup? TODAS AS ALTERAÇÕES NÃO SALVAS SERÃO PERDIDAS.', () => {
        try {
            const backup = JSON.parse(backupJson);
            const data = backup.data;
            clients = data.clients || [];
            products = data.products || [];
            sales = data.sales || [];
            installments = data.installments || [];
            payments = data.payments || [];
            expenses = data.expenses || [];
            sellers = data.sellers || [];
            advances = data.advances || [];
            saveAllData();
            alert('Dados restaurados com sucesso!');
            navigate('home');
        } catch (e) {
            alert('Erro ao restaurar o backup. O arquivo pode estar corrompido.');
            console.error("Failed to restore backup:", e);
        }
    });
}

function getLastBackupInfo() {
    const backupJson = localStorage.getItem(BACKUP_DATA_KEY);
    if (!backupJson) return 'Nunca';
    try {
        const backup = JSON.parse(backupJson);
        const date = new Date(backup.timestamp);
        return `${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR')}`;
    } catch {
        return 'Inválido';
    }
}

function updateInstallmentStatuses() {
    const todayStr = new Date().toISOString().split('T')[0];
    let changed = false;
    installments.forEach(inst => {
        if (inst.status === 'due' && inst.dueDate < todayStr) {
            inst.status = 'late';
            changed = true;
        }
    });
    return changed;
}

// Fix: Add types for function parameters to resolve property access errors.
function navigate(view: string, params: any = {}) {
    if (updateInstallmentStatuses()) {
        saveAllData();
    }
    state.currentView = view;
    state.isMenuOpen = false; // Ensure menu closes on navigation
    state.selectedClientId = params.clientId ?? null;
    state.selectedProductId = params.productId ?? null;
    state.selectedSellerId = params.sellerId ?? null;
    state.selectedInstallmentId = params.installmentId ?? null;
    state.formErrors = {}; // Clear errors on navigation
    state.formData = {}; // Clear form data on navigation
    
    if (view === 'clientDetails') {
        state.clientDetailsTab = 'installments';
    }
    if (view === 'sellerDetails') {
        state.sellerDetailsTab = 'sales';
    }
    if (view === 'editClient' && params.clientId) {
        const client = clients.find(c => c.id === params.clientId);
        if(client) state.formData = { ...client };
    }
    if (view === 'editProduct' && params.productId) {
        const product = products.find(p => p.id === params.productId);
        if (product) state.formData = { ...product, price: product.price.toString().replace('.', ',') };
    }
     if (view === 'editSeller' && params.sellerId) {
        const seller = sellers.find(s => s.id === params.sellerId);
        if (seller) state.formData = { ...seller, commissionRate: seller.commissionRate.toString().replace('.', ',') };
    }
    
    if (view === 'addClient' || view === 'editClient') state.clientFormPhoto = null;
    if (view === 'addProduct' || view === 'editProduct') state.productFormPhoto = null;
    if (view === 'addSeller' || view === 'editSeller') state.sellerFormPhoto = null;
    
    render();
}

// --- Validation Functions ---
function validateField(name, value) {
    switch (name) {
        case 'name':
            if (!value.trim()) return 'O nome é obrigatório.';
            if (value.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
            return null;
        case 'cpf':
            if (!value.trim()) return 'O CPF/CNPJ é obrigatório.';
            return null; // Basic presence check
        case 'address':
        case 'neighborhood':
        case 'phone':
            if (!value.trim()) return 'Este campo é obrigatório.';
            return null;
        case 'price':
        case 'amount':
        case 'newAmountPaid':
        case 'newPrice':
        case 'installmentValue':
            if (!value.trim()) return 'O valor é obrigatório.';
            const numVal = parseFloat(value.replace(',', '.'));
            if (isNaN(numVal)) return 'Insira um valor numérico válido.';
            if (numVal <= 0 && name !== 'newAmountPaid') return 'O valor deve ser maior que zero.';
            if (numVal < 0 && name === 'newAmountPaid') return 'O valor não pode ser negativo.';
            return null;
        case 'commissionRate':
            if (!value.trim()) return 'A comissão é obrigatória.';
            const rate = parseFloat(value.replace(',', '.'));
            if (isNaN(rate)) return 'Insira um valor numérico válido.';
            if (rate < 0 || rate > 100) return 'A comissão deve ser entre 0 e 100.';
            return null;
        case 'description':
            if (!value.trim()) return 'A descrição é obrigatória.';
            return null;
        case 'installments':
             if (!value) return 'O número de parcelas é obrigatório.';
            const int = Number(value);
            if (!Number.isInteger(int) || int <= 0) return 'Insira um número inteiro positivo.';
            return null;
        case 'newDueDate':
            if (!value) return 'A data é obrigatória.';
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const [year, month, day] = value.split('-').map(Number);
            const selectedDate = new Date(year, month - 1, day);
            if (selectedDate < today) return 'A data não pode ser no passado.';
            return null;
        default:
            return null;
    }
}

function handleFormInput(event) {
    const input = event.target;
    const { name, value } = input;
    state.formData[name] = value;
}

function handleFormBlur(event) {
    const input = event.target;
    const { name, value } = input;
    state.formErrors[name] = validateField(name, value);
    render();
}

function handleDialogInputChange(event) {
    const input = event.target;
    const { name, value } = input;
    
    if (state.rescheduleDialog && name === 'newDueDate') {
        state.rescheduleDialog.newDueDate = value;
    } else if (state.adjustInstallmentDialog && name === 'newAmountPaid') {
        state.adjustInstallmentDialog.newAmountPaid = value;
    } else if (state.editSalePriceDialog && name === 'newPrice') {
        state.editSalePriceDialog.newPrice = value;
    }
    
    state.formErrors[name] = validateField(name, value);
    renderDialogs();
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[name], select[name], textarea[name]');
    let isFormValid = true;
    const newErrors = {};

    inputs.forEach(el => {
        const input = el as HTMLInputElement;
        if (input.required || input.value) { 
            const error = validateField(input.name, input.value);
            if (error) {
                isFormValid = false;
            }
            newErrors[input.name] = error;
        }
    });

    state.formErrors = newErrors;
    return isFormValid;
}


// --- Menu Functions ---
function toggleSideMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    render();
}

// --- Report Functions ---
function handleReportPeriodChange(period) {
    state.reportPeriod = period;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (period === 'day') {
        state.reportStartDate = todayStr;
        state.reportEndDate = todayStr;
    } else if (period === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        state.reportStartDate = weekAgo.toISOString().split('T')[0];
        state.reportEndDate = todayStr;
    } else if (period === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        state.reportStartDate = monthAgo.toISOString().split('T')[0];
        state.reportEndDate = todayStr;
    }
    render();
}
function handleReportDateChange(event) {
    const {name, value} = event.target;
    state[name] = value;
    state.reportPeriod = 'custom';
    render();
}
function setReportType(type) {
    state.reportType = type;
    render();
}

// --- Notification Functions ---
function generateNotifications() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const next7days = new Date(today);
    next7days.setDate(today.getDate() + 7);
    const newNotifications = [];
    installments.forEach(inst => {
        const client = clients.find(c => c.id === inst.clientId);
        if (!client) return;
        if (inst.status === 'late') {
            const id = `late-inst-${inst.id}`;
            const existing = state.notifications.find(n => n.id === id);
            newNotifications.push({ id, type: 'late', message: `Parcela de ${client.name} (${formatCurrency(inst.value)}) está atrasada.`, clientId: inst.clientId, installmentId: inst.id, dueDate: inst.dueDate, read: existing ? existing.read : false });
        } else if (inst.status === 'due' && new Date(inst.dueDate) >= today && new Date(inst.dueDate) <= next7days) {
            const id = `due-inst-${inst.id}`;
            const existing = state.notifications.find(n => n.id === id);
            newNotifications.push({ id, type: 'due-soon', message: `Parcela de ${client.name} (${formatCurrency(inst.value)}) vence em ${formatDate(inst.dueDate)}.`, clientId: inst.clientId, installmentId: inst.id, dueDate: inst.dueDate, read: existing ? existing.read : false });
        }
    });
    state.notifications = newNotifications.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}
function toggleNotificationsView() { state.showNotificationsView = !state.showNotificationsView; render(); }
function markAllNotificationsAsRead() { state.notifications.forEach(n => n.read = true); render(); }
function handleNotificationClick(notificationId) {
    const notification = state.notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        state.showNotificationsView = false;
        navigate('clientDetails', { clientId: notification.clientId });
    }
}

// --- Settings Functions ---
const SETTINGS_KEY = 'sgcLitosAppSettings_v2';
function applySettings() {
    document.documentElement.setAttribute('data-theme-id', settings.themeId);
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');

    const selectedTheme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];
    
    // Define base colors for light and dark modes
    const lightModeColors = {
        'text-primary': '#121212',
        'text-secondary': '#828282',
        'border': '#E0E0E0',
        ...selectedTheme.colors
    };

    const darkModeColors = {
        ...selectedTheme.colors,
        'background': '#121212',
        'surface': '#1E1E1E',
        'surface-secondary': '#2C2C2C',
        'shadow': 'rgba(0, 0, 0, 0.25)',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A9A9A9',
        'border': '#3A3A3C',
    };

    const colorsToApply = settings.darkMode ? darkModeColors : lightModeColors;

    // Apply all the final colors as CSS variables
    for (const colorName in colorsToApply) {
        document.documentElement.style.setProperty(`--color-${colorName}`, colorsToApply[colorName]);
    }
    
    const themeColorMeta = document.getElementById('theme-color-meta');
    if (themeColorMeta) { 
        themeColorMeta.setAttribute('content', colorsToApply.background); 
    }
}
function loadSettings() {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) { settings = { ...settings, ...JSON.parse(savedSettings) }; }
}
function saveSettings() { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); }
function handleSettingsChange(event) {
    const input = event.target;
    const { name, value, type, checked } = input;
    
    if (name === 'darkMode') {
        settings.darkMode = checked;
    } else if (name === 'autoBackupFrequency') {
        settings.autoBackupFrequency = value;
        if (value !== 'on_change') {
            localStorage.removeItem(CHANGE_COUNT_KEY);
        }
    } else {
        const key = name;
        if (key in settings) {
            settings[key] = value;
        }
    }

    saveSettings();
    applySettings();
    render();
}
function handleThemeChange(themeId) {
    settings.themeId = themeId;
    saveSettings();
    applySettings();
    render();
}
async function handleLogoUpload(event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit before compression
            alert('A imagem é muito grande. O limite é de 5MB.');
            return;
        }
        try {
            const resizedDataUrl = await resizeImage(file, 200, 200, 0.9) as string;
            if (resizedDataUrl) {
                settings.logoUrl = resizedDataUrl;
                saveSettings();
                applySettings();
                render();
            }
        } catch (error) {
            console.error('Erro ao redimensionar a imagem:', error);
            alert('Ocorreu um erro ao processar a imagem. Tente um formato diferente (JPG, PNG).');
        }
    }
}

async function handleBannerUpload(event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('A imagem é muito grande. O limite é de 5MB.');
            return;
        }
        try {
            const resizedDataUrl = await resizeImage(file, 800, 400, 0.9) as string;
            if (resizedDataUrl) {
                settings.bannerImageUrl = resizedDataUrl;
                saveSettings();
                render();
            }
        } catch (error) {
            console.error('Erro ao redimensionar a imagem do banner:', error);
            alert('Ocorreu um erro ao processar a imagem. Tente um formato diferente (JPG, PNG).');
        }
    }
}

async function handleSplashImageUpload(event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('A imagem é muito grande. O limite é de 5MB.');
            return;
        }
        try {
            const resizedDataUrl = await resizeImage(file, 800, 1200, 0.9) as string;
            if (resizedDataUrl) {
                settings.splashImageUrl = resizedDataUrl;
                saveSettings();
                render();
            }
        } catch (error) {
            console.error('Erro ao redimensionar a imagem da tela de entrada:', error);
            alert('Ocorreu um erro ao processar a imagem. Tente um formato diferente (JPG, PNG).');
        }
    }
}

async function handleSplashLogoUpload(event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('A imagem é muito grande. O limite é de 5MB.');
            return;
        }
        try {
            const resizedDataUrl = await resizeImage(file, 200, 200, 0.9) as string;
            if (resizedDataUrl) {
                settings.splashLogoUrl = resizedDataUrl;
                saveSettings();
                render();
            }
        } catch (error) {
            console.error('Erro ao redimensionar o logo da tela de entrada:', error);
            alert('Ocorreu um erro ao processar a imagem. Tente um formato diferente (JPG, PNG).');
        }
    }
}

// --- Dashboard Functions ---
function toggleBalanceVisibility() {
    state.isBalanceVisible = !state.isBalanceVisible;
    render();
}

// --- Seller Advance Functions ---
function showAddAdvanceDialog(sellerId) {
    state.formErrors = {};
    state.formData = { amount: '', description: '' };
    state.addAdvanceDialog = { sellerId };
    render();
}

function hideAddAdvanceDialog() {
    state.addAdvanceDialog = null;
    state.formData = {};
    state.formErrors = {};
    render();
}

function confirmAddAdvance() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        if (!state.addAdvanceDialog) {
            state.isSubmitting = false;
            render();
            return;
        }
        
        const amountStr = state.formData.amount || '';
        const description = state.formData.description || '';
        
        const amountError = validateField('amount', amountStr);
        if (amountError) {
            state.formErrors['amount'] = amountError;
            state.isSubmitting = false;
            render();
            return;
        }

        const amount = parseFloat(amountStr.replace(',', '.'));
        const newAdvance = {
            id: advances.length > 0 ? Math.max(...advances.map(a => a.id)) + 1 : 1,
            sellerId: state.addAdvanceDialog.sellerId,
            amount,
            description,
            date: new Date().toISOString().split('T')[0]
        };

        advances.unshift(newAdvance);
        saveAllData();
        state.isSubmitting = false;
        hideAddAdvanceDialog();
    }, 50);
}

function deleteAdvance(advanceId) {
    showConfirmation('Tem certeza que deseja excluir este vale? Esta ação não pode ser desfeita.', () => {
        advances = advances.filter(a => a.id !== advanceId);
        saveAllData();
        render();
    });
}

// --- Core App Logic ---
function addClient(event) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();
    
    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const cpf = (form.elements.namedItem('cpf') as HTMLInputElement).value.trim();
        const address = (form.elements.namedItem('address') as HTMLInputElement).value.trim();
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
        const neighborhood = (form.elements.namedItem('neighborhood') as HTMLInputElement).value.trim();
        const newClientId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
        const newClient = {
            id: newClientId,
            name,
            cpf,
            code: newClientId.toString(),
            address,
            phone,
            neighborhood,
            photo: state.clientFormPhoto,
            createdAt: new Date().toISOString()
        };
        clients.unshift(newClient);
        saveAllData();
        state.clientFormPhoto = null;
        alert('Cliente cadastrado com sucesso!');
        state.isSubmitting = false;
        navigate('clients');
    }, 50);
}

function updateClient(event, clientId) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const cpf = (form.elements.namedItem('cpf') as HTMLInputElement).value.trim();
        const address = (form.elements.namedItem('address') as HTMLInputElement).value.trim();
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
        const neighborhood = (form.elements.namedItem('neighborhood') as HTMLInputElement).value.trim();
        const clientIndex = clients.findIndex(c => c.id === clientId);
        if (clientIndex === -1) {
            alert('Cliente não encontrado!');
            state.isSubmitting = false;
            navigate('clients');
            return;
        }
        const existingPhoto = clients[clientIndex].photo;
        clients[clientIndex] = {
            ...clients[clientIndex],
            name,
            cpf,
            address,
            phone,
            neighborhood,
            photo: state.clientFormPhoto || existingPhoto,
        };
        saveAllData();
        state.clientFormPhoto = null;
        alert('Cliente atualizado com sucesso!');
        state.isSubmitting = false;
        navigate('clientDetails', {
            clientId: clientId
        });
    }, 50);
}

function deleteClient(clientId) {
    showConfirmation('Tem certeza que deseja excluir este cliente? Todas as vendas e parcelas associadas também serão removidas. Esta ação não pode ser desfeita.', () => {
        clients = clients.filter(c => c.id !== clientId);
        sales = sales.filter(s => s.clientId !== clientId);
        installments = installments.filter(i => i.clientId !== clientId);
        payments = payments.filter(p => p.clientId !== clientId);
        saveAllData();
        if (state.currentView === 'clientDetails' && state.selectedClientId === clientId) {
            navigate('clients');
        } else {
            render();
        }
    });
}

function addProduct(event) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const priceStr = (form.elements.namedItem('price') as HTMLInputElement).value.replace(',', '.');
        const price = parseFloat(priceStr);
        const newProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        const newProductCode = `PROD${newProductId.toString().padStart(3, '0')}`;
        const newProduct = {
            id: newProductId,
            name,
            code: newProductCode,
            price,
            photo: state.productFormPhoto,
        };
        products.unshift(newProduct);
        saveAllData();
        state.productFormPhoto = null;
        alert('Produto cadastrado com sucesso!');
        state.isSubmitting = false;
        navigate('products');
    }, 50);
}

function updateProduct(event, productId) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();
    
    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const priceStr = (form.elements.namedItem('price') as HTMLInputElement).value.replace(',', '.');
        const price = parseFloat(priceStr);
        const productIndex = products.findIndex(p => p.id === productId);
        if (productIndex === -1) {
            alert('Produto não encontrado!');
            state.isSubmitting = false;
            navigate('products');
            return;
        }
        const existingPhoto = products[productIndex].photo;
        products[productIndex] = {
            ...products[productIndex],
            name,
            price,
            photo: state.productFormPhoto || existingPhoto,
        };
        saveAllData();
        state.productFormPhoto = null;
        alert('Produto atualizado com sucesso!');
        state.isSubmitting = false;
        navigate('products');
    }, 50);
}

function deleteProduct(productId) {
    showConfirmation('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.', () => {
        products = products.filter(p => p.id !== productId);
        saveAllData();
        render();
    });
}

function addSeller(event) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();
    
    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
        const commissionRateStr = (form.elements.namedItem('commissionRate') as HTMLInputElement).value.replace(',', '.');
        const commissionRate = parseFloat(commissionRateStr);
        const newSellerId = sellers.length > 0 ? Math.max(...sellers.map(s => s.id)) + 1 : 1;
        const newSeller = {
            id: newSellerId,
            name,
            phone,
            commissionRate,
            photo: state.sellerFormPhoto
        };
        sellers.unshift(newSeller);
        saveAllData();
        state.sellerFormPhoto = null;
        alert('Vendedor cadastrado com sucesso!');
        state.isSubmitting = false;
        navigate('sellers');
    }, 50);
}

function updateSeller(event, sellerId) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
        const commissionRateStr = (form.elements.namedItem('commissionRate') as HTMLInputElement).value.replace(',', '.');
        const commissionRate = parseFloat(commissionRateStr);
        const sellerIndex = sellers.findIndex(s => s.id === sellerId);
        if (sellerIndex === -1) {
            alert('Vendedor não encontrado!');
            state.isSubmitting = false;
            navigate('sellers');
            return;
        }
        const existingPhoto = sellers[sellerIndex].photo;
        sellers[sellerIndex] = {
            ...sellers[sellerIndex],
            name,
            phone,
            commissionRate,
            photo: state.sellerFormPhoto || existingPhoto
        };
        saveAllData();
        state.sellerFormPhoto = null;
        alert('Vendedor atualizado com sucesso!');
        state.isSubmitting = false;
        navigate('sellerDetails', {
            sellerId: sellerId
        });
    }, 50);
}

function deleteSeller(sellerId) {
    showConfirmation('Tem certeza que deseja excluir este vendedor? Suas vendas registradas não serão removidas. Esta ação não pode ser desfeita.', () => {
        sellers = sellers.filter(s => s.id !== sellerId);
        saveAllData();
        navigate('sellers');
    });
}

function addExpense(event) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        const form = event.target as HTMLFormElement;
        if (!validateForm(form)) {
            state.isSubmitting = false;
            render();
            return;
        }
        const description = (form.elements.namedItem('description') as HTMLInputElement).value.trim();
        const amountStr = (form.elements.namedItem('amount') as HTMLInputElement).value.replace(',', '.');
        const amount = parseFloat(amountStr);
        const category = (form.elements.namedItem('category') as HTMLSelectElement).value;
        const newExpense = {
            id: expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1,
            description,
            amount,
            category,
            expenseDate: new Date().toISOString().split('T')[0]
        };
        expenses.unshift(newExpense);
        saveAllData();
        state.isSubmitting = false;
        navigate('cashRegister');
    }, 50);
}

function showConfirmation(message, onConfirm) {
    state.confirmationDialog = {
        message,
        onConfirm
    };
    render();
}

function hideConfirmation() {
    state.confirmationDialog = null;
    render();
}

function confirmAction() {
    if (state.confirmationDialog && state.confirmationDialog.onConfirm) {
        const onConfirmCallback = state.confirmationDialog.onConfirm;
        // Hide the dialog before running the callback to prevent issues
        // if the callback errors or navigates away.
        hideConfirmation();
        onConfirmCallback();
    }
}

function showRescheduleDialog(installmentId) {
    const installment = installments.find(i => i.id === installmentId);
    if (installment) {
        state.formErrors = {};
        state.rescheduleDialog = {
            installmentId,
            newDueDate: installment.dueDate,
        };
        render();
    }
}

function hideRescheduleDialog() {
    state.rescheduleDialog = null;
    render();
}

function confirmReschedule() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        if (!state.rescheduleDialog) {
            state.isSubmitting = false;
            render();
            return;
        }
        const {
            installmentId,
            newDueDate
        } = state.rescheduleDialog;
        const dateError = validateField('newDueDate', newDueDate);
        if (dateError) {
            state.formErrors['newDueDate'] = dateError;
            state.isSubmitting = false;
            render();
            return;
        }
        const installmentIndex = installments.findIndex(i => i.id === installmentId);
        if (installmentIndex > -1 && newDueDate) {
            installments[installmentIndex].dueDate = newDueDate;
            const todayStr = new Date().toISOString().split('T')[0];
            if (installments[installmentIndex].status === 'late' && newDueDate >= todayStr) {
                installments[installmentIndex].status = 'due';
            }
            generateNotifications();
            saveAllData();
        }
        state.isSubmitting = false;
        hideRescheduleDialog();
    }, 50);
}

function showAdjustInstallmentDialog(installmentId) {
    const installment = installments.find(i => i.id === installmentId);
    if (installment) {
        state.formErrors = {};
        state.adjustInstallmentDialog = {
            installmentId,
            newAmountPaid: installment.value.toString().replace('.', ','),
        };
        render();
    }
}

function hideAdjustInstallmentDialog() {
    state.adjustInstallmentDialog = null;
    render();
}

function confirmInstallmentAdjustment() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        if (!state.adjustInstallmentDialog) {
            state.isSubmitting = false;
            render();
            return;
        }
        const {
            installmentId,
            newAmountPaid
        } = state.adjustInstallmentDialog;
        const amountError = validateField('newAmountPaid', newAmountPaid);
        if (amountError) {
            state.formErrors['newAmountPaid'] = amountError;
            state.isSubmitting = false;
            render();
            return;
        }
        const newAmount = parseFloat(newAmountPaid.replace(',', '.'));
        const installmentIndex = installments.findIndex(i => i.id === installmentId);
        if (installmentIndex === -1) {
            alert('Parcela não encontrada.');
            state.adjustInstallmentDialog = null;
            state.isSubmitting = false;
            render();
            return;
        }
        const currentInstallment = installments[installmentIndex];
        const originalValue = currentInstallment.value;
        const difference = originalValue - newAmount;

        payments.unshift({
            id: payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1,
            clientId: currentInstallment.clientId,
            installmentId: currentInstallment.id,
            amount: newAmount,
            paymentDate: new Date().toISOString().split('T')[0]
        });
        installments[installmentIndex].status = 'paid';

        if (Math.abs(difference) > 0.001) {
            const allUnpaid = installments.map((inst, index) => ({ ...inst,
                    originalIndex: index
                }))
                .filter(i => i.clientId === currentInstallment.clientId && i.status !== 'paid' && i.id !== currentInstallment.id)
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

            if (allUnpaid.length > 0) {
                const nextInstallment = allUnpaid[0];
                const nextInstallmentIndex = nextInstallment.originalIndex;
                const adjustedValue = installments[nextInstallmentIndex].value + difference;
                installments[nextInstallmentIndex].value = parseFloat(adjustedValue.toFixed(2));
            } else if (difference > 0) {
                let lastInstallmentId = installments.length > 0 ? Math.max(...installments.map(i => i.id)) : 0;
                const newDueDate = new Date(currentInstallment.dueDate);
                newDueDate.setUTCDate(newDueDate.getUTCDate() + 30);
                const newInstallment = {
                    id: ++lastInstallmentId,
                    saleId: currentInstallment.saleId,
                    clientId: currentInstallment.clientId,
                    value: parseFloat(difference.toFixed(2)),
                    dueDate: newDueDate.toISOString().split('T')[0],
                    status: 'due'
                };
                installments.push(newInstallment);
            }
        }

        const client = clients.find(c => c.id === currentInstallment.clientId);
        const today = new Date().toISOString().split('T')[0];
        const outstandingBalance = installments
            .filter(i => i.clientId === currentInstallment.clientId && (i.status === 'due' || i.status === 'late'))
            .reduce((sum, i) => sum + i.value, 0);

        let receiptText = `*${settings.headerTitle}*\n`;
        receiptText += `*Comprovante de Pagamento*\n\n`;
        receiptText += `*Cliente:* ${client?.name || 'Não identificado'}\n`;
        receiptText += `*Data do Pagamento:* ${formatDate(today)}\n\n`;
        receiptText += `*Valor Pago:* ${formatCurrency(newAmount)}\n`;
        receiptText += `*Referente à parcela com vencimento em:* ${formatDate(currentInstallment.dueDate)}\n`;
        receiptText += `\n*Saldo Devedor Atual:* ${formatCurrency(outstandingBalance)}\n`;
        receiptText += `\nAgradecemos o seu pagamento!`;

        const clientId = currentInstallment.clientId;
        state.adjustInstallmentDialog = null;

        state.receiptDialog = {
            title: 'Pagamento Registrado!',
            text: receiptText,
            onClose: () => navigate('clientDetails', {
                clientId: clientId
            })
        };

        generateNotifications();
        saveAllData();
        state.isSubmitting = false;
        render();
    }, 50);
}
function startNewSale() {
    state.currentSale = {
        clientId: null,
        sellerId: null,
        products: [],
        installments: 1,
        total: 0,
        clientSearchTerm: '',
        sellerSearchTerm: '',
        productSearchTerm: '',
        paymentMethod: 'parcelado',
        installmentMode: 'count',
        installmentValueInput: '',
    };
    navigate('newSaleClient');
}
function selectClientForSale(clientId) { state.currentSale.clientId = clientId; navigate('newSaleSeller'); }
function selectSellerForSale(sellerId) { state.currentSale.sellerId = sellerId; navigate('newSaleProducts'); }
function skipSellerSelection() { state.currentSale.sellerId = null; navigate('newSaleProducts'); }
function generateProductListForSaleHTML() {
    const { products: saleProducts, productSearchTerm } = state.currentSale;
    const searchTerm = productSearchTerm.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm) || product.code.toLowerCase().includes(searchTerm));
    const productItems = filteredProducts.map(product => {
        const itemInSale = saleProducts.find(p => p.productId === product.id);
        const quantity = itemInSale ? itemInSale.quantity : 0;
        const displayPrice = itemInSale ? itemInSale.salePrice : product.price;

        return `
            <div class="card">
                ${product.photo ? `<img src="${product.photo}" alt="${product.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">inventory_2</span></div>`}
                <div class="card-content">
                    <h3 class="card-title">${product.name}</h3>
                    <div class="price-line">
                        <p class="card-subtitle">${formatCurrency(displayPrice)}</p>
                        ${quantity > 0 ? `<span class="material-icons edit-price-icon" onclick="window.app.showEditSalePriceDialog(${product.id})">edit</span>` : ''}
                    </div>
                </div>
                <div class="quantity-controls">
                    <button onclick="window.app.updateSaleProductQuantity(${product.id}, -1)" ${quantity === 0 ? 'disabled' : ''}>-</button>
                    <span>${quantity}</span>
                    <button onclick="window.app.updateSaleProductQuantity(${product.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');
    return productItems.length > 0 ? productItems : '<p style="text-align:center;padding:1rem;">Nenhum produto encontrado.</p>';
}
function renderFilteredProductListForSale() { const container = document.getElementById('sale-product-list'); if (container) { container.innerHTML = generateProductListForSaleHTML(); } }
function updateSaleFooter() {
    const { total } = state.currentSale;
    // Fix: Cast the selected element to HTMLButtonElement to access the 'disabled' property.
    const advanceButton = document.querySelector('.btn-sale-next') as HTMLButtonElement;
    if (advanceButton) {
        advanceButton.disabled = total === 0;
    }
}
function showEditSalePriceDialog(productId) {
    const productInSale = state.currentSale.products.find(p => p.productId === productId);
    if (productInSale) {
        state.formErrors = {};
        state.editSalePriceDialog = {
            productId: productId,
            productName: productInSale.name,
            newPrice: productInSale.salePrice.toString().replace('.', ','),
        };
        render();
    }
}
function hideEditSalePriceDialog() {
    state.editSalePriceDialog = null;
    render();
}
function confirmSalePriceEdit() {
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        if (!state.editSalePriceDialog) {
            state.isSubmitting = false;
            render();
            return;
        }
        const { productId, newPrice } = state.editSalePriceDialog;
        const priceError = validateField('newPrice', newPrice);
        if (priceError) {
            state.formErrors['newPrice'] = priceError;
            state.isSubmitting = false;
            render();
            return;
        }
        const price = parseFloat(newPrice.replace(',', '.'));
        const productIndex = state.currentSale.products.findIndex(p => p.productId === productId);
        if (productIndex > -1) {
            state.currentSale.products[productIndex].salePrice = price;
        }
        state.currentSale.total = state.currentSale.products.reduce((sum, p) => sum + (p.salePrice * p.quantity), 0);
        state.isSubmitting = false;
        hideEditSalePriceDialog();
        renderFilteredProductListForSale();
        updateSaleFooter();
    }, 50);
}

// --- Search & Filter ---
function toggleAdvancedSearch(type, isOpen) {
    state.advancedSearch[type].isOpen = isOpen;
    render();
}
function handleAdvancedSearchInput(event, type) {
    const { name, value } = event.target;
    state.advancedSearch[type][name] = value;
    renderDialogs();
}
function applyAdvancedSearch(type) {
    state.advancedSearch[type].isOpen = false;
    render();
}
function clearAdvancedSearch(type) {
    if (type === 'clients') {
        state.advancedSearch.clients = {
            ...state.advancedSearch.clients,
            name: '',
            cpf: '',
            neighborhood: '',
            sortBy: 'name',
            sortOrder: 'asc'
        };
    } else if (type === 'products') {
        state.advancedSearch.products = {
            ...state.advancedSearch.products,
            name: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'name',
            sortOrder: 'asc'
        };
    }
    renderDialogs();
}
function handleClientListSearch(event) {
    state.clientListSearchTerm = event.target.value;
    renderClientList();

    const clientCountTag = document.querySelector('.client-count-tag');
    if (clientCountTag) {
        const count = getFilteredClients().length;
        const countText = `${count} cliente${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
        clientCountTag.textContent = countText;
    }
}
function handleProductListSearch(event) {
    state.productListSearchTerm = event.target.value;
    render();
}
function handleSellerListSearch(event) {
    state.sellerListSearchTerm = event.target.value;
    render();
}
function handleNewSaleClientSearch(event) {
    state.currentSale.clientSearchTerm = event.target.value;
    renderNewSaleClientList();
}
function handleNewSaleSellerSearch(event) {
    state.currentSale.sellerSearchTerm = event.target.value;
    renderNewSaleSellerList();
}
function handleProductSearch(event) { state.currentSale.productSearchTerm = event.target.value; renderFilteredProductListForSale(); }
function updateSaleProductQuantity(productId, change) {
    const existingProduct = state.currentSale.products.find(p => p.productId === productId);
    if (existingProduct) {
        existingProduct.quantity += change;
        if (existingProduct.quantity <= 0) {
            state.currentSale.products = state.currentSale.products.filter(p => p.productId !== productId);
        }
    } else if (change > 0) {
        const product = products.find(p => p.id === productId);
        if (product) {
            state.currentSale.products.push({
                productId: product.id,
                quantity: 1,
                name: product.name,
                price: product.price,
                salePrice: product.price
            });
        }
    }
    state.currentSale.total = state.currentSale.products.reduce((sum, p) => sum + (p.salePrice * p.quantity), 0);
    renderFilteredProductListForSale();
    updateSaleFooter();
}
function updateInstallmentCount(event) { handleFormInput(event); const value = parseInt(event.target.value); if (value > 0) { state.currentSale.installments = value; render(); }  }
function updateSalePaymentMethod(event) {
    const newMethod = event.target.value;
    state.currentSale.paymentMethod = newMethod;

    const singlePaymentMethods = ['credito', 'debito', 'a_vista'];
    if (singlePaymentMethods.includes(newMethod)) {
        state.currentSale.installments = 1;
        state.formData.installments = '1';
    }
    
    render(); 
}
function setInstallmentMode(mode) {
    state.currentSale.installmentMode = mode;
    // Reset values when switching to avoid confusion
    if (mode === 'count') {
        state.currentSale.installments = 1;
        state.currentSale.installmentValueInput = '';
    } else {
        state.currentSale.installments = 0;
        state.currentSale.installmentValueInput = '';
    }
    state.formErrors = {}; // Clear errors
    render();
}

function updateInstallmentValue(event) {
    const value = event.target.value;
    state.currentSale.installmentValueInput = value;
    handleFormInput(event); // To store in formData

    const parsedValue = parseFloat(value.replace(',', '.'));
    const { total } = state.currentSale;

    if (!isNaN(parsedValue) && parsedValue > 0 && total > 0) {
        const numInstallments = Math.ceil(total / parsedValue);
        state.currentSale.installments = numInstallments;
    } else {
        state.currentSale.installments = 0;
    }
    render(); // Re-render to show the calculated result
}
function confirmSale(event) {
    event.preventDefault();
    if (state.isSubmitting) return;
    state.isSubmitting = true;
    render();

    setTimeout(() => {
        const { clientId, sellerId, products: saleProducts, total, installments: numInstallments, paymentMethod, installmentMode, installmentValueInput } = state.currentSale;
        if (!clientId || saleProducts.length === 0) {
            alert('Selecione um cliente e adicione produtos para continuar.');
            state.isSubmitting = false;
            render();
            return;
        }
        
        let formIsValid = true;
        state.formErrors = {}; // Clear previous errors
        const fieldToValidate = installmentMode === 'count' ? 'installments' : 'installmentValue';
        const valueToValidate = installmentMode === 'count' ? String(numInstallments) : installmentValueInput;

        const installmentError = validateField(fieldToValidate, valueToValidate);

        if (installmentError) {
            state.formErrors[fieldToValidate] = installmentError;
            formIsValid = false;
        } else if (numInstallments <= 0) {
            state.formErrors[fieldToValidate] = 'O valor da parcela resulta em 0 parcelas.';
            formIsValid = false;
        }

        if (!formIsValid) {
            state.isSubmitting = false;
            render();
            return;
        }

        let seller = null;
        let commissionAmount = 0;
        
        if (sellerId) {
            seller = sellers.find(s => s.id === sellerId);
            if (!seller) {
                alert('Vendedor selecionado não foi encontrado. A venda não pode ser concluída.');
                state.isSubmitting = false;
                render();
                return;
            }
            commissionAmount = total * (seller.commissionRate / 100);
        }

        const newSaleId = sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 1;
        const newSale = {
            id: newSaleId,
            clientId: clientId,
            sellerId: sellerId,
            totalValue: total,
            commissionAmount: commissionAmount,
            saleDate: new Date().toISOString().split('T')[0],
            products: saleProducts.map(p => ({
                productId: p.productId,
                quantity: p.quantity,
                unitPrice: p.salePrice
            })),
            paymentMethod: paymentMethod,
        };
        sales.push(newSale);
        
        const singlePaymentMethods = ['credito', 'debito', 'a_vista'];
        const isSinglePayment = singlePaymentMethods.includes(paymentMethod);

        const installmentValue = parseFloat((total / numInstallments).toFixed(2));
        let lastInstallmentId = installments.length > 0 ? Math.max(...installments.map(i => i.id)) : 0;
        
        for (let i = 1; i <= numInstallments; i++) {
            const todayStr = new Date().toISOString().split('T')[0];
            const newInstallment = {
                id: ++lastInstallmentId,
                saleId: newSaleId,
                clientId: clientId,
                value: installmentValue,
                dueDate: isSinglePayment ? todayStr : getFutureDate(i * 30),
                status: isSinglePayment ? 'paid' : 'due',
                paymentMethod: paymentMethod,
            };
            installments.unshift(newInstallment);

            if (isSinglePayment) {
                payments.unshift({
                    id: payments.length > 0 ? Math.max(...payments.map(p => p.id)) + 1 : 1,
                    clientId: newInstallment.clientId,
                    installmentId: newInstallment.id,
                    amount: newInstallment.value,
                    paymentDate: todayStr
                });
            }
        }

        const client = clients.find(c => c.id === clientId);
        const today = new Date().toISOString().split('T')[0];
        const newInstallmentsForReceipt = installments.filter(i => i.saleId === newSaleId)
            .sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        let receiptText = `*${settings.headerTitle}*\n`;
        receiptText += `*Comprovante de Venda*\n\n`;
        receiptText += `*Cliente:* ${client?.name || 'Não identificado'}\n`;
        if (seller) {
            receiptText += `*Vendedor:* ${seller.name}\n`;
        }
        receiptText += `*Data:* ${formatDate(today)}\n\n`;
        receiptText += `*Produtos:*\n`;
        saleProducts.forEach(p => {
            receiptText += `- ${p.quantity}x ${p.name} (${formatCurrency(p.salePrice)}) = ${formatCurrency(p.quantity * p.salePrice)}\n`;
        });
        receiptText += `\n*Total da Venda:* ${formatCurrency(total)}\n`;

        const paymentLabels = {
            'parcelado': 'Parcelado',
            'mumbuca': 'Mumbuca Parcelado',
            'credito': 'Cartão de Crédito',
            'debito': 'Cartão de Débito',
            'a_vista': 'À Vista'
        };
        receiptText += `*Forma de Pagamento:* ${paymentLabels[paymentMethod] || 'Padrão'}\n`;

        if (numInstallments > 1) {
            receiptText += `\n*Parcelamento (${numInstallments}x):*\n`;
            newInstallmentsForReceipt.forEach(inst => {
                receiptText += `- Parcela de ${formatCurrency(inst.value)} com venc. em ${formatDate(inst.dueDate)}\n`;
            });
        }
        receiptText += `\nObrigado pela sua compra!`;

        state.receiptDialog = {
            title: 'Venda Registrada!',
            text: receiptText,
            onClose: () => navigate('clientDetails', { clientId: clientId })
        };
        saveAllData();
        state.isSubmitting = false;
        render();
    }, 50);
}
function exportData() { const data = { clients, products, sales, installments, payments, expenses, sellers, advances }; const dataStr = JSON.stringify(data, null, 2); const blob = new Blob([dataStr], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'dados_sgc_litos.json'; a.click(); URL.revokeObjectURL(url); }
function triggerImport() { document.getElementById('import-file-input')?.click(); }
function importData(event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result;
            if (typeof text === 'string') {
                const importedData = JSON.parse(text);
                if (!Array.isArray(importedData.clients) && !Array.isArray(importedData.products)) {
                    throw new Error("O arquivo não parece ser um backup válido.");
                }
                const dataToLoad = { clients: Array.isArray(importedData.clients) ? importedData.clients : [], products: Array.isArray(importedData.products) ? importedData.products : [], sales: Array.isArray(importedData.sales) ? importedData.sales : [], installments: Array.isArray(importedData.installments) ? importedData.installments : [], payments: Array.isArray(importedData.payments) ? importedData.payments : [], expenses: Array.isArray(importedData.expenses) ? importedData.expenses : [], sellers: Array.isArray(importedData.sellers) ? importedData.sellers : [], advances: Array.isArray(importedData.advances) ? importedData.advances : [] };
                showConfirmation('Tem certeza que deseja importar estes dados? TODOS OS DADOS ATUAIS SERÃO SUBSTITUAÍDOS.', () => { clients = dataToLoad.clients; products = dataToLoad.products; sales = dataToLoad.sales; installments = dataToLoad.installments; payments = dataToLoad.payments; expenses = dataToLoad.expenses; sellers = dataToLoad.sellers; advances = dataToLoad.advances; saveAllData(); alert('Dados importados com sucesso!'); navigate('home'); });
            }
        } catch (error) {
            alert("Erro ao ler o arquivo. Certifique-se de que é um arquivo JSON válido.");
        } finally {
            input.value = '';
        }
    };
    reader.readAsText(file);
}
function clearAllData() { showConfirmation('Tem certeza que deseja apagar TODOS os dados do aplicativo? Esta ação é irreversível.', () => { clients = []; products = []; sales = []; installments = []; payments = []; expenses = []; sellers = []; advances = []; saveAllData(); alert('Todos os dados foram apagados com sucesso!'); navigate('home'); }); }
const REQUIRED_CLIENT_FIELDS = { name: { label: 'Nome Completo', aliases: ['nome', 'cliente', 'razao social', 'name', 'nome completo'] }, cpf: { label: 'CPF/CNPJ', aliases: ['cpf', 'cnpj', 'documento', 'cpf/cnpj'] }, address: { label: 'Endereço', aliases: ['endereco', 'endereço', 'rua', 'logouro', 'address'] }, phone: { label: 'Telefone', aliases: ['telefone', 'fone', 'celular', 'phone'] }, neighborhood: { label: 'Bairro', aliases: ['bairro', 'neighborhood'] }, }; const REQUIRED_PRODUCT_FIELDS = { name: { label: 'Nome do Produto', aliases: ['nome', 'produto', 'descricao', 'name', 'descrição'] }, price: { label: 'Preço', aliases: ['preco', 'preço', 'valor', 'price'] }, }; function normalizeString(str) { return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim(); } function showImportDialog(type) { state.importDialog = { type, step: 'upload', hasHeader: true }; render(); } function hideImportDialog() { state.importDialog = null; render(); } function downloadCSVTemplate(type) { let headers, rows, filename; if (type === 'clients') { headers = 'name,cpf,address,phone,neighborhood'; rows = '"Maria Silva","123.456.789-00","Rua das Amoras, 789","(11) 98765-4321","Centro"'; filename = 'modelo_clientes.csv'; } else { headers = 'name,price'; rows = '"Produto Exemplo","49,90"'; filename = 'modelo_produtos.csv'; } const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`; const encodedUri = encodeURI(csvContent); const link = document.createElement('a'); link.setAttribute('href', encodedUri); link.setAttribute('download', filename); document.body.appendChild(link); link.click(); document.body.removeChild(link); }
function generateHeadersAndMapping() { if (!state.importDialog || !state.importDialog.fileContent) return; const { fileContent, hasHeader, type } = state.importDialog; const lines = fileContent.split('\n').filter(line => line.trim() !== ''); if (lines.length === 0) return; const requiredFields = type === 'clients' ? REQUIRED_CLIENT_FIELDS : REQUIRED_PRODUCT_FIELDS; let headers = []; if (hasHeader) { headers = lines[0].split(',').map(h => h.trim()); } else { const firstLine = lines[0].split(','); headers = firstLine.map((_, index) => `Coluna ${index + 1}`); } const mapping = {}; Object.keys(requiredFields).forEach(fieldKey => { const fieldInfo = requiredFields[fieldKey]; const normalizedFieldAliases = fieldInfo.aliases.map(normalizeString); const foundHeader = headers.find(header => normalizedFieldAliases.includes(normalizeString(header))); mapping[fieldKey] = foundHeader || 'nao_mapear'; }); state.importDialog.headers = headers; state.importDialog.mapping = mapping; render(); }
function handleImportFileSelect(event) { if (!state.importDialog) return; const input = event.target as HTMLInputElement; if (!input.files || input.files.length === 0) return; const file = input.files[0]; state.importDialog.file = file; const reader = new FileReader(); reader.onload = (e) => { const text = e.target?.result; state.importDialog.fileContent = text; state.importDialog.step = 'mapping'; generateHeadersAndMapping(); }; reader.readAsText(file); }
function handleHeaderCheckbox(event) { if (!state.importDialog) return; const checkbox = event.target as HTMLInputElement; state.importDialog.hasHeader = checkbox.checked; if (state.importDialog.fileContent) { generateHeadersAndMapping(); } }
function handleMappingChange(event, field) { if (!state.importDialog || !state.importDialog.mapping) return; const select = event.target; state.importDialog.mapping[field] = select.value; }
// Fix: Type `record` as any to allow dynamic property assignment during CSV parsing.
function processImportedData() { if (!state.importDialog || !state.importDialog.mapping || !state.importDialog.fileContent) return; const { type, mapping, fileContent, hasHeader } = state.importDialog; const lines = fileContent.split('\n').filter(line => line.trim() !== ''); const dataStartIndex = hasHeader ? 1 : 0; const requiredFields = type === 'clients' ? REQUIRED_CLIENT_FIELDS : REQUIRED_PRODUCT_FIELDS; const invertedMapping = {}; Object.keys(mapping).forEach(field => { const header = mapping[field]; if (header !== 'nao_mapear') { invertedMapping[header] = field; } }); const parsedData = []; const errorRows = []; for (let i = dataStartIndex; i < lines.length; i++) { const values = lines[i].split(','); const record: any = {}; state.importDialog.headers?.forEach((header, index) => { const field = invertedMapping[header]; if (field) { record[field] = values[index]?.trim() || ''; } }); let valid = true; Object.keys(requiredFields).forEach(fieldKey => { if (!record[fieldKey]) { valid = false; } }); if (valid) { if (type === 'products' && record.price) { record.price = parseFloat(record.price.replace(',', '.')); if (isNaN(record.price)) { errorRows.push(i + 1); } } parsedData.push(record); } else { errorRows.push(i + 1); } } state.importDialog.parsedData = parsedData; state.importDialog.errorRows = errorRows; state.importDialog.errorMessage = errorRows.length > 0 ? `Atenção: ${errorRows.length} linha(s) não puderam ser importadas por falta de dados. Linhas: ${errorRows.join(', ')}.` : ''; render(); }
function finalizeImport() { if (!state.importDialog || !state.importDialog.parsedData) return; const { type, parsedData } = state.importDialog; if (type === 'clients') { let lastClientId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) : 0; const newClients = parsedData.map(c => ({ id: ++lastClientId, name: c.name, cpf: c.cpf, address: c.address, phone: c.phone, neighborhood: c.neighborhood, code: lastClientId.toString(), photo: null })); clients = [...newClients, ...clients]; saveAllData(); alert(`${newClients.length} clientes importados com sucesso!`); } else { let lastProductId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0; const newProducts = parsedData.map(p => ({ id: ++lastProductId, name: p.name, price: p.price, code: `PROD${lastProductId.toString().padStart(3, '0')}`, photo: null })); products = [...newProducts, ...products]; saveAllData(); alert(`${newProducts.length} produtos importados com sucesso!`); } hideImportDialog(); }

// --- Receipt and Sharing Functions ---
async function shareReceipt() {
    if (!state.receiptDialog || state.isSharing) return;

    state.isSharing = true;
    renderDialogs();

    const shareData = {
        title: state.receiptDialog.title,
        text: state.receiptDialog.text,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for desktop browsers
            await navigator.clipboard.writeText(shareData.text);
            alert('Comprovante copiado para a área de transferência!');
        }
    } catch (err) {
        // Avoid logging the AbortError which happens when the user cancels the share.
        if (err.name !== 'AbortError') {
             console.error('Error sharing receipt:', err);
        }
    } finally {
        state.isSharing = false;
        // Automatically close the dialog after the share attempt.
        // This prevents users from trying to share again while the browser might still
        // be processing the previous request, and provides a smoother user flow.
        hideReceiptDialog();
    }
}

async function shareProduct(productId) {
    if (state.isSharing) return;
    state.isSharing = true;
    render(); // Re-render to show disabled button

    const product = products.find(p => p.id === productId);
    if (!product) {
        alert('Produto não encontrado.');
        state.isSharing = false;
        render();
        return;
    }

    const shareText = `Olá! Confira este produto que pode te interessar:\n\n*${product.name}*\n*Preço:* ${formatCurrency(product.price)}\n\n_Enviado por ${settings.headerTitle}_`;
    
    const shareData = {
        title: `Confira: ${product.name}`,
        text: shareText,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(shareText);
            alert('Informações do produto copiadas para a área de transferência!');
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
             console.error('Error sharing product:', err);
        }
    } finally {
        state.isSharing = false;
        render(); // Re-render to re-enable button
    }
}

function hideReceiptDialog() {
    const onCloseCallback = state.receiptDialog?.onClose;
    state.receiptDialog = null;

    if (onCloseCallback) {
        onCloseCallback(); // This calls navigate -> render
    } else {
        render(); // Fallback render to ensure dialog is removed
    }
}

function generatePaymentReceiptPDF(paymentId) {
    const payment = payments.find(p => p.id === paymentId);
    const client = clients.find(c => c.id === payment?.clientId);
    const installment = installments.find(i => i.id === payment?.installmentId);

    if (!payment || !client || !installment) {
        alert('Não foi possível gerar o recibo. Dados não encontrados.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    // Header
    if (settings.logoUrl && settings.logoUrl.startsWith('data:image')) {
        try {
            doc.addImage(settings.logoUrl, 'PNG', 15, y - 5, 20, 20);
        } catch(e) { console.error("Erro ao adicionar imagem do logo:", e); }
    }
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(settings.headerTitle, 40, y + 2);
    y += 15;
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    y += 15;

    // Title
    doc.setFontSize(18);
    doc.text('Comprovante de Pagamento', 105, y, { align: 'center' });
    y += 20;

    // Client Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Recebemos de:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.name, 50, y);
    y += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('CPF/CNPJ:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(client.cpf, 50, y);
    y += 15;

    // Payment Details
    doc.setLineWidth(0.2);
    doc.line(15, y, 195, y);
    y += 15;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Data do Pagamento:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(payment.paymentDate), 65, y);
    y += 10;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Valor Pago:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(formatCurrency(payment.amount), 65, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Referente à parcela com vencimento em:', 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formatDate(installment.dueDate), 105, y);
    y += 20;
    
    doc.line(15, y, 195, y);
    y += 20;

    // Footer
    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('Agradecemos a sua preferência!', 105, y, { align: 'center' });

    // Save
    doc.save(`recibo_${client.name.replace(/\s/g, '_')}_${payment.paymentDate}.pdf`);
}

// --- PWA Installation Functions ---
function promptInstall() {
    if (!state.installPromptEvent) return;
    state.installPromptEvent.prompt();
    state.installPromptEvent.userChoice.then(() => {
        state.showInstallBanner = false;
        state.installPromptEvent = null;
        render();
    });
}
function dismissInstallBanner() {
    state.showInstallBanner = false;
    render();
}


// --- Utility Functions ---
function resizeImage(file, maxWidth, maxHeight, quality = 0.85) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
            if (!event.target?.result) {
                return reject(new Error("Não foi possível ler o arquivo."));
            }
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round(height * (maxWidth / width));
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round(width * (maxHeight / height));
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return reject(new Error("Não foi possível obter o contexto do canvas."));
                }
                ctx.drawImage(img, 0, 0, width, height);
                
                const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                const dataUrl = canvas.toDataURL(outputType, quality);
                
                resolve(dataUrl);
            };
            img.onerror = error => reject(error);
        };
        reader.onerror = error => reject(error);
    });
}
function formatCurrency(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function formatDate(dateStr) { const date = new Date(dateStr); const userTimezoneOffset = date.getTimezoneOffset() * 60000; return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR'); }
function getFutureDate(days) { const date = new Date(); date.setDate(date.getDate() + days); return date.toISOString().split('T')[0]; }
async function handlePhotoUpload(type: 'client' | 'product' | 'seller', event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.size > 5 * 1024 * 1024) { // 5MB limit before compression
            alert('A imagem é muito grande. O limite é de 5MB.');
            return;
        }
        try {
            const base64String = await resizeImage(file, 200, 200, 0.85) as string;
            if (base64String) {
                if (type === 'client') {
                    state.clientFormPhoto = base64String;
                } else if (type === 'product') {
                    state.productFormPhoto = base64String;
                } else if (type === 'seller') {
                    state.sellerFormPhoto = base64String;
                }
                render();
            }
        } catch (error) {
            console.error('Erro ao redimensionar a imagem:', error);
            alert('Ocorreu um erro ao processar a imagem. Tente um formato diferente (JPG, PNG).');
        }
    }
}

// --- Photo Source Selection ---
function showPhotoSourceDialog(type: 'client' | 'product' | 'seller') {
    state.photoSourceDialog = { type };
    render();
}

function hidePhotoSourceDialog() {
    state.photoSourceDialog = null;
    render();
}

function triggerFileUpload() {
    if (!state.photoSourceDialog) return;
    const type = state.photoSourceDialog.type;
    const photoInput = document.getElementById('photo-input') as HTMLInputElement;
    if (photoInput) {
        photoInput.removeAttribute('capture');
        photoInput.onchange = (event) => {
            handlePhotoUpload(type, event);
            photoInput.value = ''; // Clear input to allow re-selection of the same file
        };
        photoInput.click();
    }
    hidePhotoSourceDialog();
}

function triggerCameraUpload() {
    if (!state.photoSourceDialog) return;
    const type = state.photoSourceDialog.type;
    const photoInput = document.getElementById('photo-input') as HTMLInputElement;
    if (photoInput) {
        photoInput.setAttribute('capture', 'environment');
        photoInput.onchange = (event) => {
            handlePhotoUpload(type, event);
            photoInput.value = ''; // Clear input
        };
        photoInput.click();
    }
    hidePhotoSourceDialog();
}

// --- Rendering Functions ---
function renderSideMenu() {
    return `
        <div class="side-menu">
            <div class="side-menu-header">
                ${settings.logoUrl ? `<img src="${settings.logoUrl}" class="side-menu-logo" alt="Logo">` : ''}
                <h3>${settings.headerTitle}</h3>
                <p>${settings.appDescription}</p>
            </div>
            <div class="side-menu-links">
                <div class="menu-link" onclick="window.app.navigate('home')"><span class="material-icons">home</span> Início</div>
                <div class="menu-link" onclick="window.app.navigate('dashboard')"><span class="material-icons">summarize</span> Resumo do Dia</div>
                <div class="menu-link" onclick="window.app.navigate('clients')"><span class="material-icons">people</span> Clientes</div>
                <div class="menu-link" onclick="window.app.navigate('sellers')"><span class="material-icons">badge</span> Vendedores</div>
                <div class="menu-link" onclick="window.app.navigate('products')"><span class="material-icons">inventory_2</span> Produtos</div>
                <div class="menu-link" onclick="window.app.navigate('cashRegister')"><span class="material-icons">point_of_sale</span> Caixa</div>
                <div class="menu-link" onclick="window.app.navigate('commissions')"><span class="material-icons">payments</span> Comissões</div>
                <div class="menu-link" onclick="window.app.navigate('reports')"><span class="material-icons">analytics</span> Relatórios</div>
                <div class="menu-link" onclick="window.app.navigate('dailyClients')"><span class="material-icons">today</span> Clientes do Dia</div>
                <div class="menu-link" onclick="window.app.navigate('dataManagement')"><span class="material-icons">folder_managed</span> Gerenciar Dados</div>
                <div class="menu-link" onclick="window.app.navigate('settings')"><span class="material-icons">settings</span> Personalizar</div>
                <div class="menu-link" onclick="window.app.navigate('splash')"><span class="material-icons">exit_to_app</span> Sair</div>
            </div>
        </div>
    `;
}

function renderBottomNav(activeView) {
    const isMainView = ['home', 'clients'].includes(activeView);
    if (!isMainView) return '';
    return `
        <div class="bottom-nav">
            <div class="nav-item ${activeView === 'home' ? 'active' : ''}" onclick="window.app.navigate('home')">
                <span class="material-icons">home</span>
                <span class="nav-label">Início</span>
            </div>
            <div class="nav-item-add" onclick="window.app.startNewSale()">
                <span class="material-icons">add</span>
            </div>
            <div class="nav-item ${activeView === 'clients' ? 'active' : ''}" onclick="window.app.navigate('clients')">
                <span class="material-icons">people</span>
                 <span class="nav-label">Clientes</span>
            </div>
        </div>
    `;
}

function renderSplashScreen() {
    const backgroundStyle = settings.splashImageUrl
        ? `style="background-image: url('${settings.splashImageUrl}');"`
        : '';
        
    return `
        <div class="screen splash-screen" ${backgroundStyle}>
            <div class="splash-overlay"></div>
            <div class="splash-content">
                <h1 class="splash-title">Bem-vindo ao</h1>
                <h2 class="splash-subtitle">${settings.headerTitle}</h2>
                <p class="splash-description">${settings.appDescription}</p>
            </div>
            <div class="splash-footer">
                <button class="btn" onclick="window.app.navigate('home')">Entrar</button>
            </div>
        </div>
    `;
}

function renderHomeScreen() {
    const selectedTheme = THEMES.find(t => t.id === settings.themeId) || THEMES[0];
    const accentColor = selectedTheme.colors.accent;

    const todayStr = new Date().toISOString().split('T')[0];
    const dueInstallmentsToday = installments.filter(inst => inst.dueDate === todayStr && inst.status !== 'paid');
    const clientIdsToday = [...new Set(dueInstallmentsToday.map(inst => inst.clientId))];
    const dailyClientsCount = clientIdsToday.length;

    const homeCards = [
        { title: 'Nova Venda', icon: 'add_shopping_cart', description: 'Registrar uma nova venda.', color: accentColor, action: "window.app.startNewSale()" },
        { title: 'Clientes', icon: 'people', description: 'Gerenciar sua carteira.', color: '#34C759', action: "window.app.navigate('clients')" },
        { title: 'Clientes do Dia', icon: 'today', description: 'Ver parcelas de hoje.', color: '#1E90FF', action: "window.app.navigate('dailyClients')" },
        { title: 'Vendedores', icon: 'badge', description: 'Gerenciar sua equipe.', color: '#5856D6', action: "window.app.navigate('sellers')" },
        { title: 'Caixa do Dia', icon: 'point_of_sale', description: 'Controlar entradas e saídas.', color: '#FF9500', action: "window.app.navigate('cashRegister')" },
        { title: 'Comissões', icon: 'payments', description: 'Valores a pagar.', color: '#00C49F', action: "window.app.navigate('commissions')" },
        { title: 'Relatórios', icon: 'analytics', description: 'Analisar seu desempenho.', color: '#9370DB', action: "window.app.navigate('reports')" },
        { title: 'Produtos', icon: 'inventory_2', description: 'Cadastrar seus itens.', color: '#CD5C5C', action: "window.app.navigate('products')" },
    ];

    const cardsHtml = homeCards.map(card => {
        let countTag = '';
        if (card.title === 'Clientes') {
            countTag = `<div class="home-card-count-tag">${clients.length}</div>`;
        }
         if (card.title === 'Vendedores') {
            countTag = `<div class="home-card-count-tag">${sellers.length}</div>`;
        }
        if (card.title === 'Clientes do Dia' && dailyClientsCount > 0) {
            countTag = `<div class="home-card-count-tag">${dailyClientsCount}</div>`;
        }
        return `
        <div class="home-card" onclick="${card.action}">
            ${countTag}
            <div class="home-card-icon-wrapper" style="background-color: ${card.color}20;">
                <span class="material-icons" style="color: ${card.color};">${card.icon}</span>
            </div>
            <h3>${card.title}</h3>
            <p>${card.description}</p>
        </div>
    `}).join('');
    
    const bannerImageHtml = settings.bannerImageUrl
        ? `<img src="${settings.bannerImageUrl}" class="home-banner-bg-image" alt="Banner do App">`
        : '';

    return `
        <div class="screen home-screen">
            ${renderHeader('', undefined, { icon: 'menu', onClick: 'window.app.toggleSideMenu()'})}
            <div class="content">
                <div class="dashboard-header">
                    <p class="dashboard-subtitle">${settings.welcomeName}</p>
                    <h1 class="dashboard-title">${settings.headerTitle}</h1>
                </div>
                <div class="home-banner">
                    ${bannerImageHtml}
                    <div class="home-banner-overlay"></div>
                    <div class="home-banner-content">
                        <div class="home-banner-text">
                            <h3>Gerencie suas vendas com facilidade!</h3>
                            <p>Tudo o que você precisa em um só lugar.</p>
                        </div>
                    </div>
                </div>
                <div class="home-grid">
                    ${cardsHtml}
                </div>
            </div>
            ${renderBottomNav('home')}
        </div>
    `;
}


function renderDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todaysPayments = payments.filter(p => p.paymentDate === today).reduce((sum, p) => sum + p.amount, 0);

    const recentInstallments = installments
        .filter(i => i.status !== 'paid')
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5);
    
    let recentHtml = recentInstallments.map(inst => {
        const client = clients.find(c => c.id === inst.clientId);
        if (!client) return '';
        return `
            <div class="card" onclick="window.app.navigate('clientDetails', { clientId: ${client.id} })">
                ${client.photo ? `<img src="${client.photo}" alt="${client.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">person</span></div>`}
                <div class="card-content">
                    <h3 class="card-title">${client.name}</h3>
                    <p class="card-subtitle">Vence em: ${formatDate(inst.dueDate)}</p>
                </div>
                <div class="card-amount" style="color: #34C759;">${formatCurrency(inst.value)}</div>
            </div>
        `;
    }).join('');

    if (recentInstallments.length === 0) {
        recentHtml = '<p style="text-align: center; color: var(--color-text-secondary); padding: 1rem;">Nenhuma parcela pendente encontrada.</p>';
    }

    return `
        <div class="screen dashboard-screen">
            ${renderHeader('Resumo do Dia', 'home')}
            <div class="content">
                <div class="dashboard-content-wrapper">
                    <div class="dashboard-summary-card">
                        <span class="material-icons balance-toggle-icon" onclick="window.app.toggleBalanceVisibility()">
                            ${state.isBalanceVisible ? 'visibility_off' : 'visibility'}
                        </span>
                        <p>Recebido Hoje</p>
                        <h2>${state.isBalanceVisible ? formatCurrency(todaysPayments) : '••••••'}</h2>
                    </div>
                    
                    <div class="dashboard-main-content">
                        <h2 class="section-title">Próximos Vencimentos</h2>
                        ${recentHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fix: Make the rightIcon parameter optional to allow calls with 2 arguments.
function renderHeader(title, backView?, rightIcon?) {
    return `
        <header class="header">
            ${backView ? `<span class="material-icons" onclick="window.app.navigate('${backView}')">arrow_back_ios</span>` : `<div style="width: 28px;"></div>`}
            <h1 class="header-title">${title}</h1>
            ${rightIcon ? `<span class="material-icons" onclick="${rightIcon.onClick}">${rightIcon.icon}</span>` : '<div style="width: 28px;"></div>'}
        </header>
    `;
}

function getFilteredClients() {
    const { clientListFilter, clientListSearchTerm } = state;
    const { name, cpf, neighborhood, sortBy, sortOrder } = state.advancedSearch.clients;
    let currentClientList = [...clients];

    // 1. Tab Filters
    const clientsInDebtIds = new Set(installments.filter(i => i.status === 'due' || i.status === 'late').map(i => i.clientId));

    if (clientListFilter === 'inDebt') {
        currentClientList = currentClientList.filter(c => clientsInDebtIds.has(c.id));
    } else if (clientListFilter === 'paidUp') {
        currentClientList = currentClientList.filter(c => !clientsInDebtIds.has(c.id));
    } else if (clientListFilter === 'settled') {
        const clientsWithHistoryIds = new Set(installments.map(i => i.clientId));
        currentClientList = currentClientList.filter(c => clientsWithHistoryIds.has(c.id) && !clientsInDebtIds.has(c.id));
    } else if (clientListFilter === 'mumbuca') {
        const mumbucaClientIds = new Set(
            sales.filter(s => s.paymentMethod === 'mumbuca').map(s => s.clientId)
        );
        currentClientList = currentClientList.filter(c => mumbucaClientIds.has(c.id));
    }

    // 2. Advanced Filters
    if (name.trim()) {
        currentClientList = currentClientList.filter(c => c.name.toLowerCase().includes(name.toLowerCase().trim()));
    }
    if (cpf.trim()) {
        currentClientList = currentClientList.filter(c => c.cpf.toLowerCase().includes(cpf.toLowerCase().trim()));
    }
    if (neighborhood.trim()) {
        currentClientList = currentClientList.filter(c => c.neighborhood.toLowerCase().includes(neighborhood.toLowerCase().trim()));
    }

    // 3. Quick Search Filter
    const searchTerm = clientListSearchTerm.toLowerCase().trim();
    if (searchTerm) {
        currentClientList = currentClientList.filter(c => c.name.toLowerCase().includes(searchTerm) || c.cpf.includes(searchTerm));
    }

    // 4. Sorting
    currentClientList.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === 'createdAt') {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            comparison = dateB - dateA; // Newest first by default, so b - a
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    return currentClientList;
}

function generateClientListHTML() {
    const filteredClients = getFilteredClients();

    const clientListHtml = filteredClients.map(client => `
        <div class="card" onclick="window.app.navigate('clientDetails', { clientId: ${client.id} })">
            ${client.photo ? `<img src="${client.photo}" alt="${client.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">person</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${client.name}</h3>
                <p class="card-subtitle">${client.cpf}</p>
            </div>
        </div>
    `).join('');

    if (filteredClients.length === 0) {
        return '<p style="text-align:center;padding:1rem;color:var(--color-text-secondary);">Nenhum cliente encontrado.</p>';
    }

    return clientListHtml;
}

function renderClientList() {
    const container = document.getElementById('client-list-container');
    if (container) {
        container.innerHTML = generateClientListHTML();
    }
}

function setClientListFilter(filter) {
    state.clientListFilter = filter;
    render();
}

function setClientDetailsTab(tab) {
    state.clientDetailsTab = tab;
    render();
}

function renderClientsScreen() {
    const clientCount = getFilteredClients().length;
    const countText = `${clientCount} cliente${clientCount !== 1 ? 's' : ''} encontrado${clientCount !== 1 ? 's' : ''}`;
    const filters = state.advancedSearch.clients;
    const isFilterActive = filters.name || filters.cpf || filters.neighborhood || filters.sortBy !== 'name' || filters.sortOrder !== 'asc';

    return `
        <div class="screen">
            ${renderHeader('Clientes', 'home', { icon: 'add', onClick: "window.app.navigate('addClient')" })}
            <div class="content">
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar por nome ou CPF..." oninput="window.app.handleClientListSearch(event)" value="${state.clientListSearchTerm}">
                    <button class="filter-btn ${isFilterActive ? 'active' : ''}" onclick="window.app.toggleAdvancedSearch('clients', true)">
                        <span class="material-icons">filter_list</span>
                    </button>
                </div>
                <div class="client-count-tag">${countText}</div>
                <div class="tab-nav">
                    <div class="tab-item ${state.clientListFilter === 'all' ? 'active' : ''}" onclick="window.app.setClientListFilter('all')">Todos</div>
                    <div class="tab-item ${state.clientListFilter === 'inDebt' ? 'active' : ''}" onclick="window.app.setClientListFilter('inDebt')">Em Débito</div>
                    <div class="tab-item ${state.clientListFilter === 'paidUp' ? 'active' : ''}" onclick="window.app.setClientListFilter('paidUp')">Em Dia</div>
                    <div class="tab-item ${state.clientListFilter === 'settled' ? 'active' : ''}" onclick="window.app.setClientListFilter('settled')">Quitados</div>
                    <div class="tab-item ${state.clientListFilter === 'mumbuca' ? 'active' : ''}" onclick="window.app.setClientListFilter('mumbuca')">Mumbuca</div>
                </div>
                <div id="client-list-container">
                    ${generateClientListHTML()}
                </div>
            </div>
            ${renderBottomNav('clients')}
        </div>
    `;
}

function renderClientDetailsScreen() {
    const client = clients.find(c => c.id === state.selectedClientId);
    if (!client) {
        return `
            <div class="screen">
                ${renderHeader('Cliente não encontrado', 'clients')}
                <div class="content"><p>Cliente não encontrado.</p></div>
            </div>
        `;
    }

    // --- Calculations ---
    const clientInstallments = installments.filter(i => i.clientId === client.id)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    
    const outstandingBalance = clientInstallments
        .filter(i => i.status === 'due' || i.status === 'late')
        .reduce((sum, i) => sum + i.value, 0);

    const clientPayments = payments.filter(p => p.clientId === client.id)
        .sort((a, b) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

    const clientSales = sales.filter(s => s.clientId === client.id)
        .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());

    const totalPaid = clientPayments.reduce((sum, p) => sum + p.amount, 0);

    // --- HTML Generation ---
    const installmentsHtml = clientInstallments.length > 0
        ? clientInstallments.map(inst => {
            let paymentMethodText = '';
            if (inst.paymentMethod && inst.paymentMethod !== 'parcelado') {
                 const paymentLabels = {
                    'mumbuca': 'Pagamento via Mumbuca',
                    'credito': 'Pago no Crédito',
                    'debito': 'Pago no Débito',
                    'a_vista': 'Pago à Vista'
                };
                if(paymentLabels[inst.paymentMethod]) {
                    paymentMethodText = `<p class="card-subtitle" style="font-weight: 500; color: var(--color-accent); margin-top: 4px;">${paymentLabels[inst.paymentMethod]}</p>`;
                }
            }
            return `
            <div class="card">
                <div class="card-content">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <h3 class="card-title">Parcela ${formatCurrency(inst.value)}</h3>
                            <p class="card-subtitle">Vencimento: ${formatDate(inst.dueDate)}</p>
                            ${paymentMethodText}
                        </div>
                        <span class="tag ${inst.status}">${inst.status === 'due' ? 'Pendente' : inst.status === 'late' ? 'Atrasada' : 'Paga'}</span>
                    </div>
                    ${inst.status !== 'paid' ? `
                    <div class="card-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="window.app.showAdjustInstallmentDialog(${inst.id})">Pagar</button>
                        <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem;" onclick="window.app.showRescheduleDialog(${inst.id})">Reagendar</button>
                    </div>` : ''}
                </div>
            </div>`}).join('')
        : '<p class="empty-state">Nenhuma parcela encontrada.</p>';
    
    const paymentsHtml = clientPayments.length > 0 ? clientPayments.map(p => `
        <div class="card">
            <div class="card-icon"><span class="material-icons">payment</span></div>
            <div class="card-content">
                <h3 class="card-title">Pagamento Recebido</h3>
                <p class="card-subtitle">Em ${formatDate(p.paymentDate)}</p>
            </div>
            <div class="card-amount" style="color: #34C759;">${formatCurrency(p.amount)}</div>
            <div class="card-actions">
                <button class="btn-icon" onclick="window.app.generatePaymentReceiptPDF(${p.id})" title="Gerar Recibo PDF">
                    <span class="material-icons">picture_as_pdf</span>
                </button>
            </div>
        </div>
    `).join('') : '<p class="empty-state">Nenhum pagamento registrado.</p>';

    const salesHtml = clientSales.length > 0 ? clientSales.map(s => {
        const productSummary = s.products.length > 1 
            ? `${s.products.length} produtos` 
            : products.find(p => p.id === s.products[0]?.productId)?.name || '1 produto';
        return `
            <div class="card">
                <div class="card-icon"><span class="material-icons">shopping_cart</span></div>
                <div class="card-content">
                    <h3 class="card-title">${productSummary}</h3>
                    <p class="card-subtitle">Venda em ${formatDate(s.saleDate)}</p>
                </div>
                <div class="card-amount">${formatCurrency(s.totalValue)}</div>
            </div>
        `;
    }).join('') : '<p class="empty-state">Nenhuma venda registrada.</p>';

    let tabContentHtml = '';
    if (state.clientDetailsTab === 'installments') tabContentHtml = installmentsHtml;
    if (state.clientDetailsTab === 'payments') tabContentHtml = paymentsHtml;
    if (state.clientDetailsTab === 'sales') tabContentHtml = salesHtml;

    return `
        <div class="screen">
            ${renderHeader('Detalhes do Cliente', 'clients')}
            <div class="content">
                <div class="client-details-header">
                    ${client.photo ? `<img src="${client.photo}" alt="${client.name}" class="client-avatar-lg">` : `<div class="client-avatar-lg"><span class="material-icons">person</span></div>`}
                    <h2>${client.name}</h2>
                    <p class="card-subtitle">${client.cpf}</p>
                    <p class="card-subtitle">${client.address}, ${client.neighborhood}</p>
                    <p class="card-subtitle">${client.phone}</p>
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                    <button class="btn" onclick="window.app.navigate('editClient', { clientId: ${client.id} })">Editar</button>
                    <button class="btn btn-secondary" onclick="window.app.deleteClient(${client.id})">Excluir</button>
                </div>
                
                <div class="report-cards-grid" style="margin-bottom: 2rem;">
                     <div class="report-card"><h4>Saldo Devedor</h4><p style="color: #FF3B30;">${formatCurrency(outstandingBalance)}</p></div>
                     <div class="report-card"><h4>Total Pago</h4><p style="color: #34C759;">${formatCurrency(totalPaid)}</p></div>
                </div>

                <div class="tab-nav">
                    <div class="tab-item ${state.clientDetailsTab === 'installments' ? 'active' : ''}" onclick="window.app.setClientDetailsTab('installments')">Parcelas</div>
                    <div class="tab-item ${state.clientDetailsTab === 'payments' ? 'active' : ''}" onclick="window.app.setClientDetailsTab('payments')">Pagamentos</div>
                    <div class="tab-item ${state.clientDetailsTab === 'sales' ? 'active' : ''}" onclick="window.app.setClientDetailsTab('sales')">Vendas</div>
                </div>
                
                <div class="tab-content" style="margin-top: 1.5rem;">
                   ${tabContentHtml}
                </div>
            </div>
        </div>
    `;
}

function renderClientForm(isEdit = false) {
    const client = isEdit ? clients.find(c => c.id === state.selectedClientId) : null;
    if (isEdit && !client) { return renderClientsScreen(); }

    const photoSrc = state.clientFormPhoto || (client ? client.photo : null);
    
    return `
        <div class="screen">
            ${renderHeader(isEdit ? 'Editar Cliente' : 'Novo Cliente', isEdit ? `clientDetails&clientId=${client.id}` : 'clients')}
            <div class="content">
                <form onsubmit="window.app.${isEdit ? `updateClient(event, ${client.id})` : 'addClient(event)'}">
                    <div style="text-align: center; margin-bottom: 2rem;">
                         <label style="cursor:pointer;" onclick="window.app.showPhotoSourceDialog('client')">
                            ${photoSrc ? `<img src="${photoSrc}" class="client-avatar-lg" alt="Foto do cliente">` : `<div class="client-avatar-lg"><span class="material-icons">add_a_photo</span></div>`}
                         </label>
                    </div>
                    <div class="form-group ${state.formErrors.name ? 'has-error' : ''}">
                        <label for="name">Nome Completo</label>
                        <input type="text" id="name" name="name" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.name || ''}">
                        <div class="form-error">${state.formErrors.name || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.cpf ? 'has-error' : ''}">
                        <label for="cpf">CPF/CNPJ</label>
                        <input type="text" id="cpf" name="cpf" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.cpf || ''}">
                        <div class="form-error">${state.formErrors.cpf || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.phone ? 'has-error' : ''}">
                        <label for="phone">Telefone</label>
                        <input type="tel" id="phone" name="phone" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.phone || ''}">
                        <div class="form-error">${state.formErrors.phone || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.address ? 'has-error' : ''}">
                        <label for="address">Endereço</label>
                        <input type="text" id="address" name="address" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.address || ''}">
                        <div class="form-error">${state.formErrors.address || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.neighborhood ? 'has-error' : ''}">
                        <label for="neighborhood">Bairro</label>
                        <input type="text" id="neighborhood" name="neighborhood" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.neighborhood || ''}">
                        <div class="form-error">${state.formErrors.neighborhood || ''}</div>
                    </div>
                    <button type="submit" class="btn" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Cadastrar Cliente')}</button>
                </form>
            </div>
        </div>
    `;
}

function getFilteredSellers() {
    const searchTerm = state.sellerListSearchTerm.toLowerCase().trim();
    if (!searchTerm) return sellers;
    return sellers.filter(s => s.name.toLowerCase().includes(searchTerm));
}

function renderSellersScreen() {
    const filteredSellers = getFilteredSellers();
    const sellersHtml = filteredSellers.map(seller => `
        <div class="card" onclick="window.app.navigate('sellerDetails', { sellerId: ${seller.id} })">
             ${seller.photo ? `<img src="${seller.photo}" alt="${seller.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">badge</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${seller.name}</h3>
                <p class="card-subtitle">${seller.phone}</p>
            </div>
        </div>`).join('');

    return `
        <div class="screen">
            ${renderHeader('Vendedores', 'home', { icon: 'add', onClick: "window.app.navigate('addSeller')" })}
            <div class="content">
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar por nome..." oninput="window.app.handleSellerListSearch(event)" value="${state.sellerListSearchTerm}">
                </div>
                ${sellers.length > 0 ? (sellersHtml.length > 0 ? sellersHtml : '<p class="empty-state">Nenhum vendedor encontrado.</p>') : '<p class="empty-state">Nenhum vendedor cadastrado.</p>'}
            </div>
        </div>
    `;
}

function handleSellerDetailsPeriodChange(period) {
    state.sellerDetailsPeriod = period;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (period === 'day') {
        state.sellerDetailsStartDate = todayStr;
        state.sellerDetailsEndDate = todayStr;
    } else if (period === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 7);
        state.sellerDetailsStartDate = weekAgo.toISOString().split('T')[0];
        state.sellerDetailsEndDate = todayStr;
    } else if (period === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        state.sellerDetailsStartDate = monthAgo.toISOString().split('T')[0];
        state.sellerDetailsEndDate = todayStr;
    }
    render();
}
function handleSellerDetailsDateChange(event) {
    const {name, value} = event.target;
    state[name] = value;
    state.sellerDetailsPeriod = 'custom';
    render();
}

function setSellerDetailsTab(tab) {
    state.sellerDetailsTab = tab;
    render();
}

function renderSellerDetailsScreen() {
    const seller = sellers.find(s => s.id === state.selectedSellerId);
    if (!seller) return `<div class="screen">${renderHeader('Vendedor não encontrado', 'sellers')}<div class="content"><p>Vendedor não encontrado.</p></div></div>`;

    // Gross commission calculation based on filtered dates
    const filteredSales = sales.filter(s => {
        if (s.sellerId !== seller.id) return false;
        const saleDate = new Date(s.saleDate);
        const start = new Date(state.sellerDetailsStartDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(state.sellerDetailsEndDate);
        end.setHours(23, 59, 59, 999);
        return saleDate >= start && saleDate <= end;
    });

    const totalSalesValue = filteredSales.reduce((sum, s) => sum + s.totalValue, 0);
    const totalGrossCommission = filteredSales.reduce((sum, s) => sum + (s.commissionAmount || 0), 0);
    
    // Advances are not filtered by date
    const sellerAdvances = advances.filter(a => a.sellerId === seller.id).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const totalAdvances = sellerAdvances.reduce((sum, a) => sum + a.amount, 0);
    const netCommissionToPay = totalGrossCommission - totalAdvances;

    const salesHtml = filteredSales.length > 0 ? filteredSales.map(s => {
        const client = clients.find(c => c.id === s.clientId);
        return `
            <div class="card" onclick="window.app.navigate('clientDetails', { clientId: ${s.clientId} })">
                <div class="card-icon"><span class="material-icons">shopping_cart</span></div>
                <div class="card-content">
                    <h3 class="card-title">Venda para ${client?.name || 'Cliente'}</h3>
                    <p class="card-subtitle">${formatDate(s.saleDate)} - Comissão: ${formatCurrency(s.commissionAmount || 0)}</p>
                </div>
                <div class="card-amount">${formatCurrency(s.totalValue)}</div>
            </div>
        `;
    }).join('') : '<p class="empty-state">Nenhuma venda encontrada para o período.</p>';

    const advancesHtml = sellerAdvances.length > 0 ? sellerAdvances.map(a => `
        <div class="card">
            <div class="card-icon"><span class="material-icons">request_quote</span></div>
            <div class="card-content">
                <h3 class="card-title">${a.description || 'Vale / Adiantamento'}</h3>
                <p class="card-subtitle">${formatDate(a.date)}</p>
            </div>
            <div class="card-amount" style="color: #FF3B30;">-${formatCurrency(a.amount)}</div>
            <div class="card-actions">
                <button class="btn-icon" onclick="window.app.deleteAdvance(${a.id})" title="Excluir Vale">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </div>
    `).join('') : '<p class="empty-state">Nenhum vale registrado para este vendedor.</p>';
    
    let tabContentHtml = '';
    if (state.sellerDetailsTab === 'sales') {
        tabContentHtml = `
            <div class="tab-nav" style="margin-top: 1.5rem;">
                <div class="tab-item ${state.sellerDetailsPeriod === 'day' ? 'active' : ''}" onclick="window.app.handleSellerDetailsPeriodChange('day')">Hoje</div>
                <div class="tab-item ${state.sellerDetailsPeriod === 'week' ? 'active' : ''}" onclick="window.app.handleSellerDetailsPeriodChange('week')">7 Dias</div>
                <div class="tab-item ${state.sellerDetailsPeriod === 'month' ? 'active' : ''}" onclick="window.app.handleSellerDetailsPeriodChange('month')">Mês</div>
                <div class="tab-item ${state.sellerDetailsPeriod === 'custom' ? 'active' : ''}" onclick="window.app.handleSellerDetailsPeriodChange('custom')">Person.</div>
            </div>
            <div class="date-range-inputs">
                <div class="form-group">
                    <label>Data Inicial</label>
                    <input type="date" name="sellerDetailsStartDate" value="${state.sellerDetailsStartDate}" onchange="window.app.handleSellerDetailsDateChange(event)">
                </div>
                <div class="form-group">
                    <label>Data Final</label>
                    <input type="date" name="sellerDetailsEndDate" value="${state.sellerDetailsEndDate}" onchange="window.app.handleSellerDetailsDateChange(event)">
                </div>
            </div>
            ${salesHtml}
        `;
    } else { // 'advances' tab
        tabContentHtml = `<div style="margin-top: 1.5rem;">${advancesHtml}</div>`;
    }

    return `
        <div class="screen">
            ${renderHeader('Detalhes do Vendedor', 'sellers')}
            <div class="content">
                <div class="client-details-header">
                    ${seller.photo ? `<img src="${seller.photo}" alt="${seller.name}" class="client-avatar-lg">` : `<div class="client-avatar-lg"><span class="material-icons">badge</span></div>`}
                    <h2>${seller.name}</h2>
                    <p class="card-subtitle">${seller.phone}</p>
                    <p class="card-subtitle">Comissão: ${seller.commissionRate}%</p>
                </div>
                <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                    <button class="btn" style="flex:1;" onclick="window.app.navigate('editSeller', { sellerId: ${seller.id} })">Editar</button>
                    <button class="btn btn-secondary" style="flex:1;" onclick="window.app.showAddAdvanceDialog(${seller.id})">Adicionar Vale</button>
                    <button class="btn btn-secondary" style="flex:1;" onclick="window.app.deleteSeller(${seller.id})">Excluir</button>
                </div>
                
                <h2 class="section-title">Desempenho (Comissão no período)</h2>
                <div class="report-cards-grid" style="margin-bottom: 1rem;">
                    <div class="report-card"><h4>Total Vendas</h4><p>${formatCurrency(totalSalesValue)}</p></div>
                    <div class="report-card"><h4>Comissão Bruta</h4><p>${formatCurrency(totalGrossCommission)}</p></div>
                    <div class="report-card"><h4>Total de Vales</h4><p style="color: #FF3B30;">${formatCurrency(totalAdvances)}</p></div>
                    <div class="report-card"><h4>A Pagar no Período</h4><p style="color: ${netCommissionToPay >= 0 ? 'var(--color-accent)' : '#FF3B30'};">${formatCurrency(netCommissionToPay)}</p></div>
                </div>

                <div class="tab-nav">
                    <div class="tab-item ${state.sellerDetailsTab === 'sales' ? 'active' : ''}" onclick="window.app.setSellerDetailsTab('sales')">Vendas</div>
                    <div class="tab-item ${state.sellerDetailsTab === 'advances' ? 'active' : ''}" onclick="window.app.setSellerDetailsTab('advances')">Vales</div>
                </div>

                <div class="tab-content">
                   ${tabContentHtml}
                </div>
            </div>
        </div>
    `;
}


function renderSellerForm(isEdit = false) {
    const seller = isEdit ? sellers.find(s => s.id === state.selectedSellerId) : null;
    if (isEdit && !seller) { return renderSellersScreen(); }

    const photoSrc = state.sellerFormPhoto || (seller ? seller.photo : null);
    
    return `
        <div class="screen">
            ${renderHeader(isEdit ? 'Editar Vendedor' : 'Novo Vendedor', isEdit ? `sellerDetails&sellerId=${seller.id}` : 'sellers')}
            <div class="content">
                <form onsubmit="window.app.${isEdit ? `updateSeller(event, ${seller.id})` : 'addSeller(event)'}">
                    <div style="text-align: center; margin-bottom: 2rem;">
                         <label style="cursor:pointer;" onclick="window.app.showPhotoSourceDialog('seller')">
                            ${photoSrc ? `<img src="${photoSrc}" class="client-avatar-lg" alt="Foto do vendedor">` : `<div class="client-avatar-lg"><span class="material-icons">add_a_photo</span></div>`}
                         </label>
                    </div>
                    <div class="form-group ${state.formErrors.name ? 'has-error' : ''}">
                        <label for="name">Nome Completo</label>
                        <input type="text" id="name" name="name" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.name || ''}">
                        <div class="form-error">${state.formErrors.name || ''}</div>
                    </div>
                     <div class="form-group ${state.formErrors.phone ? 'has-error' : ''}">
                        <label for="phone">Telefone</label>
                        <input type="tel" id="phone" name="phone" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.phone || ''}">
                        <div class="form-error">${state.formErrors.phone || ''}</div>
                    </div>
                     <div class="form-group ${state.formErrors.commissionRate ? 'has-error' : ''}">
                        <label for="commissionRate">Comissão (%)</label>
                        <input type="text" id="commissionRate" name="commissionRate" required placeholder="Ex: 5" oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.commissionRate || ''}">
                        <div class="form-error">${state.formErrors.commissionRate || ''}</div>
                    </div>
                    <button type="submit" class="btn" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Cadastrar Vendedor')}</button>
                </form>
            </div>
        </div>
    `;
}

function getFilteredProducts() {
    const { productListSearchTerm } = state;
    const { name, minPrice, maxPrice, sortBy, sortOrder } = state.advancedSearch.products;
    let currentProductList = [...products];

    // 1. Advanced Filters
    if (name.trim()) {
        currentProductList = currentProductList.filter(p => p.name.toLowerCase().includes(name.toLowerCase().trim()));
    }
    const min = parseFloat(minPrice);
    if (!isNaN(min)) {
        currentProductList = currentProductList.filter(p => p.price >= min);
    }
    const max = parseFloat(maxPrice);
    if (!isNaN(max)) {
        currentProductList = currentProductList.filter(p => p.price <= max);
    }

    // 2. Quick Search Filter
    const searchTerm = productListSearchTerm.toLowerCase().trim();
    if (searchTerm) {
        currentProductList = currentProductList.filter(p => p.name.toLowerCase().includes(searchTerm) || p.code.toLowerCase().includes(searchTerm));
    }

    // 3. Sorting
    currentProductList.sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'name') {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            comparison = a.price - b.price;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    return currentProductList;
}

function renderProductsScreen() {
    const productsHtml = getFilteredProducts().map(product => `
        <div class="card" onclick="window.app.navigate('productCatalog', { productId: ${product.id} })">
             ${product.photo ? `<img src="${product.photo}" alt="${product.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">inventory_2</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-subtitle">${product.code}</p>
            </div>
            <div class="card-amount">${formatCurrency(product.price)}</div>
        </div>`).join('');

    const filters = state.advancedSearch.products;
    const isFilterActive = filters.name || filters.minPrice || filters.maxPrice || filters.sortBy !== 'name' || filters.sortOrder !== 'asc';
    
    return `
        <div class="screen">
            ${renderHeader('Produtos', 'home', { icon: 'add', onClick: "window.app.navigate('addProduct')" })}
            <div class="content">
                <div class="search-bar-container">
                    <input type="text" class="search-input" placeholder="Buscar por nome ou código..." oninput="window.app.handleProductListSearch(event)" value="${state.productListSearchTerm}">
                    <button class="filter-btn ${isFilterActive ? 'active' : ''}" onclick="window.app.toggleAdvancedSearch('products', true)">
                        <span class="material-icons">filter_list</span>
                    </button>
                </div>
                 ${products.length > 0 ? (productsHtml.length > 0 ? productsHtml : '<p style="text-align:center;color:var(--color-text-secondary);padding:1rem;">Nenhum produto encontrado com os filtros aplicados.</p>') : '<p style="text-align:center;color:var(--color-text-secondary);padding:1rem;">Nenhum produto cadastrado.</p>'}
            </div>
        </div>
    `;
}

function renderProductCatalogScreen() {
    const product = products.find(p => p.id === state.selectedProductId);
    if (!product) {
        return `
            <div class="screen">
                ${renderHeader('Produto não encontrado', 'products')}
                <div class="content"><p>Produto não encontrado.</p></div>
            </div>
        `;
    }

    return `
        <div class="screen product-catalog-screen">
            ${renderHeader('Catálogo', 'products', { icon: 'edit', onClick: `window.app.navigate('editProduct', { productId: ${product.id} })` })}
            <div class="content">
                <div class="catalog-image-container">
                    ${product.photo 
                        ? `<img src="${product.photo}" alt="${product.name}" class="catalog-image">`
                        : `<div class="catalog-image-placeholder"><span class="material-icons">inventory_2</span></div>`
                    }
                </div>
                <h1 class="catalog-title">${product.name}</h1>
                <p class="catalog-price">${formatCurrency(product.price)}</p>
            </div>
            <div class="catalog-footer">
                <button class="btn" onclick="window.app.shareProduct(${product.id})" ${state.isSharing ? 'disabled' : ''}>
                    <span class="material-icons" style="margin-right: 8px; vertical-align: bottom;">share</span>
                    ${state.isSharing ? 'Aguarde...' : 'Enviar para Cliente'}
                </button>
            </div>
        </div>
    `;
}

function renderProductForm(isEdit = false) {
    const product = isEdit ? products.find(p => p.id === state.selectedProductId) : null;
    if (isEdit && !product) { return renderProductsScreen(); }

    const photoSrc = state.productFormPhoto || (product ? product.photo : null);

    return `
        <div class="screen">
            ${renderHeader(isEdit ? 'Editar Produto' : 'Novo Produto', 'products')}
            <div class="content">
                <form onsubmit="window.app.${isEdit ? `updateProduct(event, ${product.id})` : 'addProduct(event)'}">
                     <div style="text-align: center; margin-bottom: 2rem;">
                         <label style="cursor:pointer;" onclick="window.app.showPhotoSourceDialog('product')">
                            ${photoSrc ? `<img src="${photoSrc}" class="client-avatar-lg" alt="Foto do produto">` : `<div class="client-avatar-lg"><span class="material-icons">add_a_photo</span></div>`}
                         </label>
                    </div>
                    <div class="form-group ${state.formErrors.name ? 'has-error' : ''}">
                        <label for="name">Nome do Produto</label>
                        <input type="text" id="name" name="name" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.name || ''}">
                        <div class="form-error">${state.formErrors.name || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.price ? 'has-error' : ''}">
                        <label for="price">Preço (R$)</label>
                        <input type="text" id="price" name="price" required placeholder="Ex: 29,90" oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.price || ''}">
                        <div class="form-error">${state.formErrors.price || ''}</div>
                    </div>
                    <button type="submit" class="btn" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Salvando...' : (isEdit ? 'Salvar Alterações' : 'Cadastrar Produto')}</button>
                </form>
            </div>
        </div>
    `;
}

function renderNewSaleClientScreen() {
    return `
        <div class="screen">
            ${renderHeader('Nova Venda', 'home')}
            <div class="content">
                <div class="stepper-nav">
                    <div class="step-item active">
                        <div class="step-circle">1</div>
                        <div class="step-label">Cliente</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">2</div>
                        <div class="step-label">Vendedor</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">3</div>
                        <div class="step-label">Produtos</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">4</div>
                        <div class="step-label">Pagamento</div>
                    </div>
                </div>
                 <input type="text" class="search-input" placeholder="Buscar cliente..." oninput="window.app.handleNewSaleClientSearch(event)" value="${state.currentSale.clientSearchTerm}">
                <div id="new-sale-client-list">
                    ${renderNewSaleClientList(true)}
                </div>
            </div>
        </div>
    `;
}

function renderNewSaleClientList(returnHtml = false) {
    const searchTerm = state.currentSale.clientSearchTerm.toLowerCase();
    const filteredClients = clients.filter(c => c.name.toLowerCase().includes(searchTerm) || c.cpf.includes(searchTerm));
    
    const clientListHtml = filteredClients.map(client => `
        <div class="card" onclick="window.app.selectClientForSale(${client.id})">
             ${client.photo ? `<img src="${client.photo}" alt="${client.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">person</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${client.name}</h3>
                <p class="card-subtitle">${client.cpf}</p>
            </div>
        </div>
    `).join('');
    
    const finalHtml = clientListHtml.length > 0 ? clientListHtml : '<p style="text-align:center;padding:1rem;">Nenhum cliente encontrado.</p>';

    if (returnHtml) {
        return finalHtml;
    }
    const container = document.getElementById('new-sale-client-list');
    if (container) {
        container.innerHTML = finalHtml;
    }
}

function renderNewSaleSellerScreen() {
    return `
        <div class="screen">
            ${renderHeader('Nova Venda', 'newSaleClient')}
            <div class="content">
                <div class="stepper-nav">
                    <div class="step-item active">
                        <div class="step-circle">1</div>
                        <div class="step-label">Cliente</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">2</div>
                        <div class="step-label">Vendedor</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">3</div>
                        <div class="step-label">Produtos</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">4</div>
                        <div class="step-label">Pagamento</div>
                    </div>
                </div>
                 <input type="text" class="search-input" placeholder="Buscar vendedor..." oninput="window.app.handleNewSaleSellerSearch(event)" value="${state.currentSale.sellerSearchTerm}">
                 <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="window.app.skipSellerSelection()">Vender sem comissão</button>
                 <h2 class="section-title" style="margin-top: 2rem; text-align: center;">Ou selecione um vendedor</h2>
                <div id="new-sale-seller-list">
                    ${renderNewSaleSellerList(true)}
                </div>
            </div>
        </div>
    `;
}

function renderNewSaleSellerList(returnHtml = false) {
    const searchTerm = state.currentSale.sellerSearchTerm.toLowerCase();
    const filteredSellers = sellers.filter(s => s.name.toLowerCase().includes(searchTerm));
    
    const sellerListHtml = filteredSellers.map(seller => `
        <div class="card" onclick="window.app.selectSellerForSale(${seller.id})">
             ${seller.photo ? `<img src="${seller.photo}" alt="${seller.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">badge</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${seller.name}</h3>
                <p class="card-subtitle">${seller.phone}</p>
            </div>
        </div>
    `).join('');
    
    const finalHtml = sellerListHtml.length > 0 ? sellerListHtml : '<p style="text-align:center;padding:1rem;">Nenhum vendedor encontrado.</p>';

    if (returnHtml) {
        return finalHtml;
    }
    const container = document.getElementById('new-sale-seller-list');
    if (container) {
        container.innerHTML = finalHtml;
    }
}

function renderNewSaleProductsScreen() {
    const { total, clientId, sellerId } = state.currentSale;
    const client = clients.find(c => c.id === clientId);
    const seller = sellers.find(s => s.id === sellerId);

    const sellerCardHtml = seller 
    ? `
        <div class="card">
            ${seller.photo ? `<img src="${seller.photo}" alt="${seller.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">badge</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${seller.name}</h3>
                <p class="card-subtitle">Vendedor selecionado</p>
            </div>
        </div>`
    : `
        <div class="card">
            <div class="card-icon"><span class="material-icons">storefront</span></div>
            <div class="card-content">
                <h3 class="card-title">Venda Direta</h3>
                <p class="card-subtitle">Sem comissão de vendedor</p>
            </div>
        </div>`;

    return `
        <div class="screen">
             ${renderHeader('Nova Venda', 'newSaleSeller')}
             <div class="content">
                <div class="stepper-nav">
                    <div class="step-item active">
                        <div class="step-circle">1</div>
                        <div class="step-label">Cliente</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">2</div>
                        <div class="step-label">Vendedor</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">3</div>
                        <div class="step-label">Produtos</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item">
                        <div class="step-circle">4</div>
                        <div class="step-label">Pagamento</div>
                    </div>
                </div>
                <div class="card">
                     ${client?.photo ? `<img src="${client.photo}" alt="${client.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">person</span></div>`}
                    <div class="card-content">
                        <h3 class="card-title">${client?.name}</h3>
                        <p class="card-subtitle">Cliente selecionado</p>
                    </div>
                </div>
                
                ${sellerCardHtml}

                <input type="text" class="search-input" placeholder="Buscar produto..." oninput="window.app.handleProductSearch(event)" value="${state.currentSale.productSearchTerm}">
                <div id="sale-product-list" style="padding-bottom: 70px;">
                    ${generateProductListForSaleHTML()}
                </div>
             </div>
             <div class="sale-footer" style="position:fixed; bottom:0; left:0; right:0; max-width: 450px; margin: 0 auto; background: var(--color-surface); padding: 1rem 1.25rem; border-top: 1px solid var(--color-border); box-shadow: 0 -4px 15px rgba(0,0,0,0.05);">
                <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-weight: 500;">Total</span>
                    <span style="font-size: 1.5rem; font-weight: 600;">${formatCurrency(total)}</span>
                </div>
                <button class="btn btn-sale-next" onclick="window.app.navigate('newSaleInstallments')" ${total === 0 ? 'disabled' : ''}>Avançar</button>
             </div>
        </div>
    `;
}

function renderNewSaleInstallmentsScreen() {
    const { total, paymentMethod, installmentMode } = state.currentSale;
    const singlePaymentMethods = ['credito', 'debito', 'a_vista'];
    const isInstallmentsDisabled = singlePaymentMethods.includes(paymentMethod);

    const paymentOptions = [
        { value: 'parcelado', label: 'Parcelado' },
        { value: 'mumbuca', label: 'Mumbuca Parcelado' },
        { value: 'credito', label: 'Cartão de Crédito' },
        { value: 'debito', label: 'Cartão de Débito' },
        { value: 'a_vista', label: 'À Vista' }
    ];

    return `
        <div class="screen">
            ${renderHeader('Nova Venda', 'newSaleProducts')}
            <div class="content">
                 <div class="stepper-nav">
                    <div class="step-item active">
                        <div class="step-circle">1</div>
                        <div class="step-label">Cliente</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">2</div>
                        <div class="step-label">Vendedor</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">3</div>
                        <div class="step-label">Produtos</div>
                    </div>
                    <div class="step-connector"></div>
                    <div class="step-item active">
                        <div class="step-circle">4</div>
                        <div class="step-label">Pagamento</div>
                    </div>
                </div>
                
                <div class="summary-card-lg" style="margin-top: 0;">
                    <p>Total da Venda</p>
                    <h2>${formatCurrency(total)}</h2>
                </div>

                <form onsubmit="window.app.confirmSale(event)">
                    <div class="form-group">
                        <label for="paymentMethod">Forma de Pagamento</label>
                        <select id="paymentMethod" name="paymentMethod" oninput="window.app.updateSalePaymentMethod(event)">
                            ${paymentOptions.map(opt => `<option value="${opt.value}" ${state.currentSale.paymentMethod === opt.value ? 'selected' : ''}>${opt.label}</option>`).join('')}
                        </select>
                    </div>

                    <div class="tab-nav" style="margin-bottom: 1.5rem;">
                        <div class="tab-item ${state.currentSale.installmentMode === 'count' ? 'active' : ''}" onclick="window.app.setInstallmentMode('count')">Por Nº de Parcelas</div>
                        <div class="tab-item ${state.currentSale.installmentMode === 'value' ? 'active' : ''}" onclick="window.app.setInstallmentMode('value')">Por Valor da Parcela</div>
                    </div>
                    
                    ${installmentMode === 'count' ? `
                        <div class="form-group ${state.formErrors.installments ? 'has-error' : ''}">
                            <label for="installments">Número de Parcelas</label>
                            <input type="number" id="installments" name="installments" min="1" step="1" required oninput="window.app.updateInstallmentCount(event)" onblur="window.app.handleFormBlur(event)" value="${state.currentSale.installments}" ${isInstallmentsDisabled ? 'disabled' : ''}>
                            <div class="form-error">${state.formErrors.installments || ''}</div>
                        </div>
                    ` : `
                        <div class="form-group ${state.formErrors.installmentValue ? 'has-error' : ''}">
                            <label for="installmentValue">Valor Aproximado da Parcela</label>
                            <input type="text" id="installmentValue" name="installmentValue" placeholder="Ex: 50,00" required oninput="window.app.updateInstallmentValue(event)" onblur="window.app.handleFormBlur(event)" value="${state.currentSale.installmentValueInput}" ${isInstallmentsDisabled ? 'disabled' : ''}>
                            <div class="form-error">${state.formErrors.installmentValue || ''}</div>
                        </div>
                    `}

                    ${(() => {
                        const { total, installments, installmentMode, installmentValueInput } = state.currentSale;
                        if (installments > 0 && total > 0 && !isInstallmentsDisabled) {
                            const finalInstallmentValue = total / installments;
                            let summaryText = '';
                            if (installmentMode === 'count') {
                                summaryText = `${installments} parcela${installments > 1 ? 's' : ''} de ${formatCurrency(finalInstallmentValue)}`;
                            } else if (installmentValueInput) {
                                summaryText = `Serão ${installments} parcela${installments > 1 ? 's' : ''} de ${formatCurrency(finalInstallmentValue)}`;
                            }
                            
                            if (summaryText) {
                                return `<div class="summary-card-sm"><p>${summaryText}</p></div>`;
                            }
                        }
                        return '';
                    })()}

                    <button type="submit" class="btn" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Finalizando...' : 'Finalizar Venda'}</button>
                </form>
            </div>
        </div>
    `;
}

function renderCashRegisterScreen() {
    const todayStr = new Date().toISOString().split('T')[0];
    const todayPayments = payments.filter(p => p.paymentDate === todayStr);
    const todayExpenses = expenses.filter(e => e.expenseDate === todayStr);

    const totalReceived = todayPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalSpent = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
    const balance = totalReceived - totalSpent;

    const paymentsHtml = todayPayments.length > 0 ? todayPayments.map(p => {
        const client = clients.find(c => c.id === p.clientId);
        return `
            <div class="card">
                <div class="card-icon"><span class="material-icons">person</span></div>
                <div class="card-content">
                    <h3 class="card-title">Recebimento de ${client?.name || 'Cliente desconhecido'}</h3>
                    <p class="card-subtitle">Pagamento de parcela</p>
                </div>
                <div class="card-amount" style="color: #34C759;">+ ${formatCurrency(p.amount)}</div>
            </div>`;
    }).join('') : '';
    
    const expensesHtml = todayExpenses.length > 0 ? todayExpenses.map(e => `
        <div class="card">
            <div class="card-icon"><span class="material-icons">receipt_long</span></div>
            <div class="card-content">
                <h3 class="card-title">${e.description}</h3>
                <p class="card-subtitle">${e.category}</p>
            </div>
            <div class="card-amount" style="color: #FF3B30;">- ${formatCurrency(e.amount)}</div>
        </div>`).join('') : '';

    const transactionsHtml = paymentsHtml + expensesHtml;

    return `
        <div class="screen">
            ${renderHeader('Caixa do Dia', 'home')}
            <div class="content">
                <div class="report-cards-grid">
                    <div class="report-card"><h4>Recebido</h4><p>${formatCurrency(totalReceived)}</p></div>
                    <div class="report-card"><h4>Gasto</h4><p>${formatCurrency(totalSpent)}</p></div>
                </div>
                 <div class="summary-card-lg" style="margin-top: 0; background-color: ${balance >= 0 ? 'var(--color-accent)' : '#FF3B30'};">
                    <p>Saldo do Dia</p>
                    <h2>${formatCurrency(balance)}</h2>
                </div>
                
                <h2 class="section-title">Adicionar Despesa</h2>
                <form onsubmit="window.app.addExpense(event)">
                     <div class="form-group ${state.formErrors.description ? 'has-error' : ''}">
                        <label for="description">Descrição</label>
                        <input type="text" id="description" name="description" required oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.description || ''}">
                        <div class="form-error">${state.formErrors.description || ''}</div>
                    </div>
                    <div class="form-group ${state.formErrors.amount ? 'has-error' : ''}">
                        <label for="amount">Valor (R$)</label>
                        <input type="text" id="amount" name="amount" required placeholder="Ex: 15,50" oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.amount || ''}">
                         <div class="form-error">${state.formErrors.amount || ''}</div>
                    </div>
                     <div class="form-group">
                        <label for="category">Categoria</label>
                        <select name="category" required oninput="window.app.handleFormInput(event)">
                            ${expenseCategories.map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Adicionando...' : 'Adicionar Despesa'}</button>
                </form>

                <h2 class="section-title">Movimentações de Hoje</h2>
                ${transactionsHtml.length > 0 ? transactionsHtml : '<p style="text-align: center; color: var(--color-text-secondary); padding: 1rem;">Nenhuma movimentação hoje.</p>'}
            </div>
        </div>`;
}

function renderReportsScreen() {
    const { reportStartDate, reportEndDate } = state;
    
    const salesData = sales.filter(s => s.saleDate >= reportStartDate && s.saleDate <= reportEndDate);
    const expensesData = expenses.filter(e => e.expenseDate >= reportStartDate && e.expenseDate <= reportEndDate);
    const paymentsData = payments.filter(p => p.paymentDate >= reportStartDate && p.paymentDate <= reportEndDate);

    const totalSales = salesData.reduce((sum, s) => sum + s.totalValue, 0);
    const totalExpenses = expensesData.reduce((sum, e) => sum + e.amount, 0);
    const totalReceived = paymentsData.reduce((sum, p) => sum + p.amount, 0);
    const profit = totalReceived - totalExpenses;

    let reportContentHtml = '';
    if(state.reportType === 'sales') {
        reportContentHtml = salesData.length > 0 ? salesData.map(sale => {
            const client = clients.find(c => c.id === sale.clientId);
            return `
            <div class="card">
                <div class="card-icon"><span class="material-icons">person</span></div>
                <div class="card-content">
                    <h3 class="card-title">Venda para ${client?.name || '...'}</h3>
                    <p class="card-subtitle">${formatDate(sale.saleDate)}</p>
                </div>
                <div class="card-amount">${formatCurrency(sale.totalValue)}</div>
            </div>`;
        }).join('') : '<p style="text-align:center;padding:1rem;">Nenhuma venda no período.</p>';
    } else if (state.reportType === 'expenses') {
         reportContentHtml = expensesData.length > 0 ? expensesData.map(e => `
            <div class="card">
                <div class="card-icon"><span class="material-icons">receipt_long</span></div>
                <div class="card-content">
                    <h3 class="card-title">${e.description}</h3>
                    <p class="card-subtitle">${e.category} - ${formatDate(e.expenseDate)}</p>
                </div>
                <div class="card-amount" style="color: #FF3B30;">- ${formatCurrency(e.amount)}</div>
            </div>`).join('') : '<p style="text-align:center;padding:1rem;">Nenhuma despesa no período.</p>';
    }

    return `
        <div class="screen">
            ${renderHeader('Relatórios', 'home')}
            <div class="content">
                <div class="tab-nav">
                    <div class="tab-item ${state.reportPeriod === 'day' ? 'active' : ''}" onclick="window.app.handleReportPeriodChange('day')">Hoje</div>
                    <div class="tab-item ${state.reportPeriod === 'week' ? 'active' : ''}" onclick="window.app.handleReportPeriodChange('week')">7 Dias</div>
                    <div class="tab-item ${state.reportPeriod === 'month' ? 'active' : ''}" onclick="window.app.handleReportPeriodChange('month')">Mês</div>
                    <div class="tab-item ${state.reportPeriod === 'custom' ? 'active' : ''}" onclick="window.app.handleReportPeriodChange('custom')">Person.</div>
                </div>

                ${state.reportPeriod === 'custom' ? `
                    <div class="date-range-inputs" style="margin-top: 1rem;">
                        <div class="form-group">
                            <label>Data Inicial</label>
                            <input type="date" name="reportStartDate" value="${state.reportStartDate}" onchange="window.app.handleReportDateChange(event)">
                        </div>
                        <div class="form-group">
                            <label>Data Final</label>
                            <input type="date" name="reportEndDate" value="${state.reportEndDate}" onchange="window.app.handleReportDateChange(event)">
                        </div>
                    </div>` : ''
                }

                <div class="report-cards-grid">
                     <div class="report-card"><h4>Vendas</h4><p>${formatCurrency(totalSales)}</p></div>
                     <div class="report-card"><h4>Recebido</h4><p>${formatCurrency(totalReceived)}</p></div>
                     <div class="report-card"><h4>Despesas</h4><p>${formatCurrency(totalExpenses)}</p></div>
                     <div class="report-card"><h4>Lucro</h4><p>${formatCurrency(profit)}</p></div>
                </div>

                <div class="tab-nav">
                    <div class="tab-item ${state.reportType === 'sales' ? 'active' : ''}" onclick="window.app.setReportType('sales')">Vendas</div>
                    <div class="tab-item ${state.reportType === 'expenses' ? 'active' : ''}" onclick="window.app.setReportType('expenses')">Despesas</div>
                </div>
                <div style="margin-top: 1.5rem;">${reportContentHtml}</div>
            </div>
            ${renderBottomNav('reports')}
        </div>`;
}

function handleDailyClientsDateChange(event) {
    state.dailyClientsDate = event.target.value;
    render();
}

function renderDailyClientsScreen() {
    const selectedDate = state.dailyClientsDate;

    const dueInstallmentsOnDate = installments.filter(inst => inst.dueDate === selectedDate && inst.status !== 'paid');
    const clientIds = [...new Set(dueInstallmentsOnDate.map(inst => inst.clientId))];
    const clientsOnDate = clients.filter(c => clientIds.includes(c.id));

    const clientListHtml = clientsOnDate.length > 0
        ? clientsOnDate.map(client => {
            const clientInstallmentsToday = dueInstallmentsOnDate.filter(inst => inst.clientId === client.id);
            const installmentsHtml = clientInstallmentsToday.map(inst => `
                <div class="installment-due-item">
                    <span>Parcela de ${formatCurrency(inst.value)}</span>
                    <span class="tag ${inst.status}">${inst.status === 'due' ? 'Pendente' : 'Atrasada'}</span>
                </div>
            `).join('');

            return `
                <div class="card" onclick="window.app.navigate('clientDetails', { clientId: ${client.id} })">
                    ${client.photo ? `<img src="${client.photo}" alt="${client.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">person</span></div>`}
                    <div class="card-content">
                        <h3 class="card-title">${client.name}</h3>
                        <p class="card-subtitle">${client.address}</p>
                        <div class="due-installments-list">
                            ${installmentsHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('')
        : '<p class="empty-state">Nenhum cliente com parcela vencendo na data selecionada.</p>';

    return `
        <div class="screen">
            ${renderHeader('Clientes do Dia', 'home')}
            <div class="content">
                <div class="form-group">
                    <label for="dailyClientsDate">Selecione a Data</label>
                    <input type="date" id="dailyClientsDate" name="dailyClientsDate" value="${state.dailyClientsDate}" onchange="window.app.handleDailyClientsDateChange(event)">
                </div>
                <h2 class="section-title">Clientes com Vencimento na Data</h2>
                ${clientListHtml}
            </div>
            ${renderBottomNav('dailyClients')}
        </div>
    `;
}

function renderCommissionsScreen() {
    const sellerCommissions = sellers.map(seller => {
        const totalGrossCommission = sales
            .filter(sale => sale.sellerId === seller.id)
            .reduce((sum, sale) => sum + (sale.commissionAmount || 0), 0);
        
        const totalAdvances = advances
            .filter(a => a.sellerId === seller.id)
            .reduce((sum, a) => sum + a.amount, 0);

        const netCommission = totalGrossCommission - totalAdvances;

        return {
            ...seller,
            netCommission
        };
    }).sort((a, b) => b.netCommission - a.netCommission);

    const grandTotal = sellerCommissions.reduce((sum, s) => sum + s.netCommission, 0);

    const sellersHtml = sellerCommissions.map(seller => `
        <div class="card" onclick="window.app.navigate('sellerDetails', { sellerId: ${seller.id} })">
             ${seller.photo ? `<img src="${seller.photo}" alt="${seller.name}" class="card-avatar">` : `<div class="card-icon"><span class="material-icons">badge</span></div>`}
            <div class="card-content">
                <h3 class="card-title">${seller.name}</h3>
                <p class="card-subtitle">Comissão a pagar</p>
            </div>
            <div class="card-amount" style="color: var(--color-accent);">${formatCurrency(seller.netCommission)}</div>
        </div>`).join('');

    return `
        <div class="screen">
            ${renderHeader('Comissões a Pagar', 'home')}
            <div class="content">
                <div class="summary-card-lg" style="margin-top: 0;">
                    <p>Total a Pagar (Todos Vendedores)</p>
                    <h2>${formatCurrency(grandTotal)}</h2>
                </div>
                
                <h2 class="section-title">Comissões por Vendedor</h2>
                ${sellersHtml.length > 0 ? sellersHtml : '<p class="empty-state">Nenhum vendedor com comissão encontrada.</p>'}
            </div>
        </div>
    `;
}

function renderDataManagementScreen() {
    const lastBackupDate = getLastBackupInfo();
    return `
        <div class="screen">
            ${renderHeader('Gerenciar Dados', 'home')}
            <div class="content">
                <h2 class="section-title">Backup e Restauração (Arquivo)</h2>
                 <div class="card" onclick="window.app.exportData()">
                    <div class="card-icon"><span class="material-icons">file_download</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Exportar Dados (JSON)</h3>
                        <p class="card-subtitle">Salvar um backup de todos os dados em um arquivo.</p>
                    </div>
                </div>
                 <div class="card" onclick="window.app.triggerImport()">
                    <div class="card-icon"><span class="material-icons">file_upload</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Importar Backup (JSON)</h3>
                        <p class="card-subtitle">Restaurar dados de um arquivo .json</p>
                    </div>
                    <input type="file" id="import-file-input" style="display:none;" accept=".json" onchange="window.app.importData(event)">
                </div>

                <h2 class="section-title">Backup Local Automático</h2>
                <p class="card-subtitle" style="margin-top: -1rem; margin-bottom: 1rem; font-size: 0.85rem;">Seus dados são salvos periodicamente no seu navegador. Use os backups para restaurar uma versão anterior em caso de problemas.</p>
                <div class="card" onclick="window.app.handleManualBackup()">
                    <div class="card-icon"><span class="material-icons">save</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Fazer Backup Manual Agora</h3>
                        <p class="card-subtitle">Cria um ponto de restauração com os dados atuais.</p>
                    </div>
                </div>
                <div class="card" onclick="window.app.restoreFromLocalBackup()">
                    <div class="card-icon"><span class="material-icons">restore</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Restaurar do Último Backup</h3>
                        <p class="card-subtitle">Último backup: ${lastBackupDate}</p>
                    </div>
                </div>

                <h2 class="section-title">Importação via CSV</h2>
                 <div class="card" onclick="window.app.showImportDialog('clients')">
                    <div class="card-icon"><span class="material-icons">group_add</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Importar Clientes (CSV)</h3>
                        <p class="card-subtitle">Adicionar clientes de uma planilha.</p>
                    </div>
                </div>
                 <div class="card" onclick="window.app.showImportDialog('products')">
                    <div class="card-icon"><span class="material-icons">add_shopping_cart</span></div>
                    <div class="card-content">
                        <h3 class="card-title">Importar Produtos (CSV)</h3>
                        <p class="card-subtitle">Adicionar produtos de uma planilha.</p>
                    </div>
                </div>

                <h2 class="section-title">Zona de Perigo</h2>
                 <div class="card" style="border: 1px solid #FF3B30;" onclick="window.app.clearAllData()">
                    <div class="card-icon" style="background-color: #FF3B3020;"><span class="material-icons" style="color: #FF3B30;">delete_forever</span></div>
                    <div class="card-content">
                        <h3 class="card-title" style="color: #FF3B30;">Apagar Todos os Dados</h3>
                        <p class="card-subtitle">Esta ação é irreversível.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSettingsScreen() {
    return `
        <div class="screen">
            ${renderHeader('Personalizar', 'home')}
            <div class="content">
                <h2 class="section-title">Aparência</h2>
                 <div class="settings-item">
                    <div class="settings-item-info">
                        <span class="material-icons">dark_mode</span>
                        <span>Modo Escuro</span>
                    </div>
                    <label class="switch">
                        <input type="checkbox" name="darkMode" onchange="window.app.handleSettingsChange(event)" ${settings.darkMode ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </div>
                
                <h2 class="section-title">Tema de Cores</h2>
                <div class="theme-selector">
                ${THEMES.map(theme => `
                    <div class="theme-option ${settings.themeId === theme.id ? 'active' : ''}" onclick="window.app.handleThemeChange('${theme.id}')">
                        <div class="theme-preview" style="background-color: ${theme.colors.accent};"></div>
                        <span>${theme.name}</span>
                    </div>
                `).join('')}
                </div>

                 <h2 class="section-title">Backup Automático</h2>
                <div class="form-group">
                    <label for="autoBackupFrequency">Frequência do Backup</label>
                    <select id="autoBackupFrequency" name="autoBackupFrequency" onchange="window.app.handleSettingsChange(event)">
                        <option value="daily" ${settings.autoBackupFrequency === 'daily' ? 'selected' : ''}>Diariamente</option>
                        <option value="on_change" ${settings.autoBackupFrequency === 'on_change' ? 'selected' : ''}>A cada 25 alterações</option>
                        <option value="off" ${settings.autoBackupFrequency === 'off' ? 'selected' : ''}>Desativado</option>
                    </select>
                    <p class="card-subtitle" style="margin-top: 0.5rem; font-size: 0.8rem;">O backup automático salva uma cópia dos seus dados localmente no navegador para restauração de emergência.</p>
                </div>

                <h2 class="section-title">Informações da Empresa</h2>
                <div class="form-group">
                    <label>Logo da Empresa (Menu)</label>
                    <div class="logo-upload-area" onclick="document.getElementById('logo-upload').click();">
                        <input type="file" id="logo-upload" accept="image/*" style="display:none;" onchange="window.app.handleLogoUpload(event)">
                        ${settings.logoUrl ? `
                            <img src="${settings.logoUrl}" class="logo-preview" alt="Pré-visualização do logo">
                            <div class="logo-upload-overlay">
                                <span class="material-icons">edit</span>
                                <span>Alterar</span>
                            </div>
                        ` : `
                            <div class="logo-upload-placeholder">
                                <span class="material-icons">cloud_upload</span>
                                <span>Carregar Logo</span>
                                <small>PNG, JPG (Máx 5MB)</small>
                            </div>
                        `}
                    </div>
                </div>
                <div class="form-group">
                    <label>Imagem do Banner (Tela Principal)</label>
                    <div class="logo-upload-area banner-upload-area" onclick="document.getElementById('banner-upload').click();">
                        <input type="file" id="banner-upload" accept="image/*" style="display:none;" onchange="window.app.handleBannerUpload(event)">
                        ${settings.bannerImageUrl ? `
                            <img src="${settings.bannerImageUrl}" class="logo-preview" alt="Pré-visualização do banner">
                            <div class="logo-upload-overlay">
                                <span class="material-icons">edit</span>
                                <span>Alterar</span>
                            </div>
                        ` : `
                            <div class="logo-upload-placeholder">
                                <span class="material-icons">image</span>
                                <span>Carregar Banner</span>
                                <small>Recomendado: 800x400px</small>
                            </div>
                        `}
                    </div>
                </div>
                <div class="form-group">
                    <label>Imagem de Fundo (Tela de Entrada)</label>
                    <div class="logo-upload-area banner-upload-area" onclick="document.getElementById('splash-image-upload').click();">
                        <input type="file" id="splash-image-upload" accept="image/*" style="display:none;" onchange="window.app.handleSplashImageUpload(event)">
                        ${settings.splashImageUrl ? `
                            <img src="${settings.splashImageUrl}" class="logo-preview" alt="Pré-visualização do fundo">
                            <div class="logo-upload-overlay">
                                <span class="material-icons">edit</span>
                                <span>Alterar</span>
                            </div>
                        ` : `
                            <div class="logo-upload-placeholder">
                                <span class="material-icons">image</span>
                                <span>Carregar Fundo</span>
                                <small>Recomendado: 800x1200px</small>
                            </div>
                        `}
                    </div>
                </div>
                <div class="form-group">
                    <label>Logo (Tela de Entrada)</label>
                    <div class="logo-upload-area" onclick="document.getElementById('splash-logo-upload').click();">
                        <input type="file" id="splash-logo-upload" accept="image/*" style="display:none;" onchange="window.app.handleSplashLogoUpload(event)">
                        ${settings.splashLogoUrl ? `
                            <img src="${settings.splashLogoUrl}" class="logo-preview" alt="Pré-visualização do logo de entrada">
                            <div class="logo-upload-overlay">
                                <span class="material-icons">edit</span>
                                <span>Alterar</span>
                            </div>
                        ` : `
                            <div class="logo-upload-placeholder">
                                <span class="material-icons">cloud_upload</span>
                                <span>Carregar Logo</span>
                                <small>PNG, JPG (Máx 5MB)</small>
                            </div>
                        `}
                    </div>
                </div>
                <div class="form-group">
                    <label for="headerTitle">Título do Aplicativo</label>
                    <input type="text" id="headerTitle" name="headerTitle" value="${settings.headerTitle}" onchange="window.app.handleSettingsChange(event)">
                </div>
                <div class="form-group">
                    <label for="welcomeName">Saudação Inicial</label>
                    <input type="text" id="welcomeName" name="welcomeName" value="${settings.welcomeName}" onchange="window.app.handleSettingsChange(event)">
                </div>
                <div class="form-group">
                    <label for="appDescription">Subtítulo</label>
                    <input type="text" id="appDescription" name="appDescription" value="${settings.appDescription}" onchange="window.app.handleSettingsChange(event)">
                </div>
            </div>
        </div>
    `;
}

function renderNotificationsView() {
    if (!state.showNotificationsView) return '';

    const unreadCount = state.notifications.filter(n => !n.read).length;
    const notificationsHtml = state.notifications.map(n => `
        <div class="card ${n.read ? 'read' : ''}" onclick="window.app.handleNotificationClick('${n.id}')">
            <div class="card-icon"><span class="material-icons" style="color: ${n.type === 'late' ? '#FF3B30' : '#FF9500'};">${n.type === 'late' ? 'error' : 'warning'}</span></div>
            <div class="card-content">
                <p class="card-subtitle">${n.message}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="dialog-overlay" onclick="window.app.toggleNotificationsView()">
            <div class="dialog-box notifications-panel" onclick="event.stopPropagation();">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h3>Notificações</h3>
                    ${unreadCount > 0 ? `<button class="btn-text" onclick="window.app.markAllNotificationsAsRead()">Marcar todas como lidas</button>` : ''}
                </div>
                ${state.notifications.length > 0 ? notificationsHtml : '<p>Nenhuma notificação.</p>'}
            </div>
        </div>
    `;
}

function renderDialogs() {
    const container = document.getElementById('dialog-container');
    if (!container) return;

    let dialogHtml = '';

    if (state.confirmationDialog) {
        dialogHtml += `
            <div class="dialog-overlay">
                <div class="dialog-box">
                    <p>${state.confirmationDialog.message}</p>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideConfirmation()">Cancelar</button>
                        <button class="btn" onclick="window.app.confirmAction()">Confirmar</button>
                    </div>
                </div>
            </div>`;
    }

    if (state.photoSourceDialog) {
        const typeName = state.photoSourceDialog.type === 'client' ? 'cliente' 
                       : state.photoSourceDialog.type === 'product' ? 'produto' 
                       : 'vendedor';
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hidePhotoSourceDialog()">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Adicionar Foto</h3>
                    <p>Escolha uma opção para adicionar a foto do ${typeName}.</p>
                    <div class="dialog-actions" style="flex-direction: column; gap: 0.75rem;">
                        <button class="btn" onclick="window.app.triggerCameraUpload()">
                            <span class="material-icons" style="margin-right: 8px; vertical-align: bottom;">photo_camera</span>
                            Tirar Foto
                        </button>
                        <button class="btn btn-secondary" onclick="window.app.triggerFileUpload()">
                            <span class="material-icons" style="margin-right: 8px; vertical-align: bottom;">photo_library</span>
                            Escolher da Galeria
                        </button>
                    </div>
                </div>
            </div>`;
    }

    if (state.addAdvanceDialog) {
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hideAddAdvanceDialog()">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Adicionar Vale</h3>
                    <p>Adicionar um adiantamento para o vendedor, que será descontado da comissão.</p>
                     <div class="form-group ${state.formErrors.amount ? 'has-error' : ''}">
                        <label for="amount">Valor (R$)</label>
                        <input type="text" name="amount" placeholder="Ex: 50,00" oninput="window.app.handleFormInput(event)" onblur="window.app.handleFormBlur(event)" value="${state.formData.amount || ''}">
                        <div class="form-error">${state.formErrors.amount || ''}</div>
                    </div>
                     <div class="form-group">
                        <label for="description">Descrição (Opcional)</label>
                        <input type="text" name="description" placeholder="Ex: Adiantamento semanal" oninput="window.app.handleFormInput(event)" value="${state.formData.description || ''}">
                    </div>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideAddAdvanceDialog()">Cancelar</button>
                        <button class="btn" onclick="window.app.confirmAddAdvance()" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Salvando...' : 'Salvar'}</button>
                    </div>
                </div>
            </div>`;
    }

    if (state.rescheduleDialog) {
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hideRescheduleDialog()">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Reagendar Parcela</h3>
                     <div class="form-group ${state.formErrors.newDueDate ? 'has-error' : ''}">
                        <label for="newDueDate">Nova Data de Vencimento</label>
                        <input type="date" name="newDueDate" value="${state.rescheduleDialog.newDueDate}" oninput="window.app.handleDialogInputChange(event)">
                        <div class="form-error">${state.formErrors.newDueDate || ''}</div>
                    </div>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideRescheduleDialog()">Cancelar</button>
                        <button class="btn" onclick="window.app.confirmReschedule()" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Confirmando...' : 'Confirmar'}</button>
                    </div>
                </div>
            </div>`;
    }
    
     if (state.adjustInstallmentDialog) {
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hideAdjustInstallmentDialog()">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Registrar Pagamento</h3>
                     <div class="form-group ${state.formErrors.newAmountPaid ? 'has-error' : ''}">
                        <label for="newAmountPaid">Valor Pago (R$)</label>
                        <input type="text" name="newAmountPaid" value="${state.adjustInstallmentDialog.newAmountPaid}" oninput="window.app.handleDialogInputChange(event)">
                        <div class="form-error">${state.formErrors.newAmountPaid || ''}</div>
                    </div>
                    <p class="card-subtitle" style="font-size: 0.8rem;">Se o valor pago for diferente do valor da parcela, a diferença será ajustada na próxima parcela em aberto.</p>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideAdjustInstallmentDialog()">Cancelar</button>
                        <button class="btn" onclick="window.app.confirmInstallmentAdjustment()" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Confirmando...' : 'Confirmar Pagamento'}</button>
                    </div>
                </div>
            </div>`;
    }
    
     if (state.editSalePriceDialog) {
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hideEditSalePriceDialog()">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Editar Preço de Venda</h3>
                    <p>Alterando preço para: <strong>${state.editSalePriceDialog.productName}</strong></p>
                     <div class="form-group ${state.formErrors.newPrice ? 'has-error' : ''}">
                        <label for="newPrice">Novo Preço (R$)</label>
                        <input type="text" name="newPrice" value="${state.editSalePriceDialog.newPrice}" oninput="window.app.handleDialogInputChange(event)">
                        <div class="form-error">${state.formErrors.newPrice || ''}</div>
                    </div>
                    <p class="card-subtitle" style="font-size: 0.8rem;">Este preço será usado apenas para esta venda.</p>
                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideEditSalePriceDialog()">Cancelar</button>
                        <button class="btn" onclick="window.app.confirmSalePriceEdit()" ${state.isSubmitting ? 'disabled' : ''}>${state.isSubmitting ? 'Confirmando...' : 'Confirmar'}</button>
                    </div>
                </div>
            </div>`;
    }
    
     if (state.importDialog) {
        const { type, step, hasHeader, headers, mapping, errorMessage, parsedData } = state.importDialog;
        const requiredFields = type === 'clients' ? REQUIRED_CLIENT_FIELDS : REQUIRED_PRODUCT_FIELDS;
        let content = '';

        if(step === 'upload' || step === 'mapping') {
             content = `
                <h3>Importar ${type === 'clients' ? 'Clientes' : 'Produtos'} de CSV</h3>
                 <p>Passo 1: Baixe o modelo e preencha com seus dados.</p>
                 <button class="btn btn-secondary" onclick="window.app.downloadCSVTemplate('${type}')">Baixar Modelo CSV</button>
                 <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--color-border);">
                 <p>Passo 2: Envie o arquivo preenchido.</p>
                 <input type="file" id="import-csv-input" style="display:none" accept=".csv" onchange="window.app.handleImportFileSelect(event)">
                 <button class="btn" onclick="document.getElementById('import-csv-input').click()">Selecionar Arquivo CSV</button>
            `;
        }
        
        if (step === 'mapping' && headers) {
             content += `
                <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--color-border);">
                <h3>Passo 3: Mapear Colunas</h3>
                <p>Associe as colunas do seu arquivo aos campos do sistema.</p>
                <div class="form-group">
                    <label style="display:flex; align-items: center; gap: 0.5rem;">
                        <input type="checkbox" onchange="window.app.handleHeaderCheckbox(event)" ${hasHeader ? 'checked' : ''}>
                        Meu arquivo tem uma linha de cabeçalho
                    </label>
                </div>
                 ${Object.keys(requiredFields).map(field => `
                    <div class="form-group">
                        <label>${requiredFields[field].label}</label>
                        <select onchange="window.app.handleMappingChange(event, '${field}')">
                            <option value="nao_mapear">Não mapear</option>
                            ${headers.map(h => `<option value="${h}" ${mapping[field] === h ? 'selected' : ''}>${h}</option>`).join('')}
                        </select>
                    </div>
                `).join('')}
                 <button class="btn" onclick="window.app.processImportedData()">Verificar Dados</button>
            `;
        }

        if (step === 'mapping' && parsedData) {
            content += `
                <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid var(--color-border);">
                <h3>Passo 4: Confirmar Importação</h3>
                <p>Encontramos <strong>${parsedData.length}</strong> registro(s) válidos para importar.</p>
                ${errorMessage ? `<p style="color: #FF9500;">${errorMessage}</p>` : ''}
                <button class="btn" onclick="window.app.finalizeImport()">Importar Agora</button>
            `;
        }


        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.hideImportDialog()">
                <div class="dialog-box" style="max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
                   ${content}
                   <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.hideImportDialog()">Fechar</button>
                   </div>
                </div>
            </div>`;
    }

    if (state.receiptDialog) {
        dialogHtml += `
            <div class="dialog-overlay">
                <div class="dialog-box">
                    <h3>${state.receiptDialog.title}</h3>
                    <p>A operação foi concluída com sucesso.</p>
                    <div class="dialog-actions" style="flex-direction: column; gap: 0.75rem;">
                        <button class="btn" onclick="window.app.shareReceipt()" ${state.isSharing ? 'disabled' : ''}>
                            <span class="material-icons" style="margin-right: 8px; vertical-align: bottom;">share</span>
                            ${state.isSharing ? 'Aguarde...' : 'Enviar Comprovante'}
                        </button>
                        <button class="btn btn-secondary" onclick="window.app.hideReceiptDialog()">Concluir</button>
                    </div>
                </div>
            </div>`;
    }
    
    if (state.advancedSearch.clients.isOpen) {
        const filters = state.advancedSearch.clients;
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.toggleAdvancedSearch('clients', false)">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Filtrar e Ordenar Clientes</h3>
                    
                    <h4 class="dialog-subtitle">Filtrar por</h4>
                    <div class="form-group">
                        <label>Nome do Cliente</label>
                        <input type="text" name="name" value="${filters.name}" oninput="window.app.handleAdvancedSearchInput(event, 'clients')">
                    </div>
                    <div class="form-group">
                        <label>CPF/CNPJ</label>
                        <input type="text" name="cpf" value="${filters.cpf}" oninput="window.app.handleAdvancedSearchInput(event, 'clients')">
                    </div>
                    <div class="form-group">
                        <label>Bairro</label>
                        <input type="text" name="neighborhood" value="${filters.neighborhood}" oninput="window.app.handleAdvancedSearchInput(event, 'clients')">
                    </div>

                    <hr class="dialog-divider">
                    <h4 class="dialog-subtitle">Ordenar por</h4>
                    <div class="form-group">
                        <label>Critério</label>
                        <select name="sortBy" onchange="window.app.handleAdvancedSearchInput(event, 'clients')">
                            <option value="name" ${filters.sortBy === 'name' ? 'selected' : ''}>Nome</option>
                            <option value="createdAt" ${filters.sortBy === 'createdAt' ? 'selected' : ''}>Data de Cadastro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Ordem</label>
                        <select name="sortOrder" onchange="window.app.handleAdvancedSearchInput(event, 'clients')">
                            <option value="asc" ${filters.sortOrder === 'asc' ? 'selected' : ''}>Crescente (A-Z)</option>
                            <option value="desc" ${filters.sortOrder === 'desc' ? 'selected' : ''}>Decrescente (Z-A)</option>
                        </select>
                    </div>

                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.clearAdvancedSearch('clients')">Limpar</button>
                        <button class="btn" onclick="window.app.applyAdvancedSearch('clients')">Aplicar</button>
                    </div>
                </div>
            </div>`;
    }

    if (state.advancedSearch.products.isOpen) {
        const filters = state.advancedSearch.products;
        dialogHtml += `
            <div class="dialog-overlay" onclick="window.app.toggleAdvancedSearch('products', false)">
                <div class="dialog-box" onclick="event.stopPropagation()">
                    <h3>Filtrar e Ordenar Produtos</h3>
                    
                    <h4 class="dialog-subtitle">Filtrar por</h4>
                    <div class="form-group">
                        <label>Nome do Produto</label>
                        <input type="text" name="name" value="${filters.name}" oninput="window.app.handleAdvancedSearchInput(event, 'products')">
                    </div>
                    <div class="price-range-inputs">
                        <div class="form-group">
                            <label>Preço Mín.</label>
                            <input type="number" name="minPrice" placeholder="Ex: 10" value="${filters.minPrice}" oninput="window.app.handleAdvancedSearchInput(event, 'products')">
                        </div>
                        <div class="form-group">
                            <label>Preço Máx.</label>
                            <input type="number" name="maxPrice" placeholder="Ex: 100" value="${filters.maxPrice}" oninput="window.app.handleAdvancedSearchInput(event, 'products')">
                        </div>
                    </div>

                    <hr class="dialog-divider">
                    <h4 class="dialog-subtitle">Ordenar por</h4>
                    <div class="form-group">
                        <label>Critério</label>
                        <select name="sortBy" onchange="window.app.handleAdvancedSearchInput(event, 'products')">
                            <option value="name" ${filters.sortBy === 'name' ? 'selected' : ''}>Nome</option>
                            <option value="price" ${filters.sortBy === 'price' ? 'selected' : ''}>Preço</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Ordem</label>
                        <select name="sortOrder" onchange="window.app.handleAdvancedSearchInput(event, 'products')">
                            <option value="asc" ${filters.sortOrder === 'asc' ? 'selected' : ''}>Crescente</option>
                            <option value="desc" ${filters.sortOrder === 'desc' ? 'selected' : ''}>Decrescente</option>
                        </select>
                    </div>

                    <div class="dialog-actions">
                        <button class="btn btn-secondary" onclick="window.app.clearAdvancedSearch('products')">Limpar</button>
                        <button class="btn" onclick="window.app.applyAdvancedSearch('products')">Aplicar</button>
                    </div>
                </div>
            </div>`;
    }

    container.innerHTML = dialogHtml;
}

function renderInstallBanner() {
    if (!state.showInstallBanner) return '';

    if (state.isIos) {
        return `
            <div class="install-banner">
                <div class="install-banner-content">
                    <img src="/logo-192.png" alt="App Logo" class="install-banner-logo">
                    <div class="install-banner-text">
                        <strong>Instale o CLA Vendas</strong>
                        <p>Toque em <span class="material-icons ios-share-icon">ios_sharing</span> e depois "Adicionar à Tela de Início".</p>
                    </div>
                </div>
                <button class="install-banner-close" onclick="window.app.dismissInstallBanner()">
                    <span class="material-icons">close</span>
                </button>
            </div>
        `;
    }

    if (state.installPromptEvent) {
        return `
            <div class="install-banner">
                <div class="install-banner-content">
                    <img src="/logo-192.png" alt="App Logo" class="install-banner-logo">
                    <div class="install-banner-text">
                        <strong>Instale o CLA Vendas</strong>
                        <p>Acesse rapidamente da sua tela inicial.</p>
                    </div>
                </div>
                <div class="install-banner-actions">
                     <button class="install-banner-btn-secondary" onclick="window.app.dismissInstallBanner()">Agora não</button>
                     <button class="install-banner-btn-primary" onclick="window.app.promptInstall()">Instalar</button>
                </div>
            </div>
        `;
    }

    return '';
}

function render() {
    const root = document.getElementById('root');
    if (!root) return;

    if (state.currentView === 'splash') {
        root.innerHTML = renderSplashScreen();
        renderDialogs();
        return;
    }
    
    let currentHtml = '';
    switch (state.currentView) {
        case 'home': currentHtml = renderHomeScreen(); break;
        case 'dashboard': currentHtml = renderDashboard(); break;
        case 'clients': currentHtml = renderClientsScreen(); break;
        case 'clientDetails': currentHtml = renderClientDetailsScreen(); break;
        case 'addClient': currentHtml = renderClientForm(false); break;
        case 'editClient': currentHtml = renderClientForm(true); break;
        case 'products': currentHtml = renderProductsScreen(); break;
        case 'productCatalog': currentHtml = renderProductCatalogScreen(); break;
        case 'addProduct': currentHtml = renderProductForm(false); break;
        case 'editProduct': currentHtml = renderProductForm(true); break;
        case 'sellers': currentHtml = renderSellersScreen(); break;
        case 'sellerDetails': currentHtml = renderSellerDetailsScreen(); break;
        case 'addSeller': currentHtml = renderSellerForm(false); break;
        case 'editSeller': currentHtml = renderSellerForm(true); break;
        case 'newSaleClient': currentHtml = renderNewSaleClientScreen(); break;
        case 'newSaleSeller': currentHtml = renderNewSaleSellerScreen(); break;
        case 'newSaleProducts': currentHtml = renderNewSaleProductsScreen(); break;
        case 'newSaleInstallments': currentHtml = renderNewSaleInstallmentsScreen(); break;
        case 'cashRegister': currentHtml = renderCashRegisterScreen(); break;
        case 'commissions': currentHtml = renderCommissionsScreen(); break;
        case 'reports': currentHtml = renderReportsScreen(); break;
        case 'dailyClients': currentHtml = renderDailyClientsScreen(); break;
        case 'dataManagement': currentHtml = renderDataManagementScreen(); break;
        case 'settings': currentHtml = renderSettingsScreen(); break;
        default: currentHtml = renderHomeScreen();
    }
    
    root.innerHTML = `
        ${renderSideMenu()}
        <div id="main-container" class="${state.isMenuOpen ? 'menu-open' : ''}">
            ${currentHtml}
            ${renderInstallBanner()}
        </div>
        ${state.isMenuOpen ? `<div class="side-menu-overlay" onclick="window.app.toggleSideMenu()"></div>` : ''}
    `;
    
    // Render dynamic dialogs
    renderDialogs();
}

function init() {
    loadSettings();
    loadAllData();
    applySettings();
    updateInstallmentStatuses();
    generateNotifications();
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
        console.log('App is running in standalone mode.');
    } else {
        let installPromptFired = false;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            installPromptFired = true;
            state.installPromptEvent = e;
            state.showInstallBanner = true;
            render();
        });

        setTimeout(() => {
            // Fix: Cast window to any to access non-standard MSStream property for IE detection on Windows Phone.
            const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
            if (!installPromptFired && isIos) {
                state.isIos = true;
                state.showInstallBanner = true;
                render();
            }
        }, 1500);
    }
    
    window.app = {
        navigate,
        toggleSideMenu,
        addClient,
        updateClient,
        deleteClient,
        addProduct,
        updateProduct,
        deleteProduct,
        addSeller,
        updateSeller,
        deleteSeller,
        addExpense,
        showAddAdvanceDialog,
        hideAddAdvanceDialog,
        confirmAddAdvance,
        deleteAdvance,
        showConfirmation,
        hideConfirmation,
        confirmAction,
        startNewSale,
        selectClientForSale,
        selectSellerForSale,
        skipSellerSelection,
        updateSaleProductQuantity,
        updateInstallmentCount,
        updateSalePaymentMethod,
        setInstallmentMode,
        updateInstallmentValue,
        confirmSale,
        handleClientListSearch,
        handleNewSaleClientSearch,
        handleNewSaleSellerSearch,
        handleProductSearch,
        handleSellerListSearch,
        exportData,
        importData,
        triggerImport,
        clearAllData,
        handleReportPeriodChange,
        handleReportDateChange,
        setReportType,
        showRescheduleDialog,
        hideRescheduleDialog,
        confirmReschedule,
        showAdjustInstallmentDialog,
        hideAdjustInstallmentDialog,
        confirmInstallmentAdjustment,
        showEditSalePriceDialog,
        hideEditSalePriceDialog,
        confirmSalePriceEdit,
        handleSettingsChange,
        handleThemeChange,
        handleLogoUpload,
        handleBannerUpload,
        handleSplashImageUpload,
        handleSplashLogoUpload,
        showImportDialog,
        hideImportDialog,
        downloadCSVTemplate,
        handleImportFileSelect,
        handleHeaderCheckbox,
        handleMappingChange,
        processImportedData,
        finalizeImport,
        handlePhotoUpload,
        showPhotoSourceDialog,
        hidePhotoSourceDialog,
        triggerFileUpload,
        triggerCameraUpload,
        handleFormInput,
        handleFormBlur,
        handleDialogInputChange,
        toggleNotificationsView,
        markAllNotificationsAsRead,
        handleNotificationClick,
        setClientListFilter,
        setClientDetailsTab,
        setSellerDetailsTab,
        toggleBalanceVisibility,
        handleDailyClientsDateChange,
        shareReceipt,
        shareProduct,
        hideReceiptDialog,
        generatePaymentReceiptPDF,
        handleProductListSearch,
        toggleAdvancedSearch,
        handleAdvancedSearchInput,
        applyAdvancedSearch,
        clearAdvancedSearch,
        handleSellerDetailsPeriodChange,
        handleSellerDetailsDateChange,
        promptInstall,
        dismissInstallBanner,
        handleManualBackup,
        restoreFromLocalBackup,
        render, // Expose render for dynamic updates
    };

    render();

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

init();

// Fix: Add an empty export to treat this file as a module.
export {};